export const TYPES = ["Electric", "Fire", "Ghost", "Grass", "Fighting", "Normal", "Rock"];
export const STATUSES = ["Active", "Training", "Resting"];

const pokemonData = [
  { id: 1, name: "Pikachu", type: "Electric", level: 35, move: "Thunderbolt", image: "pikachu.jpg", status: "Active" },
  { id: 2, name: "Charizard", type: "Fire", level: 62, move: "Flamethrower", image: "charizard.jpg", status: "Training" },
  { id: 3, name: "Gengar", type: "Ghost", level: 48, move: "Shadow Ball", image: "gengar.jpg", status: "Active" },
  { id: 4, name: "Bulbasaur", type: "Grass", level: 18, move: "Vine Whip", image: "onion_turtle.png", status: "Resting" },
  { id: 5, name: "Lucario", type: "Fighting", level: 55, move: "Aura Sphere", image: "lucario.png", status: "Training" },
  { id: 6, name: "Eevee", type: "Normal", level: 20, move: "Quick Attack", image: "eevee.png", status: "Resting" },
  { id: 7, name: "Geodude", type: "Rock", level: 25, move: "Rock Throw", image: "punchy_rock.png", status: "Active" },
  { id: 8, name: "Weepinbell", type: "Grass", level: 30, move: "Razor Leaf", image: "almost_a_pair.png", status: "Active" }
];

export default pokemonData;