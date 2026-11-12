# NFL Roster 3.0

A React-based NFL roster application built as an extension of the original React midterm project. This version adds client-side routing, asynchronous data management, caching, Firebase authentication, and protected routes.

**Live application:** [https://louayziani.github.io/nfl-roster-3.0/]

**GitHub repository:** [https://github.com/LouayZiani/React-Fall-2026/tree/main/Task%206]

## Features

### Player management
- Browse the NFL player roster.
- Search players and filter by team and position.
- Sort and paginate results.
- View individual player details.
- Add new players through a form with input validation.
- Player data is stored through a simulated API using browser local storage.

### Routing and application architecture
- React Router with nested routes and dynamic URL parameters.
- URL-synchronized player filters and pagination.
- Lazy-loaded pages.
- Shared root layout, navigation, and reusable components.
- Custom 404 page.
- GitHub Pages refresh support.

### Data fetching and caching
- TanStack React Query for server-state management.
- Reusable custom query hooks.
- Loading and error states.
- Cached query results to reduce unnecessary requests.
- Query invalidation after adding a player so related data stays up to date.

### Authentication
- Firebase Authentication.
- Email and password registration and login.
- Google sign-in.
- Persistent authentication sessions.
- Protected Profile route.
- Logout functionality.
- Guest access to public application pages.

### Additional features
- Team directory and individual team rosters.
- Player comparison.
- Random player discovery.
- Statistics dashboard with filters.

## Tech stack

| Technology | Purpose |
|---|---|
| React 18 | UI development |
| Vite 6 | Development server and production build |
| React Router 7 | Routing and navigation |
| TanStack React Query 5 | Data fetching, caching, and invalidation |
| Firebase Authentication | User registration and authentication |
| JavaScript (ES modules) | Application logic |
| CSS | Styling |
| gh-pages | GitHub Pages deployment |

## Project structure

```text
src/
├── api/
│   └── playersApi.js          # Simulated player API and local storage
├── components/
│   ├── ProtectedRoute.jsx     # Authentication guard
│   └── ...                    # Reusable UI components
├── context/
│   └── AuthContext.jsx        # Firebase authentication context
├── hooks/
│   ├── usePlayers.js          # React Query hooks and query keys
│   └── useDocumentTitle.js    # Browser document title
├── layouts/
│   └── RootLayout.jsx         # Shared layout and navigation outlet
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── PlayersPage.jsx
│   ├── PlayerDetail.jsx
│   ├── AddPlayer.jsx
│   ├── Dashboard.jsx
│   ├── Teams.jsx
│   ├── TeamDetail.jsx
│   ├── Compare.jsx
│   ├── RandomPlayer.jsx
│   ├── Login.jsx
│   ├── Signup.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
├── services/
│   └── service.js             # Data access layer
├── styles/
│   └── index.css
├── firebase.js                # Firebase initialization
├── App.jsx                    # Application routes
└── main.jsx                   # Application entry point
```

## Application routes

| Route | Description | Access |
|---|---|---|
| `/` | Home page | Public |
| `/about` | About page | Public |
| `/players` | Player list, search, filters, sorting, and pagination | Public |
| `/players/new` | Add a player | Public |
| `/players/:id` | Individual player details | Public |
| `/dashboard` | Player statistics and filters | Public |
| `/teams` | Team directory | Public |
| `/teams/:slug` | Individual team roster | Public |
| `/compare?a=&b=` | Compare two players | Public |
| `/random` | Discover a random player | Public |
| `/login` | Email/password and Google login | Public |
| `/signup` | Create an account | Public |
| `/profile` | View account information and log out | Protected |
| `*` | Custom 404 page | Public |

Unauthenticated users attempting to access `/profile` are redirected to `/login`. After successful authentication, they are returned to their originally requested route.

## Getting started

### Requirements

- Node.js and npm
- A Firebase project with Authentication enabled

### 1. Clone the repository

```bash
git clone https://github.com/LouayZiani/React-Fall-2026/tree/main/Task%206
cd nfl-roster-3.0
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).

Enable these providers under **Authentication → Sign-in method**:

- Email/Password
- Google

Create a web app in your Firebase project and copy its configuration values.

Create a `.env.local` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Replace the placeholder values with your Firebase web app configuration.

The `.env.local` file is excluded from Git. Never commit private service-account credentials or other server-side secrets.

### 4. Run the application

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

### 5. Create a production build

```bash
npm run build
```

The production files are generated in the `dist/` directory.

## Deployment to GitHub Pages

The project uses `gh-pages` to publish the production build.

### 1. Check the Vite base path

For this repository, the Vite configuration must use:

```js
base: '/nfl-roster-3.0/',
```

This must match the `BrowserRouter` basename in `src/main.jsx`.

### 2. Deploy

Make sure your Firebase environment variables are configured locally, then run:

```bash
npm run deploy
```

The `predeploy` script automatically builds the application before publishing the `dist/` directory to the `gh-pages` branch.

### 3. Enable GitHub Pages

In your GitHub repository:

1. Open **Settings → Pages**.
2. Set the deployment source to **Deploy from a branch**.
3. Select the `gh-pages` branch and `/ (root)` folder.
4. Save the settings.

Your application will be available at:

```text
https://YOUR_GITHUB_USERNAME.github.io/nfl-roster-3.0/
```

### 4. Configure Firebase for deployment

In Firebase Console, open **Authentication → Settings → Authorized domains** and add your GitHub Pages domain:

```text
YOUR_GITHUB_USERNAME.github.io
```

Also ensure `localhost` is authorized for local development.

## Notes

- Player data is handled by a simulated API and stored in browser local storage. It is not a shared cloud database.
- React Query manages client-side caching and invalidation for player, team, and statistics queries.
- Firebase Authentication handles user accounts and login sessions. The player roster data is separate from Firebase authentication.
- The Firebase web configuration is supplied through Vite environment variables. These variables are included in the client-side build, so they should not be treated as private server credentials.
- GitHub Pages is a static hosting platform; the application does not require a separate backend server.

## Author

Developed as part of the React application architecture and data management lab.
