<template>
  <div class="personal">
    <div class="grey_bg">
      <div class="content">
        <!-- 内容 -->

        <section class="list">
          <!-- 待循环 -->
          <div class="card card-profile">
            <div class="card-main">
              <ul class="card-inner essay-card">
                <li>
                  <section class="section">
                    <div class="section-header">
                      <h1>我的账号</h1>
                    </div>
                    <div class="section-body">
                      <h2 class="section-title">欢迎, clover_1996!</h2>
                      <p class="section-lead">{{ e_mail }}</p>
                      <div class="row mt-sm-4">
                        <div class="col-lg-6">
                          <div class="card card-large-icons">
                            <div class="card-icon bg-primary">
                              <span class="svg-container">
                                <svg-icon icon-class="lock" />
                              </span>
                            </div>
                            <div class="card-body">
                              <h4>修改密码</h4>
                              <p>定期修改为高强度密码以保护您的账号</p>
                              <a
                                href="javascript:;"
                                class="card-cta"
                                @click="alterForm.dialogFormVisible = true"
                              >
                                立即修改
                                <span class="svg-container">
                                  <svg-icon icon-class="chevron-right" />
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-6">
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
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="card card-large-icons">
                            <div class="card-icon bg-primary">
                              <span class="svg-container">
                                <svg-icon icon-class="skull" />
                              </span>
                            </div>
                            <div class="card-body">
                              <h4>删除账号</h4>
                              <p>您的所有数据都会被删除，无法找回</p>
                              <a
                                href="##"
                                class="card-cta"
                                data-toggle="modal"
                                data-target="#kill-modal"
                                @click="removePass"
                              >
                                申请删除
                                <span class="svg-container">
                                  <svg-icon icon-class="chevron-right" />
                                </span>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
    <!-- 表单 修改密码 -->
    <el-dialog
      top="2%"
      width="35%"
      :close-on-click-modal="false"
      title="修改账号密码"
      custom-class="alertPwd"
      :visible.sync="alterForm.dialogFormVisible"
    >
      <el-form v-model="alterForm.form">
        <el-form-item id="labels" label="原密码">
          <el-input v-model="alterForm.originPass" autocomplete="off" clearable></el-input>
        </el-form-item>

        <el-form-item id="labels" label="新密码">
          <el-input v-model="alterForm.newPass" show-password clearable></el-input>
        </el-form-item>

        <el-form-item id="labels" label="再次输入新密码">
          <el-input v-model="alterForm.againPass" show-password clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="alterPass">确 定</el-button>
        <el-button @click="alterForm.dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 表单 个人信息 -->
    <el-dialog top="2%" width="50%" title="个人信息" :visible.sync="dialogPersonalVisible">
      <el-form :model="ruleForm" ref="ruleForm" :label-position="labelPosition" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item
              prop="nickname"
              :rules="{ required: true, message: '昵称不能为空' }"
              id="labels"
              label="昵称"
            >
              <el-input type="nickname" v-model="ruleForm.nickname" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item id="labels" label="性别">
          <el-radio v-model="ruleForm.sex" label="男" border size="small">男</el-radio>
          <el-radio v-model="ruleForm.sex" label="女" border size="small">女</el-radio>
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
          <el-input type="textarea" style="width: 91.5%" v-model="ruleForm.desc"></el-input>
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
import { mapState } from 'vuex'
import { JSEncrypt } from 'jsencrypt'
import { regionData, CodeToText } from 'element-china-area-data'

export default {
  name: 'personal',
  data() {
    return {
      //修改密码表单
      alterForm: {
        dialogFormVisible: false,
        originPass: '',
        newPass: '',
        againPass: '',
        form: ''
      },
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
      labelPosition: 'right',
      dialogPersonalVisible: false
    }
  },
  methods: {
    //地区处理
    handleChange(value) {
      this.ruleForm.hometown = value
    },
    //修改密码
    alterPass() {
      let { originPass, againPass, newPass } = this.alterForm
      if (originPass == '' || againPass == '' || newPass == '') {
        swal({
          title: '有未输入内容!',
          text: '请重新输入',
          icon: 'warning',
          button: 'OK'
        })
      } else if (originPass == newPass && originPass != '') {
        swal({
          title: '修改密码失败!',
          text: '原密码与新密码相同',
          icon: 'warning',
          button: 'OK'
        })
      } else if (newPass == againPass && newPass != '') {
        this.$axios.get('/api/getPublicKey').then(res => {
          //先获取公钥
          if (res.data.status === 0) {
            let encryptor = new JSEncrypt() //实例化
            encryptor.setPublicKey(res.data.resultmap) //设置公钥

            let PwdData = {
              e_mail: this.e_mail,
              originPass: encryptor.encrypt(originPass),
              againPass: encryptor.encrypt(againPass)
            }
            this.$axios.post('/api/userPassAlter', PwdData).then(res => {
              if (res.data.status == '0') {
                swal({
                  title: '修改密码成功!',
                  text: '请重新登录',
                  icon: 'success',
                  button: 'OK'
                })
                  .then(() => {
                    delete localStorage.token
                    this.$router.go(0)
                  })
                  .then(() => {
                    this.$store.commit('settingList', {
                      username: this.ruleForm.username,
                      mode: 'alterPass',
                      data: 1
                    })

                    this.$axios.post('/api/optionStatistical', this.statistical)
                  })
              } else if (res.data.status === '1') {
                swal({
                  title: '修改密码失败!',
                  text: '原密码错误',
                  icon: 'error',
                  button: 'OK'
                })
              } else if (res.date.status == '2') {
                swal({
                  title: '修改密码失败!',
                  text: '网络好像有点问题～',
                  icon: 'warn',
                  button: 'OK'
                })
              }
            })
          } else {
            //网络问题
          }
        })
      } else if (newPass != againPass) {
        swal({
          title: '修改密码失败!',
          text: '两次输入不符合',
          icon: 'error',
          button: 'OK'
        })
      }
    },
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
    },
    //获取个人资料显示在表单
    getPersonal() {
      let getPersonalData = this.$axios
        .get('/api/userInfoData', {
          params: {
            username: this.ruleForm.username
          }
        })
        .then(res => {
          this.ruleForm.url = res.data.uploadUrl
          this.area.hometown = res.data.hometown
          delete res.data._id
          delete res.data.uploadUrl
          Object.assign(this.ruleForm, { ...res.data })
        })
    },
    //删除账号
    removePass() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let removeData = {
            params: {
              username: this.username,
              e_mail: this.e_mail
            }
          }
          this.$axios.get('/api/userRemove', removeData).then(res => {
            if (res.data.status == '0') {
              swal({
                title: '删除成功!',
                icon: 'success',
                button: 'Aww yiss!'
              }).then(() => {
                delete localStorage.token
                this.$router.go(0)
              })
            } else {
              swal({
                title: '删除失败,网络好像出了小差～',
                icon: 'error',
                button: 'yiss Aww!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
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
    httprequest() {}
  },
  created() {},
  computed: {}
}
</script>
<style scoped lang="stylus" >
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
.section .section-header {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
  background-color: #6777ef;
  border-radius: 3px;
  border: none;
  position: relative;
  padding: 20px;
}
.section > *:first-child {
  margin-top: -7px;
}
.section .section-header h1 {
  margin-bottom: 0;
  font-weight: 700;
  display: inline-block;
  font-size: 24px;
  margin-top: 3px;
  color: #fff;
}
.section .section-title:before {
  content: ' ';
  border-radius: 5px;
  height: 8px;
  width: 30px;
  background-color: #6777ef;
  display: inline-block;
  margin-top: 6px;
  margin-right: 15px;
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
.card-profile {
  margin-top: 0;
}
</style>

