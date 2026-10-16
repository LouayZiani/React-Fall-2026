import { useState } from 'react';
import FilterBar from './FilterBar';
import PlayerList from './PlayerList';
import PlayerDetail from './PlayerDetail';
import AddPlayerForm from './AddPlayerForm';

function PlayersPage() {
  const [view, setView] = useState('list');
  const [selectedId, setSelectedId] = useState(null);
  const [notice, setNotice] = useState('');
  const [search, setSearch] = useState('');
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState('');
  const [sort, setSort] = useState('name');
  const [page, setPage] = useState(1);

  function handleSearchChange(value) {
    setSearch(value);
    setPage(1);
  }
  function handleTeamChange(value) {
    setTeam(value);
    setPage(1);
  }
  function handlePositionChange(value) {
    setPosition(value);
    setPage(1);
  }
  function handleSortChange(value) {
    setSort(value);
    setPage(1);
  }
  function handleReset() {
    setSearch('');
    setTeam('');
    setPosition('');
    setSort('name');
    setPage(1);
  }
  function openPlayer(id) {
    setSelectedId(id);
    setNotice('');
    setView('detail');
  }
  function showList() {
    setNotice('');
    setView('list');
  }
  function handleAdded(player) {
    setSelectedId(player.id);
    setNotice(`${player.name} was added.`);
    setView('detail');
  }

  if (view === 'add') {
    return <AddPlayerForm onAdded={handleAdded} onCancel={showList} />;
  }

  if (view === 'detail') {
    return (
      <>
        {notice && <p className="notice" role="status">{notice}</p>}
        <PlayerDetail key={selectedId} id={selectedId} onBack={showList} />
      </>
    );
  }

  return (
    <>
      <div className="toolbar">
        <h2>Players</h2>
        <button className="btn" onClick={() => setView('add')}>Add player</button>
      </div>
      <FilterBar
        search={search}
        team={team}
        position={position}
        sort={sort}
        onSearchChange={handleSearchChange}
        onTeamChange={handleTeamChange}
        onPositionChange={handlePositionChange}
        onSortChange={handleSortChange}
        onReset={handleReset}
      />
      <PlayerList
        search={search}
        team={team}
        position={position}
        sort={sort}
        page={page}
        onPageChange={setPage}
        onSelect={openPlayer}
        onReset={handleReset}
      />
    </>
  );
}

export default PlayersPage;