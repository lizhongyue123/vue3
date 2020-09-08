<template>
  <div class="text-container">
    <div v-show-tips class="title-text" v-for="(item, index) in 5" :key="index">{{index+1}}实现文字溢出显示鼠标移入浮层展示全部</div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.text-container {
  background: #fff;
  min-height: calc(100vh - 100px);
  padding: 100px;
  .title-text {
    width: 100px;
    overflow: hidden;
    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 20px;
  }
}
</style>