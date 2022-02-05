import axios, { AxiosResponse } from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://fake.com/api/v1/';

interface Responsed {
  success: boolean
  token : string
}
class AuthService {
  verify(emailOrPhone: string, code: string) {
    const user = {emailOrPhone, code, token:""}
    return axios
      .post<Responsed>(API_URL + 'auth/verify', {
        emailOrPhone,
        code
      })
      .then((response) => {
        if (response.data.token) {
            axios.defaults.headers.common['Authorization'] = response.data.token
            user.token = response.data.token
            localStorage.setItem('user', JSON.stringify(user));
        }

        return response.data;
      });
  }
  login(emailOrPhone: string) {
    return axios
      .post<Responsed>(API_URL + 'auth/login', {
        emailOrPhone,
      })
      .then((response) => {
        return response.data;
      });
  }
  logout() {
    return axios.get(API_URL + 'user/logout',{ headers: authHeader() });
  }
  register(username: string, email: string, password: string) {
    return axios.post(API_URL + 'auth/register', {
      username,
      email,
      password
    });
  }
}

export default new AuthService();