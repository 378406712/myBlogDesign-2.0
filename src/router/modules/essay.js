import Layout from '@/layout/layout'

const essayRouter = {
  path: '/edit',
  component: Layout,
  alwaysShow: true,
  redirect: '/post-new',
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
      path: '/edit/category-detail/:category',
      hidden: true,
      name: 'alter-category',
      component: () => import('@/views/edit/category-detail/index'),
      meta: { title: '编辑分类目录' }
    },
    {
      path: '/edit/all-essay/:category',
      hidden: true,
      name: 'essay-detail',
      component: () => import('@/views/edit/all-essay/index'),
      meta: { title: '文章' }
    }
  ]
}

export default essayRouter
