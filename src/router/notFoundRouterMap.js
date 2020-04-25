import Layout from '@/layout/layout'
export default [
  {
    path: '*',
    name: '404',
    component: Layout,
    hidden: true,
    redirect: '404',
    meta: {
      title: '404'
    },
    children: [
      {
        path: '404',
        name: 'err0r',
        component: () => import('@/views/error-page/index'),
        meta: { icon: 'svg-aperture', title: '404' }
      }
    ]
  }
]
