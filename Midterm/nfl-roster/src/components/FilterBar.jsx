import { TEAMS, POSITIONS, SORT_OPTIONS } from '../constants';

function FilterBar({ search, team, position, sort, onSearchChange, onTeamChange, onPositionChange, onSortChange, onReset }) {
  return (
    <div className="filters">
      <label>
        Search
        <input type="search" value={search} onChange={(e) => onSearchChange(e.target.value)} placeholder="Player or college" />
      </label>
      <label>
        Team
        <select value={team} onChange={(e) => onTeamChange(e.target.value)}>
          <option value="">All teams</option>
          {TEAMS.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </label>
      <label>
        Position
        <select value={position} onChange={(e) => onPositionChange(e.target.value)}>
          <option value="">All positions</option>
          {POSITIONS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </label>
      <label>
        Sort by
        <select value={sort} onChange={(e) => onSortChange(e.target.value)}>
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>
      <button className="btn btn-plain" onClick={onReset}>Reset</button>
    </div>
  );
}

export default FilterBar;
