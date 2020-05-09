<template>
  <div :class="classObj" class="app-wrapper">
    <sidebar></sidebar>
    <div :class="{ hasTagsView: needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <navbar />
        <tabs-view v-if="needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>
<script>
import Navbar from './navbar'
import Sidebar from './sidebar/sidebar'
import TabsView from './tabs-view'
import AppMain from './app-main'
import Settings from './Settings'
import RightPanel from '@/components/RightPanel'
import { mapState } from 'vuex'

export default {
  components: {
    Navbar,
    Sidebar,
    TabsView,
    AppMain,
    RightPanel,
    Settings
  },
  computed: {
    ...mapState({
      sidebar: (state) => state.app.sidebar,
      device: (state) => state.app.device,
      showSettings: (state) => state.settings.showSettings,
      needTagsView: (state) => state.settings.tagsView,
      fixedHeader: (state) => state.settings.fixedHeader
    }),
       classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
 
  }
}
</script>
<style scoped lang="scss">
@import '~@/style/variables.scss';

.app-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  .main-container {
    margin-left: 200px;
  }
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    transition: width 0.28s;
    width: calc(100% - #{$sideBarWidth});
  }
}
.hideSidebar .fixed-header {
  width: calc(100% - 64px);
}
</style>
