<template>
  <div class="grey_bg">
    <div class="mixin-components-container">
      <el-row :gutter="20">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-button
              icon="el-icon-s-promotion"
              type="primary"
              @click.prevent.stop="guide"
            >
              显示 导航
            </el-button>
          </div>
          <div style="margin-bottom: 50px;">
            <el-col :span="4" class="text-center">
              <router-link
                id="user-center"
                class="liu-btn blue-btn"
                to="/documentation/index"
              >
                个人中心
              </router-link>
            </el-col>
            <el-col :span="4" class="text-center">
              <router-link
                id="icons-module"
                class="liu-btn light-blue-btn"
                to="/icon/index"
              >
                图标
              </router-link>
            </el-col>
            <el-col :span="4" class="text-center">
              <router-link
                id="media-gallery"
                class="liu-btn pink-btn"
                to="/media/index"
              >
                媒体库
              </router-link>
            </el-col>
            <el-col :span="4" class="text-center">
              <router-link
                id="write-essay"
                class="liu-btn green-btn"
                to="/edit/post-new"
              >
                写文章
              </router-link>
            </el-col>
            <el-col :span="4" class="text-center">
              <router-link
                id="classify-category"
                class="liu-btn tiffany-btn"
                to="/edit/category"
              >
                分类目录
              </router-link>
            </el-col>
            <el-col :span="4" class="text-center">
              <router-link
                id="dashboard-module"
                class="liu-btn yellow-btn"
                to="/dashboard"
              >
                仪表盘
              </router-link>
            </el-col>
          </div>
        </el-card>
      </el-row>

      <el-row :gutter="20" style="margin: 50px 0; height: 450px;">
        <el-col :span="8" style="height: 100%;">
          <el-card class="box-card" id="share-link">
            <div slot="header" class="clearfix">
              <span>Links</span>
            </div>
            <div class="component-item">
              <dropdown-menu
                :items="articleList"
                style="margin: 0 auto;"
                title="社交媒体"
              />
            </div>
          </el-card>
        </el-col>
        <el-col :span="16" class="canvas-chain">
          <Chain />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './steps'
import DropdownMenu from '@/components/Share/DropdownMenu'
import Chain from './components/chain'
export default {
  name: 'Guide',
  components: { DropdownMenu, Chain },
  data() {
    return {
      driver: null,
      articleList: [
        {
          title: 'Github',

          icon: '/static/image/social-icons/github.png',
          href: 'https://github.com/378406712'
        },
        {
          title: '网易云音乐',
          icon: '/static/image/social-icons/wangyiyun.png',
          href: 'https://music.163.com/#/user/home?id=124380020'
        },
        {
          title: 'CSDN',
          icon: '/static/image/social-icons/csdn.png',
          href: 'https://blog.csdn.net/qq_40944918'
        },
        {
          title: 'BiliBili',
          icon: '/static/image/social-icons/bilibili.png',
          href:
            'https://space.bilibili.com/2902330?from=search&seid=7430873847437105085'
        },
        {
          title: '个人站点',
          icon: '/static/image/social-icons/qdmmz.png',
          href: 'https://www.qdmmz.cn'
        }
      ]
    }
  },
  mounted() {
    this.driver = new Driver({
      nextBtnText: '下一条',
      prevBtnText: '上一条',
      doneBtnText: '完成',
      closeBtnText: '关闭',
      keyboardControl: true
    })
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>
<style lang="stylus">
.canvas-chain{
  margin: 0;
  background: #000;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
#share-link{
   height: 100%;

}
</style>
