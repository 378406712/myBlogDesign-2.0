import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Register from '@/views/register'
import Layout from '@/layout/layout'

Vue.use(Router)

/**
 * alwaysShow: true           if set true, will always show the root menu, whatever its child routes length
 *                            if not set alwaysShow, only more than ont route under the children
 *                            it will becomes nested mode, otherwise not show the root menu
 * alwaysShow: true           如果设置为true,它将总是现在在根目录。如果不设置的话，当它只有1个子路由的时候，会把
 *                            它的唯一子路由放到跟目录上来，而不显示它自己本身。
 */

export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/register',
    name: 'register',
    hidden: true,
    component: Register,
    meta: {
      title: '注册'
    }
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '仪表盘', icon: 'svg-dashboard', affix: true }
      }
    ]
  },
  {
    path: '/home',
    hidden: false,
    component: Layout,
    children: [
      {
        path: 'center',
        name: 'center',
        component: () => import('@/views/homepage'),
        meta: { title: '个人中心', icon: 's-home' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: false,

    children: [
      {
        path: 'account',
        name: 'account',
        component: () => import('@/views/user/account'),
        meta: { icon: 's-promotion', title: '账号设置' }
      }
    ]
  },
  {
    path: '/introduction',
    component: Layout,
    redirect: '/introduction/index',
    children: [
      {
        path: 'index',
        name: 'introduction',
        component: () => import('@/views/introduction/index'),
        meta: { icon: 'svg-aperture', title: '简述' }
      }
    ]
  },
  {
    path: '/custom-component',
    component: Layout,
    redirect: '/custom-component/index',
    children: [
      {
        path: 'index',
        name: 'CustomComponent',
        component: () => import('@/views/custom-component/index'),
        meta: { icon: 'guide', title: '自定义组件' }
      }
    ]
  },
  {
    path: '/echarts',
    component: Layout,
    redirect: 'index',
    alwaysShow: true,
    meta: {
      title: '可视化',
      icon: 'svg-droplet'
    },
    children: [
      {
        path: 'index',
        name: 'count',
        component: () => import('@/views/echarts'),
        meta: { title: '数量统计', icon: 'svg-heart' }
      }
    ]
  },
  {
    path: '/edit',
    component: Layout,
    alwaysShow: true,
    redirect:'/post-new',
    meta: {
      icon: 'collection',
      title: '文章'
    },
    redirect: 'post-new',
    children: [
      {
        path: 'post-new',
        name: 'post-new',
        component: () => import('@/views/edit/post-new/index'),
        meta: { icon: 'svg-type', title: '写文章' }
      },
      {
        path: 'all-essay',
        name: 'all-essay',
        component: () => import('@/views/edit/all-essay/index'),
        meta: { icon: 'notebook-2', title: '所有文章' }
      },
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/edit/category/index'),
        meta: { icon: 'collection-tag', title: '分类目录' }
      },
      {
        path: '/edit/category-detail/:id',
        hidden: true,
        name: 'alter-category',
        component: () => import('@/views/edit/category-detail/index'),
        meta: { icon: 'svg-category', title: '编辑分类目录' }
      }
    ]
  },
  {
    path: '/futures',
    component: Layout,
    redirect:'/draggable',
    alwaysShow: true,
    meta: {
      icon: 's-grid',
      title: '更多功能'
    },
    children: [
      {
        path: 'draggable',
        name: 'draggable',
        component: () => import('@/views/futures/draggable'),
        meta: { icon: 'thumb', title: '拖拽' }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/index'),
    hidden: true
  }
]

export default new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  // mode:'hash',
  mode: 'history',
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    alwaysShow: true,
    meta: {
      title: '表格',
      icon: 'date'
    },
    children: [
      {
        path: 'export-excel',
        name: 'exportExcel',
        component: () => import('@/views/excel/export-excel'),
        meta: { icon: 'download', title: '导出表格' }
      },
      {
        path: 'upload-excel',
        name: 'uploadExcel',
        component: () => import('@/views/excel/upload-excel'),
        meta: { icon: 'upload', title: '上传表格' }
      },
      {
        path: 'merge-count',
        name: 'mergeCount',
        component: () => import('@/views/excel/merge-count'),
        meta: { icon: 'upload', title: '合并&统计' }
      }
    ]
  },
  {
    path: '/clipboard',
    component: Layout,
    redirect: 'index',
    meta: {
      icon: 'document',
      title: '剪切板'
    },
    children: [
      {
        path: 'index',
        name: 'clipBoard',
        component: () => import('@/views/clipboard'),
        meta: { title: '剪切板示例', icon: 'document' }
      }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    redirect: 'index',
   
    children: [
      {
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: '主题', icon: 'svg-pifu' }
      }
    ]
  }
]
