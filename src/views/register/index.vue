<template>
  <el-container class="register-container">
    <el-card class="animated flipInY">
      <div slot="header" class="el-card-header">
        <div style="clear: both;"></div>
        <img src="../../../static/image/register-logo.png" alt />
        <h2 class="login-title">{{ $t("register.title") }}</h2>
      </div>
      <el-form ref="loginForm" label-width="80px">
        <el-form-item :label="$t('register.account')" prop="username" style="position:relative">
          <el-input type="text" @keyup.enter.native="goToPwdInput"></el-input>
          <span class="svg-container svg-container_user">
            <svg-icon icon-class="user" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('register.password')" prop="pwd">
          <el-input type="password" @keyup.enter.native="onLogin" ref="pwd"></el-input>
          <span class="svg-container svg-container_password">
            <svg-icon icon-class="password" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('register.again_pass')" prop="pwd">
          <el-input type="password" @keyup.enter.native="onLogin" ref="pwd"></el-input>
          <span class="svg-container svg-container_password">
            <svg-icon icon-class="again_pass" />
          </span>
        </el-form-item>
        <el-form-item :label="$t('')">
          <el-button type="success">{{ $t("register.register") }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-container>
</template>

<script>
// import '../assets/css/login_register.css'
// import { JSEncrypt } from 'jsencrypt'
export default {
  name: 'Register',
  data() {
    return {
      flag: true,
      tag: true,
      peg: true,
      lab: true,

      username: '',
      pass1: '',
      pass2: '',
      e_mail: '',

      w_user: '',
      w_pass: '',
      w_mail: '',
      timer: null,
      num: 3
    }
  },
  methods: {
    // confirm() {
    //   var reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)\S{8,}$/
    //   var exp = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
    //   if (this.username.length > 10) {
    //     this.w_user = '用户名长度需少于10位。'
    //     this.flag = false
    //     this.tag = false
    //   }
    //   if (this.username === '') {
    //     this.w_user = '用户名不能为空。'
    //     this.flag = false
    //     this.tag = false
    //   }
    //   if (this.pass1 !== this.pass2) {
    //     this.w_pass = '两次输入的密码不一致。'
    //     this.flag = false
    //     this.peg = false
    //   }
    //   if (this.pass1 === this.pass2 && !reg.test(this.pass1)) {
    //     this.flag = false
    //     this.peg = false
    //     this.w_pass =
    //       '密码必须符合由数字,大写字母,小写字母,至少其中两种组成，且长度不小于8，同时第一位不能为数字'
    //   }
    //   if (!exp.test(this.e_mail)) {
    //     this.w_mail = '邮箱格式不正确。'
    //     this.flag = false
    //     this.lab = false
    //   }
    //   if (
    //     this.username.length < 10 &&
    //     this.username != '' &&
    //     this.pass1 === this.pass2 &&
    //     reg.test(this.pass1) &&
    //     exp.test(this.e_mail)
    //   ) {
    //     this.$axios.get('api/getPublicKey').then(res => {
    //       if (res.data.status === 0) {
    //        /** 实例化 */
    //         let encryptor = new JSEncrypt()
    //         encryptor.setPublicKey(res.data.resultmap) //设置公钥
    //         let registerData = {
    //           username: this.username,
    //           password: encryptor.encrypt(this.pass2),
    //           e_mail: this.e_mail
    //         }
    //         this.$axios
    //           .post('api/userRegister', registerData)
    //           .then(res => {
    //             if (res.data === '-1') {
    //               //用户名已经存在
    //               this.$message({
    //                 showClose: true,
    //                 message: '用户名已存在',
    //                 type: 'error'
    //               })
    //             }
    //             if (res.data === '0') {
    //               //邮箱已经被注册
    //               this.$message({
    //                 showClose: true,
    //                 message: '邮箱已经被注册',
    //                 type: 'error'
    //               })
    //             }
    //             if (res.data === '1') {
    //               this.$message({
    //                 message: `注册成功,${this.num}秒后跳转~`,
    //                 type: 'success'
    //               })
    //               setTimeout(() => {
    //                 this.$router.push('/login')
    //               }, 3000)
    //             }
    //             if (res.data == '2') {
    //               //注册失败
    //               this.$message({
    //                 showClose: true,
    //                 message: '好像发生了点问题，再试一次吧~',
    //                 type: 'error'
    //               })
    //             }
    //           })
    //           .catch(() => {
    //             this.$message({
    //               showClose: true,
    //               message: '网络好像有点问题~。',
    //               type: 'error'
    //             })
    //           })
    //       }
    //     })
    //   }
    // }
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
    height: 450px;
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

