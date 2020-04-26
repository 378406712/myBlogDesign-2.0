import Layout from '@/layout/layout'
export default [
  {
    path: '*',
    name: '404',
    hidden: true,
    redirect: '/404',
    component: () => import('@/views/error-page/index'),
    meta: {
      title: 'err0r'
    }
  }
]
