import axios from 'axios';

axios.defaults.baseURL = 'https://wookie.codesubmit.io/movies';
axios.defaults.headers.common = {'Authorization': 'Bearer Wookie2019'}

export default axios;
