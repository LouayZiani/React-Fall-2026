function StatusMessage({ type, message, actionLabel, onAction }) {
  return (
    <div className={`status status-${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <p>{message}</p>
      {actionLabel && (
        <button className="btn btn-plain" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default StatusMessage;
