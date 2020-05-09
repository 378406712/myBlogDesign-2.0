<template>
  <div class="left-sidebar">
    <logo v-if="showLogo" :collapse="isCollapse" class="logo" />
    <el-scrollbar class="el_scroll" :native="false">
      <el-menu
        class="scroll-menu"
        mode="vertical"
        background-color="rgb(48, 65, 86)"
        :collapse="isCollapse"
        :collapse-transition="true"
        :default-active="$route.path"
      >
        <sidebar-item
          v-for="router of routers"
          :key="router.path"
          :item="router"
          :base-path="router.path"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import Logo from './Logo'

import { mapGetters } from 'vuex'
import SidebarItem from './sidebar-item'
export default {
  name: 'SideBar',
  components: {
    SidebarItem,
    Logo
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['routers']),
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    isCollapse() {
      return !this.$store.state.app.sidebar.opened
    }
  }
}
</script>
<style lang="stylus" scoped>
.left-sidebar{
   transition: width 0.28s;
    width:200px;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    left: 0;
    overflow: hidden;
}
.hideSidebar .sidebar-container {
    width: 64px !important;
}
</style>
<style>
.left-sidebar >>> .el-scrollbar_wrap {
  overflow-x: hidden;
}
.el_scroll {
  height: 100%;
}
.logo {
  user-select: none;
}
#app .el-menu div a li span {
  margin-left: 18px !important;
}
#app .el-menu div li div span {
  margin-left: 18px !important;
}
</style>
