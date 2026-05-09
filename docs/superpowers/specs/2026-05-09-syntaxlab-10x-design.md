# SyntaxLab 10x Improvement — Design Spec

**Date:** 2026-05-09
**Status:** Approved
**Approach:** Layered Sprints (design foundation first, then one complete feature per sprint)

---

## Context

SyntaxLab is a web-based code editor built on Next.js 14, Monaco Editor, and Judge0 (via RapidAPI) for code execution. It has Supabase auth (Google + GitHub OAuth) but no persistent user data beyond the session. The README promises pair programming and snippet management — neither is built. This spec defines the full plan to make SyntaxLab a production-grade, premium-feeling tool for professional developers.

**Target audience:** Professional developers — quick scratchpad, share runnable snippets with teammates.
**Monetization:** None — personal/portfolio project.
**Design personality:** Obsidian — deep dark, GitHub-native, VS Code meets Linear.
**Editor layout:** Focused/minimal — slim top bar, tab strip, editor + output, status bar. Every pixel for code.

---

## Implementation Strategy: Layered Sprints

1. **Design Foundation** — shared tokens, typography, component rewrites, editor chrome, landing page
2. **Sprint 1: Snippet Management & Sharing**
3. **Sprint 2: User Dashboard & Profile**
4. **Sprint 3: Real-time Collaboration**
5. **Sprint 4: AI Code Assistant**

Each sprint ships a complete, polished slice. No sprint leaves surfaces unstyled.

---

## Design Foundation Sprint

### Color Token System

Replace all hardcoded color values with CSS custom properties defined in `app/globals.css`:

```css
:root {
  --bg-base: #0d1117;
  --bg-surface: #161b22;
  --bg-overlay: #21262d;
  --border-subtle: #21262d;
  --border-default: #30363d;
  --text-primary: #e6edf3;
  --text-muted: #8b949e;
  --text-faint: #6e7681;
  --accent-blue: #58a6ff;
  --accent-green: #3fb950;
  --accent-red: #ff7b72;
  --accent-purple: #d2a8ff;
}
```

Obsidian is the primary mode. Light mode is retained via `next-themes` but is secondary.

### Typography

Replace the current system font stack with `Geist` (text) and `Geist Mono` (monospace UI labels) via the `geist` npm package and `next/font/local`. Both are loaded in `app/layout.tsx` and applied via CSS variables. Install: `yarn add geist`.

### Component System

All current Radix-based components (`Button`, `Select`, `Dialog`, `DropdownMenu`) get proper variant maps using `class-variance-authority` (already installed). Variants: `primary`, `ghost`, `danger`. No raw Radix defaults remain in the rendered UI.

### Editor Chrome Redesign

The monolithic `Header` component is decomposed into three focused components:

- **`Topbar`** — logo, language dropdown, theme dropdown, run button, collaborate button, user avatar. Single row, no wrapping.
- **`TabBar`** — file tab strip (filename + language icon). Active tab has a top blue border (`--accent-blue`). `+ New` tab clears the editor to a fresh unsaved state (same tab, no navigation). Multi-file support is out of scope.
- **`StatusBar`** — pinned to the bottom of the screen. Left: cursor position (Ln, Col). Right: language name, encoding, Judge0 status indicator.

The current fullscreen and editor-expand toggles are retained but restyled.

### Landing Page Redesign

Full-bleed Obsidian background. Sections:
1. **Hero** — headline, subtitle, animated Monaco preview (typewriter effect showing a real algorithm), "Start Coding" CTA
2. **Features grid** — 3-column, icon + heading + description for: 60+ Languages, Real-time Collab, AI Assistant, Instant Sharing
3. **Footer** — copyright, Privacy Policy link, GitHub link

The existing SVG grid background is retained (fits the aesthetic).

### Dark Mode Default

`ThemeProvider` defaults to `dark`. System preference is still respected on first visit via `next-themes` `defaultTheme="system"` — but the Obsidian palette is the primary design target.

---

## Sprint 1: Snippet Management & Sharing

### Database Schema

One new Supabase table:

```sql
create table snippets (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  title       text not null default 'Untitled',
  language_id int  not null,
  code        text not null,
  is_public   boolean not null default true,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

alter table snippets enable row level security;

-- Users can CRUD their own snippets
create policy "Own snippets" on snippets
  for all using (auth.uid() = user_id);

-- Anyone can read public snippets
create policy "Public snippets readable" on snippets
  for select using (is_public = true);
```

### Share URL

Pattern: `/s/[id]` — a public dynamic route rendered via SSR using the Supabase server client. No auth required to view. The viewer sees a read-only Monaco instance pre-filled with the snippet. A **Fork** button copies the code into a fresh `/editor` session.

### Editor Integration

Two new actions in `Topbar` for signed-in users:

- **Save (Cmd+S)** — on first save, opens `SaveSnippetPopover` (title input + public/private toggle). Subsequent saves auto-save silently with a toast.
- **Snippets** — opens `SnippetsSheet` (right-side slide-in panel). Lists user's snippets most-recent-first. Each row: title, language icon, timestamp, share icon (copies `/s/[id]` URL), load button.

Unsigned users see the Save button; clicking it triggers `SignInDialog` with copy: "Sign in to save your snippet." Editor state (code + language) is stored in `sessionStorage` before the OAuth redirect and restored after the auth callback completes, so the user lands back in the editor with their work intact.

### New Files

| File | Purpose |
|---|---|
| `app/s/[id]/page.tsx` | Public snippet viewer (SSR) |
| `components/SaveSnippetPopover.tsx` | Save popover with title + visibility |
| `components/SnippetsSheet.tsx` | Slide-in snippets list panel |
| `lib/snippets.ts` | Supabase CRUD server actions |

---

## Sprint 2: User Dashboard & Profile

### Route Structure

```
/dashboard              → Home (recent snippets + stats)
/dashboard/snippets     → Full snippet management
/dashboard/settings     → Profile + preferences
```

All routes are protected by middleware — unauthenticated users are redirected to `/landing`.

### Dashboard Home (`/dashboard`)

- Welcome header: user avatar + display name
- **Recent snippets grid** — last 6 snippets as cards (language icon, title, relative timestamp, share icon). Click → loads into editor.
- **Quick stats row** — total snippets, distinct languages used, public snippets shared. Number tiles, no charts.
- **"New snippet" CTA** — navigates to `/editor` with a fresh session.

### Snippets Page (`/dashboard/snippets`)

- Paginated list (20 per page)
- Filter by language via dropdown
- Each row: title, language badge, created date, public/private pill, copy share link, delete
- Inline rename on double-click (server action + revalidation)
- Bulk delete with checkbox selection + confirmation dialog

### Settings Page (`/dashboard/settings`)

- Display name edit (updates Supabase `user_metadata`)
- Avatar: OAuth provider avatar, no upload required
- Default language preference — persisted to `user_metadata`, pre-selects on editor load
- Default editor theme preference — same, replaces current local-state-only approach
- Danger zone: "Delete all snippets" (with `AlertDialog` confirmation), "Sign out"

### `UserMenu` Update

Two new items prepended to the existing dropdown: **Dashboard** (`/dashboard`) and **My Snippets** (`/dashboard/snippets`).

---

## Sprint 3: Real-time Collaboration

### Technology

Liveblocks (`@liveblocks/react` + `@liveblocks/yjs`) with `y-monaco` for the Monaco binding. Yjs document synced via Liveblocks's first-class Yjs support.

New environment variable: `LIVEBLOCKS_SECRET_KEY`.

### Room Model

Rooms are ephemeral — they exist while at least one participant is connected. The host's code is the source of truth on join. Persistence is handled by saving a snippet (Sprint 1) — the two features compose naturally.

### Starting a Session

**Collaborate** button in `Topbar` (icon: two people, tooltip: "Start collab session"):
1. Generates an 8-char room ID via `nanoid`
2. Updates URL to `/editor?room=<id>`
3. Copies invite URL to clipboard
4. Toast: "Room link copied — share it to invite someone"

Visiting `/editor?room=<id>` as a guest joins automatically. If the room is empty (host left), shows: "This session has ended. Start a new one?"

### In-Editor Presence

- Each participant gets a color from a curated palette (works on Obsidian background — no neons)
- Remote cursors: colored carets with a name label that fades after 2s of inactivity
- **Presence avatars** in `Topbar` — stacked circles, max 4 shown + overflow count (`+2`)
- Hovering an avatar highlights that user's cursor in the editor

### Anonymous Collaboration

Guests without accounts can join and type — they appear as "Guest" with a generated color. A subtle banner encourages sign-in: "Sign in to save this session as a snippet."

### New Files

| File | Purpose |
|---|---|
| `app/api/liveblocks-auth/route.ts` | Auth endpoint — validates Supabase session, returns Liveblocks token with user identity. For unauthenticated requests (guests), still issues a valid token with `userInfo: { name: "Guest", color: <palette-color> }` so anonymous collab works. |
| `lib/liveblocks.ts` | Liveblocks client config |
| `components/CollaborateButton.tsx` | Button + room creation logic |
| `components/PresenceAvatars.tsx` | Stacked avatar display |

`CodeEditor` gains an optional `roomId` prop — when present, swaps the plain Monaco instance for the Yjs-bound collaborative one.

---

## Sprint 4: AI Code Assistant

### Trigger

`Cmd+K` — a slim command bar slides up from the bottom of the editor panel. The code stays fully visible. No modal, no page takeover.

### Command Bar UX

- Single text input: `"Ask about your code..."`
- 4 quick-action chips below the input:
  - **Explain this** — plain English explanation of the current code
  - **Fix the bug** — diagnoses errors using code + Judge0 output
  - **Optimize** — performance suggestions with reasoning
  - **Translate to...** — language picker, translates logic to any supported language

### AI Context

Every request includes:
- Full editor code
- Selected language
- Judge0 output (stdout, stderr, exit code) if a run has occurred
- Custom stdin if set
- User's prompt

### Response Rendering

The output panel gains a tab strip: **Output** | **AI**. The AI tab renders the streaming response. Code blocks in the response are syntax-highlighted and have a one-click **Apply** button that replaces the editor content (with an undo step pushed to Monaco history so `Cmd+Z` reverts).

The command bar shows an animated gradient border while streaming.

### Implementation

- **Transport:** Vercel AI SDK (`ai` package) with Anthropic provider, streaming via `POST /api/ai`
- **Models:**
  - `claude-haiku-4-5-20251001` for Explain and quick prompts (fast, low cost)
  - `claude-sonnet-4-6` for Optimize and Translate (better reasoning)
- **Rate limiting:** 20 AI requests per IP per hour via in-memory `Map` on the API route. Acceptable for a portfolio project on a single instance; would need Upstash Redis if deployed to serverless/edge. Over-limit response: friendly message in the AI tab with time-until-reset.

### New Files

| File | Purpose |
|---|---|
| `app/api/ai/route.ts` | Streaming AI endpoint |
| `components/AICommandBar.tsx` | Cmd+K panel |
| `components/OutputTabs.tsx` | Output + AI tab strip |
| `lib/ai.ts` | Prompt construction, model selection |

---

## Cross-Cutting Concerns

### Performance
- `CodeEditor` is already dynamically imported with `ssr: false` — keep this
- `SnippetsSheet` and `AICommandBar` are lazy-loaded (`dynamic`) — they're not needed on initial paint
- Judge0 polling uses recursive async (correct) — no changes needed

### Error States
- Every async operation (snippet save, AI request, collab join) has explicit error handling with toast notifications
- The `/s/[id]` viewer handles missing/deleted snippets with a proper 404 page (Next.js `notFound()`)

### Mobile
- `Topbar` collapses: language + theme dropdowns move into a slide-up bottom sheet on mobile
- Dashboard is single-column on mobile
- AI command bar and collab are desktop-first; mobile gets a simplified CTA to open desktop

### Environment Variables

```
# Existing
NEXT_PUBLIC_RAPIDAPI_URL
NEXT_PUBLIC_RAPIDAPI_HOST
NEXT_PUBLIC_RAPIDAPI_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL

# New
LIVEBLOCKS_SECRET_KEY
ANTHROPIC_API_KEY
```

---

## File Structure Changes (New Files Summary)

```
app/
  s/[id]/page.tsx               ← public snippet viewer
  dashboard/
    page.tsx                    ← dashboard home
    snippets/page.tsx           ← snippet management
    settings/page.tsx           ← profile + preferences
  api/
    ai/route.ts                 ← streaming AI endpoint
    liveblocks-auth/route.ts    ← Liveblocks auth

components/
  layout/
    Topbar.tsx                  ← replaces Header
    TabBar.tsx
    StatusBar.tsx
  SaveSnippetPopover.tsx
  SnippetsSheet.tsx
  CollaborateButton.tsx
  PresenceAvatars.tsx
  AICommandBar.tsx
  OutputTabs.tsx
  dashboard/
    RecentSnippets.tsx
    StatsRow.tsx
    SnippetsList.tsx

lib/
  snippets.ts                   ← Supabase CRUD server actions
  liveblocks.ts                 ← Liveblocks client config
  ai.ts                         ← prompt construction, model selection
```

---

## Success Criteria

- [ ] Design Foundation: zero hardcoded hex values remain outside `globals.css`; Geist font renders in all UI text
- [ ] Sprint 1: A user can save, retrieve, and share a runnable snippet via a public URL with no auth required to view
- [ ] Sprint 2: A signed-in user has a dashboard with recent snippets, stats, and preference persistence
- [ ] Sprint 3: Two users in the same room URL see each other's cursors and changes in real time
- [ ] Sprint 4: `Cmd+K` opens the AI panel; "Fix the bug" correctly uses the Judge0 error output in its diagnosis
