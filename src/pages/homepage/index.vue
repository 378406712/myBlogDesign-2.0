<template>
  <div class="home_page" :class="bodyBg">
    <div class="scrollbar" id="bar"></div>
    <!-- 主体区 -->
    <section class="main_container">
      <!-- 壁纸 -->
      <div class="header_top">
        <figure id="centerBg" v-lazy:background-image="'https://www.qdmmz.cn/wp-content/themes/Sakura/cover/index.php'">
          <div class="focus_info">
            <div class="header_avatar">
              <a href>
                <img v-lazy="'http://q1.qlogo.cn/g?b=qq&nk=378406712&s=640'" />
              </a>
            </div>
            <Link />
          </div>
        </figure>
      </div>
      <div id="page" class="site wrapper">
        <Head />
        <div class="page_content">
          <div class="p_notice">
            <i class="iconfont icon-yinliang"></i>
            <div>
              <p class="notice_content">
                {{ hitokoto }}
              </p>
            </div>
          </div>
          <Cover />
          <Essay />
        </div>
      </div>
      <Setting />
    </section>
    <Search />
    <Foot />
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import Head from '@/components/FrontHead'
import Foot from '@/components/FrontFoot'
import Link from './components/Link'
import Cover from './components/Cover'
import Search from './components/Search'
import Essay from './components/Essay'
import Setting from '@/components/FrontToolSetting'
import { getBg } from '@/common/select-bg'

export default {
  name: 'home',
  components: { Head, Foot, Link, Cover, Search, Essay, Setting },
  data() {
    return {
      hitokoto: ''
    }
  },
  methods: {
    fun() {
      let h = $(window).height() + 'px'
      $('#centerBg').css('height', h)
    }
  },
  mounted() {
    this.fun()
    axios.get('https://v1.hitokoto.cn/?c=b').then((res) => {
      this.hitokoto = res.data.hitokoto + ' ---' + res.data.from
    })
    $(window).resize(() => {
      this.fun()
    })
  },
  computed: {
    bodyBg() {
      return this.$store.state.indexpage.bodyBg || getBg()
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(./index.scss);
@import url(../../style/bg.scss);
.home_page {
  background-attachment: fixed;
}
[lazy='error']{
 background-position: 0 center!important;
}
[lazy='loading']{
 background-position: 0 center!important;  
}
</style>
