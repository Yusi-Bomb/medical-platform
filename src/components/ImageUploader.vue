<template>
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
</template>

<script>
export default {
  name: 'ImageUploader',
  data() {
    return {
      imageFile: null
    }
  },
  methods: {
    // 触发文件选择框
    triggerFileInput() {
      this.$refs.fileInput.click()
    },

    // 处理文件选择变化
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.imageFile = file
        this.previewImage(file)
      }
    },

    // 处理拖拽上传
    handleDrop(event) {
      const file = event.dataTransfer.files[0]
      if (file) {
        this.imageFile = file
        this.previewImage(file)
      }
    },

    // 预览图像
    previewImage(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.$emit('image-uploaded', {
          file: this.imageFile,
          previewUrl: e.target.result
        })
      }
      reader.readAsDataURL(file)
    }
  }
}
</script>

<style scoped>
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
</style> 