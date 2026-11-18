
import { useTeams } from '../hooks/usePlayers';
import { CHIEFS } from '../constants';
import useDocumentTitle from '../hooks/useDocumentTitle';
import Card from '../components/Card';
import StatusMessage from '../components/StatusMessage';

function Teams() {
  useDocumentTitle('Teams');

  const { data, error, isPending, isError, refetch } = useTeams();

  return (
    <>
      <div className="toolbar">
        <h1>Teams</h1>
      </div>

      {isPending && (
        <StatusMessage type="loading" message="Loading teams..." />
      )}

      {isError && (
        <StatusMessage
          type="error"
          message={error.message}
          actionLabel="Try again"
          onAction={refetch}
        />
      )}

      {!isPending && !isError && (
        <ul className="grid">
          {data.map((team) => (
            <Card
              key={team.slug}
              to={`/teams/${team.slug}`}
              className={team.name === CHIEFS ? 'card-chiefs' : ''}
            >
              <span className="card-body">
                <span className="card-name">{team.name}</span>
                <span className="card-team">{team.count} players</span>
                <span className="card-meta">
                  {team.qb ? `QB: ${team.qb}` : 'No QB listed'}
                </span>
              </span>
            </Card>
          ))}
        </ul>
      )}
    </>
  );
}

export default Teams;
