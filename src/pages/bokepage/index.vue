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
            v-cloak
            v-if="boke_essay_this.special_bg !== ''"
            class="pattern-attachment-img"
            v-lazy:background-image="boke_essay_this.special_bg"
          ></div>
          <header class="pattern-header single-header">
            <h1 class="entry-title">{{ boke_essay_this.title }}</h1>
            <p class="entry-census">
              <span
                ><router-link to=""
                  ><img
                    v-lazy="
                      'http://q1.qlogo.cn/g?b=qq&nk=378406712&s=640'
                    " /></router-link></span
              ><span>
                <router-link v-cloak v-if="boke_essay_this.nickname" to="">{{
                  boke_essay_this.nickname
                }}</router-link>
                <router-link v-else v-cloak to="">{{ name }}</router-link></span
              ><span class="bull">·</span>{{ boke_essay_this.date }}
            </p>
          </header>
        </div>
        <!-- 内容 -->
        <Content @getEssay="getEssay" />
        <!-- 评论 -->
        <Comment />
      </div>
      <Setting />
    </section>
    <Search />
    <Foot />
  </div>
</template>

<script>
import axios from 'axios'
import Head from '@/components/FrontHead'
import Foot from '@/components/FrontFoot'
import Setting from '@/components/FrontToolSetting'
import Comment from './components/comments'
import Content from './components/content'
import Search from '@/components/FrontSearch'
import { getBg } from '@/common/select-bg'
import { mapGetters, mapState } from 'vuex'
import 'highlight.js/styles/an-old-hope.css'
export default {
  name: 'bokepage',
  components: { Head, Foot, Setting, Comment, Content, Search },
  computed: {
    bodyBg() {
      return this.$store.state.indexpage.bodyBg || getBg()
    },
    ...mapGetters(['name', 'avatar']),
    ...mapState({
      boke_essay_this: (state) => state.bokepage.boke_essay_this
    })
  },
  methods: {
    async getEssay(keywords) {
      await this.$store.dispatch('getBokeEssay', {
        params: {
          _id: keywords,
          username: this.name
        }
      })
    }
  },
  mounted() {
    window.scrollTo(0, 0) //返回顶层
    this.getEssay(this.$route.query.essay_id)
  }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
@import url(../../style/bg.scss);
@import url(./index.scss);
.pattern-attachment-img {
  background-color: #fff;
}
.boke_page {
  background-attachment: fixed;
}
</style>
