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
                style="width: 84%"
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
                style="width: 100%"
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
              >
                <i class="showPic el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-image
              :src="ruleForm.url"
              v-if="ruleForm.url"
              :preview-src-list="[ruleForm.url]"
              width="80%"
              class="showPic showPic-success"
            >
              <div slot="error" class="image-slot">
                <i
                  style="fontSize:30px"
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
    ...mapMutations(['SET_VISIBLE']),
    //地区处理
    handleChange(value) {
      this.ruleForm.hometown = value
    },
    //阻止upload的自动上传，进行再操作
    beforeupload(file) {
      //创建临时的路径来展示图片
      var windowURL = window.URL || window.webkitURL
      this.ruleForm.url = windowURL.createObjectURL(file)
      //重新写一个表单上传的方法
      this.param.append('file', file, file.name)
      return false
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
    },
    onPreview() {
      this.showViewer = true
    }
  },

  computed: {
    ...mapGetters(['name']),
    ...mapState({
      ruleForm: state => state.center.form
    })
  }
}
</script>
<style lang="stylus" scoped>
/deep/ .el-form-item__label {
    font-weight: 800;
    color: #34395e;
    font-size: 12px;
    letter-spacing: 0.5px;
  }
  /deep/ .el-dialog__body {
    padding: 25px;
    padding-top: 15px;
  }

  /deep/ .el-dialog {
    border-radius: 0.3rem;
  }
  /deep/.el-dialog__title {
    font-size: 18px;
    margin-bottom: 0;
    line-height: 1.5;
    font-weight: 700;
    color: #6c757d;
  }
  /deep/.swal-button {
    padding: 7px 19px;
    border-radius: 5px;
    background-color: #3085d6;
    font-size: 1.1rem;
    font-family: none;
    text-shadow: 0px -1px 0px rgba(0, 0, 0, 0.3);
    padding: 10px 25px;
  }
  /deep/.swal-footer {
    text-align: center;
  }
  .card.card-large-icons .card-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 150px;
    border-radius: 3px 0 0 3px;
  }
  .card-icon svg {
    font-size: 66px !important;
  }
  .card.card-large-icons .card-body {
    padding: 18px 30px;
  }
  .card.card-large-icons .card-body h4 {
    font-size: 18px;
    margin-bottom: 8px;
  }
  .card.card-large-icons .card-body p {
    opacity: 0.6;
    font-weight: 500;
    margin-bottom: 16px;
  }
  .bg-primary {
    background-color: #6777ef !important;
  }
  .el-radio {
    margin: 0;
  }
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
    border: 1px dashed #c0ccda;
  }
  .showPic-success{
      border: 1px solid #c0ccda;
  }
  .card-cta {
    color: #6777ef;
    font-weight: 500;
    transition: all 0.5s;
    -webkit-transition: all 0.5s;
    -o-transition: all 0.5s;
    font-size: 14px;
  }
</style>
