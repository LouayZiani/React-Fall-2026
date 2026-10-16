# Depth Chart

React single page application for browsing NFL players. Midterm project for the React course.

Live app: _add the deployed link here_

## What it does

- Browse 120 players in a paginated list (12 per page) and open any player for a detail view.
- Search by player name or college, filter by team and position, sort five ways, reset everything with one button.
- Add a new player with a controlled form (validated). New players are saved and show up in the list.
- Every data request shows loading, error (with retry), empty and success states.

## Data source

A simulated API in `src/api/playersApi.js`. It uses Promises, random delays of 300 to 1000 ms, JSON data and `localStorage`. The first request copies the 120 records from `src/data/players.json` into `localStorage`; later requests (and added players) read from there. A request fails 5% of the time (`FAIL_RATE`) so the error state can be seen. The players are fictional; the teams are real.

## Components

`App`, `PlayersPage` (holds filter, page and view state), `FilterBar`, `PlayerList` (fetches the list), `PlayerCard`, `Pagination`, `PlayerDetail` (fetches one player), `AddPlayerForm`, `FormField`, `StatusMessage`.

## Run locally

```
npm install
npm run dev
```

## Deploy (GitHub Pages)

Push to `main`. In the repository go to Settings, Pages, and set Source to GitHub Actions. The workflow in `.github/workflows/deploy.yml` builds and publishes the app.
