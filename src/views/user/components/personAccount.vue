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
      <a
        href="##"
        class="card-cta"
        data-toggle="modal"
        data-target="#ga-modal"
        @click="dialogPersonalVisible = true"
      >
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
      :visible.sync="dialogPersonalVisible"
    >
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        label-position="right"
        label-width="80px"
      >
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item
              prop="nickname"
              :rules="{ required: true, message: '昵称不能为空' }"
              id="labels"
              label="昵称"
            >
              <el-input
                type="nickname"
                v-model="ruleForm.nickname"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item id="labels" label="性别">
          <el-radio v-model="ruleForm.sex" label="男" border size="small"
            >男</el-radio
          >
          <el-radio v-model="ruleForm.sex" label="女" border size="small"
            >女</el-radio
          >
        </el-form-item>
        <el-form-item label="生日">
          <el-col :span="12">
            <el-form-item prop="birthday">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.birthday"
                style="width: 85%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item id="labels" label="职业">
              <el-input v-model.trim="ruleForm.job" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item id="labels" label="家乡">
              <el-cascader
                :options="area.options"
                v-model="area.hometown"
                @change="handleChange"
                clearable
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="头像">
              <el-upload
                action="#"
                list-type="picture-card"
                :limit="1"
                show-file-list
                :before-upload="beforeupload"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item>
              <el-image width="80%" class="showPic" :src="ruleForm.url" alt>
                <div slot="error" class="image-slot">
                  <i style="fontSize:28px" class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="个性签名" id="labels" prop="desc">
          <el-input
            type="textarea"
            style="width: 91.5%"
            v-model="ruleForm.desc"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setPersonal">提 交</el-button>
        <el-button @click="dialogPersonalVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'

export default {
  props: {},
  data() {
    return {
      //个人信息表单
      ruleForm: {
        username: '',
        nickname: '',
        sex: '',
        hometown: [],
        job: '',
        birthday: '',
        desc: '',
        url: ''
      },
      area: {
        options: regionData
      },
      param: new FormData(),
      dialogPersonalVisible: false
    }
  },
  methods: {
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
    //覆盖默认的上传行为
    httprequest() {},
    //设置个人资料
    setPersonal() {
      if (this.ruleForm.hometown.length === 0) {
        this.ruleForm.hometown = this.area.hometown
      }
      this.param.append('message', JSON.stringify(this.ruleForm))
      this.$axios.post('/api/userInfoAdd', this.param).then(res => {
        if (res.data == '0') {
          swal({
            title: '设置成功!',
            icon: 'success',
            button: 'Aww yiss!'
          }).then(() => {
            this.$router.go(0)
          })
        } else if (res.data == '1') {
          swal({
            title: '更新成功!',
            icon: 'success',
            button: 'Aww yiss!'
          })
            .then(() => {
              this.$router.go(0)
            })
            .then(() => {
              this.$store.commit('settingList', {
                username: this.ruleForm.username,
                mode: 'updateData',
                data: 1
              })

              this.$axios.post('/api/optionStatistical', this.statistical)
            })
        } else {
          swal({
            title: '设置失败!',
            text: '网络好像有点问题',
            icon: 'error',
            button: 'yiss Aww!'
          })
        }
      })
    }
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
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    line-height: 146px;
    vertical-align: top;
    text-align: center;
    outline: 0;
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
