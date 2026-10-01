import { TYPES, STATUSES } from "../data/pokemon";

function FilterBar({
  typeFilter,
  statusFilter,
  reversed,
  onTypeChange,
  onStatusChange,
  onReverse
}) {
  console.log("FilterBar rendered");

  return (
    <section className="bar">
      <select value={typeFilter} onChange={(e) => onTypeChange(e.target.value)}>
        <option value="All">All types</option>
        {TYPES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
        <option value="All">All statuses</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <button onClick={onReverse}>
        {reversed ? "Original order" : "Reverse order"}
      </button>
    </section>
  );
}

export default FilterBar;