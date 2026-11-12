//Simulated API
import seed from '../data/players.json';
import { TEAMS, POSITIONS, teamSlug } from '../constants';

const STORAGE_KEY = 'nfl-players-real';
const FAIL_RATE = 0.05; //chance a request fails to simulate a real network

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status; //if we get 404 --> its missing, if500 its server problem
  }
}

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
  if (Math.random() < FAIL_RATE) throw new ApiError('The server did not respond. Try again.', 500);
}

function readAll() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  return seed;
}

async function request() {
  await delay();
  maybeFail();
  return readAll();
}

// GET /players?search=&team=&position=&sort=&page=&pageSize=
export async function getPlayers({ search = '', team = '', position = '', sort = 'name', page = 1, pageSize = 12 } = {}) {
  const term = search.trim().toLowerCase();
  const filtered = (await request())
    .filter((p) => !term || p.name.toLowerCase().includes(term) || p.college.toLowerCase().includes(term))
    .filter((p) => !team || p.team === team)
    .filter((p) => !position || p.position === position)
    .sort(sorters[sort] || sorters.name);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * pageSize;
  return { players: filtered.slice(start, start + pageSize), total: filtered.length, totalPages, page: current };
}

//GET /players/:id
export async function getPlayerById(id) {
  const all = await request();
  const num = Number(id);
  const player = Number.isInteger(num) ? all.find((p) => p.id === num) : undefined;
  if (!player) throw new ApiError('Player not found.', 404);
  return player;
}

//POST /players
export async function addPlayer(data) {
  const all = await request();
  const player = { ...data, id: Math.max(...all.map((p) => p.id)) + 1 };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...all, player]));
  return player;
}

//GET /players/random
export async function getRandomPlayerId() {
  const all = await request();
  return all[Math.floor(Math.random() * all.length)].id;
}

// GET /players/options(id + name for dropdowns)
export async function getPlayerOptions() {
  return (await request())
    .map(({ id, name, team, position }) => ({ id, name, team, position }))
    .sort(sorters.name);
}

//stats --> computed on serverside not client side

//changing from inches to feett. exaple: 74 -> 6'2
const feet = (inches) => `${Math.floor(inches / 12)}'${inches % 12}"`;

const average = (list, key) =>
  list.length ? Math.round((list.reduce((sum, p) => sum + p[key], 0) / list.length) * 10) / 10 : 0;

function highest(list, key, title, describe) {
  const p = list.reduce((best, x) => (x[key] > best[key] ? x : best), list[0]);
  return { title, id: p.id, name: p.name, team: p.team, display: describe(p) };
}

const EXPERIENCE_BANDS = [
  { label: '0 to 2 years', min: 0, max: 2 },
  { label: '3 to 5 years', min: 3, max: 5 },
  { label: '6 to 9 years', min: 6, max: 9 },
  { label: '10+ years', min: 10, max: Infinity },
];

function computeStats(list) {
  if (list.length === 0) return { total: 0 };
  const teamCounts = {};
  list.forEach((p) => { teamCounts[p.team] = (teamCounts[p.team] || 0) + 1; });
  return {
    total: list.length,
    teams: Object.keys(teamCounts).length,
    avgAge: average(list, 'age'),
    avgYears: average(list, 'yearsPro'),
    avgWeight: Math.round(average(list, 'weight')),
    avgHeight: feet(Math.round(average(list, 'height'))),
    byPosition: POSITIONS
      .map((position) => ({ label: position, position, count: list.filter((p) => p.position === position).length }))
      .filter((row) => row.count > 0),
    byExperience: EXPERIENCE_BANDS.map((b) => ({
      label: b.label,
      count: list.filter((p) => p.yearsPro >= b.min && p.yearsPro <= b.max).length,
    })),
    byTeam: Object.entries(teamCounts)
      .map(([team, count]) => ({ label: team, team, count }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label))
      .slice(0, 6),
    highlights: [
      highest(list, 'age', 'Oldest', (p) => `${p.age} years old`),
      highest(list, 'yearsPro', 'Most experienced', (p) => `${p.yearsPro} years in the NFL`),
      highest(list, 'weight', 'Heaviest', (p) => `${p.weight} lb`),
      highest(list, 'height', 'Tallest', (p) => feet(p.height)),
    ],
  };
}

//GET stats?team=&position=
export async function getStats({ team = '', position = '' } = {}) {
  const list = (await request())
    .filter((p) => !team || p.team === team)
    .filter((p) => !position || p.position === position);
  return computeStats(list);
}


//GET teams
export async function getTeamSummaries() {
  const all = await request();
  return TEAMS.map((name) => {
    const roster = all.filter((p) => p.team === name);
    const qb = roster.find((p) => p.position === 'QB');
    return { name, slug: teamSlug(name), count: roster.length, qb: qb ? qb.name : '' };
  });
}


export async function getTeam(slug) {
  const all = await request();
  const name = TEAMS.find((t) => teamSlug(t) === slug);
  if (!name) throw new ApiError('Team not found.', 404);
  const roster = all.filter((p) => p.team === name);
  return {
    name,
    slug,
    stats: computeStats(roster),
    groups: POSITIONS
      .map((position) => ({
        position,
        players: roster.filter((p) => p.position === position).sort(sorters.number),
      }))
      .filter((g) => g.players.length > 0),
  };
}
