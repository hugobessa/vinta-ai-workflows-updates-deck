# Vinta 2023 — slide-deck library

The official *Vinta 2023* presentation template, migrated from a static HTML mock into a
**reusable React + Tailwind component library** and a **controllable slideshow**. Authoring a new
slide is composing a handful of documented components — easy to generate with AI.

This app lives in `vinta-react-deck-template/` at the repo root; the legacy static deck and the
original source material stay in the parent directory.

```bash
cd vinta-react-deck-template
npm install
npm run dev      # http://localhost:5173  → your deck
```

### Three decks (by URL)
| URL | Deck | Folder |
|---|---|---|
| `/` | **Your main slides** — build your presentation here | `src/slides/` |
| `/template` | The 50 official Vinta template slides (reference/starter) | `src/template/` |

- **`src/lib/`** — the UI library (single entrypoint `@/lib`): `Deck`, `Slide`, `Place`, typography,
  shapes, `Photo`, `CodeBlock`, layout and content blocks. Fully typed with JSDoc.
- **[AUTHORING.md](AUTHORING.md)** — the guide: add-a-slide workflow, component catalog, tokens, recipes.
- **[.agents/skills/create-deck/SKILL.md](.agents/skills/create-deck/SKILL.md)** — the agent brief for
  generating on-brand slides (workflow + brand rules). One canonical file, symlinked into each AI tool's
  expected path (see below).

#### AI agent instructions (single source, many tools)
The brief above is an [Agent Skill](https://agentsmd.net/) authored **once** at the vendor-neutral
`.agents/skills/create-deck/SKILL.md`, and each tool reads it from its expected path:

| Tool | Path it reads | Kind |
|---|---|---|
| **Cursor**, **GitHub Copilot** | `.agents/skills/create-deck/SKILL.md` | canonical file (read natively) |
| **Claude Code** | `.claude/skills/create-deck/SKILL.md` | → symlink to canonical |
| **OpenAI Codex** | `.codex/skills/create-deck/SKILL.md` | → symlink to canonical |

Edit only `.agents/skills/create-deck/SKILL.md`; the other two are symlinks, so there's nothing to keep
in sync. (Symlinks need `git config core.symlinks true` on Windows checkouts.)

**Controls:** `←/→`/`Space` navigate · `o` overview · `f` fullscreen · number + `Enter` to jump ·
`#/N` deep-links a slide within the current deck.

### Self-contained
The app bundles its own copies of the shapes, photos and logo under `public/`, so it runs with no
external dependencies. `src/template/` (the 50-slide reference deck) is now hand-owned source — the
one-time script that first generated it from the original Figma export has been retired.
