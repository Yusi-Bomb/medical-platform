<template>
  <div class="diagnosis-container">
    <header class="welcome-header">
      <h1>欢迎来到医疗诊断平台</h1>
    </header>
    
    <div class="upload-section">
      <h2>CT图像上传</h2>
      <div 
        class="upload-box"
        @drop.prevent="handleDrop"
        @dragover.prevent
        @click="triggerFileInput"
      >
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
  data() {
    return {
      uploadedImage: null,
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.previewImage(file)
      }
    },
    handleDrop(event) {
      const file = event.dataTransfer.files[0]
      if (file) {
        this.previewImage(file)
      }
    },
    previewImage(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.uploadedImage = e.target.result
      }
      reader.readAsDataURL(file)
    },
    submitForDiagnosis() {
      // 这里添加提交到后端的逻辑
      console.log('提交诊断')
    }
  }
}
</script>

<style scoped>
.diagnosis-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.welcome-header {
  text-align: center;
  margin-bottom: 40px;
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

.upload-section {
  margin-bottom: 30px;
}

.upload-section h2 {
  color: #1976D2;
  margin-bottom: 20px;
}

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
</style> 