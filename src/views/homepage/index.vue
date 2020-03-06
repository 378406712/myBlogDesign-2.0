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
                    <el-button type="primary" @click="showUserInfo">我的资料</el-button>
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
                  <el-col>
                    <el-row>
                      <el-col>
                        <ul class="card-inner card-mine card-beautify">
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
                  <el-col>
                    <DanceHeart />
                  </el-col>
                  <el-col>
                    <el-row>
                      <el-col>
                        <ul class="card-inner card-mine card-player card-beautify">
                          <li>当前设备 :</li>
                          <li>
                            {{ os }}
                            <span class="svg-container">
                              <svg-icon :icon-class="os" />
                            </span>
                          </li>
                          <el-divider></el-divider>
                          <CPlayer :playlist="playlist" />
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
                  <el-button ref="BatchDelete" type="primary" @click="BatchDelete">批量删除</el-button>
                </div>
                <DevicesTable
                  :search="search"
                  :open="open"
                  :tableData2="tableData2"
                  :handleChange="handleChange"
                />
              </div>
            </div>
            <!-- 分页 -->
            <Paginations
              :total="total"
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
import CPlayer from '@/components/c-player'
import DanceHeart from '@/components/heart-dance'
import serviceDialog from '@/components/serviceDialog'
import DevicesTable from './components/table'
import Paginations from './components/pagination'
import { CodeToText } from 'element-china-area-data'
import { loadFromLocal } from '@/common/local-storage'
import { Msg, ComfirmMsg } from '@/utils/message'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'center',
  components: { DevicesTable, Paginations, DanceHeart, CPlayer, serviceDialog },
  data() {
    return {
      show: false,
      playlist: [],
      id: '',
      url: '',
      drawer: false,
      username: '',
      length: '',
      tableData2: [],
      search: '',
      total: '',
      userInfoData: {
        url:
          'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }
    }
  },
  methods: {
    ...mapMutations(['SET_SIZES', 'SET_PAGES']),
    ...mapActions(['getDevieces', 'deleteDevices', 'BatchDeleteDevices']),
    /**
     * 删除单条
     * @class open
     * @param {object}  val 单元行信息
     * @param {number} index 表格单元行id
     */
    open(val, index) {
      ComfirmMsg('此操作将删除该记录 是否继续?', 'warning')
        .then(() => {
          this.deleteDevices({ _id: val._id, index }).then(() => {
            Msg('删除成功', 'success')
            this.query()
          })
        })
        .catch(() => {
          Msg('已取消删除', 'info')
        })
    },
    handleChange(val) {
      this.multipleSelection = val
    },
    getServerInfo() {
      //
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
      this.SET_PAGES(pageValue)
      this.query()
    },
    sizeValue(sizeValue) {
      this.SET_SIZES(sizeValue)
      this.query()
    },
    /**
     * 删除多条
     * @class BatchDelete
     */
    BatchDelete() {
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
            const param = { _id: JSON.stringify(data) }
            this.BatchDeleteDevices(param)
              .then(() => {
                this.query()
                Msg('删除成功', 'success')
              })
              .catch(() => {
                Msg('网络可能有点问题～', 'error')
              })
          })
          .catch(() => {
            Msg('已取消删除', 'info')
          })
      } else {
        Msg('先选中～', 'warning')
      }
    },
    /**
     * 获取表格数据
     * @clss query
     */
    query() {
      this.getDevieces(this.name).then(() => {
        this.tableData2 = this.devices
        this.total = this.totals
      })
    }
  },
  computed: {
    ...mapGetters(['name', 'e_mail']),
    ...mapState({
      devices: state => state.homepage.devices,
      music: state => state.homepage.music,
      pages: state => state.homepage.pages,
      sizes: state => state.homepage.sizes,
      totals: state => state.homepage.totals
    })
  },
  created() {
    this.os = loadFromLocal('device')
    this.playlist = this.music
    this.page = this.pages
    this.size = this.sizes
  },
  mounted() {
    this.query()
  }
}
</script>
<style scoped>
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
/* icon font */
.icon_svg {
  width: 25px;
  height: 25px;
  margin-right: 10px;
  vertical-align: middle;
}
.card-beautify {
  background-image: url('/static/image/beautify/comment-bg.png');
  background-repeat: no-repeat;
  background-position: 130px 100px;
  padding-left: 20px;
}
.card-player {
  padding: 0;
  background-position: 100px 0px;
}
.playerList {
  float: right;
}
</style>
