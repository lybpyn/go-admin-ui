<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <el-image style="width: 120px; height: 120px;" src="https://file.cardpartner.io/static/images/2025/12/10/b12be47b-ec3d-4652-b12a-fe18b1a1a437.png" alt="logo" />
    <div class="title">cardpartner 后台管理系统</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import adminDashboard from './admin'
// import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  // components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    // if (!this.roles.includes('admin')) {
    //   this.currentRole = 'editorDashboard'
    // }
  }
}
</script>
<style scoped>
.dashboard-container {
  padding: 32px;
  background-color: #f3f3f3;
  min-height: calc(100vh - 84px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  font-size: 30px;
  font-weight: bold;
}
.title{
  margin-top: 20px;
}
</style>
