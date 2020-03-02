<template>
  <el-container class="register-container">
    <el-card class="animated flipInY">
      <div slot="header" class="el-card-header">
        <lang-select class="lang-select"></lang-select>
        <div style="clear: both;"></div>
        <img src="../../../static/image/register-logo.png" alt />
        <h2 class="login-title">{{ $t("register.title") }}</h2>
      </div>
      <el-form :rules="rules" :model="registerForm" ref="registerForm" label-width="80px">
        <el-form-item :label="$t('register.account')" prop="username" style="position:relative">
          <el-input type="text" v-model="registerForm.username" @keyup.enter.native="goToPwdInput"></el-input>
          <span class="svg-container svg-container_user">
            <svg-icon icon-class="user" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('register.password')" prop="pwd">
          <el-input
            type="password"
            v-model="registerForm.pwd"
            @keyup.enter.native="goToCheckPass"
            ref="pwd"
          ></el-input>
          <span class="svg-container svg-container_password">
            <svg-icon icon-class="password" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('register.again_pass')" prop="checkPass">
          <el-input
            type="password"
            v-model="registerForm.checkPass"
            @keyup.enter.native="goToEmail"
            ref="checkPass"
          ></el-input>
          <span class="svg-container svg-container_password">
            <svg-icon icon-class="again_pass" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('register.e_mail')" prop="e_mail">
          <el-input
            type="text"
            v-model="registerForm.e_mail"
            @keyup.enter.native="onRegister"
            ref="e_mail"
          ></el-input>
          <span class="svg-container svg-container_password">
            <svg-icon icon-class="again_pass" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('')">
          <el-button
            type="success"
            @click="onRegister('registerForm')"
            :loading="loading"
          >{{ $t("register.register") }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
// import { JSEncrypt } from 'jsencrypt'
import LangSelect from '@/components/lang-select'
import { isRegisterValid } from '@/utils/register-validate'
import { register, getPublicKey } from '@/api/register'
import { RegisterMsg } from '@/utils/message'
export default {
  name: 'Register',
  components: {
    LangSelect
  },
  data() {
    // 用户名 验证
    const validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入正确的用户名'))
      } else if (value.length > 10) {
        calssback(new Error('用户名长度需少于10位'))
      } else {
        callback()
      }
    }
    // pwd 验证
    const validatePass = (rule, value, callback) => {
      const reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/
      if (!reg.test(value)) {
        callback(new Error('密码须由数字,大写字母,小写字母,至少其中两种组成'))
      } else {
        this.$refs.registerForm.validateField('checkPass')
        callback()
      }
    }
    // checkPass 验证
    const validatePass2 = (rule, value, callback) => {
      if (value !== this.registerForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    // e_mail 验证
    const validateEmail = (rule, value, callback) => {
      const exp = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!exp.test(value)) {
        callback(new Error('邮箱格式不正确'))
      } else {
        this.$refs.registerForm.validateField('checkPass')
        callback()
      }
    }

    return {
      loading: false,
      registerForm: {
        username: '',
        pwd: '',
        checkPass: '',
        e_mail: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateUsername },
          { required: true, trigger: 'change', validator: validateUsername }
        ],
        pwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePass },
          { required: true, trigger: 'change', validator: validatePass }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatePass2 },
          { required: true, trigger: 'change', validator: validatePass2 }
        ],
        e_mail: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validateEmail },
          { required: true, trigger: 'change', validator: validateEmail }
        ]
      }
    }
  },
  methods: {
    // 用户名输入框回车后切换到密码输入框
    goToPwdInput() {
      this.$refs.pwd.$el.getElementsByTagName('input')[0].focus()
    },
    goToCheckPass() {
      this.$refs.checkPass.$el.getElementsByTagName('input')[0].focus()
    },
    goToEmail() {
      this.$refs.e_mail.$el.getElementsByTagName('input')[0].focus()
    },

    // 注册操作
    onRegister() {
      this.$refs.e_mail.$el.getElementsByTagName('input')[0].blur()
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          getPublicKey().then(res => {
            let encryptor = new JSEncrypt()
            encryptor.setPublicKey(res.data.resultmap) //设置公钥
            let registerData = {
              username: this.registerForm.username,
              password: encryptor.encrypt(this.registerForm.checkPass),
              e_mail: this.registerForm.e_mail
            }
            register(registerData)
              .then(res => {
                if (res.data === -1) {
                  this.loading = false
                  RegisterMsg('用户名重复', 'warning', '1000')
                } else if (res.data === 0) {
                  this.loading = false
                  RegisterMsg('邮箱重复', 'warning', '1000')
                } else if (res.data === 1) {
                  RegisterMsg('注册成功,3秒后跳转', 'success', '3000')
                  setTimeout(() => {
                    this.$router.push('/login')
                  }, 3000)
                }
              })
              .catch(() => {
                this.loading = false
                RegisterMsg('注册失败,网络可能有点问题', 'error', '2000')
              })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style scoped lang="stylus">
.register-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: mix(#494166, #424b50) url('../../../static/image/login-bg.jpg') center no-repeat;
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
    height: 500px;
    background: rgba(255, 255, 255, 0.45);

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

    .el-button--success {
      width: 100%;
    }
  }
}

#particles {
  width: 100%;
  height: 100%;
  /* background-color: #b61924; */
  /* background-color: #23ae88; */
  background-color: transparent;
  /* background-image: url('../img/bg_particles.png'); */
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;
}
</style>