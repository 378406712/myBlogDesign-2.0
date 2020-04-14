<template>
  <el-form
    :rules="form.rules"
    label-position="top"
    ref="CategoryForm"
    :model="form"
    label-width="80px"
  >
    <p class="form-title">添加新分类目录</p>
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>
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
export default {
  data() {
    return {
      form: {
        name: '',
        alias: '',
        desc: '',
        url: '',
        rules: {
          name: [{ required: true, message: '请输入名称', trigger: 'blur' }]
        }
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.CategoryForm.validate(valid => {
        if (valid) {
          alert('123')
        }
      })
    }
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
>>> .el-form-item__label {
  color: #23282d;
  font-weight: 400;
  text-shadow: none;
  vertical-align: baseline;
}
>>> .el-form-item{
margin-bottom: 10px;
}
</style>
