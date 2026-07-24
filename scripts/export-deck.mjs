// Export a deck to PDF and/or PPTX.
//
// Default mode produces EDITABLE output — text you can select, search and edit:
//   • PDF  — rendered straight from the deck via Chromium's own print engine,
//            so every text run stays vector + selectable and graphics stay crisp.
//   • PPTX — each slide's graphics (photos, shapes, colour blocks) become the
//            slide background image, and every text run is laid back on top as a
//            native PowerPoint text box you can click into and edit.
//
// Pass `--raster` for the old behaviour (one flat 1920×1080 image per slide —
// pixel-perfect but nothing is selectable).
//
// Requires Playwright's Chromium (installed once via `npx playwright install
// chromium`, or automatically by `npm install` through the postinstall hook).
//
// Usage:
//   node scripts/export-deck.mjs [options]
//     --deck   main|template            which deck to export (default: main)
//     --format pdf|pptx|both            output(s) to produce   (default: both)
//     --out    <dir>                    output directory       (default: export)
//     --scale  <n>                      background image DPR    (default: 2)
//     --gslides                         shrink PPTX text ~6% for Google Slides,
//                                       which force-wraps despite wrap="none"
//     --font-scale <n>                  explicit PPTX text scale (e.g. 0.92)
//     --raster                          flat-image export (not selectable)
//     --no-build                        skip the rebuild (export the current dist/)
//
// The deck is rebuilt on every run by default so the export always matches the
// current slide source; pass --no-build only when dist/ is already up to date.

import { createServer } from "node:http";
import { readFile, mkdir, writeFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve, join, extname } from "node:path";
import { chromium } from "playwright";
import { PDFDocument } from "pdf-lib";
import PptxGenJS from "pptxgenjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");

// ---- args ------------------------------------------------------------------
const args = process.argv.slice(2);
const opt = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
};
const has = (name) => args.includes(`--${name}`);

const deck = opt("deck", "main");
const format = opt("format", "both");
const outDir = resolve(root, opt("out", "export"));
const scale = Number(opt("scale", "2"));
const raster = has("raster");
// Google Slides ignores `wrap="none"` and re-wraps text to the box width. On top
// of the box padding we add for every export, `--gslides` also shrinks PPTX text
// a hair so each baked line clears the box edge with room to spare there too.
const gslides = has("gslides");
const fontScale = Number(opt("font-scale", gslides ? "0.90" : "1"));

// Slide is authored at 1920×1080. PowerPoint 16:9 is 13.333in × 7.5in, i.e.
// exactly 144 px/in on both axes, and 1 pt = 2 px.
const SLIDE_W = 1920, SLIDE_H = 1080;
const PPT_W = 13.333, PPT_H = 7.5;
const PX_PER_IN = SLIDE_W / PPT_W; // 144
const inch = (px) => px / PX_PER_IN;
const pt = (px) => px / 2;

const DECK_PATH = { main: "/", template: "/template", };
if (!(deck in DECK_PATH)) {
  console.error(`Unknown --deck "${deck}". Use one of: ${Object.keys(DECK_PATH).join(", ")}`);
  process.exit(1);
}
if (!["pdf", "pptx", "both"].includes(format)) {
  console.error(`Unknown --format "${format}". Use pdf, pptx or both.`);
  process.exit(1);
}
const wantPdf = format === "pdf" || format === "both";
const wantPptx = format === "pptx" || format === "both";

// ---- build ------------------------------------------------------------------
// Always rebuild so the export reflects the CURRENT slide source — a stale
// dist/ silently exporting old slides is exactly the trap to avoid. `--no-build`
// opts out when you know dist/ is already current (e.g. right after `npm run build`).
async function ensureBuild() {
  if (has("no-build")) {
    if (!existsSync(join(distDir, "index.html"))) {
      console.error("--no-build set but no dist/ found. Run `npm run build` first.");
      process.exit(1);
    }
    console.log("Skipping build (--no-build) — exporting the existing dist/.");
    return;
  }
  console.log("Building deck (use --no-build to skip)…");
  const r = spawnSync("npm", ["run", "build"], { cwd: root, stdio: "inherit" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

// ---- static server for dist/ (with SPA fallback) ---------------------------
const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".webp": "image/webp", ".json": "application/json",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
  ".map": "application/json", ".ico": "image/x-icon",
};

function startServer() {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");
      let filePath = join(distDir, decodeURIComponent(url.pathname));
      const ok = existsSync(filePath) && (await stat(filePath)).isFile();
      if (!ok) filePath = join(distDir, "index.html"); // SPA fallback
      const body = await readFile(filePath);
      res.writeHead(200, {
        "Content-Type": MIME[extname(filePath).toLowerCase()] ?? "application/octet-stream",
        "Cache-Control": "no-store",
      });
      res.end(body);
    } catch {
      res.writeHead(500).end("error");
    }
  });
  return new Promise((res) => {
    server.listen(0, "127.0.0.1", () => res({ server, port: server.address().port }));
  });
}

// ---- in-page settle: fonts + images ----------------------------------------
async function settle(page) {
  await page.waitForSelector("[data-slide]");
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      [...document.images].map((img) =>
        img.complete ? null : new Promise((r) => { img.onload = img.onerror = r; }),
      ),
    );
  });
}

// ---- in-page extractor: pull text runs, then hide the glyphs ---------------
// Runs in the browser. Returns every text run's geometry + style (in slide px),
// and sets the visible glyphs to transparent so the follow-up screenshot keeps
// the graphics (photos, shapes, colour blocks) but drops the text — which we
// then re-lay as native, editable PPTX text boxes.
function extractAndHideText() {
  const root = document.querySelector("[data-slide]");
  const R = root.getBoundingClientRect();
  const toHex = (c) => {
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return "000000";
    const [r, g, b] = m[1].split(",").map((n) => parseFloat(n));
    return [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
  };
  const alphaOf = (c) => {
    const m = c.match(/rgba\(([^)]+)\)/);
    return m ? parseFloat(m[1].split(",")[3]) : 1;
  };
  const runs = [];
  for (const el of root.querySelectorAll("*")) {
    // Only elements that hold their *own* text (a direct, non-whitespace text node).
    let raw = "";
    for (const n of el.childNodes) if (n.nodeType === 3) raw += n.nodeValue;
    if (!raw.trim()) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || +cs.opacity === 0) continue;
    if (alphaOf(cs.color) === 0) continue;
    const b = el.getBoundingClientRect();
    if (b.width < 1 || b.height < 1) continue;

    // Reconstruct the *rendered* line breaks so PowerPoint doesn't re-wrap the
    // text: its font metrics differ just enough from the browser's that a box
    // sized to the rendered width breaks lines in the wrong place. We walk each
    // character's client rect, start a new line whenever the vertical position
    // jumps, and honour explicit "\n" (pre-line) breaks — then emit hard
    // newlines and disable auto-wrap in the PPTX box.
    const lines = [];
    for (const node of el.childNodes) {
      if (node.nodeType !== 3 || !node.nodeValue.trim()) continue;
      const t = node.nodeValue;
      const range = document.createRange();
      let line = "", prevTop = null;
      for (let i = 0; i < t.length; i++) {
        if (t[i] === "\n") { lines.push(line); line = ""; prevTop = null; continue; }
        range.setStart(node, i); range.setEnd(node, i + 1);
        const rects = range.getClientRects();
        const top = rects.length ? Math.round(rects[rects.length - 1].top) : prevTop;
        if (prevTop !== null && top !== prevTop) { lines.push(line); line = ""; }
        line += t[i];
        prevTop = top;
      }
      lines.push(line);
    }
    // Normalise each visual line the way the browser paints it. Non-preserving
    // white-space (normal, pre-line — what the deck's <Text> uses) collapses
    // leading/trailing/duplicate spaces, so a space at a wrap boundary must not
    // survive as a stray LEADING space on the next line — that showed up in
    // PowerPoint but not the browser/PDF. pre/pre-wrap (code) keep their spaces.
    const preWs = /^(pre|pre-wrap|break-spaces)$/.test(cs.whiteSpace);
    const norm = (l) => (preWs ? l.replace(/\s+$/, "") : l.replace(/^\s+|\s+$/g, "").replace(/[ \t]+/g, " "));
    const text = lines.map(norm).join("\n").replace(/^\n+|\n+$/g, "");
    if (!text) continue;
    const lh = parseFloat(cs.lineHeight);
    const ls = parseFloat(cs.letterSpacing);
    runs.push({
      text,
      x: b.left - R.left, y: b.top - R.top, w: b.width, h: b.height,
      fontPx: parseFloat(cs.fontSize),
      weight: parseInt(cs.fontWeight, 10) || 400,
      italic: cs.fontStyle === "italic",
      color: toHex(cs.color),
      align: cs.textAlign,
      family: cs.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
      lineHeightPx: Number.isFinite(lh) ? lh : null,
      letterSpacingPx: Number.isFinite(ls) ? ls : 0,
    });
    // Hide the glyphs but keep layout + any background this element paints.
    el.style.setProperty("color", "transparent", "important");
    el.style.setProperty("text-shadow", "none", "important");
    el.style.setProperty("-webkit-text-fill-color", "transparent", "important");
  }
  return runs;
}

// ---- one page.pdf() per slide (vector, selectable text) --------------------
async function slidePdf(page) {
  return page.pdf({
    width: `${PPT_W}in`,
    height: `${PPT_H}in`,
    // Chromium prints CSS px at 96/in; the slide is 1920px (=20in), so scale it
    // down to fit the 13.333in page: 13.333×96/1920 = 96/144 = 0.6667.
    scale: (PPT_W * 96) / SLIDE_W,
    printBackground: true,
    pageRanges: "1",
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
}

// ---- capture every slide ---------------------------------------------------
async function capture() {
  const { server, port } = await startServer();
  const base = `http://127.0.0.1:${port}`;
  const deckUrl = base + (DECK_PATH[deck] === "/" ? "" : DECK_PATH[deck]);

  let browser;
  try {
    browser = await chromium.launch({ args: ["--force-color-profile=srgb"] });
  } catch (err) {
    server.close();
    console.error(
      "Could not launch Chromium. Install the browser with " +
        "`npx playwright install chromium` and try again.\n",
    );
    throw err;
  }

  try {
    const page = await browser.newPage({
      viewport: { width: SLIDE_W, height: SLIDE_H },
      deviceScaleFactor: scale,
    });

    await page.goto(`${deckUrl}?print`, { waitUntil: "networkidle" });
    const count = await page.$$eval("[data-print-slide]", (els) => els.length);
    if (!count) throw new Error(`No slides found in the "${deck}" deck at ${deckUrl}`);
    const mode = raster ? "raster (flat image)" : "editable";
    console.log(`Capturing ${count} slide${count === 1 ? "" : "s"} from the "${deck}" deck (${mode})…`);

    const slides = [];
    for (let i = 1; i <= count; i++) {
      await page.goto(`${deckUrl}?shot=${i}`, { waitUntil: "networkidle" });
      await settle(page);

      const rec = {};
      // PDF first — it needs the text still visible.
      if (wantPdf) rec.pdf = await slidePdf(page);

      if (wantPptx) {
        if (raster) {
          rec.png = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: SLIDE_W, height: SLIDE_H } });
        } else {
          rec.texts = await page.evaluate(extractAndHideText);
          // Now that glyphs are transparent, grab the graphics-only background.
          rec.bg = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: SLIDE_W, height: SLIDE_H } });
        }
      }
      slides.push(rec);
      process.stdout.write(`\r  slide ${i}/${count}`);
    }
    process.stdout.write("\n");
    return slides;
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

// ---- assemble PDF ----------------------------------------------------------
async function writePdf(slides, file) {
  const out = await PDFDocument.create();
  if (raster) {
    const W = SLIDE_W / 2, H = SLIDE_H / 2; // 960×540 pt
    for (const s of slides) {
      const png = await out.embedPng(s.png);
      out.addPage([W, H]).drawImage(png, { x: 0, y: 0, width: W, height: H });
    }
  } else {
    for (const s of slides) {
      const src = await PDFDocument.load(s.pdf);
      const [pg] = await out.copyPages(src, [0]);
      out.addPage(pg);
    }
  }
  await writeFile(file, await out.save());
  console.log(`  → ${file}`);
}

// ---- assemble PPTX ---------------------------------------------------------
const ALIGN = { left: "left", center: "center", right: "right", justify: "justify", start: "left", end: "right" };

async function writePptx(slides, file) {
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: "DECK16x9", width: PPT_W, height: PPT_H });
  pptx.layout = "DECK16x9";

  for (const s of slides) {
    const slide = pptx.addSlide();
    if (raster) {
      slide.background = { data: `data:image/png;base64,${s.png.toString("base64")}` };
      continue;
    }
    // Graphics (photos, shapes, colour blocks) as the full-bleed background…
    slide.background = { data: `data:image/png;base64,${s.bg.toString("base64")}` };
    // …then every text run as a native, editable text box on top.
    for (const t of s.texts) {
      const align = ALIGN[t.align] ?? "left";
      // Google Slides ignores `wrap="none"` and re-wraps to the box width, so a
      // box sized to the exact text width breaks the widest line. Pad the box
      // (and re-anchor per alignment so the text stays put) — the baked line
      // breaks still decide where lines actually break, in every renderer.
      const padX = Math.max(32, t.w * 0.14);
      const padY = t.fontPx * 0.4;
      const x = align === "center" ? t.x - padX / 2 : align === "right" ? t.x - padX : t.x;
      const opts = {
        x: inch(x), y: inch(t.y), w: inch(t.w + padX), h: inch(t.h + padY),
        fontSize: Number((pt(t.fontPx) * fontScale).toFixed(2)),
        bold: t.weight >= 600,
        italic: t.italic,
        color: t.color,
        align: ALIGN[t.align] ?? "left",
        fontFace: t.family,
        valign: "top",
        margin: 0,
        lineSpacingMultiple: t.lineHeightPx ? t.lineHeightPx / t.fontPx : undefined,
        charSpacing: Math.abs(pt(t.letterSpacingPx)) >= 0.1 ? pt(t.letterSpacingPx) : undefined,
        // Line breaks are baked into the text (see extractor); never let
        // PowerPoint re-wrap, or font-metric drift moves the break points.
        wrap: false,
        isTextBox: true,
      };
      slide.addText(t.text, opts);
    }
  }
  await pptx.writeFile({ fileName: file });
  console.log(`  → ${file}`);
}

// ---- main ------------------------------------------------------------------
async function main() {
  await ensureBuild();
  const slides = await capture();
  await mkdir(outDir, { recursive: true });

  const stamp = `vinta-${deck}`;
  console.log("Writing files…");
  if (wantPdf) await writePdf(slides, join(outDir, `${stamp}.pdf`));
  if (wantPptx) await writePptx(slides, join(outDir, `${stamp}.pptx`));
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
