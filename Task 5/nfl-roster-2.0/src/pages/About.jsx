import useDocumentTitle from '../hooks/useDocumentTitle';

const routes = [
  ['/', 'Home'],
  ['/players', 'Player list with search, filters, sorting and pagination'],
  ['/players/:id', 'Player details'],
  ['/players/new', 'Add a player'],
  ['/teams and /teams/:slug', 'All teams and one team roster (bonus)'],
  ['/compare?a=1&b=2', 'Head-to-head comparison (bonus)'],
  ['/random', 'Redirects to a random player (bonus)'],
  ['/dashboard', 'League statistics'],
  ['/about and /login', 'This page and a login placeholder'],
];

function About() {
  useDocumentTitle('About');
  return (
    <article className="prose">
      <h1>About NFL roster</h1>
      <p>
        It was my React midterm project and now i expanded it. It is a single page app for browsing NFL players. This version adds routing,
        so every view has its own URL that can be bookmarked, shared and refreshed.
      </p>
      <h2>Data</h2>
      <p>
        Players come from the public nflverse roster dataset. They are served by a simulated API that uses Promises,
        random delays, occasional failures and localStorage. It does the searching, filtering, sorting, pagination and
        statistics, just like a real backend would.
      </p>
      <h2>Built with</h2>
      <p>React, React Router (nested routes, dynamic URLs, search params), React.lazy with Suspense, and Vite.</p>
      <h2>Pages</h2>
      <dl className="route-list">
        {routes.map(([path, text]) => (
          <div key={path}>
            <dt>{path}</dt>
            <dd>{text}</dd>
          </div>
        ))}
      </dl>
    </article>
  );
}

export default About;
