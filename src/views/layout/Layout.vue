<template>
  <el-container class="app-wrapper">
    <navbar></navbar>
    <el-container>
      <el-aside :width="sidebar.opened ? '210px' : '57px'">
        <sidebar-menu
          :class="
            sidebar.opened
              ? 'sidebar-container is-expanded'
              : 'sidebar-container'
          "
        ></sidebar-menu>
      </el-aside>
      <app-main></app-main>
      <scroll-top></scroll-top>
    </el-container>
  </el-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { AppMain, Navbar, SidebarMenu } from './components'
import ScrollTop from '@/components/ScrollTop'

export default {
  name: 'Layout',
  components: {
    Navbar,
    SidebarMenu,
    AppMain,
    ScrollTop,
  },
  computed: {
    ...mapGetters(['sidebar']),
  },
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  display: flex;
  position: relative;
  min-height: calc(100vh - 70px);
  width: 100%;
  .sidebar-container {
    width: 57px;
    &.is-expanded {
      width: 210px;
    }
  }
}
</style>
