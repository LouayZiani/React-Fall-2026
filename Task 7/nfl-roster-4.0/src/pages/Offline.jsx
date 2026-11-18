import { Link } from 'react-router-dom';
import useDocumentTitle from '../hooks/useDocumentTitle';

function Offline() {
  useDocumentTitle('Offline');

  function retry() {
    if (navigator.onLine) window.location.assign(`${import.meta.env.BASE_URL}`);
    else window.location.reload();
  }

  return (
    <section className="offline-page">
      <div className="offline-symbol" aria-hidden="true">📡</div>
      <h1>You're offline</h1>
      <p>Your connection is unavailable. Previously loaded public roster data may still be available in the app.</p>
      <p className="offline-connection" role="status">
        {navigator.onLine ? 'A connection is detected. Try again.' : 'Waiting for a connection…'}
      </p>
      <div className="form-actions">
        <button className="btn" type="button" onClick={retry}>Retry connection</button>
        <Link className="btn btn-plain" to="/players">Open saved players</Link>
      </div>
    </section>
  );
}

export default Offline;
