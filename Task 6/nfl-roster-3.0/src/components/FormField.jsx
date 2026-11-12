function FormField({ label, error, children }) {
  return (
    <label className="field">
      {label}
      {children}
      {error && <span className="field-error">{error}</span>}
    </label>
  );
}

export default FormField;
