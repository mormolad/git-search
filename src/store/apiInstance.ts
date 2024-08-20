import axios from 'axios';

const URL = 'https://api.github.com/';

const instance = axios.create({
  baseURL: `${URL}`,
});

export default instance;
