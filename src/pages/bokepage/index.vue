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
            v-if="boke_essay.special_bg !== ''"
            class="pattern-attachment-img lazyload"
            :style="{ backgroundImage: 'url(' + boke_essay.special_bg + ')' }"
          ></div>
          <header class="pattern-header single-header">
            <h1 class="entry-title">{{ boke_essay.title }}</h1>
            <p class="entry-census">
              <span
                ><router-link to=""
                  ><img
                    src="http://q1.qlogo.cn/g?b=qq&nk=378406712&s=640" /></router-link></span
              ><span>
                <router-link v-if="boke_essay.nickname" to="">{{
                  boke_essay.nickname
                }}</router-link>
                <router-link v-else to="">{{ name }}</router-link></span
              ><span class="bull">·</span>{{ boke_essay.date }}
            </p>
          </header>
        </div>
        <!-- 内容 -->
        <Content />

        <!-- 评论 -->
        <Comment />
      </div>
      <Setting />
    </section>
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
import { getBg } from '@/common/select-bg'
import { mapGetters, mapState } from 'vuex'
import 'highlight.js/styles/an-old-hope.css'
export default {
  components: { Head, Foot, Setting, Comment, Content },
  data() {
    return {}
  },
  computed: {
    bodyBg() {
      return this.$store.state.indexpage.bodyBg || getBg()
    },
    ...mapGetters(['name', 'avatar']),
    ...mapState({
      boke_essay: (state) => state.bokepage.boke_essay
    })
  },
  methods: {
    async getEssay(keywords) {
      await this.$store.dispatch('getBokeEssay', keywords)
    }
  },
  mounted() {
    this.getEssay({
      params: {
        _id: this.$route.query.essay_id,
        username: this.name
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import url(../../style/bg.scss);
@import url(./index.scss);
.pattern-attachment-img {
  background-color: #fff;
}

</style>

