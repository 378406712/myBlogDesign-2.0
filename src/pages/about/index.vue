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
            v-lazy:background-image="'/static/image/center-bg.png'"
            class="pattern-attachment-img"
          ></div>
          <header class="pattern-header single-header">
            <h1 class="entry-title">
              {{ title }}

              <br />
              <p class="about">
                关于.
              </p>
            </h1>
          </header>
        </div>
      </div>
      <div id="content" class="site-content">
        <div id="primary" class="content-area">
          <main class="site-main">
            <article id="article" class="hentry">
              <About />
            </article>
          </main>
        </div>
      </div>
    </section>
    <Search />
    <Foot />
  </div>
</template>

<script>
import Head from '@/components/FrontHead'
import Foot from '@/components/FrontFoot'
import About from '@/components/About'
import Search from '@/components/FrontSearch'
import { getBg } from '@/common/select-bg'
export default {
  name: 'bokepage',
  components: { Head, Foot, About, Search },
  data() {
    return {
      title: 'Clover'
    }
  },
  mounted() {
    window.scrollTo(0, 220)
  },
  computed: {
    bodyBg() {
      return this.$store.state.indexpage.bodyBg || getBg()
    }
  }
}
</script>

<style lang="scss" scoped>
@import url(../bokepage/index.scss);
.pattern-center header.pattern-header {
  position: absolute;
  top: 45%;
  left: 0;
  right: 0;
  text-align: center;
  color: #fff;
  z-index: 1;
}
.pattern-center h1.entry-title {
  color: #fff;
  font-size: 40px;
  font-weight: 500;
  width: 80%;
  margin: auto;
  padding: 0;
  border: 0;
}
.about {
  background: linear-gradient(
    90deg,
    rgb(209, 255, 26) 0%,
    rgb(26, 209, 255) 100%
  );
  -webkit-background-clip: text;
  color: transparent;
}
#content {
  animation: main 1s;
}
.site-content {
  max-width: 800px;
  padding: 0 10px;
  margin-left: auto;
  margin-right: auto;
  background-color: rgba(255, 255, 255, 0.8);
}
.site-header:before {
  content: '';
  display: table;
  table-layout: fixed;
}

.hentry {
  margin: 0 0 1.5em;
}
#article {
  text-align: center;
}
</style>
