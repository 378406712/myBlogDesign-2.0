<template>
  <div class="grey-bg components-container" >
    <h2>分类目录</h2>
    <el-form >
      <el-form-item>
        <p class="search-box">
          <el-input style="width:auto" size="mini"></el-input>
          <el-button size="mini">搜索分类目录</el-button>
        </p>
      </el-form-item>
    </el-form>
    <el-row  :gutter="20">
      <el-col :span="8">
        <CategoryForm />
      </el-col>
      <el-col :span="16">
        <CategoryTable />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import CategoryForm from './components/category-form'
import CategoryTable from './components/category-table'
export default {
  name: 'category',
  components: { CategoryForm, CategoryTable },
  data() {
    return {}
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
.inlineBlock {
  display: inline-block;
}
>>> .el-form-item {
  margin-bottom:0
}
</style>
