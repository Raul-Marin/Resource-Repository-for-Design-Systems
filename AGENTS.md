# AGENTS.md

## Cursor Cloud specific instructions

### Overview
This is a React + Vite + Tailwind CSS v4 frontend SPA for a "Resource Repository for Design Systems." The backend is a remote Supabase project (no local backend needed). Supabase credentials are hardcoded in `utils/supabase/info.tsx`.

### Running the app
- `npm run dev` — starts Vite dev server on http://localhost:5173
- `npm run build` — production build to `dist/`
- See `README.md` for the canonical setup instructions.

### Gotchas
- There is no linter or test runner configured in `package.json`. The project has only `dev` and `build` scripts.
- Vite's dependency pre-bundling will log errors about HTML files in `docs/` (e.g. `icons-showcase-part2.html`). These are non-fatal; the dev server still serves the app correctly.
- `react` and `react-dom` are declared as `peerDependencies` (not direct dependencies). npm installs them automatically from the lockfile, but be aware of this if troubleshooting missing React errors.
- The app has a HUMAN/MACHINE mode toggle at the bottom of the page that switches between a visual UI and a terminal-style interface.
- Resource card links open external URLs (not in-app detail pages).
- An admin CMS panel is accessible via `#admin` hash in the URL, backed by the remote Supabase Edge Function.
