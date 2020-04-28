<template>
  <div class="grey_bg components-container">
    <h2>分类目录</h2>
    <el-form>
      <el-form-item>
        <p class="search-box">
          <el-input
            style="width:auto"
            v-model="searchCategory"
            size="mini"
          ></el-input>
          <el-button size="mini" @click="handleSearch">搜索分类目录</el-button>
        </p>
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="8">
        <CategoryForm
          ref="categoryForm"
          target="Essay"
          v-on:getCategory="getCategory"
        />
      </el-col>
      <el-col :span="16">
        <CategoryTable ref="tableComponent" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CategoryForm from './components/category-form'
import CategoryTable from './components/category-table'
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'

export default {
  name: 'category',
  components: { CategoryForm, CategoryTable },

  data() {
    return {
      searchCategory: '',
      label_position: 'top',
      title: true,
      label_width: '80px'
    }
  },
  methods: {
    ...mapMutations(['CATEGORY_PIC']),
    ...mapActions(['SearchCategory_c']),
    handleSearch() {
      this.SearchCategory_c({
        params: {
          username: this.name,
          keywords: this.searchCategory
        }
      })
    },
    getCategory() {
      this.$refs.tableComponent.getCategory()
    }
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({})
  }
}
</script>

<style lang="stylus" scoped>

h2{
  margin-top: 0
}
.search-box {
  float: right;
  margin: 0;
}

>>> .el-form-item {
  margin-bottom:0
}
// .grey_bg {
//     background: #f1f1f1;
//   padding: 30px 20px 0px 20px !important;
// }
</style>
