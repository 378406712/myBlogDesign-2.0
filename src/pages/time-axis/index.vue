<template>
  <div class="time_axis" :class="bodyBg">
    <!-- 主体区 -->
    <section class="main_container">
      <!-- 壁纸 -->
      <div class="header_top"></div>
      <div id="page" class="site wrapper">
        <Head />
        <div class="pattern-center-blank"></div>
        <div class="pattern-center single-center">
          <div
            v-lazy:background-image="'/static/image/time-axis.jpg'"
            class="pattern-attachment-img"
          ></div>
          <header class="pattern-header single-header">
            <h1 class="entry-title">
              {{ title }}
            </h1>
          </header>
        </div>
      </div>
      <Axis />
      <Setting />
    </section>
    <Search />

    <Foot />
  </div>
</template>

<script>
import Head from '@/components/FrontHead'
import Foot from '@/components/FrontFoot'
import Search from '@/components/FrontSearch'
import Setting from '@/components/FrontToolSetting'
import Axis from './components/axis'
import { getBg } from '@/common/select-bg'
export default {
  name: 'bokepage',
  components: { Head, Foot, Search, Axis, Setting },
  data() {
    return {
      title: '时光轴'
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
@import url(./index.scss);
@import url(../../style/bg.scss);


</style>
