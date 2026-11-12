
import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

import { teamSlug } from '../constants';
import useDocumentTitle from '../hooks/useDocumentTitle';
import StatusMessage from '../components/StatusMessage';
import NotFound from './NotFound';
import { usePlayer } from '../hooks/usePlayers';

function PlayerProfile({ id }) {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: player,
    isPending,
    isError,
    error,
    refetch,
  } = usePlayer(id);

  const [imageFailed, setImageFailed] = useState(false);

  useDocumentTitle(player ? player.name : 'Player');

  const canGoBack = location.key !== 'default';

  const links = (
    <div className="crumbs">
      {canGoBack && (
        <button className="btn btn-plain" onClick={() => navigate(-1)}>
          Back
        </button>
      )}
      <Link className="btn btn-plain" to="/players">
        All players
      </Link>
    </div>
  );

  if (isPending) {
    return (
      <>
        {links}
        <StatusMessage type="loading" message="Loading player..." />
      </>
    );
  }

  if (isError && error?.status === 404) {
    return <NotFound />;
  }

  if (isError) {
    return (
      <>
        {links}
        <StatusMessage
          type="error"
          message={error.message}
          actionLabel="Try again"
          onAction={() => refetch()}
        />
      </>
    );
  }

  const rows = [
    ['Team', <Link to={`/teams/${teamSlug(player.team)}`}>{player.team}</Link>],
    ['Position', <Link to={`/players?position=${player.position}`}>{player.position}</Link>],
    ['Jersey number', player.number],
    ['Age', player.age],
    ['College', player.college || 'Not listed'],
    ['Years in the NFL', player.yearsPro],
    ['Height', `${Math.floor(player.height / 12)}'${player.height % 12}"`],
    ['Weight', `${player.weight} lb`],
  ];

  return (
    <article className="detail">
      {links}

      {location.state?.notice && (
        <p className="notice" role="status">
          {location.state.notice}
        </p>
      )}

      <h1>{player.name}</h1>

      <div className="detail-body">
        <div>
          <dl>
            {rows.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <div className="detail-actions">
            <Link className="btn" to={`/compare?a=${player.id}`}>
              Compare with another player
            </Link>

            <Link className="btn btn-plain" to={`/teams/${teamSlug(player.team)}`}>
              More from {player.team}
            </Link>
          </div>
        </div>

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

function PlayerDetail() {
  const { id } = useParams();

  return <PlayerProfile key={id} id={id} />;
}

export default PlayerDetail;
