<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChildren(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="$t(onlyOneChild.meta.title)"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="$t(item.meta.title)"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="(child)"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>
<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import AppLink from './Link'
import LangSelect from '@/components/lang-select'

import Item from './item'
export default {
  name: 'sidebar-item',
  components: {
    Item,
    AppLink,
    LangSelect
  },
  props: {
    // 一级路由对象
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ''
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    this.onlyOneChild = null
    return {
      // onlyOneChild: null
    }
  },
  methods: {
    hasOneShowingChildren(children = [], parent) {
      // 把 children 里面没有 hidden 属性的元素，收集起来，看看有哪些
      // 1、后面要来判断，children 里面是不是只有一个
      // 2、亦或者没有 【比如 '/login' 这个 route 就没有 children】
      // 3、亦或者 children 里面的子路由大于1个
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false
        } else {
          // 这个地方就一直循环下去，至于是不是只有一个child，在后面会判断
          this.onlyOneChild = item
          return true
        }
      })
      // 只有 1 个，符合我们这个函数的目的，返回 true
      if (showingChildren.length === 1) {
        return true
      }

      // 如果最终没有任何结果的话，就显示父元素路由
      if (showingChildren.length === 0) {
        this.onlyOneChild = {
          ...parent,
          path: '',
          noShowingChild: true
        }
        return true
      }

      return false
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath
      }
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
