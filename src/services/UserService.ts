import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://fake.com/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  async getUserBoard () {
    return await axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }
}

export default new UserService();