
import { usePlayers } from '../hooks/usePlayers';
import PlayerCard from './PlayerCard';
import Pagination from './Pagination';
import StatusMessage from './StatusMessage';

function PlayerList({ search, team, position, sort, page, onPageChange, onReset }) {
  const { data, error, isPending, isError, refetch } = usePlayers({
    search,
    team,
    position,
    sort,
    page,
  });

  if (isPending) {
    return <StatusMessage type="loading" message="Loading players..." />;
  }

  if (isError) {
    return (
      <StatusMessage
        type="error"
        message={error.message}
        actionLabel="Try again"
        onAction={refetch}
      />
    );
  }

  if (data.players.length === 0) {
    return (
      <StatusMessage
        type="empty"
        message="No players match these filters."
        actionLabel="Reset filters"
        onAction={onReset}
      />
    );
  }

  return (
    <>
      <p className="count">{data.total} players</p>

      <ul className="grid">
        {data.players.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </ul>

      <Pagination
        page={data.page}
        totalPages={data.totalPages}
        onPageChange={onPageChange}
      />
    </>
  );
}

export default PlayerList;
