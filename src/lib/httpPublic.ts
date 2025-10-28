import axios from 'axios';

const HttpPublic = axios.create({
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

export default HttpPublic;
