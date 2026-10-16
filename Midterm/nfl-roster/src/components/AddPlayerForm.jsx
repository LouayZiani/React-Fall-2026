import { useState } from 'react';
import { addPlayer } from '../api/playersApi';
import { TEAMS, POSITIONS } from '../constants';
import FormField from './FormField';

const emptyForm = { name: '', team: '', position: '', number: '', age: '', college: '', yearsPro: '', height: '', weight: '', headshot: '' };

function inRange(value, min, max) {
  const n = Number(value);
  return value !== '' && Number.isFinite(n) && n >= min && n <= max;
}

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Enter a name.';
  if (!form.team) errors.team = 'Choose a team.';
  if (!form.position) errors.position = 'Choose a position.';
  if (!inRange(form.number, 0, 99)) errors.number = 'Enter a number from 0 to 99.';
  if (!inRange(form.age, 20, 45)) errors.age = 'Enter an age from 20 to 45.';
  if (!form.college.trim()) errors.college = 'Enter a college.';
  if (!inRange(form.yearsPro, 0, 25)) errors.yearsPro = 'Enter 0 to 25 years.';
  if (!inRange(form.height, 60, 85)) errors.height = 'Enter a height from 60 to 85 inches.';
  if (!inRange(form.weight, 150, 400)) errors.weight = 'Enter a weight from 150 to 400 lb.';
  if (form.headshot.trim() && !form.headshot.trim().startsWith('http')) errors.headshot = 'Enter a link that starts with http.';
  return errors;
}

function AddPlayerForm({ onAdded, onCancel }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      const player = await addPlayer({
        name: form.name.trim(),
        team: form.team,
        position: form.position,
        number: Number(form.number),
        age: Number(form.age),
        college: form.college.trim(),
        yearsPro: Number(form.yearsPro),
        height: Number(form.height),
        weight: Number(form.weight),
        headshot: form.headshot.trim(),
      });
      onAdded(player);
    } catch (err) {
      setSubmitError(err.message);
      setSubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h2>Add player</h2>
      <div className="form-grid">
        <FormField label="Name" error={errors.name}>
          <input name="name" value={form.name} onChange={handleChange} />
        </FormField>
        <FormField label="College" error={errors.college}>
          <input name="college" value={form.college} onChange={handleChange} />
        </FormField>
        <FormField label="Team" error={errors.team}>
          <select name="team" value={form.team} onChange={handleChange}>
            <option value="">Choose a team</option>
            {TEAMS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Position" error={errors.position}>
          <select name="position" value={form.position} onChange={handleChange}>
            <option value="">Choose a position</option>
            {POSITIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </FormField>
        <FormField label="Jersey number" error={errors.number}>
          <input name="number" type="number" value={form.number} onChange={handleChange} />
        </FormField>
        <FormField label="Age" error={errors.age}>
          <input name="age" type="number" value={form.age} onChange={handleChange} />
        </FormField>
        <FormField label="Years in the NFL" error={errors.yearsPro}>
          <input name="yearsPro" type="number" value={form.yearsPro} onChange={handleChange} />
        </FormField>
        <FormField label="Height (inches)" error={errors.height}>
          <input name="height" type="number" value={form.height} onChange={handleChange} />
        </FormField>
        <FormField label="Weight (lb)" error={errors.weight}>
          <input name="weight" type="number" value={form.weight} onChange={handleChange} />
        </FormField>
        <FormField label="Photo link (optional)" error={errors.headshot}>
          <input name="headshot" value={form.headshot} onChange={handleChange} />
        </FormField>
      </div>
      {submitError && <p className="field-error" role="alert">{submitError}</p>}
      <div className="form-actions">
        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add player'}
        </button>
        <button className="btn btn-plain" type="button" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddPlayerForm;