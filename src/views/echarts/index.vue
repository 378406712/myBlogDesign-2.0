<template>
  <div class="grey_bg">
    <PanelGroup />

    <el-row
      style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px;"
    >
      <line-chart :chart-data="lineChartData" />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import axios from 'axios'

export default {
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData: {}
    }
  },
  mounted() {
    axios.get('/echarts/getEchartsData').then((res) => {
      this.lineChartData = res.data
    })
  }
}
</script>

<style></style>
