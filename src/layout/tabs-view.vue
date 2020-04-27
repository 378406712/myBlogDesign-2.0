<template>
  <div class="tabs-view-container">
    <router-link
      class="tags-view-item"
      :class="isActive(tag) ? 'active' : ''"
      v-for="(tag, index) in visitedTabsView"
      :to="tag.path"
      :key="index"
    >
      <el-tag
        :closable="tag.path != '/dashboard'"
        :disable-transitions="false"
        @close.prevent.stop="handleClose(tag)"
        >{{ tag.name }}</el-tag
      >
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {}
  },
  created() {
    this.addTabsView()
  },
  computed: {
    ...mapGetters(['visitedTabsView'])
  },
  methods: {
    ...mapActions(['addVisitedTabsView', 'delVisitedTabsView']),
    addTabsView() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.addVisitedTabsView(this.generateRoute())
    },
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    isActive(route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    handleClose(tag) {
      this.delVisitedTabsView(tag).then(tags => {
        // 如果关闭的是当前显示的页面，就去到前一个 tab-view 页面
        if (this.isActive(tag)) {
          const lastTag = tags.slice(-1)[0]
          // 前一个 tab-view 页面存在，就跳；不存在就到首页
          if (lastTag) {
            this.$router.push(lastTag.path)
          } else {
            this.$router.push('/')
          }
        }
      })
    }
  },
  watch: {
    $route() {
      // console.log(this.$route)
      this.addTabsView()
    }
  }
}
</script>

<style lang="stylus">
.tabs-view-container {
  height: 40px;
  line-height:40px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
 background: #fff;
  border-bottom: 1px solid #dfdfdf;
  
  .tags-view-item {
    &:first-child {
        margin-left: 15px;
      }
    .el-tag {
      margin: 0 3px;
      &:first-child {
        margin-left: 0;
      }
    }

    &.active {
      .el-tag {
        background-color: #00b4aa;
        color: #fff;

        .el-icon-close {
          color: #fff;
        }

        &:before {
          position: relative;
          content: '';
          background: #fff;
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-right: 2px;
        }
      }
    }
  }
  

}
</style>
