<template>
  <el-form
    label-position="top"
    class="settingForm"
    ref="form"
    :model="form"
    label-width="80px"
  >
    <el-form-item label="栏目">
      <el-checkbox-group v-model="form.checkGroup">
        <el-checkbox
          v-for="item in form.type"
          :key="item.label"
          :label="item.label"
        ></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="分页">
      每页的项目数:
      <el-input-number
        size="mini"
        v-model="num"
        controls-position="right"
        @change="handleChangeNum"
        :min="2"
        :step="2"
        :max="10"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="查看模式">
      <el-radio-group v-model="radio" @change="handleChangeView">
        <el-radio label="list-view">列表视图</el-radio>
        <el-radio label="tabloid-view">摘要视图</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <div class="submit" @click="onSubmit">
        <el-button size="mini" class="apply">应用</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      form: {
        checkGroup: [],
        type: [
          { label: '分类目录', value: 'category' },
          { label: '评论', value: 'comment' },
          { label: '日期', value: 'date' },
          { label: '点击数', value: 'click_num' },
        ],
      },
      num: 8,
      radio: 'list-view',
    }
  },
  methods: {
    ...mapMutations(['SETTING']),
    onSubmit() {
      console.log(this.$store)
       this.SETTING(this.form.checkGroup)
    },
    handleChangeNum(val) {
      this.num = val
    },
    handleChangeView(val) {
      this.radio = val
    },
  },
}
</script>
<style lang="scss">
.settingForm {
  padding: 8px 20px 12px;
}
.apply {
  background: #a3b745;
  border-color: #829237 #727f30 #727f30;
  color: #fff;
  box-shadow: 0 1px 0 #727f30;
  text-shadow: 0 -1px 1px #727f30, 1px 0 1px #727f30, 0 1px 1px #727f30,
    -1px 0 1px #727f30;
}
.apply:hover {
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
