<template>
  <section class="app-main">
    <!--在keep-alive中的在跳转到指定的路由时刷新对应的路由，其余不刷新。  -->
    <section class="app-main-container">
      <!-- <keep-alive :include="cachedViews"> -->
      <keep-alive :include="cachedViews">
        <!-- 通过改变router-view中的key来达到刷新组件的目的 -->
        <router-view :key="key"></router-view>
      </keep-alive>
    </section>
  </section>
</template>
<script>
export default {
  name: 'AppMain',
  data() {
    return {
      activeRouter: '',
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    },
  },
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
  width: 100%;
  margin-top: 50px !important;
  background-color: rgb(240, 242, 245);
  overflow-x: hidden;
}

.app-main-container {
  padding: 24px;
}
</style>
