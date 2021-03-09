import axios from 'axios';

const API_SERVER_ENDPOINT = '45.119.212.43:8080';
const API_SECRET_KEY = '3e73448324cb477285a0e9f371d97923';

export default axios.create({
  baseURL: `http://${API_SERVER_ENDPOINT}/${API_SECRET_KEY}/`,
});
