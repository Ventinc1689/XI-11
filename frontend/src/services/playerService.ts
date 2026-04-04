import api from './api';

export const PlayerService = {
    getAllPlayers: () => {
        return api.get('/players')
    },
}