<template>
  <div>
    <h1>Antv G2柱状图</h1>

    <span>
      <el-row :gutter="24">
        <el-col :span="12">
          <div id="c1"></div>
        </el-col>
        <el-col :span="12">
          <div id="mountNode"></div>
        </el-col>
      </el-row>
    </span>
  </div>
</template>

<script>
import * as G2 from '@antv/g2'

export default {
  data() {
    return {}
  },

  //在挂载时调用两个函数
  mounted() {
    this.test()
    this.basicBarChart()
  },

  methods: {
    test() {
      var data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 },
      ]
      // Step 1: 创建 Chart 对象
      var chart = new G2.Chart({
        container: 'c1', //图表所绑定的div id
        width: 400,
        height: 300,
      })
      // Step 2: 载入数据源
      chart.source(data)
      // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
      chart
        .interval()
        .position('genre*sold')
        .color('genre')
      // Step 4: 渲染图表
      chart.render()
    },
    basicBarChart() {
      var data = [
        {
          country: '巴西',
          population: 18203,
        },
        {
          country: '印尼',
          population: 23489,
        },
        {
          country: '美国',
          population: 29034,
        },
        {
          country: '印度',
          population: 104970,
        },
        {
          country: '中国',
          population: 131744,
        },
      ]
      var chart = new G2.Chart({
        container: 'mountNode', //图表所绑定的div id
        width: 500,
        height: 300,
      })
      chart.source(data)
      chart.axis('country', {
        label: {
          offset: 12,
        },
      })
      chart.coord().transpose()
      chart.interval().position('country*population')
      chart.render()
    },
  },
}
</script>

<style></style>
