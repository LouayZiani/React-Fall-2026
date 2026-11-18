import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useDocumentTitle from '../hooks/useDocumentTitle';
import { useAuth } from '../context/AuthContext';

function Profile() {
  useDocumentTitle('My Profile');

  const { logout } = useAuth();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleLogout() {
    setSubmitting(true);
    setError('');

    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err.message || 'Unable to log out. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <h1>My Profile</h1>
      <div className="login-card">
        <p>You are signed in. Your account identifiers are intentionally hidden for privacy.</p>

        {error && <p className="notice" role="alert">{error}</p>}

        <button
          className="btn"
          type="button"
          onClick={handleLogout}
          disabled={submitting}
        >
          {submitting ? 'Logging out...' : 'Log out'}
        </button>
      </div>
    </section>
  );
}

export default Profile;
