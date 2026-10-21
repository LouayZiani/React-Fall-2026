import { useState, useEffect } from "react";
import { STATUSES, STATUS_LABEL, POSITIONS } from "../constants.js";

const EMPTY = {
  name: "", description: "", status: "active", team: "", position: "SG",
  jersey: "0", height: "", age: "22", salary: "5", ppg: "0", rpg: "0", apg: "0",
};

function toFormValues(p) {
  const out = { ...EMPTY };
  for (const key of Object.keys(EMPTY)) {
    if (p[key] !== undefined && p[key] !== null) out[key] = String(p[key]);
  }
  return out;
}

export default function PlayerForm({ mode, player, onSubmit, onClose }) {
  const [values, setValues] = useState(() => (player ? toFormValues(player) : EMPTY));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && !saving) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [saving, onClose]);

  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    if (!values.name.trim()) return setError("A player needs a name.");
    if (Number(values.age) < 16) return setError("Age looks off. Minimum is 16.");
    if (Number(values.salary) < 0) return setError("Salary can't be negative.");
    if (Number(values.jersey) < 0 || Number(values.jersey) > 99) return setError("Jersey number must be 0–99.");

    setSaving(true);
    setError("");
    try {
      await onSubmit({
        name: values.name.trim(),
        description: values.description.trim(),
        status: values.status,
        team: values.team.trim(),
        position: values.position,
        jersey: Number(values.jersey),
        height: values.height.trim(),
        age: Number(values.age),
        salary: Number(values.salary),
        ppg: Number(values.ppg),
        rpg: Number(values.rpg),
        apg: Number(values.apg),
      });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && !saving && onClose()}>
      <form className="modal" onSubmit={handleSubmit}>
        <h2>{mode === "edit" ? "Edit player" : "Sign new player"}</h2>

        <label>Name
          <input value={values.name} onChange={set("name")} autoFocus />
        </label>
        <label>Scouting note
          <textarea rows="3" value={values.description} onChange={set("description")} />
        </label>

        <div className="grid2">
          <label>Team
            <input value={values.team} onChange={set("team")} />
          </label>
          <label>Status
            <select value={values.status} onChange={set("status")}>
              {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
            </select>
          </label>
          <label>Position
            <select value={values.position} onChange={set("position")}>
              {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label>Jersey #
            <input type="number" min="0" max="99" value={values.jersey} onChange={set("jersey")} />
          </label>
          <label>Height
            <input placeholder={`6'8"`} value={values.height} onChange={set("height")} />
          </label>
          <label>Age
            <input type="number" min="16" value={values.age} onChange={set("age")} />
          </label>
          <label>Salary ($M / yr)
            <input type="number" min="0" step="0.1" value={values.salary} onChange={set("salary")} />
          </label>
          <label>PPG
            <input type="number" min="0" step="0.1" value={values.ppg} onChange={set("ppg")} />
          </label>
          <label>RPG
            <input type="number" min="0" step="0.1" value={values.rpg} onChange={set("rpg")} />
          </label>
          <label>APG
            <input type="number" min="0" step="0.1" value={values.apg} onChange={set("apg")} />
          </label>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="actions end">
          <button type="button" onClick={onClose} disabled={saving}>Cancel</button>
          <button className="primary" type="submit" disabled={saving}>
            {saving ? "Saving" : mode === "edit" ? "Save changes" : "Sign player"}
          </button>
        </div>
      </form>
    </div>
  );
}
