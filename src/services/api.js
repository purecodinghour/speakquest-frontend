import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000'; // api-gateway의 주소
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const login = (user_name, password) => {
  return api.post('/auth/login', { user_name, password });
};

export const register = (user_name, password) => {
    return api.post('/auth/register', { user_name, password });
  };

export const getQuests = () => {
  return api.get('/quests');
};

// 기타 API 호출 함수들...

export default api;