<template>
  <div class="navbar">
    <div class="left-module">
      <span class="title-style">模板管理端</span>

    </div>
    <div class="right-menu">
      <hamburger
        :title="sidebar.opened? '收起': '展开'"
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            v-if="avatar"
            :src="avatar"
            class="user-avatar"
          >
          <img
            v-else
            src="@/assets/avatar-default.png"
            class="user-avatar"
          >
          <!-- <span>{{name}}</span> -->
          <span>管理员</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item><i class="el-icon-user"></i>用户中心</el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;"><i class="el-icon-right"></i>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name', 'userId'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // In order to re-instantiate the vue-router object to avoid bugs
        // this.$router.push('/login')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  z-index: 10;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  width: calc(100% - 0px);
  .left-module {
    width: 210px;
    text-align: center;
    background-color: #00284d;
    .title-style {
      display: inline-block;
      font-size: 16px;
      padding: 0 5px;
      color: #cad2da;
    }
  }
  .hamburger-container {
    height: 100%;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .right-menu {
    flex: 1;
    display: flex;
    color: #000;
    justify-content: space-between;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 14px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .avatar-container {
      margin-right: 10px;

      .avatar-wrapper {
        position: relative;
        user-select: none;

        .user-avatar {
          cursor: pointer;
          width: 24px;
          height: 24px;
          margin: 0 7px;
          border-radius: 12px;
          vertical-align: middle;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
