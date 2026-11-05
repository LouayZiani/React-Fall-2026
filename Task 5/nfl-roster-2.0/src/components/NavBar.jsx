import { Link, NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/players', label: 'Players' },
  { to: '/teams', label: 'Teams' },
  { to: '/compare', label: 'Compare' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/random', label: 'Surprise me' },
  { to: '/about', label: 'About' },
  { to: '/login', label: 'Log in' },
];

function NavBar() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand" to="/" aria-label="NFL Roster home">
          <img className="logo" src={`${import.meta.env.BASE_URL}nfl.jpg`} alt="NFL" />
          <span>NFL Roster</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
