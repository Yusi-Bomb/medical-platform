<template>
  <div class="doctor-info-modal">
    <div class="doctor-info-content">
      <div class="doctor-header">
        <h2>{{ doctor.title }} - {{ doctor.name }}</h2>
        <button class="close-btn" @click="$emit('close')">×</button>
      </div>
      <div class="doctor-description">
        <p>{{ doctor.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DoctorInfo',
  props: {
    doctor: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.doctor-info-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.doctor-info-content {
  background-color: white;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
}

.doctor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.doctor-header h2 {
  margin: 0;
  color: #9C27B0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.close-btn:hover {
  color: #9C27B0;
}

.doctor-description {
  line-height: 1.6;
  color: #333;
}
</style> 