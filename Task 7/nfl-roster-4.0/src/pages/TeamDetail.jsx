
import { Link, useParams } from 'react-router-dom';
import { useTeam } from '../hooks/usePlayers';
import { CHIEFS } from '../constants';
import useDocumentTitle from '../hooks/useDocumentTitle';
import StatCard from '../components/StatCard';
import PlayerCard from '../components/PlayerCard';
import StatusMessage from '../components/StatusMessage';
import NotFound from './NotFound';

function TeamDetail() {
  const { slug } = useParams();

  const { data: team, error, isPending, isError, refetch } = useTeam(slug);

  useDocumentTitle(team ? team.name : 'Team');

  if (isPending) {
    return <StatusMessage type="loading" message="Loading team..." />;
  }

  if (isError && error.status === 404) {
    return <NotFound />;
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

  const { stats } = team;

  return (
    <>
      <div className="crumbs">
        <Link className="btn btn-plain" to="/teams">All teams</Link>
      </div>

      <h1 className={team.name === CHIEFS ? 'team-title team-title-chiefs' : 'team-title'}>
        {team.name}
      </h1>

      {stats.total === 0 ? (
        <StatusMessage
          type="empty"
          message="No players from this team are in the dataset yet."
        />
      ) : (
        <>
          <div className="stats">
            <StatCard label="Players" value={stats.total} />
            <StatCard label="Average age" value={stats.avgAge} />
            <StatCard label="Average years in the NFL" value={stats.avgYears} />
            <StatCard label="Average weight" value={`${stats.avgWeight} lb`} />
          </div>

          <p className="detail-actions">
            <Link
              className="btn"
              to={`/players?team=${encodeURIComponent(team.name)}`}
            >
              Open in player list
            </Link>

            <Link
              className="btn btn-plain"
              to={`/dashboard?team=${encodeURIComponent(team.name)}`}
            >
              Team dashboard
            </Link>
          </p>

          {team.groups.map((group) => (
            <section key={group.position}>
              <h2 className="group-title">{group.position}</h2>
              <ul className="grid">
                {group.players.map((player) => (
                  <PlayerCard key={player.id} player={player} />
                ))}
              </ul>
            </section>
          ))}
        </>
      )}
    </>
  );
}

export default TeamDetail;
