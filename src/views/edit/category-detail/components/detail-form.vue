<template>
  <el-form
    :rules="rules"
    :label-position="label_position"
    ref="DetailForm"
    :model="form"
    :label-width="label_width"
    :hide-required-asterisk="false"
  >
    <el-form-item label="名称" prop="category">
      <el-input
        v-model="form.category"
        :disabled="form.category === '未分类'"
      ></el-input>
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
    <el-form-item label="分类/标签图像" prop="detail_pic" class="mb-15">
      <img class="taxonomy-image" :src="detail_pic" />
      <el-input v-model="detail_pic" class="mb-5"></el-input>
      <el-button @click="SHOW_DIALOG(true)">添加图像</el-button>
      <el-button @click="deletePic" type="danger">删除图像</el-button>
    </el-form-item>
    <el-button
      @click="upDateCategory"
      type="warning"
      size="mini"
      class="text-shadow"
      >更新</el-button
    >
    <span id="delete-link">
      <a class="delete" href="">删除</a>
    </span>
    <Media target="DetailForm" />
  </el-form>
</template>

<script>
let _ = require('lodash')
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
import { Msg } from '@/utils/message'
import Media from '@/components/media'
import { mixins } from '@/mixin/index'
export default {
  name: 'category-form',
  mixins: [mixins],
  components: { Media },
  props: {
    label_position: String,
    label_width: String,
    title: Boolean,
    showMessage: Boolean
  },
  data() {
    const validCategoryName = (rule, value, cb) => {
      const existCategory = []
      _.forEach(this.category, function (value, key) {
        existCategory.push(value.category)
      })

      if (existCategory.includes(value) && this.base_detail !== value) {
        cb(new Error('目录已存在'))
      } else {
        cb()
      }
    }
    return {
      initName: '',
      rules: {
        category: [
          { required: true, message: '请输入目录', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validCategoryName },
          { required: true, trigger: 'change', validator: validCategoryName }
        ]
      }
    }
  },
  methods: {
    ...mapActions([
      'SetCategory',
      'GetCategory',
      'GetCategoryDetail',
      'updateCategory'
    ]),
    ...mapMutations(['SHOW_DIALOG', 'CATEGORY_PIC']),
    baseJudge() {
      this.form.desc === '' ? (this.form.desc = '—') : this.form.desc
      this.form.alias === ''
        ? (this.form.alias = this.form.category.toLowerCase())
        : this.form.alias

      this.detail_pic === ''
        ? this.CATEGORY_PIC(
            `http://localhost:3001/random/${_.random(1, 8)}.jpg`
          )
        : this.detail_pic
    },
    CategoryDetail() {
      this.GetCategoryDetail({
        params: {
          category: this.$route.params.category
        }
      })
    },
    upDateCategory() {
      this.$refs.DetailForm.validate((valid) => {
        if (valid) {
          this.baseJudge()
          this.updateCategory({
            ...this.form,
            username: this.name,
            pic: this.detail_pic
          })
            .then(() => {
              Msg('目录更新成功', 'success')
              this.$emit('UpdateSuccess', true)
              document.body.scrollTop = document.documentElement.scrollTop = 0
              this.getCategory(this.GetCategory, {
                params: { username: this.name }
              }) //混入
            })
            .catch(() => Msg('网络可能有点问题', 'error'))
        }
      })
    },
    clearForm() {
      this.$refs.CategoryForm.resetFields()
    },
    deletePic() {
      this.CATEGORY_PIC('')
    }
  },
  mounted() {
    this.CategoryDetail()

    this.getCategory(this.GetCategory, { params: { username: this.name } }) //混入
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({
      form: (state) => state.category.detail,
      detail_pic: (state) => state.category.detail_pic,
      category: (state) => state.edit.category_c,
      base_detail: (state) => state.category.base_detail
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
        box-shadow: 0 1px 0 #bd831f;
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
