<template>
  <div class="iframe">
    <iframe style="border:none;height:calc(100vh - 103px); " width="100%" v-bind:src="iframe"></iframe>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      iframe: ''
    }
  },
  mounted() {
    // 从路由里动态获取 url地址   具体地址看libs下util.js里的 backendMenuToRoute  方法
    this.handleGetIframe()
  },
  watch: {
    $route: async function() {
      // 监听路由变化
      await this.handleGetIframe()
    }
  },
  methods: {
    handleGetIframe() {
      //alert(this.$route.meta.iframe.includes("https"))
      let iframestatus = this.$route.meta.iframe.includes('https')
      if (iframestatus) {
        this.iframe = this.$route.meta.iframe
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>