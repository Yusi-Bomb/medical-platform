<template>
  <div id="app">
    <DiagnosisPage />
  </div>
</template>

<script>
import DiagnosisPage from './components/DiagnosisPage.vue'

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
}
</style> 