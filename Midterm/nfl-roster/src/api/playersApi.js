import seed from '../data/players.json';

const STORAGE_KEY = 'nfl-players-real';
const FAIL_RATE = 0.05; // chance a request fails, to simulate a flaky network (set to 0 to turn off)

const sorters = {
  name: (a, b) => a.name.localeCompare(b.name),
  age: (a, b) => a.age - b.age,
  experience: (a, b) => b.yearsPro - a.yearsPro,
  number: (a, b) => a.number - b.number,
  weight: (a, b) => b.weight - a.weight,
};

function delay() {
  return new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 700));
}

function maybeFail() {
  if (Math.random() < FAIL_RATE) throw new Error('The server did not respond. Try again.');
}

function readAll() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

export async function getPlayers({ search, team, position, sort, page, pageSize }) {
  await delay();
  maybeFail();
  const term = search.trim().toLowerCase();
  const filtered = readAll()
    .filter((p) => !term || p.name.toLowerCase().includes(term) || p.college.toLowerCase().includes(term))
    .filter((p) => !team || p.team === team)
    .filter((p) => !position || p.position === position)
    .sort(sorters[sort]);
  const start = (page - 1) * pageSize;
  return {
    players: filtered.slice(start, start + pageSize),
    total: filtered.length,
    totalPages: Math.max(1, Math.ceil(filtered.length / pageSize)),
  };
}

export async function getPlayerById(id) {
  await delay();
  maybeFail();
  const player = readAll().find((p) => p.id === id);
  if (!player) throw new Error('Player not found.');
  return player;
}

export async function addPlayer(data) {
  await delay();
  maybeFail();
  const all = readAll();
  const player = { ...data, id: Math.max(...all.map((p) => p.id)) + 1 };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...all, player]));
  return player;
}