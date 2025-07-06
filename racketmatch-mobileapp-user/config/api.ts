// config/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Podes usar process.env.EXPO_PUBLIC_API_URL se usares .env na Expo
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Troca pelo IP do teu PC se testas no device!
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// INTERCEPTOR: adiciona o token se existir no AsyncStorage
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
