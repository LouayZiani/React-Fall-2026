import { useState, useEffect } from 'react';
import { getPlayers } from '../api/playersApi';
import { PAGE_SIZE } from '../constants';
import PlayerCard from './PlayerCard';
import Pagination from './Pagination';
import StatusMessage from './StatusMessage';

function PlayerList({ search, team, position, sort, page, onPageChange, onSelect, onReset }) {
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState({ players: [], total: 0, totalPages: 1 });
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;
    setStatus('loading');
    getPlayers({ search, team, position, sort, page, pageSize: PAGE_SIZE })
      .then((result) => {
        if (ignore) return;
        setData(result);
        setStatus('success');
      })
      .catch((err) => {
        if (ignore) return;
        setError(err.message);
        setStatus('error');
      });
    return () => {
      ignore = true;
    };
  }, [search, team, position, sort, page, attempt]);

  if (status === 'loading') {
    return <StatusMessage type="loading" message="Loading players..." />;
  }
  if (status === 'error') {
    return <StatusMessage type="error" message={error} actionLabel="Try again" onAction={() => setAttempt(attempt + 1)} />;
  }
  if (data.players.length === 0) {
    return <StatusMessage type="empty" message="No players match these filters." actionLabel="Reset filters" onAction={onReset} />;
  }

  return (
    <>
      <p className="count">{data.total} players</p>
      <ul className="grid">
        {data.players.map((player) => (
          <PlayerCard key={player.id} player={player} onSelect={onSelect} />
        ))}
      </ul>
      <Pagination page={page} totalPages={data.totalPages} onPageChange={onPageChange} />
    </>
  );
}

export default PlayerList;
