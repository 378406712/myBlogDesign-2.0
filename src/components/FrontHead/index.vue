<template>
  <header class="site_header" :class="shadow ? 'shadow' : ''">
    <div class="site_top">
      <div class="site_branding">
        <a href>
          <span>{{ title }}</span>
        </a>
      </div>
      <div
        class="h_user_avatar"
        @mouseenter="flag = !flag"
        @mouseleave="flag = !flag"
      >
        <img src="http://q1.qlogo.cn/g?b=qq&nk=378406712&s=640" />
        <transition name="fade">
          <div class="header_user_menu" v-show="flag">
            <div class="header_user_name">
              Signed in as
              <div class="userName">轻度</div>
            </div>
            <div class="menu_option">
              <router-link to="/" v-for="(item, index) in links" :key="index">{{
                item.name
              }}</router-link>
            </div>
          </div>
        </transition>
      </div>
      <div class="search_box">
        <i class="el-icon-search" @click="toSearch"></i>
      </div>
      <div class="lower">
        <nav>
          <div class="menu">
            <ul>
              <li v-for="(item, index) in menu" :key="index">
                <router-link to="/">{{ item.name }}</router-link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import $ from 'jquery'
import throttle from '@/utils/throttle'
export default {
  data() {
    return {
      shadow: false,
      flag: false,
      title: '蜂蜜与四叶草',
      links: [
        { name: '管理中心', target: '' },
        { name: '撰写文章', target: '' },
        { name: '个人资料', target: '' },
        { name: '退出登录', target: '' }
      ],
      menu: [
        { name: 'Login', target: '' },
        { name: '归档', target: '' },
        { name: '时光轴', target: '' },
        { name: 'About Me', target: '' }
      ]
    }
  },
  methods: {
    toSearch() {
      $('.js_search').toggleClass('is-visible')
    },

    addShadow(e) {
      const scrollTop = document.body.scrollTop || window.pageYOffset
      if (scrollTop > 220) {
        this.$store.commit('toShowTools', true)
      }
      if (scrollTop === 0) {
        this.shadow = false
      }
      if (scrollTop > 0) {
        this.shadow = true
      }
      if (scrollTop < 220) {
        this.$store.commit('toShowFlag', false)
        this.$store.commit('toShowTools', false)
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', throttle(this.addShadow, 200))
  }
}
</script>
<style lang="stylus">
@import url(../../pages/homepage/index.scss);
</style>
