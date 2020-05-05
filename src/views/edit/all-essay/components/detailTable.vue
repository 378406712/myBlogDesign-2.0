<template>
  <el-form
    :model="updateForm"
    ref="ruleForm"
    label-width="75px"
    label-position="left"
    class="detail-ruleForm"
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
              <el-input disabled v-model="updateForm.essayPassword"></el-input>
            </el-col>
            <el-col :span="12">
              <i> –或– </i>
              <el-checkbox
                :checked="updateForm.radioVisible === 'private'"
                label="私密"
              ></el-checkbox>
            </el-col>
          </el-row>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item id="lengend" label="更新状态"> </el-form-item>
        <el-form-item label="状态">
          <el-checkbox :checked="updateForm.keepTop">置顶文章</el-checkbox>
          <el-checkbox :checked="updateForm.commentOn">允许评论 </el-checkbox>
          <el-checkbox :checked="updateForm.draft">草稿 </el-checkbox>
          <el-checkbox :checked="updateForm.reCheck">等待复审 </el-checkbox>
          <el-checkbox :checked="updateForm.sended">已发送 </el-checkbox>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item id="lengend" label="所属目录"> </el-form-item>
        <el-form-item label="目录分类">
          <el-card :body-style="{ height: '100%' }">
            <el-scrollbar style="height: 100%;">
              <div v-for="o in updateForm.checkCategory" :key="o">
                <router-link :to="'/edit/category-detail/' + o">
                  {{ o }}</router-link
                >
              </div>
            </el-scrollbar>
          </el-card>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item id="lengend" label="更新文章"> </el-form-item>
        <el-steps :active="2" align-center>
          <el-step title="步骤1" icon="el-icon-edit" description="">
            <template slot="description">
              <router-link :to="'/edit/post-new/' + updateForm._id">
                点击编辑</router-link
              >
            </template>
          </el-step>
          <el-step
            title="步骤2"
            icon="el-icon-success"
            description="修改状态-提交"
          ></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <div style="text-align: center;">
      <el-button @click="$emit('cancel')" size="mini" type="success"
        >确定</el-button
      >
    </div>
  </el-form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    updateForm: Object,
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
    changeStatus(val) {
      console.log(val)
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
#lengend + .el-form-item  >>> .el-checkbox {
    margin-right 10px
}.card-category{
    heigth:40px
    overflow hidden
}
>>>.el-card__body {
    padding: 10px;
}
>>> .el-card{
    width 150px;
     text-align:center
}
.el-card a{
  color: #0073aa;
    outline: 0;
    font-size: 14px !important;
    font-weight: 600;
    &:hover{
          color: #0096dd;
    }
}

>>>.el-step__icon{
  background-color transparent
}
  </style>
