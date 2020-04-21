<template>
  <el-form
    :rules="rules"
    :label-position="label_position"
    ref="CategoryForm"
    :model="form"
    :label-width="label_width"
    :show-message="showMessage"
    :hide-required-asterisk="true"
  >
    <p v-if="title" class="form-title">添加新分类目录</p>
    <el-form-item label="名称" prop="category">
      <el-input v-model="form.category"></el-input>
      <p class="description">这将是它在站点上显示的名字。</p>
    </el-form-item>
    <el-form-item label="别名" prop="alias">
      <el-input v-model="form.alias"></el-input>
      <p class="description">
        “别名”是在URL中使用的别称，它可以令URL更美观。
      </p>
    </el-form-item>
    <el-form-item label="图像描述" prop="desc">
      <el-input type="textarea" :rows="4" v-model="form.desc"></el-input>
      <p class="description">描述只会在一部分主题中显示。</p>
    </el-form-item>
    <el-form-item label="分类/标签图像" prop="special_bg" class="mb-15">
      <img v-if="!addOrUpdate" class="taxonomy-image" :src="form.pic" />
      <el-input v-if="!addOrUpdate" v-model="form.pic" class="mb-5"></el-input>
      <el-input v-else v-model="special_bg" class="mb-5"></el-input>
      <el-button @click="SHOW_DIALOG(true)">添加图像</el-button>
      <el-button v-if="!addOrUpdate" type="danger">删除图像</el-button>
    </el-form-item>
    <el-form-item>
      <el-button
        @click="onSubmit('CategoryForm')"
        type="warning"
        class="text-shadow"
        v-if="addOrUpdate"
        style="marginTop:10px"
        >添加新分类目录</el-button
      >
    </el-form-item>
    <el-button
      @click="onSubmit('CategoryForm')"
      type="warning"
      size="mini"
      class="text-shadow"
      v-if="!addOrUpdate"
      >更新</el-button
    >
    <span v-if="!addOrUpdate" id="delete-link">
      <a class="delete" href="">删除</a>
    </span>
    <Media target="Category" />
  </el-form>
</template>

<script>
let _ = require('lodash')
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
import { Msg } from '@/utils/message'
import Media from '@/components/media'
export default {
  name: 'category-form',
  components: { Media },
  props: {
    label_position: String,
    label_width: String,
    title: Boolean,
    showMessage: Boolean,
    addOrUpdate: Boolean
  },
  data() {
    return {
      rules: {
        category: [{ required: true, message: '请输入目录', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions(['SetCategory', 'GetCategoryDetail']),
    ...mapMutations(['SHOW_DIALOG', 'SPECIAL_BG']),

    async onSubmit() {
      this.$refs.CategoryForm.validate(valid => {
        if (valid) {
          if (this.form.desc === '') this.form.desc = '—'
          if (this.form.alias === '') {
            this.form.alias = this.form.category.toLowerCase()
          }
          if (this.special_bg === '') {
            this.form.pic = `http://localhost:3001/random/${_.random(
              1,
              8
            )}.jpg `
          } else {
            this.form.pic = this.special_bg
          }
          console.log(this.special_bg)
          this.SetCategory({
            ...this.form,
            username: this.name
          })
            .then(() => {
              Msg('目录创建成功', 'success')
              this.SPECIAL_BG('')
              this.$emit('getCategory')
              this.$refs.CategoryForm.resetFields()
            })
            .catch(() => Msg('网络可能有点问题', 'error'))
        }
      })
    },
    CategoryDetail() {
      this.GetCategoryDetail({
        params: {
          _id: this.$route.params.id
        }
      })
    }
  },
  mounted() {
    this.CategoryDetail()
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({
      special_bg: state => state.edit.special_bg,
      form: state => state.category.detail
    })
  }
}
</script>

<style lang="stylus" scoped>
.taxonomy-image {
    border: 1px solid #eee;
    max-width: 300px;
    max-height: 300px;
}
#delete-link {
    line-height: 2.1;
    vertical-align: middle;
    text-align: left;
    margin-left: 8px;
    font-size: 13px;
}
 #delete-link a.delete{
   color: #a00;
 }
  #delete-link a.delete:hover{
  color: #dc3232;
    border: none;
 }
>>> .el-form-item__error{
  padding:0!important
}
>>> .el-dialog__header {
}
.form-title {
  font-size: 18px;
  margin: 0 !important;
}
.el-form--label-top >>> .el-form-item__label {
  padding: 0;
}
.mb-5 {
  margin-bottom: 5px;
}
.mb-15 {
  margin-bottom: 15px;
}
.text-shadow {
  text-shadow: 0 -1px 1px #bd831f, 1px 0 1px #bd831f, 0 1px 1px #bd831f,
    -1px 0 1px #bd831f;
}
>>> .el-form-item .el-form-item__label {
  color: #23282d;
  font-weight: 400;
  text-shadow: none;
  vertical-align: baseline;
}

.description{
  margin:0 !important;
  font-size: 13px;
  margin: 2px 0 5px;
  color: #666;
}
>>>.el-form-item__error{
  top:90%!important
}
</style>
