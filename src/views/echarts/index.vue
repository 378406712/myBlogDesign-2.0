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
const lineChartData = {
  Pixiv: [100, 120, 161, 134, 105, 160, 165],
  Message: [200, 192, 120, 144, 160, 130, 140],

  Flower: [80, 100, 121, 104, 105, 90, 100],

  Shopping: [130, 140, 141, 142, 145, 150, 160]
}
export default {
  components: {
    PanelGroup,
    LineChart
  },
  data() {
    return {
      lineChartData
    }
  }
}
</script>

<style></style>
