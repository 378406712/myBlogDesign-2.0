<template>
  <div class="center">
    <div class="grey_bg">
      <div class="content">
        <div class="content-header">
          <div class="container">
            <h1 class="content-heading">用户中心</h1>
          </div>
        </div>
        <!-- 内容 -->
        <div class="container">
          <section class="list">
            <!-- 待循环 -->
            <div class="card">
              <div class="card-main">
                <div class="myAccount">
                  <div class="account">
                    <el-button ref="allDelete" type="primary" @click="showUserInfo">我的资料</el-button>
                    <el-drawer
                      custom-class="drawers"
                      title="个人资料"
                      :visible.sync="drawer"
                      :with-header="false"
                    >
                      <!-- 头像 -->
                      <el-divider content-position="left" style="padding:20px">
                        <el-button type="primary" round @click="jumpToPersonal">编辑资料</el-button>
                      </el-divider>
                      <div class="demo-fit" style="padding:20px 20px 0px 20px;diplay:flex">
                        <div class="block">
                          <el-avatar
                            style="vertical-align:middle"
                            shape="circle"
                            :size="100"
                            :src="userInfoData.uploadUrl"
                          ></el-avatar>
                          <div class="block_item1">
                            <span
                              class="title"
                              style="margin-left:20px"
                            >昵称 ： {{ userInfoData.nickname }}</span>
                            <span class="title" style="margin-left:20px;marginTop:10px">
                              性别 ：
                              <svg
                                v-if="userInfoData.sex == '男'"
                                aria-hidden="true"
                                class="icon_svg"
                              >
                                <use xlink:href="#iconnan" />
                              </svg>
                              <svg
                                v-else-if="userInfoData.sex == '女'"
                                aria-hidden="true"
                                class="icon_svg"
                              >
                                <use xlink:href="#iconnv" />
                              </svg>
                            </span>
                          </div>
                        </div>
                        <el-divider></el-divider>
                      </div>
                      <!-- 个性签名，地区，职业等 -->
                      <div class="more_detail">
                        <p>
                          <svg aria-hidden="true" class="icon_svg">
                            <use xlink:href="#iconqianming" />
                          </svg>
                          个性签名：{{ userInfoData.desc }}
                        </p>
                        <el-divider></el-divider>
                        <p>
                          <svg aria-hidden="true" class="icon_svg">
                            <use xlink:href="#iconlingdai" />
                          </svg>
                          职业：{{ userInfoData.job }}
                        </p>

                        <p>
                          <svg aria-hidden="true" class="icon_svg">
                            <use xlink:href="#iconnb-" />
                          </svg>
                          家乡：{{ userInfoData.hometown }}
                        </p>

                        <p>
                          <svg aria-hidden="true" class="icon_svg">
                            <use xlink:href="#icondangao" />
                          </svg>
                          生日：{{ userInfoData.birthday }}
                        </p>
                      </div>
                    </el-drawer>
                  </div>
                </div>
                <el-row type="flex">
                  <el-col :span="8">
                    <el-row>
                      <el-col>
                        <ul class="card-inner card-mine">
                          <li>用户名 :</li>
                          <li>{{ name }}</li>
                          <el-divider></el-divider>

                          <li>邮箱 :</li>
                          <li>{{ e_mail }}</li>
                          <el-divider></el-divider>
                        </ul>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
          </section>
          <section class="list">
            <!-- 待循环 -->
            <div class="card">
              <div class="card-main">
                <div style="margin-bottom: 20px">
                  <el-button ref="allDelete" type="primary" @click="allDelete">批量删除</el-button>
                </div>
                <el-table
                  @selection-change="handleSelectionChange"
                  border
                  style="width: 100%"
                  :data="
                    tableData2.filter(
                      data =>
                        !search ||
                        data.time
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        data.ip.toLowerCase().includes(search.toLowerCase()) ||
                        data.os.toLowerCase().includes(search.toLowerCase()) ||
                        data.browser.version
                          .toLowerCase()
                          .includes(search.toLowerCase())
                    )
                  "
                >
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column prop="time" label="登录时间" width="180"></el-table-column>
                  <el-table-column prop="ip" label="ip" width="180"></el-table-column>
                  <el-table-column prop="os" label="设备信息"></el-table-column>
                  <el-table-column prop="browser.version" label="浏览器信息"></el-table-column>
                  <el-table-column>
                    <template slot="header" slot-scope="scope">
                      <el-input
                        v-model="search"
                        size="mini"
                        placeholder="输入关键字搜索"
                        @change="show(scope.row)"
                      />
                    </template>
                    <template slot-scope="scope">
                      <el-button
                        type="danger"
                        icon="el-icon-delete"
                        @click="open(scope.row,scope.$index)"
                        circle
                      ></el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 分页 -->
            <Paginations
              :msg="length"
              :size="size"
              :page="page"
              v-on:sizeValue="sizeValue"
              v-on:pageValue="pageValue"
            />
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paginations from './pagination'
import { CodeToText } from 'element-china-area-data'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { Msg, ComfirmMsg } from '@/utils/message'
export default {
  name: 'center',
  components: { Paginations },
  data() {
    return {
      id: '',
      url: '',
      drawer: false,
      username: '',
      length: '',
      tableData2: [],
      search: '',
      userInfoData: {
        url:
          'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      },
      page: 1,
      size: 8
    }
  },
  methods: {
    ...mapActions(['getDevieces', 'deleteDevices']),
    open(val, index) {
      ComfirmMsg('此操作将删除该记录 是否继续?', 'warning')
        .then(() => {
          this.deleteDevices({ _id: val._id, index }).then(() => {
            Msg('删除成功', 'success')
          })
        })
        .catch(() => {
          Msg('已取消删除', 'info')
        })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getServerInfo() {
      //
      //     if (res.data.length != 0) {
      //       res.data.map((item, index) => {
      //         item.browser.version = item.browser.version.replace('/', ' ')
      //       })
      //       this.length = res.data.length
      //       // this.$store.commit('settingList', )
      //       this.sliderList({
      //         username: this.username,
      //         mode: 'loginCounts',
      //         data: this.length
      //       })
      //       this.tableData2 = res.data
      //         .reverse()
      //         .slice(this.size * (this.page - 1), this.size * this.page)
      //       if (this.tableData2.length == 0) {
      //         this.page -= 1
      //         this.getServerInfo()
      //       }
      //     } else {
      //       this.tableData2 = res.data
      //     }
      //   })
    },
    jumpToPersonal() {
      this.$router.push('/backhome/personal')
      this.$store.commit('sliderList', 2)
      this.$router.go(0)
    },
    submitForm(formName) {},
    resetForm(formName) {},
    getUserInfo() {
      this.$axios
        .get('/api/userInfoData', {
          params: {
            username: this.username
          }
        })
        .then(res => {
          this.userInfoData = res.data
          let hometown = []
          res.data.hometown.map((item, index) => {
            hometown += CodeToText[item] + ' '
            this.userInfoData.hometown = hometown
          })
          if (this.userInfoData.hometown.length == 0) {
            this.userInfoData.hometown = ''
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    showUserInfo() {
      this.drawer = true
      this.getUserInfo()
    },
    pageValue(pageValue) {
      this.page = pageValue
      this.getServerInfo()
    },
    sizeValue(sizeValue) {
      this.size = sizeValue
      this.getServerInfo()
    },

    allDelete() {
      if (this.multipleSelection) {
        ComfirmMsg('此操作将删除该记录 是否继续?', 'warning')
          .then(() => {
            const data = []
            this.multipleSelection.map(item => {
              Object.getOwnPropertyNames(item).forEach(function(key) {
                if (key == '_id') {
                  data.push(item[key])
                }
              })
            })
            this.$axios
              .get('/api/deleteAllServerInfo', {
                params: {
                  _id: JSON.stringify(data)
                }
              })
              .then(res => {
                if (res.data.status == '0') {
                  Msg('删除成功', 'success')
                  this.getServerInfo() //bug 此处不执行
                } else {
                  Msg('网络可能有点问题～', 'error')
                }
              })
          })
          .catch(() => {
            Msg('已取消删除', 'info')
          })
      } else {
        Msg('先选中～', 'warning')
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'e_mail']),
    ...mapState({ devices: state => state.homepage.devices })
  },
  created() {
    this.getDevieces(this.name)
    this.tableData2 = this.devices
  },
  mounted() {}
}
</script>
<style scoped>
.content-header {
  background-image: url('../../../static/image/center-bg.png');
}

.card-mine li {
  margin-bottom: 10px !important;
}
button:focus {
  outline: none;

  box-shadow: none;
}
.el-table >>> th,
.el-table /deep/ td {
  text-align: center;
}

.account {
  float: right;
}
.more_detail {
  padding: 0 20px 20px 20px;
}
.demo-fit .block {
  display: flex;
}
.demo-fit .block .block_item1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.drawers {
  /* background-image: url('../media_icon/iloli.gif'); */
  background-position: 150px 420px;
  background-repeat: no-repeat;
}

.content {
  padding: 30px 30px 0px 20px;
  width: 100%;
  position: relative;
  transition: padding 0.5s;
  margin-bottom: 30px;
}
.grey_bg {
  background-color: #f4f6f9;
  overflow: hidden;
}
.content-header {
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: cover;
  margin-bottom: -58px;
  padding-top: 68px;
  padding-bottom: 58px;
  overflow: hidden;
  box-shadow: 0 0px 0 rgb(67, 47, 40), 0 0 15px #412f1c,
    0 1px 3px rgba(0, 0, 0, 0.05);
}
.container {
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  padding-right: 10px;
  padding-left: 10px;
}
.content-heading {
  font-weight: 300;
  color: #fff;
  font-size: 44px;
  line-height: 48px;
  margin-top: 48px;
  margin-bottom: 12px;
}
.list {
  margin-bottom: 48px;
  margin-right: -10px;
  margin-left: -10px;
  padding-left: 16px;
  padding-right: 16px;
}
.card {
  overflow: hidden;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0px 0 #e5e5e5, 0 0 15px rgba(0, 0, 0, 0.12),
    0 2px 4px rgba(0, 0, 0, 0.05);
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  margin-top: 24px;
  margin-bottom: 24px;
}
.card-main {
  width: 100%;
  margin: 24px 16px;
}
.card-inner {
  margin: 12px 0;
  margin: 24px 16px;
}
.card-inner li {
  line-height: 20px;
}

.el-table__row {
  width: 100%;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

/* icon font */
.icon_svg {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  vertical-align: middle;
}
</style>
