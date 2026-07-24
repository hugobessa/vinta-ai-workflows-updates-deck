import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentType,
} from "react";
import { SLIDE_W, SLIDE_H, type DeckSlide } from "./types";

/** Renders one slide component scaled to `scale`, sized to the scaled box. */
function Stage({
  Component,
  scale,
  className = "",
}: {
  Component: ComponentType;
  scale: number;
  className?: string;
}) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden bg-white ${className}`}
      style={{ width: SLIDE_W * scale, height: SLIDE_H * scale }}
    >
      <div
        style={{
          width: SLIDE_W,
          height: SLIDE_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <Component />
      </div>
    </div>
  );
}

/** Fit scale for a viewport, leaving `margin` px of breathing room. */
function fitScale(vw: number, vh: number, margin = 0): number {
  return Math.min((vw - margin) / SLIDE_W, (vh - margin) / SLIDE_H);
}

export interface DeckProps {
  slides: DeckSlide[];
}

/**
 * The slideshow runtime. Renders one slide at a time, scaled to fit, with:
 * keyboard nav (← → Space PageUp/Dn Home End, digits+Enter to jump), `f`
 * fullscreen, `o` overview grid, `#/N` URL-hash deep-linking, a progress HUD,
 * and touch-swipe. Append `?print` to the URL to stack every slide for export.
 */
export function Deck({ slides }: DeckProps) {
  const count = slides.length;
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const isPrint = params.has("print");
  const soloParam = params.get("solo");
  const solo = soloParam == null ? null : clamp(parseInt(soloParam, 10) - 1, 0, slides.length - 1);
  const shotParam = params.get("shot");
  const shot = shotParam == null ? null : clamp(parseInt(shotParam, 10) - 1, 0, slides.length - 1);

  const [idx, setIdx] = useState(() => hashIndex(count));
  const [overview, setOverview] = useState(false);
  const [scale, setScale] = useState(0.5);
  const [jump, setJump] = useState("");

  const go = useCallback(
    (n: number) => setIdx((i) => clamp(typeof n === "number" ? n : i, 0, count - 1)),
    [count],
  );
  const next = useCallback(() => setIdx((i) => clamp(i + 1, 0, count - 1)), [count]);
  const prev = useCallback(() => setIdx((i) => clamp(i - 1, 0, count - 1)), [count]);

  // Fit the active slide to the window (single-slide mode).
  useLayoutEffect(() => {
    if (isPrint) return;
    const fit = () => setScale(fitScale(window.innerWidth, window.innerHeight, 0));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [isPrint]);

  // Keep the URL hash in sync (deep links + reload position).
  useEffect(() => {
    if (isPrint || solo != null || shot != null) return;
    history.replaceState(null, "", `#/${idx + 1}`);
  }, [idx, isPrint, solo]);

  // Toggle a body class so print mode can scroll.
  useEffect(() => {
    document.body.classList.toggle("deck-print", isPrint);
  }, [isPrint]);

  // Keyboard controls.
  useEffect(() => {
    if (isPrint || solo != null || shot != null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          next(); e.preventDefault(); break;
        case "ArrowLeft":
        case "PageUp":
          prev(); e.preventDefault(); break;
        case "Home": go(0); break;
        case "End": go(count - 1); break;
        case "o": case "O": setOverview((v) => !v); break;
        case "Escape": setOverview(false); break;
        case "f": case "F":
          if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
          else document.exitFullscreen?.();
          break;
        default:
          if (/^[0-9]$/.test(e.key)) setJump((j) => (j + e.key).slice(-3));
          else if (e.key === "Enter" && jump) { go(parseInt(jump, 10) - 1); setJump(""); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isPrint, next, prev, go, count, jump]);

  // React to manual hash edits / browser back-forward.
  useEffect(() => {
    if (isPrint || solo != null || shot != null) return;
    const onHash = () => setIdx(hashIndex(count));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [isPrint, count]);

  // Touch swipe.
  const touchX = useRef<number | null>(null);
  useEffect(() => {
    if (isPrint || solo != null || shot != null) return;
    const start = (e: TouchEvent) => (touchX.current = e.touches[0].clientX);
    const end = (e: TouchEvent) => {
      if (touchX.current == null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      if (Math.abs(dx) > 60) (dx < 0 ? next : prev)();
      touchX.current = null;
    };
    window.addEventListener("touchstart", start);
    window.addEventListener("touchend", end);
    return () => {
      window.removeEventListener("touchstart", start);
      window.removeEventListener("touchend", end);
    };
  }, [isPrint, next, prev]);

  if (count === 0) return <div className="p-10 text-white">No slides found.</div>;

  // ---- Shot: one slide at native 1920x1080 from the origin (pixel capture) ----
  if (shot != null) {
    const Comp = slides[shot].Component;
    return (
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <Comp />
      </div>
    );
  }

  // ---- Solo: one chromeless slide, scaled to fit (for screenshots) ----
  if (solo != null) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#1a1a1c]">
        <Stage Component={slides[solo].Component} scale={scale} />
      </div>
    );
  }

  // ---- Print / export: every slide stacked vertically ----
  if (isPrint) {
    const w = Math.min(1600, window.innerWidth - 48);
    const s = w / SLIDE_W;
    return (
      <div className="flex flex-col items-center gap-9 py-10">
        {slides.map((sl, i) => (
          <div key={sl.id} data-print-slide={i + 1}>
            <Stage Component={sl.Component} scale={s} className="shadow-2xl" />
          </div>
        ))}
      </div>
    );
  }

  // ---- Overview grid ----
  if (overview) {
    return (
      <OverviewGrid
        slides={slides}
        active={idx}
        onPick={(i) => { go(i); setOverview(false); }}
      />
    );
  }

  // ---- Single slide ----
  const cur = slides[idx];
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1a1a1c]">
      <Stage Component={cur.Component} scale={scale} className="shadow-2xl" />
      <Hud
        idx={idx}
        count={count}
        title={cur.title}
        jump={jump}
        onPrev={prev}
        onNext={next}
        onOverview={() => setOverview(true)}
      />
    </div>
  );
}

function OverviewGrid({
  slides,
  active,
  onPick,
}: {
  slides: DeckSlide[];
  active: number;
  onPick: (i: number) => void;
}) {
  const thumbW = 320;
  const s = thumbW / SLIDE_W;
  return (
    <div className="fixed inset-0 overflow-auto bg-[#1a1a1c] p-8">
      <div className="mb-6 font-mono text-sm text-white/60">
        {slides.length} slides · press <kbd>O</kbd> or <kbd>Esc</kbd> to close
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,320px)] gap-5">
        {slides.map((sl, i) => (
          <button
            key={sl.id}
            onClick={() => onPick(i)}
            className={`group text-left outline-none ${
              i === active ? "ring-2 ring-vinta-blue" : ""
            }`}
          >
            <Stage Component={sl.Component} scale={s} className="rounded shadow-lg transition group-hover:brightness-105" />
            <div className="mt-1.5 truncate font-mono text-xs text-white/55">
              {String(i + 1).padStart(2, "0")} · {sl.title ?? sl.id}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function Hud({
  idx,
  count,
  title,
  jump,
  onPrev,
  onNext,
  onOverview,
}: {
  idx: number;
  count: number;
  title?: string;
  jump: string;
  onPrev: () => void;
  onNext: () => void;
  onOverview: () => void;
}) {
  return (
    <div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/70 px-3 py-1.5 font-mono text-[13px] text-white backdrop-blur">
      <button className="px-2 py-0.5 hover:text-vinta-blue-soft" onClick={onPrev} aria-label="Previous">‹</button>
      <span className="tabular-nums">{jump || idx + 1} / {count}</span>
      <button className="px-2 py-0.5 hover:text-vinta-blue-soft" onClick={onNext} aria-label="Next">›</button>
      <span className="mx-1 h-4 w-px bg-white/25" />
      <button className="px-2 py-0.5 hover:text-vinta-blue-soft" onClick={onOverview} aria-label="Overview" title="Overview (O)">⊞</button>
      {title && <span className="ml-1 hidden max-w-[280px] truncate text-white/55 sm:inline">{title}</span>}
    </div>
  );
}

function clamp(n: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, n));
}

function hashIndex(count: number): number {
  const m = window.location.hash.match(/^#\/(\d+)$/);
  if (!m) return 0;
  return clamp(parseInt(m[1], 10) - 1, 0, count - 1);
}
