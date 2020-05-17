<template>
  <div class="boke_page" :class="bodyBg">
    <!-- 主体区 -->
    <section class="main_container">
      <!-- 壁纸 -->
      <div class="header_top"></div>
      <div id="page" class="site wrapper">
        <Head />
        <div class="pattern-center-blank"></div>
        <div class="pattern-center single-center">
          <div
            class="pattern-attachment-img lazyload"
            style="
              background-image: url('https://www.qdmmz.cn/wp-content/uploads/2020/04/bg.png');
            "
            data-src="https://www.qdmmz.cn/wp-content/uploads/2020/04/bg.png"
          ></div>
          <header class="pattern-header single-header">
            <h1 class="entry-title">动态路由表页面刷新后直接跳转到404问题</h1>
            <p class="entry-census">
              <span
                ><a href="https://www.qdmmz.cn/author/378406712@qq.com/"
                  ><img
                    src="https://cn.gravatar.com/avatar/c5316c7d18a1d16f8aeabcad691b3b69?s=96&amp;d=mm&amp;r=g" /></a></span
              ><span
                ><a href="https://www.qdmmz.cn/author/378406712@qq.com/"
                  >旧南山忆</a
                ></span
              ><span class="bull">·</span>22 天前<span class="bull">·</span>21
              次阅读
            </p>
          </header>
        </div>
        <!-- 内容 -->
        <Content/>
        <!-- 评论 -->
        <Comment/>
        <div class="page_content"></div>
      </div>
      <Setting />
    </section>
    <Foot />
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import Head from '@/components/FrontHead'
import Foot from '@/components/FrontFoot'
import Setting from '@/components/FrontToolSetting'
import Comment from './components/comments'
import Content from './components/content'
import { getBg } from '@/common/select-bg'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'home',
  components: { Head, Foot, Setting,Comment,Content },
  data() {
    return {}
  },
  computed: {
    bodyBg() {
      return this.$store.state.indexpage.bodyBg || getBg()
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(../../style/bg.scss);
@import url(./index.scss);
</style>
