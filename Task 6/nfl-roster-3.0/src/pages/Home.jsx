
import { Link } from 'react-router-dom';
import { useStats } from '../hooks/usePlayers';
import useDocumentTitle from '../hooks/useDocumentTitle';

const shortcuts = [
  { to: '/players', title: 'Players', text: 'Search, filter and sort every player.' },
  { to: '/teams', title: 'Teams', text: 'Open a team and see its roster by position.' },
  { to: '/compare', title: 'Compare', text: 'Put two players side by side.' },
  { to: '/dashboard', title: 'Dashboard', text: 'League numbers that react to your filters.' },
  { to: '/random', title: 'Surprise me', text: 'Jump to a random player.' },
];

function Home() {
  useDocumentTitle('');

  const { data, isSuccess } = useStats({});

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>NFL Roster</h1>
          <p>
            A roster browser for real NFL players. Look someone up, open a team, compare two players, or check the
            numbers behind the league. Built for Chiefs Kingdom, that is why it's themed RED!!
          </p>

          {isSuccess && data.total > 0 && (
            <p className="hero-count">
              {data.total} players on {data.teams} teams
            </p>
          )}

          <div className="hero-actions">
            <Link className="btn" to="/players">Browse players</Link>
            <Link className="btn btn-plain" to="/teams/kansas-city-chiefs">
              Visit the Chiefs
            </Link>
          </div>
        </div>

        <img
          className="hero-image"
          src={`${import.meta.env.BASE_URL}chiefs-bg.jpg`}
          alt="Patrick Mahomes in a Kansas City Chiefs uniform"
        />
      </section>

      <ul className="grid shortcuts">
        {shortcuts.map((s) => (
          <li key={s.to}>
            <Link className="card shortcut" to={s.to}>
              <span className="card-name">{s.title}</span>
              <span className="card-team">{s.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Home;
