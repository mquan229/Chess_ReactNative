import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Tạo instance của axios
const apiInstance = axios.create({
  baseURL: 'http://covua.coi.vn/api/', // Cấu hình URL chung của API
  timeout: 5000, // Đặt thời gian timeout cho request
  headers: {
    'Content-Type': 'application/json',
    'X-Access-OS': 'ANDROID',
    'X-Access-Version': '1.0.0',
  },
});

// Tạo một function để thêm token vào headers khi có yêu cầu
apiInstance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('TOKEN_ACCESS');
    if (token) {
      config.headers['X-Access-Token'] = token; // Thêm token vào headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiInstance;
