import axios from 'axios';
import { cookies } from 'next/headers';

const Http = axios.create({
  baseURL: process.env.API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, PUT, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  },
  timeout: 30000,
});

Http.interceptors.request.use(
  async (config: any) => {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default Http;
