import axios from 'axios';

const HttpExternal = axios.create({
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  timeout: 30000,
});

export default HttpExternal;
