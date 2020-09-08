<template>
  <div>
    <el-row>
      <div class="box bg-white">
        <div class="box-header">
          <div class="box-title">禁止tooltip隐藏</div>
        </div>
        <div class="box-body">
          <div id="echartsTooltip" style="width: 100%;height: 200px;"></div>
        </div>
      </div>
    </el-row>
    <el-row>
      <div class="box bg-white">
        <div class="box-header">
          <div class="box-title">hover下echarts</div>
        </div>
        <div class="box-body">
          <ul>
            <li v-for="item in 4" :key="item">
              <el-popover
                placement="bottom"
                width="160"
                trigger="hover"
                @show="showEcharts(item)"
              >
                <div
                  :id="'echarts' + item"
                  style="width:500px;height: 300px;"
                ></div>
                <span slot="reference">hover{{ item }}</span>
              </el-popover>
            </li>
          </ul>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
const colorList = [
  '#2f54eb',
  '#feb513',
  '#30ca40',
  '#a147eb',
  '#fcec13',
  '#8b572a',
  '#e0109c',
  '#fc605f',
  '#50e3c2',
  '#6879ff',
]

export default {
  data() {
    return {
      colorList: colorList,
    }
  },

  mounted() {
    this.echartsTooltipEchartsDrawLine()
  },

  methods: {
    showEcharts(index) {
      this.$nextTick(() => {
        this.echartsDrawLine(index)
      })
    },
    echartsDrawLine(index) {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('echarts' + index))
      myChart.clear()
      const xData = [
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
        '2019',
      ]
      // 绘制图表
      myChart.setOption({
        color: this.colorList,
        title: {
          text: 'hover' + index,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          icon: 'circle',
          data: ['项目一', '项目二', '项目三'],
        },
        xAxis: {
          type: 'category',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          data: xData,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '项目一',
            type: 'bar',
            stack: 'a',
            barWidth: 30,
            data: [320, 302, 301, 400, 500, 334, 390, 330, 320],
          },
          {
            name: '项目二',
            type: 'bar',
            stack: 'a',

            data: [120, 132, 101, 134, 120, 230, 90, 230, 210],
          },
          {
            name: '项目三',
            type: 'bar',
            stack: 'a',

            data: [220, 182, 191, 234, 234, 432, 290, 330, 310],
          },
        ],
      })
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
    echartsTooltipEchartsDrawLine() {
      const myChart = echarts.init(document.getElementById('echartsTooltip'))
      myChart.setOption({
        grid: {
          left: '9%',
          right: '6%',
          bottom: '10%',
          top: '5%',
          containLabel: false,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
          position: function(point) {
            //其中params为当前鼠标的位置
            return [point[0] + 50, '10%']
          },
        },
        xAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: 'category',
          inverse: true,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          // axisLabel: {
          //   show: true,
          //   color: '#747a82',
          //   fontSize: '14',
          //   margin: 20
          // },
          splitLine: {
            show: false,
          },
          data: ['2012', '2013', '2014', '2015', '2016'],
        },
        series: [
          {
            name: 'Forest',
            type: 'bar',
            barMaxWidth: '20px',
            stack: 'a',
            barGap: 0,
            data: [320, 332, 301, 334, 390],
          },
          {
            name: 'Steppe',
            barMaxWidth: '20px',
            stack: 'a',
            type: 'bar',
            data: [220, 182, 191, 234, 290],
          },
          {
            name: 'Desert',
            barMaxWidth: '20px',
            stack: 'a',
            type: 'bar',
            data: [150, 232, 201, 154, 190],
          },
          {
            name: 'Wetland2',
            barMaxWidth: '20px',
            stack: 'a',
            type: 'bar',
            data: [98, 77, 101, 99, 40],
          },
          {
            name: 'Wetland',
            barMaxWidth: '20px',
            stack: 'a',
            type: 'bar',
            data: [98, 77, 101, 99, 40],
          },
          {
            name: 'Wetland4',
            stack: 'a',
            barMaxWidth: '20px',
            type: 'bar',
            data: [98, 77, 101, 99, 40],
          },
          {
            name: 'Wetland3',
            barMaxWidth: '20px',
            stack: 'a',
            type: 'bar',
            data: [98, 77, 101, 99, 40],
          },
          {
            name: 'Wetland5',
            barMaxWidth: '20px',
            stack: 'a',
            type: 'bar',
            data: [98, 77, 101, 99, 40],
          },
        ],
      })
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    },
  },
}
</script>
<style lang="scss">
.el-popover {
  width: 500px !important;
}
</style>
<style lang="scss" scoped>
.box-body {
  ul {
    list-style: none;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    li {
      padding: 5px 10px;
      border: 1px solid #ccc;
      margin-right: 10px;
      border-radius: 4px;
      cursor: pointer;
      &:hover {
        color: blue;
        border-color: blue;
      }
    }
  }
}
</style>
