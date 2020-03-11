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
import { JSEncrypt } from 'jsencrypt'
import ChangePass from './components/changePass'
import DeleteInfo from './components/deleteInfo'
import PersonAccount from './components/personAccount'
import { mapState, mapActions, mapGetters } from 'vuex'
import { regionData, CodeToText } from 'element-china-area-data'
import { Alerts } from '@/utils/swal'
export default {
  name: 'personal',
  components: { ChangePass, DeleteInfo, PersonAccount },
  data() {
    return {}
  },
  methods: {
    ...mapActions(['getStatus']),
    //修改密码
    alterPass(alterData) {
      this.getStatus(alterData).then(res => {
        this.alertInfo()
      })
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

    alertInfo() {
      Alerts(this.status)
    }
  },
  created() {},
  mounted() {},
  computed: {
    ...mapGetters(['e_mail']),
    ...mapState({
      status: state => state.center.status
    })
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
