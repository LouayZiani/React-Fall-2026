
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useDocumentTitle from '../hooks/useDocumentTitle';
import FormField from '../components/FormField';
import { useAuth } from '../context/AuthContext';

function Signup() {
  useDocumentTitle('Sign up');

  const { signup, error, clearError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  function handleChange(e) {
    clearError();
    setValidationError('');

    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password.length < 6) {
      setValidationError('Password must contain at least 6 characters.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setValidationError('Passwords do not match.');
      return;
    }

    setSubmitting(true);

    try {
      await signup(form.email, form.password);
      navigate('/profile', { replace: true });
    } catch (err) {
      // Error is already stored in AuthContext.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="login">
      <form className="form login-card" onSubmit={handleSubmit}>
        <h1>Create account</h1>

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
            minLength={6}
            required
          />
        </FormField>

        <FormField label="Confirm password">
          <input
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </FormField>

        {(error || validationError) && (
          <p className="notice" role="alert">
            {validationError || error}
          </p>
        )}

        <div className="form-actions">
          <button className="btn" type="submit" disabled={submitting}>
            {submitting ? 'Creating account...' : 'Sign up'}
          </button>
        </div>

        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
