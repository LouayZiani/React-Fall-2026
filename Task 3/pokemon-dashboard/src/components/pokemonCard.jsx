import { useState } from "react";
import { STATUSES } from "../data/pokemon";

const IMG = "pokemon/";

function PokemonCard({ pokemon, onRemove, onStatusChange, onReset }) {
  // local state: lives inside this card instance
  const [favorite, setFavorite] = useState(false);
  const [trainCount, setTrainCount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  console.log("PokemonCard rendered:", pokemon.name);

  return (
    <article className={favorite ? "card favorite" : "card"}>
      <img src={IMG + pokemon.image} alt={pokemon.name} />

      <h2>{pokemon.name}</h2>
      <p className="meta">
        {pokemon.type} · Lv. {pokemon.level}
      </p>

      <select
        value={pokemon.status}
        onChange={(e) => onStatusChange(pokemon.id, e.target.value)}
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <p className="meta">Trained {trainCount} times</p>

      {showDetails && (
        <p className="meta">
          Move: {pokemon.move} · {favorite ? "Favorite" : "Not favorite"}
        </p>
      )}

      <div className="buttons">
        <button onClick={() => setTrainCount(trainCount + 1)}>Train</button>
        <button onClick={() => setFavorite(!favorite)}>
          {favorite ? "Unfavorite" : "Favorite"}
        </button>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "Hide" : "Details"}
        </button>
        <button onClick={() => onReset(pokemon.id)}>Reset</button>
        <button className="remove" onClick={() => onRemove(pokemon.id)}>Remove</button>
      </div>
    </article>
  );
}

export default PokemonCard;