import { useState } from "react";
import { TYPES } from "../data/pokemon";

function AddPokemon({ onAdd }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("Electric");
  const [level, setLevel] = useState(10);

  console.log("AddPokemon rendered");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;

    onAdd({
      id: Date.now(),
      name: name.trim(),
      type,
      level: Number(level),
      move: "Tackle",
      image: "default.png",
      status: "Active"
    });

    setName("");
  };

  return (
    <form className="add" onSubmit={handleSubmit}>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        {TYPES.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <input
        type="number"
        min="1"
        max="100"
        title="Level"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddPokemon;