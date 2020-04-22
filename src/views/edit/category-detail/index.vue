<template>
  <div class="grey-bg components-container">
    <div class="alter-category">
      <h2>编辑分类目录</h2>
      <DetailForm
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
import DetailForm from './components/detail-form'
export default {
  name: 'alter-category',
  components: {
    DetailForm
  },
  data() {
    return {
      label_position: 'left',
      title: false,
      label_width: '200px'
    }
  },

 
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
>>> .el-form-item {
  margin-bottom:0
}
</style>
