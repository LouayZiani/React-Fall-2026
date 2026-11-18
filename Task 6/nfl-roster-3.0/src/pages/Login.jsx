
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useDocumentTitle from '../hooks/useDocumentTitle';
import FormField from '../components/FormField';
import { useAuth } from '../context/AuthContext';

function Login() {
  useDocumentTitle('Log in');

  const { login, loginWithGoogle, error, clearError } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || '/profile';

  function handleChange(e) {
    clearError();

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      await login(form.email, form.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      // Error is already stored in AuthContext.
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setSubmitting(true);

    try {
      await loginWithGoogle();
      navigate(redirectTo, { replace: true });
    } catch (err) {
      // Error is already stored in AuthContext.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login">
      <form className="form login-card" onSubmit={handleSubmit}>
        <h1>Log in</h1>

        <FormField label="Email">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </FormField>

        <FormField label="Password">
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </FormField>

        {error && (
          <p className="notice" role="alert">
            {error}
          </p>
        )}

        <div className="form-actions">
          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? 'Logging in...' : 'Log in'}
          </button>

          <button
            className="btn btn-plain"
            type="button"
            onClick={handleGoogleLogin}
            disabled={submitting}
          >
            Continue with Google
          </button>

          <button
            className="btn btn-plain"
            type="button"
            onClick={() => navigate('/players')}
          >
            Continue as guest
          </button>
        </div>

        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
