// 用户相关API服务
const API_URL = 'http://localhost:8080/api';

export default {
  // 用户登录
  async login(userData) {
    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '登录失败');
      }

      const data = await response.json();
      // 保存用户信息到本地存储
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('登录请求错误:', error);
      throw error;
    }
  },

  // 用户登出
  async logout() {
    try {
      const response = await fetch(`${API_URL}/user/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('登出失败');
      }

      // 清除本地存储的用户信息
      localStorage.removeItem('userInfo');
      return true;
    } catch (error) {
      console.error('登出请求错误:', error);
      throw error;
    }
  },

  // 检查用户登录状态
  checkLoginStatus() {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }
} 