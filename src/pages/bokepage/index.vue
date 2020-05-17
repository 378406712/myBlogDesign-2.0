<template>
  <div class="boke_page" :class="bodyBg">
    <!-- 主体区 -->
    <section class="main_container">
      <!-- 壁纸 -->
      <div class="header_top"></div>
      <div id="page" class="site wrapper">
        <Head />
        <div class="page_content"></div>
      </div>
      <Setting />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
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
import { getBg } from '@/common/select-bg'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'home',
  components: { Head, Foot, Setting },
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
</style>
