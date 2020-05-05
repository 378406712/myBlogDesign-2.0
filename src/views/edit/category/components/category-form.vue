<template>
  <el-form
    :rules="rules"
    ref="CategoryForm"
    :model="form"
    :show-message="true"
    :hide-required-asterisk="true"
  >
    <p class="form-title">添加新分类目录</p>
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
    <el-form-item label="分类/标签图像" prop="pic" class="mb-15">
      <el-input v-model="form.pic" class="mb-5"></el-input>
      <el-button @click="SHOW_DIALOG(true)">添加图像</el-button>
    </el-form-item>
    <el-form-item>
      <el-button
        @click="onSubmit('CategoryForm')"
        type="warning"
        class="text-shadow"
        style="margintop: 10px;"
        >添加新分类目录</el-button
      >
    </el-form-item>
    <Media v-on:PropPic="picData" target="CategoryForm" />
  </el-form>
</template>

<script>
let _ = require('lodash')
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { Msg } from '@/utils/message'
import Media from '@/components/media'
export default {
  name: 'category-form',
  components: { Media },
  data() {
    return {
      form: {
        category: '',
        alias: '',
        desc: '',
        pic: '',
        sum: 0
      },
      rules: {
        category: [{ required: true, message: '请输入目录', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions(['SetCategory']),
    ...mapMutations(['SHOW_DIALOG']),
    baseJudge() {
      this.form.desc === '' ? (this.form.desc = '—') : this.form.desc
      this.form.alias === ''
        ? (this.form.alias = this.form.category.toLowerCase())
        : this.form.alias

      this.form.pic === ''
        ? (this.form.pic = `http://localhost:3001/random/${_.random(1, 8)}.jpg`)
        : this.form.pic
    },
    async onSubmit() {
      this.$refs.CategoryForm.validate((valid) => {
        if (valid) {
          this.baseJudge()
          this.SetCategory({
            ...this.form,
            username: this.name
          })
            .then(() => {
              this.clearForm()
              this.$emit('getCategory')
              Msg('目录创建成功', 'success')
            })
            .catch(() => Msg('网络可能有点问题', 'error'))
        }
      })
    },
    picData(pic) {
      this.form.pic = pic
    },
    clearForm() {
      this.$refs.CategoryForm.resetFields()
    }
  },
  computed: {
    ...mapGetters(['name'])
  }
}
</script>

<style lang="stylus" scoped>
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
</style>
