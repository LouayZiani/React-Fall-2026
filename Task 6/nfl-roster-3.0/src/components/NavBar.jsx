
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/players', label: 'Players' },
  { to: '/teams', label: 'Teams' },
  { to: '/compare', label: 'Compare' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/random', label: 'Surprise me' },
  { to: '/about', label: 'About' },
];

function NavBar() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand" to="/" aria-label="NFL Roster home">
          <img
            className="logo"
            src={`${import.meta.env.BASE_URL}nfl.jpg`}
            alt="NFL"
          />
          <span>NFL Roster</span>
        </Link>

        <nav className="nav" aria-label="Main">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}>
              {l.label}
            </NavLink>
          ))}

          {!loading && (
            user ? (
              <>
                <NavLink to="/profile">Profile</NavLink>
                <button
                  className="btn btn-plain"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login">Log in</NavLink>
                <NavLink to="/signup">Sign up</NavLink>
              </>
            )
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
