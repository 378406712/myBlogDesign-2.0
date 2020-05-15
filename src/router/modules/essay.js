import Layout from '@/layout/layout'

const essayRouter = {
  path: '/edit',
  component: Layout,
  alwaysShow: true,
  redirect: '/post-new',
  meta: {
    icon: 'collection',
    title: 'router.essay'
  },
  redirect: 'post-new',
  children: [
    {
      path: 'post-new',
      name: 'post-new',
      component: () => import('@/views/edit/post-new/index'),
      meta: { title: 'router.post_new' }
    },
    {
      path: 'all-essay',
      name: 'all-essay',
      component: () => import('@/views/edit/all-essay/index'),
      meta: { title: 'router.all_essay' }
    },
    {
      path: 'category',
      name: 'category',
      component: () => import('@/views/edit/category/index'),
      meta: { title: 'router.category' }
    },
    {
      path: '/edit/category-detail/:category',
      hidden: true,
      name: 'alter-category',
      component: () => import('@/views/edit/category-detail/index'),
      meta: { title: 'router.essay_detail' }
    },
    {
      path: '/edit/all-essay/:category',
      hidden: true,
      name: 'essay-detail',
      component: () => import('@/views/edit/all-essay/index'),
      meta: { title: 'router.category_detail' }
    }
  ]
}

export default essayRouter
