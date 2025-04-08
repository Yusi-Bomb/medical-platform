<template>
  <div class="preview-section">
    <h3>预览图像</h3>
    <img :src="imageUrl" alt="CT预览图" class="preview-image">
    
    <!-- 加载状态 -->
    <div v-if="loading" class="loading-indicator">
      诊断中...
    </div>

    <!-- 错误提示 -->
    <div v-if="error" class="error-message">
      {{ error }}
    </div>

    <!-- 诊断结果显示 -->
    <div v-if="diagnosisResult" class="diagnosis-result">
      <h3>诊断结果</h3>
      <p class="result-text" :class="{ 'warning': diagnosisResult.result === '肺炎' }">
        预测结果：{{ diagnosisResult.result }}
      </p>
      <p class="confidence-text">
        置信度：{{ diagnosisResult.confidence }}
      </p>
      <p v-if="diagnosisResult.result === '肺炎'" class="medical-warning">
        初步检查为肺炎，请及时去医院就医！
      </p>
      <p v-if="diagnosisResult.result === '正常'" class="normal-notice">
        初步检查正常，若有不适及时去医院就医！
      </p>
    </div>

    <button 
      class="submit-button" 
      @click="submitForDiagnosis"
      :disabled="loading || !imageFile || !isLoggedIn"
    >
      {{ loading ? '诊断中...' : '提交诊断' }}
    </button>
  </div>
</template>

<script>
import diagnosisService from '../services/diagnosisService';

export default {
  name: 'DiagnosisResult',
  props: {
    imageUrl: {
      type: String,
      required: true
    },
    imageFile: {
      type: Object,
      required: true
    },
    isLoggedIn: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      diagnosisResult: null,
      loading: false,
      error: null
    }
  },
  methods: {
    async submitForDiagnosis() {
      if (!this.imageFile) {
        this.error = '请先上传图片';
        return;
      }

      if (!this.isLoggedIn) {
        this.error = '请先登录';
        return;
      }

      this.loading = true;
      this.error = null;
      this.diagnosisResult = null;

      try {
        const result = await diagnosisService.diagnoseImage(this.imageFile);
        this.diagnosisResult = result;
      } catch (error) {
        console.error('诊断错误：', error);
        this.error = '诊断失败，请重试';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>
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

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 加载和错误提示 */
.loading-indicator {
  color: #2196F3;
  margin: 10px 0;
  font-weight: bold;
}

.error-message {
  color: #f44336;
  margin: 10px 0;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
}

/* 诊断结果样式 */
.diagnosis-result {
  margin: 20px 0;
  padding: 20px;
  background-color: #e3f2fd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.result-text {
  font-size: 1.2em;
  font-weight: bold;
  margin: 10px 0;
}

.result-text.warning {
  color: #f44336;
}

.confidence-text {
  color: #1976D2;
  font-size: 1.1em;
}

.medical-warning {
  color: #f44336;
  font-weight: bold;
  margin-top: 15px;
  padding: 10px;
  background-color: #ffebee;
  border-radius: 4px;
  border-left: 4px solid #f44336;
}

.normal-notice {
  color: #388e3c;
  font-weight: bold;
  margin-top: 15px;
  padding: 10px;
  background-color: #e8f5e9;
  border-radius: 4px;
  border-left: 4px solid #388e3c;
}
</style> 