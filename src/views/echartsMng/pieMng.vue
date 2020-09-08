<template>
  <div>
    <el-row>
      <div class="box bg-white">
        <div class="box-header">
          <div class="box-title">自定义legend</div>
        </div>
        <div class="box-body">
          <div
            id="tagDataListEcharts"
            style="width: 100%;height: 300px;"
          ></div>
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
  '#6879ff'
]
const tagCalcList = [
  {
    name: '家用电器',
    value: 36
  },
  {
    name: '食用酒水',
    value: 20
  },
  {
    name: '个护健康',
    value: 16
  },
  {
    name: '服饰箱包',
    value: 10
  },
  {
    name: '母婴产品',
    value: 9
  },
  {
    name: '其他',
    value: 9
  }
]

export default {
  data() {
    return {
      colorList: colorList,
      tagCalcList: tagCalcList
    }
  },

  created() {
    this.$nextTick(() => {
      this.tagDataListEchartsDrawLine()
    })
  },

  methods: {
    // 最近一次计算统计右侧图表
    tagDataListEchartsDrawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(
        document.getElementById('tagDataListEcharts')
      )

      const data = this.tagCalcList
      // 绘制图表
      myChart.setOption({
        color: this.colorList,
        title: {
          text:
            '{header1| 标签实例与占比}' +
            '{header2| 人数}' +
            '{header3| 与上一计算结果同比}',
          textAlign: 'left',
          left: '49%',
          top: '10%',
          textStyle: {
            color: '#666',
            rich: {
              header1: {
                width: 150,
                fontSize: 15
              },
              header2: {
                width: 45,
                fontSize: 15
              },
              header3: {
                fontSize: 15
              }
            }
          }
        },
        legend: {
          selectedMode: false, // 取消图例上的点击事件
          type: 'plain',
          icon: 'circle',
          orient: 'vertical',
          left: '50%',
          top: '20%',
          align: 'left',
          itemGap: 15,
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          symbolKeepAspect: false,
          textStyle: {
            color: '#000',
            rich: {
              name: {
                verticalAlign: 'right',
                align: 'left',
                width: 55,
                fontSize: 12
              },
              value: { align: 'left', width: 60, fontSize: 12 },
              count: { align: 'left', width: 80, fontSize: 12 },
              rate: {
                align: 'left',
                fontSize: 12
              }
            }
          },
          data: data.map(item => item.name),
          formatter: function(name) {
            if (data && data.length) {
              for (var i = 0; i < data.length; i++) {
                if (name === data[i].name) {
                  return (
                    '{name| ' +
                    name +
                    '}  | ' +
                    '{value| ' +
                    data[i].value +
                    '%}' +
                    '{count| ' +
                    Number(4544).toLocaleString() +
                    '} ' +
                    '{rate| ' +
                    12 +
                    '%}'
                  )
                }
              }
            }
          }
        },
        series: [
          {
            name: '数量',
            type: 'pie',
            radius: ['50%', '65%'],
            center: ['30%', '50%'],
            data: data,
            label: {
              normal: {
                show: false,
                position: 'center',
                formatter: '{text|{c}}\n{b}',
                rich: {
                  text: {
                    align: 'center',
                    verticalAlign: 'middle',
                    padding: 8,
                    fontSize: 30
                  },
                  value: {
                    align: 'center',
                    verticalAlign: 'middle',
                    fontSize: 20
                  }
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            }
          }
        ]
      })
      myChart.on('mouseover', function(params) {
        if (params.name === data[0].name) {
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
          })
        } else {
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: 0
          })
        }
      })

      myChart.on('mouseout', function() {
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 0
        })
      })
      myChart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: 0
      })
      window.addEventListener('resize', () => {
        myChart.resize()
      })
    }
  }
}
</script>

<style>
</style>
