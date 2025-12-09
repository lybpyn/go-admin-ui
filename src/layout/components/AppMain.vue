<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <template v-if="$route.name === 'OrderProcess'">
        <keep-alive>
          <router-view :key="'OrderProcess-' + ($route.query.OrderNo || '')" />
        </keep-alive>
      </template>
      <template v-else>
        <keep-alive>
          <router-view />
        </keep-alive>
      </template>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain'
}
</script>
<style scoped>
.app-main {
  min-height: calc(100vh - 93px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header + .app-main {
  padding-top: 93px;
}
</style>
