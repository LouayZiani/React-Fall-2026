import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  fetchPlayers,
  fetchPlayer,
  createPlayer,
  fetchStats,
  fetchTeams,
  fetchTeam,
  fetchPlayerOptions,
  fetchRandomPlayerId,
} from '../services/service';

export const playerKeys = {
  all: ['players'],
  lists: () => [...playerKeys.all, 'list'],
  list: (filters) => [...playerKeys.lists(), filters],
  details: () => [...playerKeys.all, 'detail'],
  detail: (id) => [...playerKeys.details(), id],
  options: () => [...playerKeys.all, 'options'],
  stats: (filters) => ['stats', filters],
  teams: () => ['teams'],
  team: (slug) => ['team', slug],
  random: () => [...playerKeys.all, 'random'],
};

export function usePlayers(filters) {
  return useQuery({
    queryKey: playerKeys.list(filters),
    queryFn: () => fetchPlayers(filters),
  });
}

export function usePlayer(id) {
  return useQuery({
    queryKey: playerKeys.detail(id),
    queryFn: () => fetchPlayer(id),
    enabled: !!id,
  });
}

export function usePlayerOptions() {
  return useQuery({
    queryKey: playerKeys.options(),
    queryFn: fetchPlayerOptions,
  });
}

export function useStats(filters) {
  return useQuery({
    queryKey: playerKeys.stats(filters),
    queryFn: () => fetchStats(filters),
  });
}

export function useTeams() {
  return useQuery({
    queryKey: playerKeys.teams(),
    queryFn: fetchTeams,
  });
}

export function useTeam(slug) {
  return useQuery({
    queryKey: playerKeys.team(slug),
    queryFn: () => fetchTeam(slug),
    enabled: !!slug,
  });
}

export function useRandomPlayerId() {
  return useQuery({
    queryKey: playerKeys.random(),
    queryFn: fetchRandomPlayerId,
    staleTime: 0,
  });
}

export function useAddPlayer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: playerKeys.all });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['team'] });
    },
  });
}
