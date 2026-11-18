# NFL Roster 4.0 — PWA setup

A React-based NFL roster application built as an extension of the original React midterm project. After adding client-side routing, asynchronous data management, caching, Firebase authentication, and protected routes in previous version, now I am creating a Progressive Web App here in React.

**Live application:** [https://louayziani.github.io/nfl-roster-4.0/]

**GitHub repository:** [https://github.com/LouayZiani/React-Fall-2026/tree/main/Task%207]

This is a patch for a NEW repository named `nfl-roster-4.0`. It does not modify or replace your `nfl-roster-3.0` folder.

## Create the separate local project

1. Create a new folder named `nfl-roster-4.0` beside your existing `nfl-roster-3.0` folder.
2. Copy the contents of `nfl-roster-3.0` into `nfl-roster-4.0`, but do NOT copy `.git`, `node_modules`, `dist`, or `.env.local`.
3. Copy this patch's contents into the new `nfl-roster-4.0` folder, preserving paths and allowing files to be overwritten.
4. Copy your Firebase values into a new local `.env.local` file in `nfl-roster-4.0`. Never commit this file. The `.gitignore` in this patch excludes it.
5. In the new folder run:
   ```bash
   npm install
   npm run dev
   ```
6. Test the Profile page while signed in. It should no longer reference or display email/UID values.
7. Run:
   ```bash
   npm run build
   npm run preview
   ```

## Create and deploy the new GitHub repository

1. On GitHub, create a NEW repository named `nfl-roster-4.0`.
2. In a terminal, change directory into the new local folder:
   ```bash
   cd path/to/nfl-roster-4.0
   git init
   git add .
   git commit -m "Initial NFL Roster 4.0 PWA"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/nfl-roster-4.0.git
   git push -u origin main
   ```
3. Replace `YOUR-USERNAME` with your actual GitHub username.
4. Deploy using the existing project script:
   ```bash
   npm run deploy
   ```
5. In GitHub repository Settings → Pages, select deployment from the `gh-pages` branch if it is not already configured.
6. Your expected GitHub Pages address is `https://YOUR-USERNAME.github.io/nfl-roster-4.0/`.

## PWA details

- Vite base path, React Router basename, manifest start_url/scope/icon URLs, and CSS background URL all target `/nfl-roster-4.0/`.
- Service-worker cache version is `nfl-roster-v4`, separate from the old v3 cache.
- The service worker is registered only in production builds. `npm run dev` uses Vite's development server and does not test service-worker behavior.
- Test PWA installation and offline behavior on the production preview or deployed HTTPS site, not only with `npm run dev`.
- Firebase authentication endpoints are excluded from runtime caching. Do not put account data in the public roster JSON.

## Profile route

`/profile` is protected. You must be signed in to see it; otherwise `ProtectedRoute` redirects to `/login`. The prior patch had a bug: it removed `user` from the `useAuth()` destructuring but still rendered `user?.email` and `user?.uid`. This corrected version removes those references and intentionally displays no sensitive identifiers.
