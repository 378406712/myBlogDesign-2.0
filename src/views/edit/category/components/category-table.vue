<template>
  <div>
    <Operation />
    <el-table
      :data="category"
      @selection-change="handleChange"
      :row-class-name="tableRowClassName"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column style=" line-height: 0" prop="pic" label="图像">
        <template slot-scope="scope">
          <img :src="scope.row.pic" style="width: 50px;height: 50px" />
        </template>
      </el-table-column>
      <el-table-column sortable prop="category" label="名称"></el-table-column>
      <el-table-column sortable prop="desc" label="图像描述"></el-table-column>
      <el-table-column sortable prop="alias" label="别名"></el-table-column>
      <el-table-column sortable prop="sum" label="总数"></el-table-column>
    </el-table>
    <Operation />
  </div>
</template>

<script>
import Operation from './components/operation'
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  components: {
    Operation
  },
  props: {},

  data() {
    return {}
  },
  methods: {
    ...mapActions(['PostEssay', 'SetCategory', 'GetCategory']),

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) 'warning-row'
      else {
        return 'success-row'
      }
      return ''
    },
    handleChange() {},
    getCategory() {
      this.GetCategory({ params: { username: this.name } })
    }
  },
  mounted() {
    this.getCategory()
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({
      category: state => state.edit.category
    })
  }
}
</script>

<style scoped>
.el-table_1_column_2 {
  line-height: 0;
}
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
  background: #fff;
}

.el-table .success-row {
  background: #f9f9f9;
}
</style>
