<template>
  <el-container class="login-container">
    <el-card class="animated flipInY">
      <div slot="header" class="el-card-header">
        <lang-select class="lang-select"></lang-select>
        <div style="clear: both;"></div>
        <img src="/static/image/login-logo.png" alt />
        <h2 class="login-title">{{ $t('login.title') }}</h2>
      </div>
      <el-form
        :rules="rules"
        :model="loginForm"
        ref="loginForm"
        label-width="80px"
      >
        <el-form-item
          :label="$t('login.account')"
          prop="username"
          style="position:relative"
        >
          <el-input
            clearable
            type="text"
            v-model="loginForm.username"
            @keyup.enter.native="goToPwdInput"
          ></el-input>
          <span class="svg-container svg-container_user">
            <svg-icon icon-class="user" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('login.password')" prop="password">
          <el-input
            clearable
            type="password"
            v-model="loginForm.password"
            @keyup.enter.native="onLogin"
            ref="password"
          ></el-input>
          <span class="svg-container svg-container_password">
            <svg-icon icon-class="password" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('login.remember')" label-width="80px">
          <el-row>
            <el-col :span="6">
              <el-switch v-model="remember"></el-switch>
            </el-col>
            <el-col :offset="6" :span="12">
              <el-button class="btn-register" round>
                <router-link to="/register">
                  {{ $t('login.register') }}
                </router-link>
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-button
          type="primary"
          @click="onLogin('loginForm')"
          :loading="loading"
          >{{ $t('login.login') }}</el-button
        >
      </el-form>
    </el-card>
  </el-container>
</template>
<script>
import LangSelect from '@/components/lang-select'
import { mapActions, mapState } from 'vuex'
import { getPublicKey } from '@/api/register'
import { JSEncrypt } from 'jsencrypt'
import Devices from '@/utils/devices'
import { Msg } from '@/utils/message'
import { saveToLocal, loadFromLocal } from '@/common/local-storage'

/* eslint-disable*/
export default {
  components: {
    LangSelect
  },
  data() {
    // password 验证
    const validatePwd = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      remember: false,
      loading: false,
      rules: {
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePwd },
          { required: true, trigger: 'change', validator: validatePwd }
        ]
      }
    }
  },
  created() {
    // 初始化时读取localStorage用户信息
    if (loadFromLocal('remember', false)) {
      this.loginForm.username = loadFromLocal('username', '')
      this.loginForm.password = loadFromLocal('password', '')
    } else {
      this.loginForm.username = ''
      this.loginForm.password = ''
    }
  },
  methods: {
    ...mapActions(['login', 'setDevices']),
    // 用户名输入框回车后切换到密码输入框
    goToPwdInput() {
      this.$refs.password.$el.getElementsByTagName('input')[0].focus()
    },
    // 登录操作
    onLogin() {
      let { username, password } = this.loginForm
      const deviceInfo = {
        username,
        os: Devices.getOsInfo(),
        digits: Devices.getDigits(),
        browser: Devices.getBrowser()
      }

      this.$refs.password.$el.getElementsByTagName('input')[0].blur()
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          getPublicKey().then(res => {
            let encryptor = new JSEncrypt()
            encryptor.setPublicKey(res.data.resultmap) //设置公钥
            this.loginForm.password = encryptor.encrypt(password)
            this.login(this.loginForm)
              .then(() => {
                saveToLocal('device', Devices.getOsInfo())
                // 保存账号
                if (this.remember) {
                  saveToLocal('username', this.loginForm.username)
                  saveToLocal('password', this.loginForm.password)
                  saveToLocal('remember', true)
                } else {
                  saveToLocal('username', '')
                  saveToLocal('password', '')
                  saveToLocal('remember', false)
                }
                if (this.status === 1) {
                  console.log(deviceInfo)
                  this.setDevices(deviceInfo)
                  Msg('登陆成功', 'success')

                  this.$router.push({ path: '/' })
                } else {
                  if (this.status === -1) {
                    Msg('密码错误', 'error')
                    this.loginForm.password = ''
                  } else if (this.status === 0) {
                    Msg('不存在该用户', 'error')
                    this.loginForm.password = ''
                  }
                }
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          })
        } else {
          return false
        }
      })
    }
  },

  computed: {
    ...mapState({ status: state => state.user.status })
  }
}
</script>
<style scoped lang="stylus">
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: mix(#494166, #424b50) url('/static/image/login-bg.jpg') center no-repeat;
  background-size: cover;
  overflow: hidden;

  .show-account {
    position: absolute;
    left: 15px;
    bottom: 20px;
    color: red;
  }

  .el-card {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -300px 0 0 -200px;
    width: 400px;
    height: 450px;
    background: #fff;

    .el-card-header {
      text-align: center;

      .lang-select {
        float: right;
      }
    }

    .login-title {
      margin: 0;
      text-align: center;
    }

    .el-input /deep/ .el-input__inner {
      text-indent: 12px;
    }

    .svg-container {
      position: absolute;
      top: 0;
      left: 5px;
      color: #889aa4;

      &_user {
        font-size: 20px;
      }

      &_password {
        left: 7px;
        font-size: 16px;
      }
    }

    .el-button--primary {
      width: 100%;
    }
  }
}
.btn-register{
  color:white;
  border:0;
  background: linear-gradient(
    90deg,
    rgb(209, 255, 26) 0%,
    rgb(26, 209, 255) 100%
  );}
</style>
