<template>
  <div class="app-wrapper">
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
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    })
  },
  mounted() {
    console.log(this.$store)
  }
}
</script>
<style scoped lang="stylus">
.app-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
  .main-container {
    padding-left: 200px;

  }
}
</style>
