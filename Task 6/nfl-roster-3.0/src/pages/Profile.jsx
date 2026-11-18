import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useDocumentTitle from '../hooks/useDocumentTitle';
import { useAuth } from '../context/AuthContext';

function Profile() {
  useDocumentTitle('My Profile');

  const { user, logout } = useAuth();
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
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <h1>My Profile</h1>

      <div className="login-card">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>UID:</strong> {user?.uid}</p>

        {error && <p className="notice">{error}</p>}

        <button
          className="btn"
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