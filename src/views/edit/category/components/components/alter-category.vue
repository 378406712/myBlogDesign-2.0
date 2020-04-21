<template>
  <div class="grey-bg components-container">
    <div class="alter-category">
      <h2>编辑分类目录</h2>
      <CategoryForm
        :title="title"
        :label_width="label_width"
        :showMessage="false"
        :label_position="label_position"
        target="Category"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState } from 'vuex'
import CategoryForm from '../category-form'
export default {
  name: 'alter-category',
  components: {
    CategoryForm
  },
  data() {
    return {
      label_position: 'left',
      title: false,
      label_width: '200px'
    }
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
>>>.el-form-item__label{
        padding: 10px 10px 20px 0;
}
>>> .el-form-item__content{
    padding: 8px
}

.alter-category{
    max-width:800px
}
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
}>>> .el-form-item {
  margin-bottom:0
}
</style>
