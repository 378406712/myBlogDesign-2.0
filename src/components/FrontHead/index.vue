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
        <img class="log_avatar" v-show="if_login" :src="avatar" />
        <img v-show="!if_login" src="/static/image/front/none.png" />

        <transition name="fade">
          <div class="header_user_menu" v-show="flag">
            <div v-show="if_login" class="header_user_name">
              Signed in as
              <div class="userName">{{ name }}</div>
            </div>
            <div class="menu_option" v-show="if_login">
              <router-link
                :to="item.target"
                v-for="(item, index) in links"
                :key="index"
                @click.native="logout(item.target)"
              >
                {{ item.name }}</router-link
              >
            </div>
            <div v-show="!if_login" class="herder-user-name no-logged">
              Whether to
              <router-link
                to="/login"
                target="_blank"
                style="color: #333; font-weight: bold; text-decoration: none;"
                >log in</router-link
              >
              now?
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
                <router-link to="/">
                  <svg-icon :icon-class="item.icon" />{{
                    item.name
                  }}</router-link
                >
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
import { mapGetters } from 'vuex'
import { getToken } from '@/common/auth'

export default {
  data() {
    return {
      if_login: false,
      shadow: false,
      flag: false,
      title: '蜂蜜与四叶草',
      links: [
        { name: '管理中心', target: '/dashboard' },
        { name: '撰写文章', target: '/edit/post-new' },
        { name: '个人资料', target: '/account/account' },
        { name: '退出登录', target: '' }
      ],
      menu: [
        { name: ' 首页', target: '/front/homepage', icon: 'fort-awesome' },
        { name: ' 归档', target: '', icon: 'archive' },
        { name: ' 友链', target: '', icon: 'link' },
        { name: ' About Me', target: '', icon: 'leaf' }
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
    },
    logout(target) {
      if (target === '') {
        this.$store.dispatch('logout').then(() => {
          history.go(0)
        })
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', throttle(this.addShadow, 200))
    if (getToken()) {
      this.if_login = true
    } else {
      this.if_login = false
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar'])
  }
}
</script>
<style lang="stylus" scoped>
@import url(../../pages/homepage/index.scss);
</style>
<style scoped>
@import url(./index.scss);
</style>
