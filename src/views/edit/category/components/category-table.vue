<template>
  <div>
    <Operation />
    <el-table
      :data="tableData"
      @selection-change="handleChange"
      :row-class-name="tableRowClassName"
      border
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="picture" label="图像"></el-table-column>
      <el-table-column prop="name" label="名称" width="180"></el-table-column>
      <el-table-column prop="description" label="图像描述"></el-table-column>
      <el-table-column prop="alias" label="别名"></el-table-column>
      <el-table-column prop="sum" label="总数"></el-table-column>
    </el-table>
    <Operation />
  </div>
</template>

<script>
import Operation from './components/operation'
export default {
  components:{
    Operation
  },
  props: {},

  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) return 'warning-row'
      else {
        return 'success-row'
      }
      return ''
    },
    handleChange() {}
  }
}
</script>

<style scoped>
.el-table__row {
  width: 100%;
}
</style>
<style>
.el-table th,
.el-table td {
  text-align: center !important;
}
.el-table .warning-row {
  background: #f9f9f9;
}

.el-table .success-row {
  background: #fff;
}
</style>
