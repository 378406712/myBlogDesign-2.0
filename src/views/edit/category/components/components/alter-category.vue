<template>
  <div class="grey-bg components-container">
    <div class="alter-category">
      <h2>编辑分类目录</h2>
      <CategoryForm
        :title="title"
        :label_width="label_width"
        :showMessage="false"
        :label_position="label_position"
        ref="alterForm"
      />
    </div>
  </div>
</template>
<script>
import CategoryForm from '../category-form'
import Onbeforeunload from '@/utils/onbeforeunload'
import { mapMutations } from 'vuex'

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
  methods: {
    ...mapMutations(['CATEGORY_PIC'])
  },
  watch: {
    $route(now, old) {
      if (now.name === 'alter-category') {
        this.$refs.alterForm.CategoryDetail()
      }
    }
  }
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
