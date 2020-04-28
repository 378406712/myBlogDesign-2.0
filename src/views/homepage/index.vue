<template>
  <div class="center">
    <div class="grey_bg">
      <div class="content">
        <div class="content-header">
          <div class="container">
            <h1 class="content-heading">个人中心</h1>
          </div>
        </div>
        <!-- 内容 -->
        <div class="container">
          <section class="list">
            <div class="card">
              <div class="card-main">
                <div class="myAccount">
                  <div class="account">
                    <el-button type="primary" @click="showUserInfo"
                      >我的资料</el-button
                    >
                    <Detail />
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
                    <!-- css心型 -->
                    <DanceHeart />
                  </el-col>
                  <el-col>
                    <el-row>
                      <el-col>
                        <ul
                          class="card-inner card-mine card-player card-beautify"
                        >
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
            <div class="card">
              <div class="card-main">
                <div style="margin-bottom: 20px">
                  <el-button
                    ref="BatchDelete"
                    type="primary"
                    @click="BatchDelete"
                    >批量删除</el-button
                  >
                </div>
                <!-- 设备表格 -->
                <DevicesTable
                  :search="search"
                  :handleDelete="handleDelete"
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
import Detail from './components/detail'
import Paginations from './components/pagination'
import { CodeToText } from 'element-china-area-data'
import { loadFromLocal } from '@/common/local-storage'
import { Msg, ComfirmMsg } from '@/utils/message'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'center',
  components: {
    Detail,
    DevicesTable,
    Paginations,
    DanceHeart,
    CPlayer,
    serviceDialog
  },
  data() {
    return {
      show: false,
      playlist: [],
      id: '',
      username: '',
      length: '',
      tableData2: [],
      search: '',
      total: ''
    }
  },
  methods: {
    ...mapMutations(['SET_SIZES', 'SET_PAGES', 'SET_DRAWER']),
    ...mapActions([
      'getInfo',
      'getDevieces',
      'deleteDevices',
      'BatchDeleteDevices'
    ]),
    userInfo() {
      this.getInfo({ params: { username: this.name } })
    },
    showUserInfo() {
      this.SET_DRAWER(true)
      this.userInfo()
    },
    handleChange(val) {
      this.multipleSelection = val
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
     * 删除单条
     * @class delete
     * @param {object}  val 单元行信息
     * @param {number} index 表格单元行id
     */
    handleDelete(val, index) {
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
     * @class query
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
.card-beautify {
  background-image: url('/static/image/beautify/comment-bg.png');
  background-repeat: no-repeat;
  background-position: 160px 100px;
  padding-left: 20px;
}
.card-player {
  padding: 0;
  background-position: 160px 0px;
}
.playerList {
  float: right;
}

</style>
