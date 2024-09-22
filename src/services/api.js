import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = (user_name, password) => {
  return api.post('/auth/login', { user_name, password });
};

export const register = (user_name, password) => {
  return api.post('/auth/register', { user_name, password });
};

export const getActiveQuests = async (userId) => {
  try {
    console.log('Calling getActiveQuests for userId:', userId);
    const response = await api.get(`/user-quests/active-quests/${userId}`);
    console.log('getActiveQuests response:', response);
    return response;
  } catch (error) {
    console.error('Error in getActiveQuests:', error);
    throw error;
  }
};

export const getCompletedQuests = async (userId) => {
  try {
    console.log('Calling getCompletedQuests for userId:', userId);
    const response = await api.get(`/user-quests/completed-quests/${userId}`);
    console.log('getCompletedQuests response:', response);
    return response;
  } catch (error) {
    console.error('Error in getCompletedQuests:', error);
    throw error;
  }
};

export const getRewardedQuests = async (userId) => {
  try {
    console.log('Calling getRewardedQuests for userId:', userId);
    const response = await api.get(`/user-quests/rewarded-quests/${userId}`);
    console.log('getRewardedQuests response:', response);
    return response;
  } catch (error) {
    console.error('Error in getRewardedQuests:', error);
    throw error;
  }
};

export const getAllQuests = async (userId) => {
  try {
    console.log('Calling getAllQuests for userId:', userId);
    const response = await api.get(`/user-quests/all-quests/${userId}`);
    console.log('getAllQuests response:', response);
    return response;
  } catch (error) {
    console.error('Error in getAllQuests:', error);
    throw error;
  }
};

export const claimReward = (userId, questId) => {
  return axios.put(`${API_BASE_URL}/user-quests/claimReward`, { user_id: userId, quest_id: questId });
};


export const getUserRewards = (userId) => {
  return api.get(`/users/${userId}/rewards`);
};

export const getUser = async () => {
  const response = await api.get('/users');
  return response.data;
};

export default api;