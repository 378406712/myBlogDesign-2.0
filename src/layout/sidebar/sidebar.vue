<template>
  <div class="left-sidebar">
    <el-scrollbar class="el_scroll" :native="false" >
      <el-menu
        class="scroll-menu"
        mode="vertical"
        unique-opened
        background-color=""
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
import { mapGetters } from 'vuex'
import SidebarItem from './sidebar-item'
export default {
  name: 'SideBar',
  components: {
    SidebarItem
  },
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    ...mapGetters(['routers'])
  }
}
</script>
<style lang="stylus" scoped>
.left-sidebar
  position fixed
  margin-top 56px
  width 200px
  top: 0;
  bottom: 0;
</style>
<style>
.left-sidebar >>> .el-scrollbar_wrap {
  overflow-x: hidden;
}
.el_scroll {
  height: 100%;
}
</style>
