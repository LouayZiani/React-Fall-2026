import { useState, useEffect } from 'react';
import { getPlayerById } from '../api/playersApi';
import StatusMessage from './StatusMessage';

function PlayerDetail({ id, onBack }) {
  const [status, setStatus] = useState('loading');
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState('');
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    let ignore = false;
    setStatus('loading');
    getPlayerById(id)
      .then((result) => {
        if (ignore) return;
        setPlayer(result);
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
  }, [id]);

  if (status === 'loading') return <StatusMessage type="loading" message="Loading player..." />;
  if (status === 'error') return <StatusMessage type="error" message={error} actionLabel="Back to players" onAction={onBack} />;

  const rows = [
    ['Team', player.team],
    ['Position', player.position],
    ['Jersey number', player.number],
    ['Age', player.age],
    ['College', player.college],
    ['Years in the NFL', player.yearsPro],
    ['Height', `${Math.floor(player.height / 12)}'${player.height % 12}"`],
    ['Weight', `${player.weight} lb`],
  ];

  return (
    <article className="detail">
      <button className="btn btn-plain" onClick={onBack}>Back to players</button>
      <h2>{player.name}</h2>
      <div className="detail-body">
        <dl>
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        {player.headshot && !imageFailed ? (
          <img
            className="photo"
            src={player.headshot}
            alt={player.name}
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="photo photo-empty">{player.number}</div>
        )}
      </div>
    </article>
  );
}

export default PlayerDetail;