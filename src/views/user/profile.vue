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
                          <ChangePass v-on:changePass="alterPass" />
                        </div>
                        <div class="col-lg-6">
                          <PersonAccount />
                        </div>
                        <div class="col-lg-6"><DeleteInfo /></div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { JSEncrypt } from 'jsencrypt'
import ChangePass from './components/changePass'
import DeleteInfo from './components/deleteInfo'
import PersonAccount from './components/personAccount'
import {mapGetters} from 'vuex'
import { regionData, CodeToText } from 'element-china-area-data'
export default {
  name: 'personal',
  components: { ChangePass, DeleteInfo, PersonAccount },
  data() {
    return {}
  },
  methods: {
  
    //修改密码
    alterPass(alterData) {
      console.log(alterData)
      // let { originPass, againPass, newPass } = this.alterForm
      // if (originPass == '' || againPass == '' || newPass == '') {
      //   swal({
      //     title: '有未输入内容!',
      //     text: '请重新输入',
      //     icon: 'warning',
      //     button: 'OK'
      //   })
      // } else if (originPass == newPass && originPass != '') {
      //   swal({
      //     title: '修改密码失败!',
      //     text: '原密码与新密码相同',
      //     icon: 'warning',
      //     button: 'OK'
      //   })
      // } else if (newPass == againPass && newPass != '') {
      //   this.$axios.get('/api/getPublicKey').then(res => {
      //     //先获取公钥
      //     if (res.data.status === 0) {
      //       let encryptor = new JSEncrypt() //实例化
      //       encryptor.setPublicKey(res.data.resultmap) //设置公钥

      //       let PwdData = {
      //         e_mail: this.e_mail,
      //         originPass: encryptor.encrypt(originPass),
      //         againPass: encryptor.encrypt(againPass)
      //       }
      //       this.$axios.post('/api/userPassAlter', PwdData).then(res => {
      //         if (res.data.status == '0') {
      //           swal({
      //             title: '修改密码成功!',
      //             text: '请重新登录',
      //             icon: 'success',
      //             button: 'OK'
      //           }).then(() => {
      //             delete localStorage.token
      //             this.$router.go(0)
      //           })
      //         } else if (res.data.status === '1') {
      //           swal({
      //             title: '修改密码失败!',
      //             text: '原密码错误',
      //             icon: 'error',
      //             button: 'OK'
      //           })
      //         } else if (res.date.status == '2') {
      //           swal({
      //             title: '修改密码失败!',
      //             text: '网络好像有点问题～',
      //             icon: 'warn',
      //             button: 'OK'
      //           })
      //         }
      //       })
      //     } else {
      //       //网络问题
      //     }
      //   })
      // } else if (newPass != againPass) {
      //   swal({
      //     title: '修改密码失败!',
      //     text: '两次输入不符合',
      //     icon: 'error',
      //     button: 'OK'
      //   })
      // }
    },
    
    // //获取个人资料显示在表单
    // getPersonal() {
    //   let getPersonalData = this.$axios
    //     .get('/api/userInfoData', {
    //       params: {
    //         username: this.ruleForm.username
    //       }
    //     })
    //     .then(res => {
    //       this.ruleForm.url = res.data.uploadUrl
    //       this.area.hometown = res.data.hometown
    //       delete res.data._id
    //       delete res.data.uploadUrl
    //       Object.assign(this.ruleForm, { ...res.data })
    //     })
    // },
    // //删除账号
    // removePass() {
    //   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   })
    //     .then(() => {
    //       let removeData = {
    //         params: {
    //           username: this.username,
    //           e_mail: this.e_mail
    //         }
    //       }
    //       this.$axios.get('/api/userRemove', removeData).then(res => {
    //         if (res.data.status == '0') {
    //           swal({
    //             title: '删除成功!',
    //             icon: 'success',
    //             button: 'Aww yiss!'
    //           }).then(() => {
    //             delete localStorage.token
    //             this.$router.go(0)
    //           })
    //         } else {
    //           swal({
    //             title: '删除失败,网络好像出了小差～',
    //             icon: 'error',
    //             button: 'yiss Aww!'
    //           })
    //         }
    //       })
    //     })
    //     .catch(() => {
    //       this.$message({
    //         type: 'info',
    //         message: '已取消删除'
    //       })
    //     })
    // },


  },
  created() {},
  computed: {
    ...mapGetters(['e_mail'])
  }
}
</script>
<style scoped lang="stylus">
  .section .section-header {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.03);
    background-color: #6777ef;
    border-radius: 3px;
    border: none;
    position: relative;
    padding: 20px;
  }
   .section .section-header h1 {
    margin-bottom: 0;
    font-weight: 700;
    display: inline-block;
    font-size: 24px;
    margin-top: 3px;
    color: #fff;
  }
   .section > *:first-child {
    margin-top: -7px;
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
.card-profile {
  margin-top: 0;
}
</style>
