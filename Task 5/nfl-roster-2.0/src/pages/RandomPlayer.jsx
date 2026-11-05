import { Link, Navigate } from 'react-router-dom';
import { fetchRandomPlayerId } from '../services/service';
import useAsync from '../hooks/useAsync';
import useDocumentTitle from '../hooks/useDocumentTitle';
import StatusMessage from '../components/StatusMessage';

// /random asks api for a random id then redirects to that player
function RandomPlayer() {
  useDocumentTitle('Surprise me');
  const { status, data: id, error, retry } = useAsync(fetchRandomPlayerId, []);

  if (status === 'success') return <Navigate to={`/players/${id}`} replace />;
  if (status === 'error') {
    return (
      <>
        <StatusMessage type="error" message={error.message} actionLabel="Try again" onAction={retry} />
        <p><Link to="/players">Back to all players</Link></p>
      </>
    );
  }
  return <StatusMessage type="loading" message="Picking a player..." />;
}

export default RandomPlayer;
