# Depth Chart (Routing & Application Architecture lab)

NFL roster app from the React midterm, extended with React Router, nested routes, dynamic URLs, URL-synced filters and lazy loading.

Live app: _add the deployed link here_
Repository: _add the GitHub link here_

## Before you run it (3 files from your midterm)

1. `src/data/players.json`: replace the 6-player placeholder with your full 197-player file.
2. `public/nfl.jpg`: the NFL logo.
3. `public/chiefs-bg.jpg`: the Mahomes photo.
4. Optional: `public/404.gif`: the GIF for the 404 page (a "NO FISHING" box shows until it exists).

```
npm install
npm run dev
```

## Routes

| Route | Page | Loaded |
| --- | --- | --- |
| `/` | Home | eager |
| `/about` | About | lazy |
| `/players` | Player list (search, team, position, sort, page all in the URL) | eager |
| `/players/:id` | Player details | lazy |
| `/players/new` | Add player form | eager |
| `/dashboard` | Statistics with team and position filters | lazy |
| `/login` | Login placeholder | lazy |
| `/teams`, `/teams/:slug` | Bonus: all teams, one team roster | lazy |
| `/compare?a=&b=` | Bonus: head-to-head | lazy |
| `/random` | Bonus: redirect to a random player | lazy |
| `*` | Custom 404 | eager |

## Structure

```
src/
  App.jsx            routes only
  layouts/           RootLayout (NavBar + Suspense + Outlet)
  pages/             one file per route
  components/        reusable UI (Card, PlayerCard, FilterBar, Pagination, BarList, ...)
  services/service.js  the only data access used by components
  api/playersApi.js    simulated API: all filtering, sorting, pagination and stats happen here
  hooks/             useAsync (loading/error/stale requests), useDocumentTitle
  styles/index.css
```

## Deploy

**Vercel (recommended):** import the repo, keep the defaults. `vercel.json` makes refresh and direct links work.
**Netlify:** `public/_redirects` does the same.
**GitHub Pages:** build with `VITE_BASE=/your-repo-name/`. The build copies `index.html` to `404.html` so refreshes work.
