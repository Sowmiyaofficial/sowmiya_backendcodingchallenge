import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/players';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const playerService = {
  getAllPlayers: async () => {
    const response = await api.get('');
    return response.data;
  },

  getPlayerById: async (playerId) => {
    const response = await api.get(`/${playerId}`);
    return response.data;
  },

  createPlayer: async (playerData) => {
    const response = await api.post('', playerData);
    return response.data;
  },

  updatePlayer: async (playerId, playerData) => {
    const response = await api.put(`/${playerId}`, playerData);
    return response.data;
  },

  deletePlayer: async (playerId) => {
    const response = await api.delete(`/${playerId}`);
    return response.data;
  },
};

export default playerService;