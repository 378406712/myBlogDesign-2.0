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
               –或– <el-checkbox label="私密"></el-checkbox>
            </el-col>
          </el-row>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item size="mini" label="状态">
          <el-select v-model="updateForm.status" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item><el-checkbox>置顶这篇文章</el-checkbox> </el-form-item>
        <el-form-item><el-checkbox>允许评论</el-checkbox></el-form-item>
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
export default {
  data() {
    return {
      updateForm: {
        title: '',
        essayPassword: '',
        date: '',
        checkCategor: '',
        status: '',
      },
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
</style>
