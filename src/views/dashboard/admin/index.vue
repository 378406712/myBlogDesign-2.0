<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" />

    <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

    <el-row :gutter="8">
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 8 }"
        :xl="{ span: 8 }"
        style="margin-bottom: 30px;"
      >
        <todo-list />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 8 }"
        :xl="{ span: 8 }"
        style="margin-bottom: 30px;"
      >
        <box-card />
      </el-col>
      <el-col
        :xs="{ span: 24 }"
        :sm="{ span: 12 }"
        :md="{ span: 12 }"
        :lg="{ span: 7 }"
        :xl="{ span: 7 }"
        style="margin-bottom: 30px;"
      >
      <AvatarCard/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import AvatarCard from './components/AvatarCard'

export default {
  name: 'DashboardAdmin',
  components: {
    TodoList,
    BoxCard,
    AvatarCard
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
