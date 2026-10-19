# Al-un.fr — Architecture

This document defines the framework, tooling, project structure, and conventions for the personal website specified in [`docs/specs/README.md`](../specs/README.md).

---

## Framework

**Astro** with the **Vue** integration (`@astrojs/vue`).

| Concern | Choice | Rationale |
|---|---|---|
| Static site generator | Astro | Static-first by default; built-in content collections with schema validation; native markdown support; islands architecture keeps JS payload minimal |
| UI components | Vue 3 (SFC) | Author's primary framework; used only for interactive islands (theme switcher, karaoke filtering, navigation) |
| Language | TypeScript | Strict mode; used in Astro pages, Vue components, and content schemas |
| Styling | CSS custom properties + scoped styles | No runtime CSS-in-JS; theming via custom properties; each component owns its styles via `<style scoped>` (Vue) or `<style>` (Astro) |
| Content | Astro Content Collections | Type-safe markdown with Zod schema validation; build fails on invalid content — fulfils the spec requirement |

### Why Astro over alternatives

- **Nuxt:** adds SSR complexity and a heavier runtime; Astro's static output is simpler and more portable
- **VitePress:** optimised for documentation, not multi-app personal sites; limited layout flexibility
- **Plain Vite + Vue:** no built-in content collections or markdown pipeline; would require significant custom tooling
- **Eleventy / Hugo:** no native Vue integration; interactive islands would require a separate build pipeline and manual hydration wiring

---

## Project Structure

```
/
├── docs/                          # Specifications and architecture (this file)
│   ├── specs/
│   └── architecture/
├── public/                        # Static assets served as-is
│   └── games/                     # Game builds (one folder per game)
│       └── <game-name>/           # Entry point must be game.html (see note below)
│           └── game.html
├── src/
│   ├── assets/                    # Processed assets (images, fonts)
│   ├── components/                # Shared Vue/Astro components
│   │   ├── design-system/         # Design system primitives
│   │   └── layout/                # Header, footer, navigation
│   ├── composables/               # Vue composables (e.g. useTheme)
│   ├── content/                   # Astro content collections
│   │   ├── blog/                  # Blog posts (markdown)
│   │   ├── experience/            # Work experience (YAML)
│   │   ├── games/                 # Game metadata (YAML)
│   │   ├── karaoke/               # Song data (YAML)
│   │   └── writing/               # Books and chapters (markdown)
│   ├── layouts/                   # Astro layouts
│   │   ├── Base.astro             # HTML shell, theme init, meta tags
│   │   ├── Default.astro          # Common layout with navigation + simple footer
│   │   └── Bare.astro             # No layout (standalone games)
│   ├── pages/                     # File-based routing
│   │   ├── index.astro            # Landing page
│   │   ├── 404.astro              # Not found page
│   │   ├── blog/
│   │   ├── games/
│   │   ├── writing/
│   │   └── karaoke.astro
│   ├── styles/                    # Global styles and theme definitions
│   │   ├── global.css             # Reset, base typography
│   │   └── themes/                # Theme CSS custom property sets
│   └── content.config.ts          # Content collection schemas (Zod)
├── astro.config.ts
├── tsconfig.json
└── package.json
```

### Path alias

A single `@/` alias maps to `src/`, configured in `tsconfig.json`. All imports use `@/` instead of deep relative paths:

```ts
import Default from "@/layouts/Default.astro";
import { useTheme } from "@/composables/useTheme";
```

### Game asset naming

Game builds live in `public/games/<game-name>/`. The entry point **must** be named `game.html`, not `index.html`. Astro generates `/games/<game-name>/index.html` for the game page route — a `public/games/<game-name>/index.html` file would conflict with it and be silently skipped.

---

## Content Collections

All content is managed via [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/). Schemas are defined in `src/content.config.ts` using Zod. The build fails automatically if any entry violates its schema.

### Blog (`src/content/blog/`)

One markdown file per post, organised in `<year>/<month>/` subfolders to avoid an overloaded flat directory as posts accumulate. Filename format: `<post-title>.md` where `<post-title>` is the kebab-case slug used in the URL.

```
src/content/blog/
├── 2025/
│   ├── 01/
│   │   └── hello-world.md
│   └── 03/
│       └── vue-3-migration-notes.md
└── 2026/
    └── ...
```

The folder structure mirrors the URL pattern (`/blog/<year>/<month>/<slug>`).

**Frontmatter schema:**

```yaml
---
title: "Hello World"
date: 2025-01-15
status: released       # "draft" | "released"
tags:                  # optional
  - vue
  - typescript
---
```

The filename is the URL slug. The `title` field is the display title. Draft posts (`status: draft`) are built (the URL exists) but excluded from all listings — they are accessible only by direct URL.

URL derivation: `/blog/<year>/<month>/<filename>` — year and month come from `date`.

Pagination: the blog list uses Astro's built-in `paginate()` in `getStaticPaths`. Pages beyond the first are served at `/blog/2/`, `/blog/3/`, etc. (no conflict with post routes since `<year>` is always 4 digits). Navigation includes prev/next links.

### Experience (`src/content/experience/`)

A single YAML file containing work experience entries, used on the landing page. Maintained as content so it can be updated without touching page code.

```
src/content/experience/
└── experience.yaml
```

**Schema (per entry):**

```yaml
- id: company-a
  company: "Company A"
  roles:
    - title: "Senior Developer"
      period: "2022 – present"
      description: "Description"
    - title: "Developer"
      period: "2020 – 2022"
      description: "Description"
      location: Somewhere
```

### Games (`src/content/games/`)

One YAML file per game. No markdown body — metadata only.

```
src/content/games/
├── pixel-adventure.yaml
└── ...
```

**Schema:**

```yaml
name: "Pixel Adventure"
description: "A short platformer built in Godot."   # optional
thumbnail: "./pixel-adventure.png"                   # optional, relative to assets
mode: standalone                                     # "standalone" | "embedded" | "web-native"
path: "/games/pixel-adventure"                       # path to the static assets in public/
```

The filename is the URL slug.

### Writing (`src/content/writing/`)

One folder per book. Each folder contains a `book.yaml` metadata file and one markdown file per chapter.

```
src/content/writing/
├── learning-japanese/
│   ├── book.yaml
│   ├── 01-hiragana.md
│   ├── 02-katakana.md
│   └── ...
└── ...
```

**Book metadata (`book.yaml`):**

```yaml
title: "Learning Japanese"
description: "Notes from self-studying Japanese."
status: in-progress    # "draft" | "in-progress" | "released"
chapters:              # ordered list — defines table of contents and reading order
  - 01-hiragana
  - 02-katakana
```

**Chapter frontmatter:**

```yaml
---
title: "Hiragana"
---
```

The folder name is the `<book-name>` slug. The chapter filename (without `.md`) is the `<chapter-name>` slug. Chapter order is defined by the `chapters` list in `book.yaml`, not by filename sort order.

This nested structure is implemented as **two separate content collections**:
- `writing-books` — glob pattern `*/book.yaml`, yields book metadata
- `writing-chapters` — glob pattern `*/*.md`, yields chapter content

Pages derive the book slug from the folder name in the entry's file path.

### Karaoke (`src/content/karaoke/`)

A single YAML file containing all songs. YAML is chosen for its readability and ease of editing on mobile via the GitHub app.

```
src/content/karaoke/
└── songs.yaml
```

**Schema (per entry):**

```yaml
- id: zankoku-na-tenshi-no-thesis
  title: "残酷な天使のテーゼ"
  author: "高橋洋子"
  reading: "ざんこくなてんしのてーぜ"    # hiragana reading — used for sort order
  tags:
    - anime
    - evangelion

- id: bohemian-rhapsody
  title: "Bohemian Rhapsody"
  author: "Queen"
  tags:
    - rock
    - classic
```

Each entry requires an `id` field (kebab-case, unique) — the `file()` loader uses it as the entry key. The `reading` field is required for Japanese titles (hiragana transcription for sort order) and omitted for Latin-alphabet titles. Sorting logic: entries with `reading` sort first (by `reading`, hiragana order), then entries without `reading` (by `title`, alphabetically).

### Content collection entry IDs

The glob and file loaders generate entry IDs from file paths. Pages depend on these IDs for routing — the format per collection is:

| Collection | ID format | Example |
|---|---|---|
| `blog` | `<year>/<month>/<slug>.md` | `2025/01/hello-world.md` |
| `experience` | `experience.yaml` entry `id` field | `company-a` |
| `games` | `<slug>.yaml` | `pixel-adventure.yaml` |
| `karaoke` | entry `id` field | `bohemian-rhapsody` |
| `writing-books` | `<book>/book.yaml` | `learning-japanese/book.yaml` |
| `writing-chapters` | `<book>/<chapter>.md` | `learning-japanese/01-hiragana.md` |

---

## Routing

Astro's file-based routing handles all URL patterns from the spec. Dynamic routes use `getStaticPaths()`.

| URL pattern | Page file | Notes |
|---|---|---|
| `/` | `src/pages/index.astro` | Landing page (SPA sections via anchors) |
| `/blog`, `/blog/2/`, ... | `src/pages/blog/[...page].astro` | Paginated post list (Astro `paginate()`) |
| `/blog/<year>/<month>/<slug>` | `src/pages/blog/[year]/[month]/[slug].astro` | Individual blog post |
| `/games` | `src/pages/games/index.astro` | Games listing |
| `/games/<name>` | `src/pages/games/[name].astro` | Game page (layout depends on `mode`) |
| `/writing` | `src/pages/writing/index.astro` | Book listing |
| `/writing/<book>` | `src/pages/writing/[book]/index.astro` | Book landing with TOC |
| `/writing/<book>/<chapter>` | `src/pages/writing/[book]/[chapter].astro` | Chapter page |
| `/karaoke` | `src/pages/karaoke.astro` | Single-page song list |
| 404 | `src/pages/404.astro` | Not found page |

### Layout assignment

- **Base layout** (`Base.astro`): shared HTML boilerplate (`<html>`, `<head>`, theme initialisation script). Default and Bare compose it via Astro's `<slot />`.
- **Default layout** (`Default.astro`): wraps Base. Adds header with navigation and a simple copyright footer. The `<body>` uses flexbox with `min-height: 100dvh` so the footer stays at the bottom on short pages.
- **Bare layout** (`Bare.astro`): wraps Base. HTML shell only — no site chrome. Used for standalone-mode games.

The landing page (`index.astro`) uses Default but replaces the simple footer with a rich footer listing technologies, deployment platform, and a link to the GitHub repository.

### Responsive design and sticky header

A single `640px` breakpoint is used consistently across all responsive styles — plain `@media` queries, no CSS framework. The header is sticky with a full/compact mode transition on scroll. See `src/components/layout/Header.astro` for implementation.

---

## Design System

The design system is a set of Astro and Vue components in `src/components/design-system/`, plus CSS custom properties for theming. No external component library.

**Scope:** typography primitives, buttons, links, cards, tags/badges, and layout utilities. Components use `<style scoped>` and consume theme tokens via CSS custom properties only — no direct color values.

**Dependency rule:** only the design system layer may introduce styling dependencies (if any). Application components and page code must not import styling libraries directly.

---

## Theming

Four themes: **System**, **Light**, **Dark**, **Terminal**.

### Implementation

1. **CSS custom properties** define all theme tokens (colors, font family, border radius, border color) under a `[data-theme]` attribute on `<html>`. Each theme has its own file in `src/styles/themes/` (e.g. `light.css`, `dark.css`, `terminal.css`). These are loaded via `@import` in `src/styles/global.css`, which is imported in `Base.astro` as a global style:

   ```css
   [data-theme="light"] {
     --color-bg: #ffffff;
     --color-text: #1a1a1a;
     --font-family: system-ui, sans-serif;
     /* ... */
   }

   [data-theme="terminal"] {
     --color-bg: #0d1117;
     --color-text: #00ff41;
     --font-family: "JetBrains Mono", monospace;
     /* ... */
   }
   ```

2. **System theme** maps to `light` or `dark` based on `prefers-color-scheme`, via a small inline script in `<head>` (before first paint to avoid flash).

3. **Persistence:** the selected theme key is stored in `localStorage` under a key like `theme`. On load, the inline script reads it and sets `data-theme` before the page renders.

4. **Theme switcher:** a Vue island component, placed in the site header, that updates `data-theme` and `localStorage`.

### Inline initialisation script (in `Base.astro`)

A blocking `<script>` in `<head>` — not a module — that:
1. Reads the stored theme from `localStorage`
2. If `"system"` or absent, resolves to `"light"` or `"dark"` via `matchMedia("(prefers-color-scheme: dark)")`
3. Sets `document.documentElement.dataset.theme` immediately

This prevents a flash of unstyled/wrong-themed content.

---

## Interactive Islands

Most of the site is static HTML. Vue components are loaded as Astro islands (`client:load` or `client:visible`) only where interactivity is needed:

| Component | Hydration | Props | Purpose |
|---|---|---|---|
| Theme switcher | `client:load` | (none) | Must be interactive immediately |
| Karaoke filter/search | `client:load` | `songs: Song[]` (sorted) | Core functionality of the page |
| Chapter navigation (writing) | `client:visible` | `bookSlug`, `chapters: {slug, title}[]`, `currentSlug` | Collapsible panel, not above the fold |

Static content (blog posts, landing page sections, game listings) does not hydrate Vue — it renders as plain Astro/HTML.

---

## Build and Deployment

| Concern | Decision |
|---|---|
| Build command | `astro build` |
| Output | `dist/` — static HTML, CSS, JS, assets |
| Hosting | Render (or any static host); output is portable |
| Content validation | Zod schemas in content collections; build fails on schema violations |
| TypeScript | Strict mode (`"strict": true`); Astro's built-in TS support |

### Key dependencies

| Package | Purpose |
|---|---|
| `astro` | Framework |
| `@astrojs/vue` | Vue integration |
| `vue` | UI components for interactive islands |

Dependencies use semver ranges; `package-lock.json` is committed for reproducible builds. Additional dependencies should be added only when they clearly reduce maintenance burden. Prefer Astro built-ins and web platform APIs over third-party packages.
