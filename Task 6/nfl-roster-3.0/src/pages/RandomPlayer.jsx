
import { Link, Navigate } from 'react-router-dom';
import { useRandomPlayerId } from '../hooks/usePlayers';
import useDocumentTitle from '../hooks/useDocumentTitle';
import StatusMessage from '../components/StatusMessage';

// /random asks the API for a random ID and redirects to that player.
function RandomPlayer() {
  useDocumentTitle('Surprise me');

  const { data: id, error, isPending, isError, refetch } = useRandomPlayerId();

  if (isPending) {
    return <StatusMessage type="loading" message="Picking a player..." />;
  }

  if (isError) {
    return (
      <>
        <StatusMessage
          type="error"
          message={error.message}
          actionLabel="Try again"
          onAction={refetch}
        />
        <p><Link to="/players">Back to all players</Link></p>
      </>
    );
  }

  return <Navigate to={`/players/${id}`} replace />;
}

export default RandomPlayer;
