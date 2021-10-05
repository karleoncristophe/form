import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:4000',
   timeout: 1000,
   headers: {
      'X-Custom-Header': 'foobar',
      Authorization: `Bearer ${localStorage.getItem('@form.token')}`,
   },
});

export default api;
