# SyntaxLab

A modern, production-grade online code editor — write, execute, and collaborate on code in real time.

Live at **[syntaxlab.dev](https://syntaxlab.dev)** · [Open Editor](https://syntaxlab.dev/editor)

---

## Features

### Editor
- **Monaco Editor** — the same engine that powers VS Code
- **60+ programming languages** — Python, JavaScript, TypeScript, Go, Rust, Java, C/C++, and more
- **25+ syntax themes** — Night Owl, GitHub Dark, Dracula, Monokai, and more
- **Full-screen mode** — distraction-free coding
- **Keyboard shortcuts** — `Cmd+Enter` to run, `Cmd+S` to save, `Cmd+K` for AI

### Execution
- **Instant code execution** — powered by Judge0 via a secure server-side proxy
- **Custom stdin** — provide input to your programs
- **Execution metrics** — status, runtime, and memory usage per run

### Collaboration
- **Real-time pair programming** — share a room link and code together live
- **Presence avatars** — see who's in the room
- **Colored cursors with name labels** — each collaborator gets a unique color matching their avatar

### Snippets
- **Save snippets** — Cmd+S to save with a title and public/private visibility
- **Snippet library** — browse, search, and sort your saved snippets
- **Share links** — every public snippet gets a shareable `/s/[id]` URL
- **Fork snippets** — open any shared snippet directly in the editor

### Dashboard
- **Profile overview** — stats, recent snippets, member info
- **Snippet manager** — search, filter by language, and manage all your snippets
- **Settings** — account info and danger zone

### Authentication
- **Google OAuth** and **GitHub OAuth** — one-click sign in
- **Supabase Auth** — secure session management

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Editor | Monaco Editor |
| Styling | Tailwind CSS + Radix UI |
| Auth | Supabase Auth (Google & GitHub OAuth) |
| Database | Supabase (PostgreSQL) |
| Realtime collab | Liveblocks |
| Code execution | Judge0 via RapidAPI (server-side proxy) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- yarn or npm

### Installation

```bash
git clone https://github.com/skdonepudi/syntaxlab.git
cd syntaxlab
yarn install
```

### Environment Variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `RAPIDAPI_URL` | Judge0 submissions endpoint |
| `RAPIDAPI_HOST` | Judge0 RapidAPI host |
| `RAPIDAPI_KEY` | Your RapidAPI key |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `NEXT_PUBLIC_SITE_URL` | Your site's base URL (e.g. `http://localhost:3000`) |
| `LIVEBLOCKS_SECRET_KEY` | Liveblocks secret key |
| `ANTHROPIC_API_KEY` | Anthropic API key (for AI features) |

> **Note:** `RAPIDAPI_KEY` is intentionally server-side only (no `NEXT_PUBLIC_` prefix) — it never reaches the browser.

### Run locally

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deployment

The project deploys automatically to Vercel on push to `main`.

Before the first production deploy, complete this checklist:

- [ ] Set all env vars in the Vercel dashboard
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your production domain
- [ ] In Supabase → **Auth → URL Configuration**: add production domain to Site URL and Redirect URLs
- [ ] In **Google Cloud Console**: add production callback URL to Authorized redirect URIs
- [ ] In **GitHub OAuth App**: update Homepage URL and Authorization callback URL

---

## Contributing

Pull requests are welcome. For major changes please open an issue first.

## License

MIT
