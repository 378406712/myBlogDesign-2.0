<template>
  <div class="left-sidebar">
    <logo v-if="showLogo" :collapse="isCollapse" class="logo" />
    <el-scrollbar class="el_scroll" :native="false">
      <el-menu
        class="scroll-menu"
        mode="vertical"
        unique-opened
        background-color="rgb(48, 65, 86)"
        :collapse="isCollapse"
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
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapGetters(['routers']),
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    }
  }
}
</script>
<style lang="stylus" scoped>
.left-sidebar
  position fixed
  width 200px
  top: 0;
  bottom: 0;
  background-color: rgb(48, 65, 86);
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
  margin-left: 16px !important;
}
#app .el-menu div  li  div span {
  margin-left: 16px !important;
}
</style>

