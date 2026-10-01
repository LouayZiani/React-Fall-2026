import { useState } from "react";
import pokemonData from "./data/pokemon";
import FilterBar from "./components/filterBar";
import PokemonCard from "./components/pokemonCard";
import AddPokemon from "./components/addPokemon";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState(pokemonData);
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reversed, setReversed] = useState(false);
  // how many times each card was reset, used in the key to remount that card
  const [resets, setResets] = useState({});

  console.log("App rendered");

  const addPokemon = (newPokemon) => {
    setPokemon((current) => [...current, newPokemon]);
  };

  const removePokemon = (id) => {
    setPokemon((current) => current.filter((p) => p.id !== id));
  };

  const changeStatus = (id, status) => {
    setPokemon((current) =>
      current.map((p) => (p.id === id ? { ...p, status } : p))
    );
  };

  const resetCard = (id) => {
    setResets((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
  };

  const filtered = pokemon.filter(
    (p) =>
      (typeFilter === "All" || p.type === typeFilter) &&
      (statusFilter === "All" || p.status === statusFilter)
  );

  const shown = reversed ? [...filtered].reverse() : filtered;

  return (
    <div
      className="app"
      style={{
        backgroundImage:
          "linear-gradient(rgba(10,10,10,0.65), rgba(10,10,10,0.85)), url(pokemon/poki-bg.jpg)"
      }}
    >
      <header>
        <h1>poki dump</h1>
        <p>
          {pokemon.length} total / {shown.length} shown
        </p>
      </header>

      <FilterBar
        typeFilter={typeFilter}
        statusFilter={statusFilter}
        reversed={reversed}
        onTypeChange={setTypeFilter}
        onStatusChange={setStatusFilter}
        onReverse={() => setReversed(!reversed)}
      />

      {shown.length > 0 ? (
        <div className="grid">
          {shown.map((p) => (
            <PokemonCard
              key={`${p.id}-${resets[p.id] || 0}`}
              pokemon={p}
              onRemove={removePokemon}
              onStatusChange={changeStatus}
              onReset={resetCard}
            />
          ))}
        </div>
      ) : (
        <p className="empty">No Pokémon match these filters.</p>
      )}

      <AddPokemon onAdd={addPokemon} />
    </div>
  );
}

export default App;