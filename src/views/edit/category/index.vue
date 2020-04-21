<template>
  <div class="grey-bg components-container">
    <h2>分类目录</h2>
    <el-form>
      <el-form-item>
        <p class="search-box">
          <el-input
            style="width:auto"
            v-model="searchCategory"
            @blur="handleSearch"
            size="mini"
          ></el-input>
          <el-button size="mini" @click="handleSearch">搜索分类目录</el-button>
        </p>
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="8">
        <CategoryForm
          target="Essay"
          :title="title"
          :label_width="label_width"
          :label_position="label_position"
          :showMessage="true"
          :addOrUpdate="true"
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
import { mapActions, mapGetters, mapState,mapMutations } from 'vuex'

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
    ...mapActions(['SearchCategory_c']),
    ...mapMutations(['SPECIAL_BG']),
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
  },
  beforeRouteLeave(to, from, next) {
    this.SPECIAL_BG('')
    next()
  }
}
</script>

<style lang="stylus" scoped>
.grey-bg {
  background: #f1f1f1;
  padding: 30px 30px 60px 20px;
}
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
</style>
