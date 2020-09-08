<template>
  <div>
    <h1>Antv G2折线图</h1>

    <div id="c1"></div>
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
  },

  methods: {
    test() {
      var data = [
        { year: '10/20', value: 30 },
        {
          year: '10/21',
          value: 40,
        },
        {
          year: '10/22',
          value: 30.5,
        },
        {
          year: '10/23',
          value: 85,
        },
        {
          year: '10/24',
          value: 40.9,
        },
        {
          year: '10/25',
          value: 60,
        },
        {
          year: '10/26',
          value: 70,
        },
        {
          year: '10/27',
          value: 40,
        },
        {
          year: '10/28',
          value: 63,
        },
      ]
      // Step 1: 创建 Chart 对象
      var chart = new G2.Chart({
        container: 'c1', //图表所绑定的div id
        width: 700,
        height: 400,
      })
      // Step 2: 载入数据源
      chart.source(data, {
        value: {
          tickCount: 4,
        },
      })
      // Step 3：创建图形语法
      chart.scale({
        value: {
          min: 0,
          max: 100,
        },
        year: {
          range: [0, 1],
        },
      })
      chart.tooltip({
        crosshairs: {
          type: 'line',
        },
      })
      // 图标提示信息设置
      data.map(function(obj) {
        chart.guide().text({
          position: [obj.year, obj.value],
          content: obj.value, //顶部提示
          style: {
            textAlign: 'center',
            textBaseline: 'bottom',
            fill: '#000', //顶部字体颜色
          },
          offsetY: -15,
        })
      })
      chart.guide().line({
        start: [0, 80], // 辅助线起始位置，值为原始数据值，支持 callback
        end: [100000, 80], // 辅助线结束位置，值为原始数据值，支持 callback
        // lineStyle: {
        //   stroke: '#000', // 线的颜色
        //   lineDash: [0, 2, 2], // 虚线的设置
        //   lineWidth: 3, // 线的宽度
        // }, // 图形样式配置
        text: {
          position: 'start', // 文本的显示位置
          autoRotate: false,
          content: '标准(80)',
          style: {
            textAlign: 'end',
          },
          // style: {object}, // 文本图形样式配置
          // content: {string}, // 文本的内容
          // offsetX: {number}, // x 方向的偏移量
          // offsetY: {number} // y 方向的偏移量
        },
      })

      chart
        .line()
        .position('year*value')
        .size(2)
        // .label('value')
        .shape('circle')
        .style({
          stroke: '#ea6f21',
          lineWidth: 2,
        })
      chart
        .area()
        .position('year*value')
        .style({
          fillStyle: 'l(100) 0:#c65b1f 1:rgba(255,255,255,0.3)',
          fillOpacity: 1,
        }) //面积渐变色
      chart
        .point()
        .position('year*value')
        .color('#fff')
        .size(5)
        .shape('circle')
        .style({
          stroke: '#ea6f21',
          lineWidth: 3,
        })
      // Step 4: 渲染图表
      chart.render()
    },
  },
}
</script>

<style></style>
