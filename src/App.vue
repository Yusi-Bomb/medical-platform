<template>
  <div id="app">
    <h1 class="welcome-title">欢迎来到医疗诊断平台！</h1>
    <p class="team-info">制作组：Group18</p>
    <DiagnosisPage />
    <div class="contact-info">
      <div>技术问题请联系：郑工 (+852)46852035</div>
      <div>业务问题请联系：陈院长 (+852)67495709</div>
    </div>
  </div>
</template>

<script>
import DiagnosisPage from './views/DiagnosisPage.vue'

export default {
  name: 'App',
  components: {
    DiagnosisPage
  }
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
  min-height: 100vh;
  position: relative;
  padding-bottom: 40px; /* 为底部联系信息留出空间 */
}

.welcome-title {
  text-align: center;
  color: #333;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 24px;
}

.team-info {
  text-align: center;
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
  background-color: #e6f7ff;
  padding: 10px;
  border-radius: 4px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.contact-info {
  position: fixed;
  bottom: 10px;
  right: 10px;
  font-size: 12px;
  color: #888;
  text-align: right;
  line-height: 1.5;
}
</style> 