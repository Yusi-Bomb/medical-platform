<template>
  <div>
    <!-- 登录按钮和用户信息区域 -->
    <div class="login-section">
      <button v-if="!isLoggedIn" @click="showLoginModal = true" class="login-btn">
        用户登录
      </button>
      <div v-else class="user-info">
        <span>欢迎, {{userInfo.name}} ({{userInfo.age}}岁, {{userInfo.gender}})</span>
        <button @click="handleLogout" class="logout-btn">退出登录</button>
      </div>
    </div>

    <!-- 登录模态框 -->
    <div v-if="showLoginModal" class="modal-overlay">
      <div class="modal-content">
        <h2>用户登录</h2>
        <div class="form-group">
          <label>姓名：</label>
          <input v-model="loginForm.name" type="text" placeholder="请输入姓名">
        </div>
        <div class="form-group">
          <label>年龄：</label>
          <input v-model="loginForm.age" type="number" placeholder="请输入年龄">
        </div>
        <div class="form-group">
          <label>性别：</label>
          <select v-model="loginForm.gender">
            <option value="">请选择性别</option>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </div>
        <div class="modal-buttons">
          <button @click="handleLogin" class="submit-btn">确认</button>
          <button @click="showLoginModal = false" class="cancel-btn">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from '../services/userService';

export default {
  name: 'LoginForm',
  data() {
    return {
      showLoginModal: false,
      isLoggedIn: false,
      loginForm: {
        name: '',
        age: '',
        gender: ''
      },
      userInfo: {
        name: '',
        age: '',
        gender: ''
      }
    }
  },
  methods: {
    async handleLogin() {
      if (!this.loginForm.name || !this.loginForm.age || !this.loginForm.gender) {
        alert('请填写完整信息！')
        return
      }

      try {
        const userData = await userService.login(this.loginForm);
        this.userInfo = userData;
        this.isLoggedIn = true;
        this.showLoginModal = false;
        this.$emit('login-success', userData);
        alert('登录成功！');
      } catch (error) {
        alert(`登录失败：${error.message || '未知错误'}`);
      }
    },

    async handleLogout() {
      try {
        await userService.logout();
        this.isLoggedIn = false;
        this.userInfo = {
          name: '',
          age: '',
          gender: ''
        };
        this.$emit('logout');
        alert('已退出登录');
      } catch (error) {
        alert('登出失败，请重试');
      }
    },

    checkLoginStatus() {
      const userData = userService.checkLoginStatus();
      if (userData) {
        this.userInfo = userData;
        this.isLoggedIn = true;
        this.$emit('login-success', userData);
      }
    }
  },
  mounted() {
    this.checkLoginStatus();
  }
}
</script>

<style scoped>
/* 登录区域样式 */
.login-section {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
}

.login-btn {
  background-color: #1976D2;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #1565C0;
}

.user-info {
  background-color: #E3F2FD;
  padding: 10px 20px;
  border-radius: 5px;
  color: #1976D2;
  font-weight: bold;
}

/* 登出按钮样式 */
.logout-btn {
  background-color: #f44336;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
}

.logout-btn:hover {
  background-color: #d32f2f;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #333;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.submit-btn,
.cancel-btn {
  padding: 8px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}
</style> 