<template>
  <div class="main-app">
    <transition name="fade" enter-active-class="animated fadeIn" mode="out-in">
      <keep-alive v-if="key !== '/edit/post-new'">
        <router-view :key="key"></router-view>
      </keep-alive>
      <router-view v-else :key="key"></router-view>
    </transition>
    <ScrollTop />
  </div>
</template>

<script>
import ScrollTop from '@/components/scrollTop/index'
export default {
  name: 'app-main',
  components: { ScrollTop },
  data() {
    return {
      desc: '这里是右侧主界面'
    }
  },

  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped lang="stylus">
.main-app
  padding 5px
</style>
