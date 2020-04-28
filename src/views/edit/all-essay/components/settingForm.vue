<template>
  <el-form
    label-position="top"
    class="settingForm"
    ref="form"
    :model="form"
    label-width="80px"
  >
    <el-form-item label="栏目">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="作者" name="author"></el-checkbox>
        <el-checkbox label="分类目录" name="category"></el-checkbox>
        <el-checkbox label="评论" name="comment"></el-checkbox>
        <el-checkbox label="日期" name="date"></el-checkbox>
        <el-checkbox label="点击数" name="click_num"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="分页">
      每页的项目数:
      <el-input-number
        size="mini"
        v-model="num"
        controls-position="right"
        @change="handleChange"
        :min="2"
        :step="2"
        :max="10"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="查看模式">
      <el-radio-group v-model="radio">
        <el-radio :label="3">列表视图</el-radio>

        <el-radio :label="9">摘要视图</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <div class="submit">
        <el-button size="mini" class="toDo">应用</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      num: '',
      radio: ''
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    handleChange() {}
  }
}
</script>
<style lang="scss">
.settingForm {
  padding: 8px 20px 12px;
}
.toDo {
  background: #a3b745;
  border-color: #829237 #727f30 #727f30;
  color: #fff;
  box-shadow: 0 1px 0 #727f30;
  text-shadow: 0 -1px 1px #727f30, 1px 0 1px #727f30, 0 1px 1px #727f30,
    -1px 0 1px #727f30;
}
.toDo:hover {
  background: #a9bd4f;
  border-color: #727f30;
  color: #fff;
  box-shadow: 0 1px 0 #727f30;
}
.el-form--label-top >>> .el-form-item__label {
  padding: 0;
}
.settingForm .el-form-item__label {
  font-weight: 600;
}
</style>
