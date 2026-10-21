import { useState } from "react";
import { STATUS_LABEL, NEXT_ACTION } from "../constants.js";

export default function PlayerDetails({ player, busyLabel, onStatus, onEdit, onDelete, onRefresh }) {
  const [confirming, setConfirming] = useState(false);
  const locked = Boolean(busyLabel);
  const next = NEXT_ACTION[player.status] ?? NEXT_ACTION.active;

  const facts = [
    ["Team", player.team || "—"],
    ["Position", player.position || "—"],
    ["Jersey", player.jersey != null ? `#${player.jersey}` : "—"],
    ["Height", player.height || "—"],
    ["Age", player.age ?? "—"],
    ["Salary", player.salary != null ? `$${Number(player.salary).toFixed(1)}M / yr` : "—"],
    ["Player ID", `#${player.id}`],
  ];

  const stats = [
    ["PPG", player.ppg],
    ["RPG", player.rpg],
    ["APG", player.apg],
  ];

  return (
    <div>
      <div className="detail-head">
        <h2>{player.name}</h2>
        <span className={`badge ${player.status}`}>{STATUS_LABEL[player.status] ?? "Unknown"}</span>
      </div>
      <p className="lead">{player.description}</p>

      <div className="stat-strip">
        {stats.map(([label, value]) => (
          <div key={label}>
            <strong>{value != null ? Number(value).toFixed(1) : "—"}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <dl className="facts">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      {locked && <p className="busy-line">Player is {busyLabel}. Other actions are locked until it finishes.</p>}

      <div className="actions">
        <button className="primary" disabled={locked} onClick={() => onStatus(next.to)}>
          {busyLabel === "updating" ? "Working" : next.label}
        </button>
        <button disabled={locked} onClick={onEdit}>Edit</button>
        <button disabled={locked} onClick={onRefresh}>Refresh</button>

        {!confirming ? (
          <button className="danger" disabled={locked} onClick={() => setConfirming(true)}>Remove</button>
        ) : (
          <span className="confirm">
            Sure?
            <button className="danger" disabled={locked} onClick={onDelete}>Yes, remove</button>
            <button onClick={() => setConfirming(false)}>Cancel</button>
          </span>
        )}
      </div>
    </div>
  );
}
