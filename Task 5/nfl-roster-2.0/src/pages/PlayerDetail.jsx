import { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchPlayer } from '../services/service';
import { teamSlug } from '../constants';
import useAsync from '../hooks/useAsync';
import useDocumentTitle from '../hooks/useDocumentTitle';
import StatusMessage from '../components/StatusMessage';
import NotFound from './NotFound';

function PlayerProfile({ id }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { status, data: player, error, retry } = useAsync(() => fetchPlayer(id), [id]);
  const [imageFailed, setImageFailed] = useState(false);
  useDocumentTitle(player ? player.name : 'Player');

  //because "default" means this page was opened directly so there is nothing to go back to
  const canGoBack = location.key !== 'default';
  const links = (
    <div className="crumbs">
      {canGoBack && (
        <button className="btn btn-plain" onClick={() => navigate(-1)}>Back</button>
      )}
      <Link className="btn btn-plain" to="/players">All players</Link>
    </div>
  );

  if (status === 'loading') {
    return (
      <>
        {links}
        <StatusMessage type="loading" message="Loading player..." />
      </>
    );
  }
  if (status === 'error' && error.status === 404) {
    return (
      <NotFound />
    );
  }
  if (status === 'error') {
    return (
      <>
        {links}
        <StatusMessage type="error" message={error.message} actionLabel="Try again" onAction={retry} />
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
      {location.state?.notice && <p className="notice" role="status">{location.state.notice}</p>}
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
            <Link className="btn" to={`/compare?a=${player.id}`}>Compare with another player</Link>
            <Link className="btn btn-plain" to={`/teams/${teamSlug(player.team)}`}>More from {player.team}</Link>
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
  //key={id}: moving from one player to anther starts with fresh state (image error flag, loading)
  return <PlayerProfile key={id} id={id} />;
}

export default PlayerDetail;
