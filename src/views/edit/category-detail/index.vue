<template>
  <div class="grey_bg components-container">
    <h2>编辑分类目录</h2>
    <div id="message" class="notice notice-success">
      <p v-if="success"><strong>分类已更新。</strong></p>
      <p>
        <router-link to="/edit/category"> ← 返回分类 </router-link>
      </p>
    </div>
    <div class="alter-category">
      <DetailForm
        ref="alterForm"
        :title="title"
        :label_width="label_width"
        :showMessage="false"
        :label_position="label_position"
        v-on:getCategory="getCategory"
        v-on:UpdateSuccess="UpdateSuccess"
      />
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex'
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
      label_width: '200px',
      success: false
    }
  },
  methods: {
    ...mapActions(['GetCategory', 'AllCategoryCount']),
    ...mapMutations(['CATEGORY_CHECK']),
    async getCategory() {
      await this.GetCategory({ params: { username: this.name } })
      this.AllCategoryCount({ username: this.name })
      this.CATEGORY_CHECK({})
    },
    UpdateSuccess() {
      this.success = true
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
.components-container{

  margin-bottom:  20px;
}
h2{
  margin-top: 0
}
>>> .el-form-item {
  margin-bottom:0
}
// detailform
.notice{
  margin: 5px 0 15px;
      background: #fff;
    border-left: 4px solid #fff;
    box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
    padding: 1px 12px;
}
.notice-success {
    border-left-color: #46b450;
}
#message p {
      margin: .5em 0;
    padding: 2px;
  font-size 13px
}
#message a {
 color: #0073aa;
     transition-property: border,background,color;
    transition-duration: .05s;
    transition-timing-function: ease-in-out;
    text-decoration: underline;
}
#message  a:hover {
    color: #0096dd;
}
</style>
