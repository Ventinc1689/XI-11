import api from './api';
import type { Player, PlayerFilters } from '../types/player';

export const PlayerService = {
    getAllPlayers: (filters?: PlayerFilters) => {
        return api.get<Player[]>('/players', { params: filters})
    },
}