<template>
  <div class="card card-large-icons">
    <div class="card-icon bg-primary">
      <span class="svg-container">
        <svg-icon icon-class="shield" />
      </span>
    </div>
    <div class="card-body">
      <h4>个人信息</h4>
      <p>个性化设置资料,如上传/修改头像等</p>
      <a class="card-cta" @click="show">
        立即设置
        <span class="svg-container">
          <svg-icon icon-class="chevron-right" />
        </span>
      </a>
    </div>
    <!-- 表单 个人信息 -->
    <el-dialog
      top="2%"
      width="50%"
      title="个人信息"
      :visible="visible"
      @close="hide"
    >
      <el-form
        class="bg-form"
        :model="ruleForm"
        ref="ruleForm"
        label-position="right"
        label-width="80px"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item prop="nickname" id="labels" label="昵称">
              <el-input
                type="nickname"
                v-model="ruleForm.nickname"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item id="labels" prop="sex" label="性别">
          <el-radio v-model="ruleForm.sex" label="男" border size="small"
            >男</el-radio
          >
          <el-radio v-model="ruleForm.sex" label="女" border size="small"
            >女</el-radio
          >
        </el-form-item>
        <el-form-item prop="sex" label="生日">
          <el-col :span="12">
            <el-form-item prop="birthday">
              <el-date-picker
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.birthday"
                style="width: 84%;"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item id="labels" prop="job" label="职业">
              <el-input v-model.trim="ruleForm.job" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item id="labels" prop="hometown" label="家乡">
              <el-cascader
                style="width: 100%;"
                ref="cascader"
                :options="area.options"
                v-model="ruleForm.hometown"
                @change="handleChange"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="头像" prop="avatar">
              <el-upload
                action="#"
                list-type="picture-card"
                :limit="1"
                :before-upload="beforeupload"
                accept="image/*"
              >
                <i class="showPic el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-image
              :src="ruleForm.url"
              :preview-src-list="[ruleForm.url]"
              width="80%"
              class="showPic showPic-success"
            >
              <div slot="error" class="image-slot">
                <i
                  style="fontsize: 30px;"
                  class="showPic-error showPic el-icon-picture-outline"
                ></i>
              </div>
            </el-image>
          </el-col>
        </el-row>
        <el-form-item label="个性签名" id="labels" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setPersonal">提 交</el-button>
        <el-button @click="hide">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { regionData } from 'element-china-area-data'
import { Msg } from '@/utils/message'
export default {
  props: {
    visible: Boolean
  },
  data() {
    return {
      area: {
        options: regionData
      },
      param: new FormData()
    }
  },
  methods: {
    ...mapMutations(['SET_VISIBLE', 'SET_AVATAR']),
    //地区处理
    handleChange(value) {
      this.ruleForm.hometown = value
    },
    //阻止upload的自动上传，进行再操作
    beforeupload(file) {
      //创建临时的路径来展示图片
      const isLt3M = file.size / 1024 / 1024 < 3
      if (isLt3M) {
        const windowURL = window.URL || window.webkitURL
        this.ruleForm.url = windowURL.createObjectURL(file)
        this.SET_AVATAR(this.ruleForm.url)
        //重新写一个表单上传的方法
        this.param.append('file', file, file.name)
        return false
      }
      if (!isLt3M) Msg('上传头像图片大小不能超过 3MB!', 'error')
      return isLt3M
    },
    //设置个人资料
    setPersonal() {
      this.ruleForm.username = this.name
      this.param.append('message', JSON.stringify(this.ruleForm))
      this.$emit('setUserInfo', this.param)
      this.reset()
    },
    hide() {
      this.SET_VISIBLE(false)
      this.reset()
    },
    show() {
      this.SET_VISIBLE(true)
      this.$emit('getPersonal')
    },
    reset() {
      this.$refs['ruleForm'].resetFields()
      this.$refs['cascader'].checkedValue = null
      this.ruleForm.url = ''
    }
  },

  computed: {
    ...mapGetters(['name']),
    ...mapState({
      ruleForm: (state) => state.account.form
    })
  }
}
</script>
<style lang="stylus" scoped>
@import url('../../../style/card.css');
  .showPic {
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
    outline: 0;
  }
  .showPic-error {
   background-color: #fbfdff;
  }
  .showPic-success{
      border: 1px solid #c0ccda;
  }
</style>
