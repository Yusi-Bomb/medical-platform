<template>
  <div class="diagnosis-container">
    <!-- 登录组件 -->
    <LoginForm 
      @login-success="handleLoginSuccess" 
      @logout="handleLogout"
      ref="loginForm"
    />

    <!-- 页面标题区域 -->
    <header class="welcome-header">
      <h1>Group18全体医护人员为您提供优质服务</h1>
    </header>
    
    <!-- 医生列表区域 -->
    <div class="doctors-section">
      <button class="doctor-btn">Dr.Zheng</button>
      <button class="doctor-btn">Dr.Chen</button>
      <button class="doctor-btn">Dr.Mai</button>
      <button class="doctor-btn">Dr.Tian</button>
      <button class="doctor-btn">Dr.Liu</button>
    </div>

    <!-- 图像上传组件 -->
    <ImageUploader @image-uploaded="handleImageUploaded" />

    <!-- 诊断结果组件 -->
    <DiagnosisResult 
      v-if="uploadedImage" 
      :imageUrl="uploadedImage"
      :imageFile="imageFile"
      :isLoggedIn="isLoggedIn"
    />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue';
import ImageUploader from '../components/ImageUploader.vue';
import DiagnosisResult from '../components/DiagnosisResult.vue';

export default {
  name: 'DiagnosisPage',
  components: {
    LoginForm,
    ImageUploader,
    DiagnosisResult
  },
  data() {
    return {
      uploadedImage: null,
      imageFile: null,
      isLoggedIn: false
    }
  },
  methods: {
    handleLoginSuccess(userData) {
      this.isLoggedIn = true;
      console.log('用户登录成功:', userData);
    },
    
    handleLogout() {
      this.isLoggedIn = false;
    },
    
    handleImageUploaded(data) {
      this.uploadedImage = data.previewUrl;
      this.imageFile = data.file;
    }
  },
  mounted() {
    // 检查登录状态
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.isLoggedIn = true;
    }
  }
}
</script>

<style scoped>
/* 容器样式 */
.diagnosis-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* 欢迎标题样式 */
.welcome-header {
  text-align: center;
  margin-bottom: 15px;
  background: linear-gradient(45deg, #2196F3, #00BCD4);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.welcome-header h1 {
  color: white;
  font-size: 2.5em;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

/* 医生选择区域样式 */
.doctors-section {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 30px;
  padding: 0 20px;
}

/* 医生按钮样式 */
.doctor-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #9C27B0; /* 统一使用紫色 */
}

.doctor-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #7B1FA2; /* 悬停时使用深紫色 */
}
</style> 