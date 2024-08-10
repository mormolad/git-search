import axios from 'axios';

const URL = 'https://api.github.com/search/repositories?q=';

const instance = axios.create({
  baseURL: `${URL}`,
});

export default instance;
