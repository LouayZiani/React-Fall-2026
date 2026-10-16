function PlayerCard({ player, onSelect }) {
  return (
    <li>
      <button className="card" onClick={() => onSelect(player.id)}>
        <span className="card-number">{player.number}</span>
        <span className="card-body">
          <span className="card-name">{player.name}</span>
          <span className="card-team">{player.team}</span>
          <span className="card-meta">
            <span className="tag">{player.position}</span>
            <span>Age {player.age}</span>
          </span>
        </span>
      </button>
    </li>
  );
}

export default PlayerCard;