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
      <button class="doctor-btn" @click="showDoctorInfo('zheng')">Dr.Zheng</button>
      <button class="doctor-btn" @click="showDoctorInfo('chen')">Dr.Chen</button>
      <button class="doctor-btn" @click="showDoctorInfo('mai')">Dr.Mai</button>
      <button class="doctor-btn" @click="showDoctorInfo('tian')">Dr.Tian</button>
      <button class="doctor-btn" @click="showDoctorInfo('liu')">Dr.Liu</button>
    </div>

    <!-- 医生介绍组件 -->
    <DoctorInfo 
      v-if="selectedDoctor" 
      :doctor="selectedDoctor"
      @close="selectedDoctor = null"
    />

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
import DoctorInfo from '../components/DoctorInfo.vue';

export default {
  name: 'DiagnosisPage',
  components: {
    LoginForm,
    ImageUploader,
    DiagnosisResult,
    DoctorInfo
  },
  data() {
    return {
      uploadedImage: null,
      imageFile: null,
      isLoggedIn: false,
      selectedDoctor: null,
      doctors: {
        zheng: {
          name: '郑于斯',
          title: 'Dr.Zheng',
          description: '郑于斯医生，呼吸内科主任医师，从医二十余年，专攻肺部疾病诊断与治疗。毕业于北京医科大学，曾在美国约翰霍普金斯大学进修。擅长肺炎、肺癌、慢性阻塞性肺疾病等疾病的诊断与治疗。温和耐心的态度和精准的诊断能力使他深受患者信赖。郑医生坚持以患者为中心的诊疗理念，注重医患沟通，致力于为每位患者提供个性化的治疗方案。'
        },
        chen: {
          name: '陈熙霖',
          title: 'Dr.Chen',
          description: '陈熙霖医生，胸外科副主任医师，专注于胸部影像学诊断与微创手术。毕业于上海交通大学医学院，后赴德国海德堡大学深造。擅长利用CT、MRI等影像技术进行肺部疾病的早期诊断，以及胸腔镜手术治疗。陈医生技术精湛，思维缜密，对复杂病例有独到见解。他积极参与国际医学交流，引进先进诊疗理念，为提高国内胸部疾病诊疗水平做出了重要贡献。'
        },
        mai: {
          name: '麦上清',
          title: 'Dr.Mai',
          description: '麦上清医生，放射科主治医师，CT诊断专家。毕业于广州医科大学，后在香港大学医学院深造。专注于肺部影像学研究十五年，对各类肺部疾病的影像特征有深入研究。麦医生擅长利用人工智能辅助诊断技术，提高肺部疾病诊断的准确率。工作认真细致，诊断报告详实准确，在同行中享有很高声誉。他定期举办影像诊断培训课程，致力于提高基层医院的诊断水平。'
        },
        tian: {
          name: '田恬',
          title: 'Dr.Tian',
          description: '田恬医生，呼吸与危重症医学科医师，专注于急性呼吸系统疾病的诊治。毕业于武汉大学医学院，曾在北京协和医院进修。田医生临床经验丰富，尤其擅长重症肺炎、急性呼吸窘迫综合征等危重症的救治。她思维敏捷，应急能力强，多次成功挽救危重患者生命。田医生关怀患者，亲切和蔼，能够给予患者及家属极大的心理支持。她还积极参与社区健康教育，提高公众对呼吸系统疾病的认识。'
        },
        liu: {
          name: '刘昕彤',
          title: 'Dr.Liu',
          description: '刘昕彤医生，影像医学与核医学科医师，专注于PET-CT等先进影像技术在肺部疾病中的应用。毕业于复旦大学医学院，后在加拿大多伦多大学进修。刘医生技术精湛，对肺结节、肺癌等疾病的早期诊断有独特见解。她善于将传统影像学与分子影像学相结合，提高诊断的精准度。刘医生性格开朗，善于与患者沟通，能够用通俗易懂的语言解释复杂的医学问题。她还致力于推广肺部疾病的早筛早治，定期参与公益筛查活动。'
        }
      }
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
    },
    
    showDoctorInfo(doctorId) {
      this.selectedDoctor = this.doctors[doctorId];
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