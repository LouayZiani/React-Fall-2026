import { fetchPlayers } from '../services/service';
import useAsync from '../hooks/useAsync';
import PlayerCard from './PlayerCard';
import Pagination from './Pagination';
import StatusMessage from './StatusMessage';

//here it asks API for one page of players that match the url filters
function PlayerList({ search, team, position, sort, page, onPageChange, onReset }) {
  const { status, data, error, retry } = useAsync(
    () => fetchPlayers({ search, team, position, sort, page }),
    [search, team, position, sort, page]
  );

  if (status === 'loading') return <StatusMessage type="loading" message="Loading players..." />;
  if (status === 'error') return <StatusMessage type="error" message={error.message} actionLabel="Try again" onAction={retry} />;
  if (data.players.length === 0) {
    return <StatusMessage type="empty" message="No players match these filters." actionLabel="Reset filters" onAction={onReset} />;
  }

  return (
    <>
      <p className="count">{data.total} players</p>
      <ul className="grid">
        {data.players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </ul>
      <Pagination page={data.page} totalPages={data.totalPages} onPageChange={onPageChange} />
    </>
  );
}

export default PlayerList;
