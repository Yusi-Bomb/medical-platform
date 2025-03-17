// 诊断相关API服务
const DIAGNOSIS_API_URL = 'http://localhost:5000/api';

export default {
  // 提交图像进行诊断
  async diagnoseImage(imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await fetch(`${DIAGNOSIS_API_URL}/diagnose`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('诊断请求失败');
      }

      return await response.json();
    } catch (error) {
      console.error('诊断错误:', error);
      throw error;
    }
  }
} 