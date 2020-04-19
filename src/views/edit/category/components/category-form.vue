<template>
  <el-form
    :rules="rules"
    label-position="top"
    ref="CategoryForm"
    :model="form"
    label-width="80px"
  >
    <p class="form-title">添加新分类目录</p>
    <el-form-item label="名称" prop="category">
      <el-input v-model="form.category"></el-input>
    </el-form-item>
    <el-form-item label="别名" prop="alias">
      <el-input v-model="form.alias"></el-input>
    </el-form-item>
    <el-form-item label="图像描述" prop="desc">
      <el-input type="textarea" :rows="4" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item label="分类/标签图像" prop="url" class="mb-15">
      <el-input v-model="form.url" class="mb-5"></el-input>
      <el-button>添加图像</el-button>
    </el-form-item>
    <el-form-item>
      <el-button
        @click="onSubmit('CategoryForm')"
        type="warning"
        class="text-shadow"
        >添加新分类目录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
let _ = require('lodash')
import { mapActions, mapGetters, mapState } from 'vuex'
import { Msg } from '@/utils/message'
export default {
  data() {
    return {
      form: {
        category: '',
        alias: '',
        desc: '',
        // url: '',
        sum: 0
      },
      rules: {
        category: [{ required: true, message: '请输入目录', trigger: 'blur' }]
      }
    }
  },
  methods: {
    ...mapActions(['SetCategory']),

    async onSubmit() {
      this.$refs.CategoryForm.validate(valid => {
        if (valid) {
          if (this.form.desc === '') this.form.desc = '—'
          if (this.form.alias === '') {
            this.form.alias = this.form.category.toLowerCase()
          }
          this.SetCategory({
            ...this.form,
            username: this.name,
            pic: `http://localhost:3001/random/${_.random(1, 8)}.jpg `
          })
            .then(() => {
              Msg('目录创建成功', 'success')
              this.$emit('getCategory')
              this.$refs.CategoryForm.resetFields()
            })
            .catch(() => Msg('网络可能有点问题', 'error'))
        }
      })
    }
  },
  computed: {
    ...mapGetters(['name']),
    ...mapState({})
  }
}
</script>

<style lang="scss" scoped>
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
>>> .el-form-item {
  margin-bottom: 10px;
}
</style>
