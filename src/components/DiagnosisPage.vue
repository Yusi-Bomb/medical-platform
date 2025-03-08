<template>
  <div class="diagnosis-container">
    <!-- 登录按钮和用户信息区域 -->
    <div class="login-section">
      <button v-if="!isLoggedIn" @click="showLoginModal = true" class="login-btn">
        用户登录
      </button>
      <div v-else class="user-info">
        欢迎, {{userInfo.name}} ({{userInfo.age}}岁, {{userInfo.gender}})
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

    <!-- 页面标题区域 -->
    <header class="welcome-header">
      <h1>Group18全体医护人员为您提供全套服务</h1>
    </header>
    
    <!-- 医生选择区域 -->
    <div class="doctors-section">
      <button class="doctor-btn btn-blue">Dr.Zheng</button>
      <button class="doctor-btn btn-green">Dr.Chen</button>
      <button class="doctor-btn btn-purple">Dr.Mai</button>
      <button class="doctor-btn btn-orange">Dr.Tian</button>
      <button class="doctor-btn btn-red">Dr.Liu</button>
    </div>

    <!-- CT图像上传区域 -->
    <div class="upload-section">
      <h2>肺部CT图像上传</h2>
      <div 
        class="upload-box"
        @drop.prevent="handleDrop"    
        @dragover.prevent             
        @click="triggerFileInput"     
      >
        <!-- 隐藏的文件输入框 -->
        <input 
          type="file" 
          ref="fileInput" 
          @change="handleFileChange" 
          accept="image/*" 
          style="display: none"
        >
        <div class="upload-icon">
          <i class="fas fa-cloud-upload-alt"></i>
        </div>
        <p>点击或拖拽上传CT图像</p>
      </div>
    </div>

    <!-- 图像预览和提交区域 -->
    <div v-if="uploadedImage" class="preview-section">
      <h3>预览图像</h3>
      <img :src="uploadedImage" alt="CT预览图" class="preview-image">
      <button class="submit-button" @click="submitForDiagnosis">
        提交诊断
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiagnosisPage',
  
  // 组件数据
  data() {
    return {
      uploadedImage: null,  // 存储上传的图像数据
      showLoginModal: false,  // 控制登录模态框显示
      isLoggedIn: false,     // 登录状态
      loginForm: {           // 登录表单数据
        name: '',
        age: '',
        gender: ''
      },
      userInfo: {           // 用户信息
        name: '',
        age: '',
        gender: ''
      }
    }
  },

  methods: {
    // 处理登录
    handleLogin() {
      if (!this.loginForm.name || !this.loginForm.age || !this.loginForm.gender) {
        alert('请填写完整信息！')
        return
      }
      this.userInfo = {...this.loginForm}
      this.isLoggedIn = true
      this.showLoginModal = false
    },

    // 触发文件选择框
    triggerFileInput() {
      this.$refs.fileInput.click()
    },

    // 处理文件选择变化
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.previewImage(file)
      }
    },

    // 处理拖拽上传
    handleDrop(event) {
      const file = event.dataTransfer.files[0]
      if (file) {
        this.previewImage(file)
      }
    },

    // 预览图像
    previewImage(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.uploadedImage = e.target.result
      }
      reader.readAsDataURL(file)
    },

    // 提交诊断（待实现）
    submitForDiagnosis() {
      // TODO: 添加提交到后端的逻辑
      console.log('提交诊断')
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
}

.doctor-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* 医生按钮颜色变体 */
.btn-blue { background-color: #2196F3; }
.btn-green { background-color: #4CAF50; }
.btn-purple { background-color: #9C27B0; }
.btn-orange { background-color: #FF9800; }
.btn-red { background-color: #f44336; }

/* 上传区域样式 */
.upload-section {
  margin-bottom: 30px;
}

.upload-section h2 {
  color: #1976D2;
  margin-bottom: 20px;
}

/* 上传框样式 */
.upload-box {
  border: 3px dashed #2196F3;
  border-radius: 10px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #E3F2FD;
}

.upload-box:hover {
  background-color: #BBDEFB;
  transform: scale(1.01);
}

.upload-icon {
  font-size: 48px;
  color: #2196F3;
  margin-bottom: 15px;
}

/* 预览区域样式 */
.preview-section {
  text-align: center;
}

.preview-image {
  max-width: 100%;
  max-height: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

/* 提交按钮样式 */
.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  font-size: 1.1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #45a049;
}

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