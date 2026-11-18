import { useState } from 'react';
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
  const [menuOpen, setMenuOpen] = useState(false);

  async function handleLogout() {
    try {
      await logout();
      setMenuOpen(false);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand" to="/" aria-label="NFL Roster home" onClick={closeMenu}>
          <img
            className="logo"
            src={`${import.meta.env.BASE_URL}nfl.jpg`}
            alt="NFL"
          />
          <span>NFL Roster</span>
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span>
        </button>

        <nav
          id="primary-navigation"
          className={`nav ${menuOpen ? 'nav-open' : ''}`}
          aria-label="Main"
        >
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}

          {!loading && (
            user ? (
              <>
                <NavLink to="/profile" onClick={closeMenu}>Profile</NavLink>
                <button className="btn btn-plain" onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <>
                <NavLink to="/login" onClick={closeMenu}>Log in</NavLink>
                <NavLink to="/signup" onClick={closeMenu}>Sign up</NavLink>
              </>
            )
          )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
