# Al-un.fr — Specification

Personal website for a software engineer. The primary goal is a low-maintenance, long-lived site that is easy to update with new content. It is built as a fully static output with no server-side rendering, deployed on a static hosting service (e.g. Render).

The site is divided into independent sub-apps, each serving a distinct purpose. They share a common layout and design system but are otherwise self-contained.

---

## Sub-apps

### Landing Page (`/`)

The entry point to the site. All navigation within the page (scrolling between sections, expanding content) must behave as a SPA — no full-page reloads.

**Sections (in order):**

- **Welcome / self-introduction** — a brief personal introduction
- **Work experience** — grouped by company; each company may have multiple roles, each role associated with a time period. Data is maintained as structured content (not hardcoded) for easy updates
- **Internet presence**
  - Internal: short descriptions of and links to the other sub-apps on this site
  - External: links to profiles outside the site (e.g. GitHub)
- **Footer** — lists technologies used to build the site, the deployment platform, and a link to the GitHub repository. This rich footer only appears on the landing page; other pages display a simple copyright footer

> No content format is prescribed for the landing page — the data structure is implementation-defined. Work experience data must be maintained as structured content for easy updates.

---

### Blog (`/blog`)

A chronological blog. Content is maintained as markdown files and rendered statically at build time.

**URLs:**
- `/blog` — home page: paginated list of posts (max 20 per page), ordered newest first
- `/blog/<year>/<month>/<slug>` — individual post
  - `<slug>` is the markdown filename (without `.md`). The filename must be the kebab-case form of the post title

**Post list displays:** title, publication date, tags. No excerpt.

**Content format** — one markdown file per post, with frontmatter:

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Display title. The filename (kebab-case of this value) is the URL slug |
| `date` | date | yes | Used for ordering and URL path (`<year>/<month>`) |
| `status` | `draft` \| `released` | yes | Draft posts are generated but not listed or linked — the URL exists but is not discoverable |
| `tags` | string[] | no | Used for display; no tag-based filtering page required |

Build must fail if any required frontmatter field is missing or malformed.

---

### Games (`/games`)

Games built in Godot (or any technology that produces a self-contained static build) and served as static assets.

**URLs:**
- `/games` — home page listing all games
- `/games/<game-name>` — individual game page

  The rendering mode is configured per game. Three options are supported:

  | Option | Description |
  |---|---|
  | **Standalone** | The game static assets are served directly. No site layout or navigation. The only way back is the browser's back button. |
  | **Embedded** | The game is embedded in an `<iframe>` (or equivalent). The page uses the standard site layout. A description may appear above or below the embed. |
  | **Web-native** | The game is implemented directly in web technology (no external build). Rare, but must be supported. |

Each game has the following metadata, used on the home page and to configure its page:

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | Display name; used to derive `<game-name>` URL slug (kebab-case) |
| `description` | string | no | Short text shown on the games home page |
| `thumbnail` | image | no | Preview image shown on the games home page |
| `mode` | `standalone` \| `embedded` \| `web-native` | yes | Controls how the game page is rendered |

---

### Writing (`/writing`)

A reading-oriented sub-app that organises long-form writing as books with chapters, resembling an e-book experience. All content is in markdown, statically rendered at build time.

**URLs:**
- `/writing` — home page listing all books, with a short description and status per book
- `/writing/<book-name>` — book landing page with a table of contents
- `/writing/<book-name>/<chapter-name>` — chapter page

  Chapter pages include two navigation aids:
  - **In-chapter:** jump links to sections within the current chapter
  - **Global:** a collapsible panel listing all chapters for quick cross-chapter navigation (e-book style)

**URL slugs:** `<book-name>` and `<chapter-name>` are the kebab-case form of the respective name defined in metadata.

**Content format:** all book content (description, chapter names, chapter body) is maintained in markdown. The exact file and folder structure is implementation-defined, but must be simple enough to edit via the GitHub UI.

Each book has the following metadata:

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | Display name; used to derive `<book-name>` URL slug (kebab-case) |
| `description` | string | yes | Short summary shown on the writing home page |
| `status` | `draft` \| `in-progress` \| `released` | yes | Controls visibility on the writing home page |

Build must fail on malformed or missing required metadata.

---

### Karaoke (`/karaoke`)

A single-page song list, intended to be used on a smartphone while singing karaoke. The data is maintained in static files that are easy to edit via the GitHub mobile app or GitHub web UI.

**Song data model:**

| Field | Type | Notes |
|---|---|---|
| `title` | string | May be in Japanese (kanji/kana) or Latin alphabet |
| `author` | string | |
| `reading` | string | Required for Japanese titles. Hiragana transcription used for sort order |
| `tags` | string[] | Zero or more |

The data source format is an architecture decision, with one constraint: it must be editable via the GitHub mobile app or GitHub web UI without friction (e.g. no complex tooling or multi-file changes to add a single song).

**Sorting** (applied at build time or client-side):
1. Japanese titles first, sorted by hiragana reading order (as in a standard Japanese karaoke system)
2. Latin-alphabet titles after, sorted alphabetically

**Filtering:** a search bar, sticky at the top of the page, filters songs in real time. Match logic: case-insensitive `includes` on title, author, and tags. No server round-trip.

---

## UI/UX

### Themes

The site supports four themes. The user's selection persists across sessions (e.g. via `localStorage`). If no selection has been made, the default is **System**.

| Theme | Behaviour |
|---|---|
| **System** *(default)* | Automatically follows the OS light/dark preference (`prefers-color-scheme`) |
| **Light** | Fixed light mode |
| **Dark** | Fixed dark mode |
| **Terminal** | Terminal-style aesthetic — monospace font, high-contrast color palette |

**Theme-controlled properties:** background colors (page and content), text colors (body, headings, links, highlights), font family, border radius, border colors.

> The theme switcher UI placement and design are implementation-defined.

### Responsive Design

The site must be fully responsive with a single mobile breakpoint at **640px**. No horizontal overflow or scrolling on any page at any supported width.

### Navigation

All pages include a common layout with navigation links to each sub-app's home page, unless a page explicitly opts out (e.g. Games — Option 1 standalone mode).

**Sticky header:** the header remains visible at all times during scroll.

**Full / compact modes:**

| Mode | When | Behaviour |
|---|---|---|
| **Full** | Page is at or near the top (within one viewport height of scroll) | Standard padding and font size; brand, navigation links, and theme switcher all visible |
| **Compact** | User has scrolled past one viewport height | Reduced vertical padding and font size; all navigation links remain accessible — nothing is hidden |

The transition between modes is smooth (CSS transition).

**Mobile (≤ 640px):** navigation links are collapsed behind a hamburger menu button. The button toggles a vertical dropdown of links. The theme switcher remains visible outside the menu. The hamburger icon animates to an × when the menu is open.

### Design System

All sub-apps must share a consistent visual language. A lightweight design system should be defined and applied uniformly. A third-party styling or component library may be used to implement it, but the dependency must be scoped to the design system layer — it must not bleed into application logic or content rendering.

---

## Technical Requirements

### Stack

Concrete framework, tooling, and file structure choices are defined in a separate architecture document.

Constraints from the author's background:
- **Language:** TypeScript preferred; vanilla HTML/CSS is acceptable
- **UI framework:** Vue.js ecosystem; React is not an option

### Maintenance Principles

This site will not be updated frequently. Ease of maintenance takes priority over engineering sophistication.

1. **Content updates must be simple** — adding a blog post, a song, or a chapter should require minimal steps and no understanding of the build system
2. **Minimal dependencies** — prefer fewer, well-maintained packages; avoid dependencies that require frequent breaking-change upgrades
3. **Web standards over framework abstractions** — use platform features where possible to reduce long-term compatibility burden

### Build and Deployment

- Output is fully static (HTML, CSS, JS, assets) — no runtime server required
- Deployed to a static hosting service (currently Render, but the output should be portable)
- No SSR; no edge functions
- Build speed is not a priority
- **Build must fail** on any content error: missing required metadata, malformed frontmatter, invalid static data files, or incorrect file naming
