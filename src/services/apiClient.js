import axios from 'axios';
import { store } from '../store/store';

const apiClient = axios.create({
  baseURL: 'https://mock.politician-admin.local/api',
  timeout: 8000
});

apiClient.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// For this demo, we'll mock responses instead of real HTTP calls.
// You can later replace these with real endpoints.
export const mockRequest = (data, delay = 600, shouldFail = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Something went wrong. Please try again.'));
      } else {
        resolve({ data });
      }
    }, delay);
  });

export default apiClient;


