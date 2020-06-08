<template>
  <div class="grey_bg">
    <PanelGroup />

    <el-row
      style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px;"
    >
      <line-chart />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
export default {
  components: {
    PanelGroup,
    LineChart
  }
}
</script>

<style></style>
