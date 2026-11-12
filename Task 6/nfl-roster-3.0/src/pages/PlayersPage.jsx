import { Link, useSearchParams } from 'react-router-dom';
import { SORT_OPTIONS, DEFAULT_SORT } from '../constants';
import useDocumentTitle from '../hooks/useDocumentTitle';
import FilterBar from '../components/FilterBar';
import PlayerList from '../components/PlayerList';

function PlayersPage() {
  useDocumentTitle('Players');
  const [params, setParams] = useSearchParams();

  const search = params.get('q') ?? '';
  const team = params.get('team') ?? '';
  const position = params.get('position') ?? '';
  const sortParam = params.get('sort');
  const sort = SORT_OPTIONS.some((o) => o.value === sortParam) ? sortParam : DEFAULT_SORT;
  const page = Math.max(1, parseInt(params.get('page'), 10) || 1);


  
  function changeParam(key, value, replace = false) {
    const next = new URLSearchParams(params);
    const isDefault = !value || (key === 'sort' && value === DEFAULT_SORT) || (key === 'page' && value === 1);
    if (isDefault) next.delete(key);
    else next.set(key, value);
    if (key !== 'page') next.delete('page');
    setParams(next, { replace });
  }

  return (
    <>
      <div className="toolbar">
        <h1>Players</h1>
        <Link className="btn" to="/players/new">Add player</Link>
      </div>
      <FilterBar
        search={search}
        team={team}
        position={position}
        sort={sort}
        onSearchChange={(value) => changeParam('q', value, true)}
        onTeamChange={(value) => changeParam('team', value)}
        onPositionChange={(value) => changeParam('position', value)}
        onSortChange={(value) => changeParam('sort', value)}
        onReset={() => setParams({})}
      />
      <PlayerList
        search={search}
        team={team}
        position={position}
        sort={sort}
        page={page}
        onPageChange={(value) => changeParam('page', value)}
        onReset={() => setParams({})}
      />
    </>
  );
}

export default PlayersPage;
