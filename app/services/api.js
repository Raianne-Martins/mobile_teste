// Exemplo: src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000', // Utilize 10.0.2.2 para acessar o seu computador a partir do emulador Android
});

export default api;

