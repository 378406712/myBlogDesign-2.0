<template>
  <div>
    <Operation v-on:getCategory="getCategory" />
    <el-table
      :data="category"
      @selection-change="handleChange"
      :row-class-name="tableRowClassName"
      style="width: 100%"
    >
      <el-table-column :selectable="selectable" type="selection" width="45">
      </el-table-column>
      <el-table-column prop="pic" label="图像">
        <template slot-scope="scope">
          <img :src="scope.row.pic" style="width: 50px;height: 50px" />
        </template>
      </el-table-column>
      <el-table-column sortable prop="category" label="名称">
        <template slot-scope="scope">
          <router-link :to="'/edit/category-detail/' + scope.row._id">
            {{ scope.row.category }}</router-link
          >
        </template>
      </el-table-column>
      <el-table-column sortable prop="desc" label="图像描述"></el-table-column>
      <el-table-column sortable prop="alias" label="别名"></el-table-column>
      <el-table-column sortable prop="sum" label="总数">
        <template slot-scope="scope">
          <router-link :to="'/edit/all-essay/' + scope.row.category">
            {{ scope.row.category }}</router-link
          >
        </template>
      </el-table-column>
    </el-table>
    <Operation v-on:getCategory="getCategory" />
  </div>
</template>

<script>
import Operation from './operation'
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  components: {
    Operation
  },
  props: {},

  data() {
    return {
      total: 0
    }
  },
  methods: {
    ...mapActions(['GetCategory', 'GetEssay', 'AllCategoryCount']),
    ...mapMutations(['SET_SELECTION', 'CATEGORY_CHECK']),

    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 1) 'warning-row'
      else {
        return 'success-row'
      }
      return ''
    },
    handleChange(val) {
      this.SET_SELECTION(val)
    },
    async getCategory() {
      await this.GetCategory({ params: { username: this.name } })
      this.AllCategoryCount({ username: this.name })
      this.CATEGORY_CHECK({})
    },
    EssayDetail(data) {
      this.GetEssay({
        params: {
          username: this.name,
          checkCategory: data
        }
      })
    },
    selectable(row, index) {
      if (row.category !== '未分类') return true
      else {
        return false
      }
    },
    pageValue(pageValue) {
      this.SET_PAGES(pageValue)
      this.getCategory()
    },
    sizeValue(sizeValue) {
      this.SET_SIZES(sizeValue)
      this.getCategory()
    }
  },
  mounted() {
    this.getCategory().then(() => (this.total = this.totals))
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({
      category: state => state.edit.category_c,
      totals: state => state.edit.totals
    })
  }
}
</script>

<style lang="stylus" scoped>
.el-table_1_column_2 {
  line-height: 0;
}
.el-table__row {
  width: 100%;
}
</style>
<style>
.cell a {
  color: #0073aa;
  outline: 0;
  font-size: 14px !important;
  font-weight: 600;
}
.cell a:active,
.cell a:focus,
.cell a:hover {
  color: #0096dd;
}
.el-table th,
.el-table td {
  text-align: left !important;
}
.el-table .warning-row {
  background: #fff;
}
.el-table td,
.el-table th.is-leaf {
  border-bottom: 0px;
}

.el-table .success-row {
  background: #f9f9f9;
}
</style>
