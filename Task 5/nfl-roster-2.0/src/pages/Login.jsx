import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';
import FormField from '../components/FormField';

//its just a placeholder, nothing is sent yet
function Login() {
  useDocumentTitle('Log in');
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [notice, setNotice] = useState('');

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setNotice('Accounts are coming soon. For now you can browse as a guest.');
  }

  return (
    <div className="login">
      <form className="form login-card" onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <p className="muted">Save favorite players and build your own depth chart. Coming soon.</p>
        <FormField label="Email">
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" />
        </FormField>
        <FormField label="Password">
          <input name="password" type="password" value={form.password} onChange={handleChange} />
        </FormField>
        {notice && <p className="notice" role="status">{notice}</p>}
        <div className="form-actions">
          <button className="btn" type="submit">Log in</button>
          <button className="btn btn-plain" type="button" onClick={() => navigate('/players')}>
            Continue as guest
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
