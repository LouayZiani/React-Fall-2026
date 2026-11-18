//this is the place components get data from. every fct returns a Promise. so its not hardcoded data it acts like an API
import * as api from '../api/playersApi';
import { PAGE_SIZE } from '../constants';

export const fetchPlayers = (params) => api.getPlayers({ pageSize: PAGE_SIZE, ...params });
export const fetchPlayer = (id) => api.getPlayerById(id);
export const createPlayer = (data) => api.addPlayer(data);
export const fetchRandomPlayerId = () => api.getRandomPlayerId();
export const fetchPlayerOptions = () => api.getPlayerOptions();
export const fetchStats = (filters) => api.getStats(filters);
export const fetchTeams = () => api.getTeamSummaries();
export const fetchTeam = (slug) => api.getTeam(slug);
