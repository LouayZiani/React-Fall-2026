import PokemonCard from "./pokemonCard";

function PokemonGrid({
  pokemon,
  onRemove,
  onStatusChange,
  resetVersion
}) {
  return (
    <section className="pokemon-grid">
      {pokemon.map((item) => (
        <PokemonCard
          key={`${item.id}-${resetVersion}`}
          pokemon={item}
          onRemove={onRemove}
          onStatusChange={onStatusChange}
        />
      ))}
    </section>
  );
}

export default PokemonGrid;