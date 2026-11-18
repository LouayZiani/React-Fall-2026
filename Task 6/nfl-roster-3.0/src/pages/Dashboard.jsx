
import { Link, useSearchParams } from 'react-router-dom';
import { useStats } from '../hooks/usePlayers';
import { TEAMS, POSITIONS } from '../constants';
import useDocumentTitle from '../hooks/useDocumentTitle';
import StatCard from '../components/StatCard';
import BarList from '../components/BarList';
import StatusMessage from '../components/StatusMessage';

function playersLink({ team, position }) {
  const qs = new URLSearchParams();

  if (team) qs.set('team', team);
  if (position) qs.set('position', position);

  const text = qs.toString();
  return text ? `/players?${text}` : '/players';
}

function Dashboard() {
  useDocumentTitle('Dashboard');

  const [params, setParams] = useSearchParams();
  const team = params.get('team') ?? '';
  const position = params.get('position') ?? '';

  const { data, error, isPending, isError, refetch } = useStats({
    team,
    position,
  });

  function setFilter(key, value) {
    const next = new URLSearchParams(params);

    if (value) next.set(key, value);
    else next.delete(key);

    setParams(next);
  }

  let content;

  if (isPending) {
    content = <StatusMessage type="loading" message="Crunching the numbers..." />;
  } else if (isError) {
    content = (
      <StatusMessage
        type="error"
        message={error.message}
        actionLabel="Try again"
        onAction={refetch}
      />
    );
  } else if (data.total === 0) {
    content = (
      <StatusMessage
        type="empty"
        message="No players match this team and position."
        actionLabel="Clear filters"
        onAction={() => setParams({})}
      />
    );
  } else {
    content = (
      <>
        <div className="stats">
          <StatCard label="Players" value={data.total} />
          <StatCard label="Teams" value={data.teams} />
          <StatCard label="Average age" value={data.avgAge} />
          <StatCard label="Average years in the NFL" value={data.avgYears} />
          <StatCard label="Average weight" value={`${data.avgWeight} lb`} />
          <StatCard label="Average height" value={data.avgHeight} />
        </div>

        <div className="breakdowns">
          <BarList
            title="By position"
            items={data.byPosition.map((r) => ({
              ...r,
              to: playersLink({ team, position: r.position }),
            }))}
          />

          <BarList title="By experience" items={data.byExperience} />

          <BarList
            title="Teams with the most players"
            items={data.byTeam.map((r) => ({
              ...r,
              to: playersLink({ team: r.team, position }),
            }))}
          />
        </div>

        <section className="breakdown">
          <h3>Standouts</h3>
          <ul className="highlights">
            {data.highlights.map((h) => (
              <li key={h.title}>
                <span className="muted">{h.title}</span>
                <Link to={`/players/${h.id}`}>{h.name}</Link>
                <span>{h.team}, {h.display}</span>
              </li>
            ))}
          </ul>
        </section>

        <p>
          <Link className="btn" to={playersLink({ team, position })}>
            See these players
          </Link>
        </p>
      </>
    );
  }

  return (
    <>
      <div className="toolbar">
        <h1>Dashboard</h1>
      </div>

      <div className="filters filters-short">
        <label>
          Team
          <select value={team} onChange={(e) => setFilter('team', e.target.value)}>
            <option value="">All teams</option>
            {TEAMS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>

        <label>
          Position
          <select value={position} onChange={(e) => setFilter('position', e.target.value)}>
            <option value="">All positions</option>
            {POSITIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </label>

        <button className="btn btn-plain" onClick={() => setParams({})}>
          Reset
        </button>
      </div>

      {content}
    </>
  );
}

export default Dashboard;
