<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/sakura') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true,
      default: {}
    }
  },

  methods: {
    initCharts() {
      this.chart = echarts.init(this.$el, 'sakura')
      this.setOptions(this.chartData)
    },
    setOptions({ Pixiv, Message, Flower, Shopping } = {}) {
      this.chart.setOption({
        title: {
          text: '访问量'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        legend: {
          data: ['Pixiv', 'Message', 'Flower', 'Shopping']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Pixiv',
            type: 'line',
            stack: '总量',
            data: Pixiv,
            smooth: true
          },
          {
            name: 'Message',
            type: 'line',
            stack: '总量',
            data: Message,
            smooth: true
          },
          {
            name: 'Flower',
            type: 'line',
            stack: '总量',
            data: Flower,
            smooth: true
          },
          {
            name: 'Shopping',
            type: 'line',
            stack: '总量',
            data: Shopping,
            smooth: true
          }
        ]
      })
    }
  },
  watch: {
    chartData: {
      deep: true,
      handler(val, oldVal) {
        if (val) {
          this.initCharts()
        }
      }
    }
  },

  mounted() {
    this.initCharts()
  }
}
</script>

<style></style>
