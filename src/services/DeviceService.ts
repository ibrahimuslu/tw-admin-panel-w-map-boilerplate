import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import authHeader from './auth-header';
import { Response, UserDevice } from '../interfaces';

const API_URL = 'https://fake.com/api/v1/device/';

class DeviceService {
  async getDeviceList() {
    return  axios.get<Response>(API_URL + 'list', { headers: authHeader() });
  }
}

export default new DeviceService();