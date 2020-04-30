<template>
  <div class="main-app">
    <transition name="fade-transform" mode="out-in">
      <keep-alive v-if="key !== '/edit/post-new '">
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

<style lang="scss" scoped>
.main-app {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f0f2f5;
}

.fixed-header + .main-app {
  padding-top: 50px;
}

.hasTagsView {
  .main-app {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 90px);
  }

  .fixed-header + .main-app {
    padding-top: 90px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
