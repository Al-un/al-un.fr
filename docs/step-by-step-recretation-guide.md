# Al-un.fr — Step-by-Step Recreation Guide

This guide allows an agent to recreate the personal website from scratch using only this file plus the two companion documents:

- `specifications.md` — product requirements
- `architecture.md` — framework choices, project structure, content schemas

Follow each step in order. Every step produces files that later steps depend on.

---

## Prerequisites

- Node.js (LTS)
- npm

---

## Step 1 — Scaffold the Astro project

Create a new directory and initialise the project manually (no `create astro` wizard).

### 1.1 `package.json`

```json
{
  "name": "al-un-fr",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/vue": "^7.0.3",
    "astro": "^7.3.8",
    "vue": "^3.5.43"
  }
}
```

### 1.2 `astro.config.ts`

```ts
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";

export default defineConfig({
  integrations: [vue()],
});
```

### 1.3 `tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### 1.4 `.gitignore`

```
node_modules
dist
.astro
*.log
```

### 1.5 Install dependencies

```bash
npm install
```

---

## Step 2 — Theme CSS custom properties

All components consume colours and typography through CSS custom properties set on `[data-theme]`. Create three theme files, one per non-system theme. The "system" theme resolves to light or dark at runtime.

Every theme must define exactly these 13 tokens:

```
--color-bg, --color-text, --color-heading,
--color-link, --color-link-hover,
--color-border, --color-code-bg, --color-card-bg,
--color-muted, --color-tag-bg, --color-tag-text,
--font-family, --border-radius
```

### 2.1 `src/styles/themes/light.css`

```css
[data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-heading: #111111;
  --color-link: #2563eb;
  --color-link-hover: #1d4ed8;
  --color-border: #e5e7eb;
  --color-code-bg: #f3f4f6;
  --color-card-bg: #f9fafb;
  --color-muted: #6b7280;
  --color-tag-bg: #e5e7eb;
  --color-tag-text: #374151;
  --font-family: system-ui, -apple-system, sans-serif;
  --border-radius: 0.375rem;
}
```

### 2.2 `src/styles/themes/dark.css`

```css
[data-theme="dark"] {
  --color-bg: #0f172a;
  --color-text: #e2e8f0;
  --color-heading: #f1f5f9;
  --color-link: #60a5fa;
  --color-link-hover: #93bbfd;
  --color-border: #334155;
  --color-code-bg: #1e293b;
  --color-card-bg: #1e293b;
  --color-muted: #94a3b8;
  --color-tag-bg: #334155;
  --color-tag-text: #cbd5e1;
  --font-family: system-ui, -apple-system, sans-serif;
  --border-radius: 0.375rem;
}
```

### 2.3 `src/styles/themes/terminal.css`

```css
[data-theme="terminal"] {
  --color-bg: #0d1117;
  --color-text: #00ff41;
  --color-heading: #00ff41;
  --color-link: #58a6ff;
  --color-link-hover: #79c0ff;
  --color-border: #30363d;
  --color-code-bg: #161b22;
  --color-card-bg: #161b22;
  --color-muted: #8b949e;
  --color-tag-bg: #1f2937;
  --color-tag-text: #00ff41;
  --font-family: "JetBrains Mono", ui-monospace, monospace;
  --border-radius: 0;
}
```

### 2.4 `src/styles/global.css`

Imports the three theme files, then defines a CSS reset and base typography. All values reference theme tokens — no hardcoded colours.

Key rules:

- `*` — `box-sizing: border-box; margin: 0; padding: 0`
- `html` — `font-family: var(--font-family); background-color: var(--color-bg); color: var(--color-text); line-height: 1.6`
- `body` — `min-height: 100dvh`
- `a` — `color: var(--color-link); text-decoration: none` / underline on hover
- `h1–h4` — `color: var(--color-heading); line-height: 1.3`. Sizes: h1=2rem, h2=1.5rem, h3=1.25rem
- `code` — `font-family: "JetBrains Mono", ui-monospace, monospace; font-size: 0.9em; background: var(--color-code-bg); padding: 0.15em 0.3em; border-radius: var(--border-radius)`. Inside `pre`, strip background and padding
- `pre` — `background: var(--color-code-bg); padding: 1rem; border-radius: var(--border-radius); overflow-x: auto`
- `img` — `max-width: 100%; height: auto`
- `hr` — `border: none; border-top: 1px solid var(--color-border); margin: 2rem 0`
- **Responsive (max-width: 640px)**: h1→1.5rem, h2→1.25rem, h3→1.1rem, pre padding→0.75rem at 0.85em

---

## Step 3 — Layouts

Three layouts forming a composition chain: `Base` → `Default` / `Bare`.

### 3.1 `src/layouts/Base.astro`

The HTML shell. Props: `title: string`, `description?: string` (default: "Personal website of a software engineer").

Produces:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description} />
    <title>{title} — al-un.fr</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <!-- BLOCKING inline script (is:inline, not a module) -->
  </head>
  <body>
    <slot />
  </body>
</html>
```

**Critical: the inline theme-init script.** It must run before first paint to prevent FOUC. Logic:

1. Read `localStorage.getItem("theme")`
2. If absent or `"system"`, resolve via `window.matchMedia("(prefers-color-scheme: dark)").matches` → `"dark"` or `"light"`
3. Set `document.documentElement.dataset.theme = resolved`

Import `global.css` via `<style is:global>@import "../styles/global.css";</style>`.

### 3.2 `src/layouts/Default.astro`

Wraps Base. Adds Header component, a `<main class="content">` with `<slot />`, and a `<footer>` with a named slot `"footer"` (default content: `© {year} al-un.fr`).

Scoped styles:

- `.page` — flex column, `min-height: 100dvh`
- `.content` — `max-width: 48rem`, centered, `padding: 2rem 1rem`, `flex: 1`, `width: 100%`
- `.site-footer` — `border-top: 1px solid var(--color-border)`, centered, muted, 0.85rem
- At 640px: content padding reduces to `1rem 0.75rem`

### 3.3 `src/layouts/Bare.astro`

Wraps Base. Just a `<slot />`. No header, no footer. Used for standalone game pages.

---

## Step 4 — Header component with sticky/compact/mobile behaviour

### 4.1 `src/components/layout/Header.astro`

**Server-side (frontmatter):**

- Define `navLinks` array: Home(`/`), Blog(`/blog`), Games(`/games`), Writing(`/writing`), Karaoke(`/karaoke`)
- Get `currentPath` from `Astro.url.pathname`
- Import and render `ThemeSwitcher` (Vue) with `client:load`

**Template structure:**

```html
<header class="site-header" id="site-header">
  <nav class="nav">
    <a href="/" class="nav-brand">al-un.fr</a>
    <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false" id="nav-toggle">
      <span class="nav-toggle-bar"></span>
      <span class="nav-toggle-bar"></span>
      <span class="nav-toggle-bar"></span>
    </button>
    <ul class="nav-links" id="nav-links">
      {navLinks.map → <li><a class:list={["nav-link", { active }]}> ...}
    </ul>
    <ThemeSwitcher client:load />
  </nav>
</header>
```

Active link logic: exact match for `/`, `startsWith` for everything else.

**Client-side `<script>` (standard Astro script, not `is:inline`):**

1. **Compact mode**: scroll listener (passive). When `scrollY > innerHeight`, set `header.dataset.compact = "true"`, else `"false"`.
2. **Hamburger toggle**: on click, flip `aria-expanded` and set `links.dataset.open`.

**Scoped styles (these are critical for the spec):**

- `.site-header` — `position: sticky; top: 0; z-index: 100; background: var(--color-bg); border-bottom: 1px solid var(--color-border); transition: padding 0.2s ease`
- `.nav` — `max-width: 48rem; margin: 0 auto; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; transition: padding 0.2s ease, gap 0.2s ease`
- `.nav-brand` — bold, 1.1rem, `var(--color-heading)`, with font-size transition
- `.nav-links` — `display: flex; list-style: none; gap: 1rem; flex: 1; transition: gap 0.2s ease`
- `.nav-link` — `color: var(--color-muted); font-size: 0.9rem` with font-size transition. `.active` state: `var(--color-text)`, font-weight 600
- `.nav-toggle` — `display: none` on desktop
- `.nav-toggle-bar` — `width: 20px; height: 2px; background: var(--color-text); border-radius: 1px` with transform/opacity transitions

**Compact mode** (`[data-compact="true"]`):

- `.nav` padding → `0.4rem 1rem`, gap → `1rem`
- `.nav-brand` font-size → `0.95rem`
- `.nav-links` gap → `0.75rem`
- `.nav-link` font-size → `0.8rem`

**Mobile (max-width: 640px):**

- `.nav-toggle` → `display: flex; margin-left: auto`
- `.nav-links` → `display: none; flex-basis: 100%; flex-direction: column; gap: 0.25rem; padding: 0.5rem 0`
- `.nav-links[data-open="true"]` → `display: flex`
- `.nav-link` → `padding: 0.4rem 0`
- Hamburger → X animation:
  - Bar 1: `translateY(6px) rotate(45deg)` when `aria-expanded="true"`
  - Bar 2: `opacity: 0`
  - Bar 3: `translateY(-6px) rotate(-45deg)`
- Compact on mobile: `.nav` padding → `0.3rem 0.75rem`

---

## Step 5 — Vue composable and components

### 5.1 `src/composables/useTheme.ts`

```ts
type ThemeKey = "system" | "light" | "dark" | "terminal";
```

- `STORAGE_KEY = "theme"`, `THEMES` array of all four keys
- `resolveTheme(key)`: if `"system"`, use `matchMedia` to return `"light"` or `"dark"`, else return key
- `useTheme()` returns `{ current, themes, apply, cycle }`:
  - `current` — `ref<ThemeKey>("system")`
  - `apply(key)` — sets ref, writes to localStorage, sets `document.documentElement.dataset.theme`
  - `cycle()` — advances to next in THEMES array (wraps around)
  - `onMounted` — reads localStorage, validates against THEMES array

### 5.2 `src/components/ThemeSwitcher.vue`

A `<select>` dropdown. Uses `useTheme`. On change, calls `apply()`. Options are capitalised theme names. Scoped styles: 0.85rem font, themed border/bg/text.

### 5.3 `src/components/KaraokeFilter.vue`

Props: `songs: Song[]` (where Song = `{ title, author, reading?, tags }`).

- `query` ref bound to search input
- `filtered` computed: if no query, return all songs; else case-insensitive `includes` match on title, author, reading, and tags
- Template: sticky search input → result count → song list (each song: bold title, muted author, tag pills)
- Styles: `.search-input` is `position: sticky; top: 0; z-index: 10`. Song items are flex-wrap rows with bottom border. Tags use `--color-tag-bg`/`--color-tag-text`, 0.75rem font

### 5.4 `src/components/ChapterNav.vue`

Props: `bookSlug: string`, `chapters: { slug, title }[]`, `currentSlug: string`.

- `open` ref (starts `false`)
- Template: bordered panel with toggle button (`▸`/`▾ Chapters`), conditionally visible chapter list via `v-show`
- Active chapter: bold, `--color-card-bg` background
- Links point to `/writing/{bookSlug}/{ch.slug}`

---

## Step 6 — Content collection schemas

### 6.1 `src/content.config.ts`

Define six collections using `defineCollection`, `z` (from `astro:content`), and `glob`/`file` (from `astro/loaders`):

| Collection | Loader | Schema |
|---|---|---|
| `blog` | `glob({ pattern: "**/*.md", base: "src/content/blog" })` | `title: string`, `date: coerce.date()`, `status: enum(["draft","released"])`, `tags: array(string).optional()` |
| `games` | `glob({ pattern: "*.yaml", base: "src/content/games" })` | `name: string`, `description: string.optional()`, `thumbnail: string.optional()`, `mode: enum(["standalone","embedded","web-native"])`, `path: string` |
| `experience` | `file("src/content/experience/experience.yaml")` | `company: string`, `roles: array({ title: string, period: string })` |
| `karaoke` | `file("src/content/karaoke/songs.yaml")` | `title: string`, `author: string`, `reading: string.optional()`, `tags: array(string).default([])` |
| `writing-books` | `glob({ pattern: "*/book.yaml", base: "src/content/writing" })` | `title: string`, `description: string`, `status: enum(["draft","in-progress","released"])`, `chapters: array(string)` |
| `writing-chapters` | `glob({ pattern: "*/*.md", base: "src/content/writing" })` | `title: string` |

Export as `collections` object. The keys must be exactly: `blog`, `experience`, `games`, `karaoke`, `writing-books`, `writing-chapters`.

---

## Step 7 — Content data

Create sample content. The site must have at least one entry per collection to validate the full build.

### 7.1 `src/content/experience/experience.yaml`

A YAML array of objects. Each has `id`, `company`, and `roles` (array of `{ title, period }`). The `id` field is required by the `file()` loader as the entry key.

### 7.2 `src/content/karaoke/songs.yaml`

A YAML array of song objects. Each has `id` (kebab-case, unique — required by `file()` loader), `title`, `author`, `tags`. Japanese songs additionally have `reading` (hiragana).

### 7.3 `src/content/games/*.yaml`

One file per game. Fields: `name`, `description` (optional), `thumbnail` (optional), `mode` (`"standalone"` | `"embedded"` | `"web-native"`), `path` (e.g. `"/games/pixel-adventure"`).

For each game, create `public/games/<game-name>/game.html` as a placeholder. The entry point **must** be `game.html`, not `index.html` (Astro route conflict).

### 7.4 `src/content/blog/<year>/<month>/<slug>.md`

Markdown files organised in year/month subfolders. Frontmatter: `title`, `date` (YYYY-MM-DD), `status` (`"draft"` or `"released"`), `tags` (optional string array). The filename (without `.md`) becomes the URL slug.

### 7.5 `src/content/writing/<book-name>/book.yaml`

Each book folder has a `book.yaml` with: `title`, `description`, `status` (`"draft"` | `"in-progress"` | `"released"`), `chapters` (ordered array of chapter slugs without `.md`).

### 7.6 `src/content/writing/<book-name>/<chapter>.md`

One file per chapter. Frontmatter: just `title`. The filename (without `.md`) must match the slug listed in `book.yaml`'s `chapters` array.

---

## Step 8 — Pages

### 8.1 Landing page — `src/pages/index.astro`

Layout: `Default`, title: `"Home"`.

Fetch the `experience` collection. Render four sections separated by `<hr>`:

1. **Welcome** (`#welcome`): h1 + short intro paragraph
2. **Experience** (`#experience`): iterate entries. Each company is an `<h3>`, roles are a list with title and period displayed flex space-between
3. **On this site / Elsewhere** (`#presence`): links to sub-apps with short descriptions, then external links (GitHub)
4. **Rich footer** via `<Fragment slot="footer">`: credits listing Astro, Vue, Render, and GitHub source link

Scoped styles: `.company` margin-bottom 1.5rem, `.roles` as no-list-style with flex space-between items, `.role-period` muted.

### 8.2 Blog list — `src/pages/blog/[...page].astro`

Uses `getStaticPaths` with `paginate()`, `pageSize: 20`.

Filter: only `status === "released"`. Sort: newest first by `date.getTime()`.

For each post, derive the URL: extract `year` from `date.getFullYear()`, `month` from `date.getMonth() + 1` (zero-padded), `slug` from `post.id.split("/").pop()?.replace(/\.md$/, "")`. Link to `/blog/{year}/{month}/{slug}`.

Display per item: title (bold), date (ISO slice `toISOString().slice(0, 10)`, muted, nowrap), tags as pills below.

Pagination nav: prev/next links + "Page X of Y" (only shown if multiple pages exist).

Title: `"Blog"` for page 1, `"Blog — Page N"` otherwise.

### 8.3 Blog post — `src/pages/blog/[year]/[month]/[slug].astro`

`getStaticPaths`: map all blog entries. Extract year/month/slug the same way as the list. Pass `post` as props.

Render: `const { Content } = await render(post)`. Show article header (h1 title, time, tags), then `<div class="prose"><Content /></div>`.

Prose styles: `h2` gets `margin-top: 2rem; margin-bottom: 0.5rem`, `p` gets `margin-bottom: 1rem`. Use `:global()` selector inside `.prose` scope.

### 8.4 Games list — `src/pages/games/index.astro`

Fetch `games` collection. Render a grid of cards. Each card: `<h2>` with game name, description paragraph, mode badge. Link to `/games/{slug}` where slug = `game.id.replace(/\.yaml$/, "")`.

Styles: `.game-list` as `display: grid; gap: 1rem`. Cards have border, border-radius, padding, card-bg background.

### 8.5 Game page — `src/pages/games/[name].astro`

`getStaticPaths`: map games, slug from `id.replace(/\.yaml$/, "")`.

**Conditional rendering based on `mode`:**

- **standalone**: `Bare` layout, full-viewport iframe (`width:100%; height:100vh; border:none`) pointing to `{game.data.path}/game.html`
- **embedded**: `Default` layout, h1, optional description, iframe in a bordered container (`height:600px`)
- **web-native**: `Default` layout, h1, optional description, `<div id="game-root">` placeholder

### 8.6 Writing list — `src/pages/writing/index.astro`

Fetch `writing-books` collection. Render cards in a grid. Each: h2 title, description, status badge. Link to `/writing/{slug}` where slug = `book.id.split("/")[0]`.

### 8.7 Book landing — `src/pages/writing/[book]/index.astro`

`getStaticPaths`: map books. For each, resolve chapter titles by looking up entries in `writing-chapters` collection (match by `${bookSlug}/${chapterSlug}.md` or `${bookSlug}/${chapterSlug}`).

Render: h1, description (muted), status badge, "Table of Contents" h2, ordered list of chapter links → `/writing/{book}/{ch.slug}`.

### 8.8 Chapter page — `src/pages/writing/[book]/[chapter].astro`

`getStaticPaths`: iterate all books, then each book's `chapters` list. Find matching chapter entry in `writing-chapters`. Pass `chapter`, `bookSlug`, and full `chapterList` (all chapters with slug+title) as props.

Render:

1. `<ChapterNav client:visible />` — cross-chapter navigation (collapsible)
2. h1 title
3. **In-chapter TOC**: from `headings` (filter `depth === 2`), render anchor links `#${h.slug}`
4. `<div class="prose"><Content /></div>`

In-chapter nav styles: card-bg background, border, border-radius, 0.75rem padding, muted link colour.

### 8.9 Karaoke — `src/pages/karaoke.astro`

Fetch `karaoke` collection. Sort: entries with `reading` first (sorted by `reading.localeCompare(other.reading, "ja")`), then entries without reading (sorted by `title.localeCompare(other.title, "en")`).

Map entries to `entry.data`, pass the sorted array to `<KaraokeFilter client:load songs={songs} />`.

### 8.10 404 page — `src/pages/404.astro`

Layout: `Default`, title: `"Not Found"`. Centered content: large "404" heading (4rem), "This page doesn't exist." (muted), "Go home" link.

---

## Step 9 — Verify the build

```bash
npm run build
```

The build must succeed. Astro + Zod will fail on any content schema violation, confirming that all content is valid.

Then preview:

```bash
npm run preview
```

### Verification checklist

- [ ] Home page renders with experience entries, sub-app links, and rich footer
- [ ] Theme switcher works (select cycles through system/light/dark/terminal)
- [ ] Theme persists across page reloads (localStorage)
- [ ] No flash of wrong theme on load (inline script blocks render)
- [ ] Header is sticky and transitions to compact mode after scrolling one viewport height
- [ ] Mobile (≤640px): hamburger menu appears, animates to ×, navigation links toggle
- [ ] Blog list shows only released posts, newest first, with pagination
- [ ] Blog post URLs follow `/blog/YYYY/MM/slug` pattern
- [ ] Draft blog posts are accessible by direct URL but absent from listings
- [ ] Games list shows all games with mode badges
- [ ] Standalone game loads in bare layout (no header/footer), full-viewport iframe
- [ ] Embedded game loads in default layout with bordered iframe
- [ ] Writing list shows books with status
- [ ] Book landing page has ordered TOC matching `book.yaml` chapter list
- [ ] Chapter page has collapsible cross-chapter nav and in-chapter section links
- [ ] Karaoke search filters in real time on title, author, reading, and tags
- [ ] Karaoke sort: Japanese songs (by hiragana reading) first, then Latin songs (alphabetical)
- [ ] 404 page renders for unknown routes
- [ ] No horizontal overflow on any page at any width
- [ ] All pages use the single 640px responsive breakpoint

---

## Implementation notes for the agent

### ID parsing patterns (critical for routing)

These ID formats are generated by Astro's loaders and must be parsed correctly in `getStaticPaths`:

| Collection | Entry ID format | How to extract slug |
|---|---|---|
| `blog` | `2025/01/hello-world.md` | `id.split("/").pop()?.replace(/\.md$/, "")` for slug; `date.getFullYear()` for year; `date.getMonth() + 1` (zero-padded) for month |
| `games` | `pixel-adventure.yaml` | `id.replace(/\.yaml$/, "")` |
| `writing-books` | `learning-japanese/book.yaml` | `id.split("/")[0]` |
| `writing-chapters` | `learning-japanese/01-hiragana.md` | Match via `${bookSlug}/${chapterSlug}.md` or `${bookSlug}/${chapterSlug}` |

### Content cross-referencing (writing)

The writing sub-app links books to chapters through `book.yaml`'s `chapters` array. Each string in that array is a chapter filename without `.md`. To resolve a chapter's title, find the matching entry in `writing-chapters` by constructing the expected ID: `${bookSlug}/${chapterSlug}.md` (or without `.md` — check both, as Astro's loader may or may not include the extension depending on version).

### What is NOT in these docs

- **Actual content text**: blog post bodies, chapter content, karaoke song lists, experience entries. Create representative sample content — at least 2 entries per collection, including one draft blog post and one book with 2+ chapters.
- **`public/favicon.svg`**: referenced by `Base.astro` but not required for build. Create a simple SVG or omit it.
- **`src/components/design-system/`**: planned in architecture.md but not yet implemented. Skip it.
- **`src/assets/`**: no processed assets exist yet. Skip it.
