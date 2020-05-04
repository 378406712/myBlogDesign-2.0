<template>
  <el-form
    :model="updateForm"
    ref="ruleForm"
    label-width="75px"
    label-position="left"
    class="demo-ruleForm"
  >
    <el-row :gutter="20">
      <el-col :span="6">
        <el-form-item id="lengend" label="快速编辑"> </el-form-item>
        <el-form-item size="mini" label="标题" prop="name">
          <el-input v-model="updateForm.title"></el-input>
        </el-form-item>

        <el-form-item size="mini" label="日期" prop="date">
          <el-input v-model="updateForm.date"></el-input>
        </el-form-item>
        <el-form-item size="mini" label="密码" prop="essayPassword">
          <el-row>
            <el-col :span="12">
              <el-input v-model="updateForm.essayPassword"></el-input>
            </el-col>
            <el-col :span="12">
              <i> –或– </i> <el-checkbox label="私密"></el-checkbox>
            </el-col>
          </el-row>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item id="lengend" label="更新状态"> </el-form-item>
        <el-form-item size="mini" label="状态">
          <el-select v-model="updateForm.status" placeholder="请选择活动区域">
            <el-option
              v-for="(item, index) in updateForm.checkCategory"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          ><el-checkbox :checked="updateForm.keepTop">置顶这篇文章</el-checkbox>
        </el-form-item>
        <el-form-item
          ><el-checkbox :checked="updateForm.commentOn"
            >允许评论</el-checkbox
          ></el-form-item
        >
      </el-col>
      <!-- <el-checkbox-group
          v-model="updateForm.checkCategory"
          v-for="(item, index) in category"
          :key="index"
        >
          <el-checkbox
            :label="item.category"
            :checked="check._id === item._idw"
          ></el-checkbox>
        </el-checkbox-group> -->
    </el-row>
  </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    updateForm: Object,
  },
  data() {
    return {
      //   updateForm: {
      //     title: '',
      //     essayPassword: '',
      //     date: '',
      //     checkCategor: '',
      //     status: '',
      //   },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style>
.el-table__expanded-cell[class*='cell'] {
  padding: 20px 15px !important;
}
</style>
<style lang="stylus" scoped>
>>> .el-form-item--mini{
    margin-bottom 5px
}
#lengend{
    font-weight 600
}
</style>
