import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
//组件模块
import Layout from '@/views/layout/Layout'
import Iframe from '@/views/iframe/index'

// 永远可见的路由
export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/echarts_mng/pie_mng',
    hidden: true,
  },
  // {
  //   path: '/login',
  //   component: () => import('@/views/login/index'),
  //   hidden: true
  // },
  {
    path: '/404',
    component: Layout,
    redirect: '/404/index',
    children: [
      {
        component: () => import('@/views/errorPage/404'),
        path: 'index',
        hidden: true,
      },
    ],
    hidden: true,
  },
  {
    path: '/401',
    component: Layout,
    redirect: '/401/index',
    children: [
      {
        component: () => import('@/views/errorPage/401'),
        path: 'index',
        hidden: true,
      },
    ],
    hidden: true,
  },
]

// echarts管理模块路由
export const echartsMngRouter = [
  {
    path: '/echarts_mng',
    component: Layout,
    name: 'EchartsMng',
    redirect: '/echarts_mng/pie_mng',
    meta: { roles: ['admin'], title: 'echarts管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'pie_mng',
        component: () => import('@/views/echartsMng/pieMng'),
        name: 'PieMng',
        meta: { roles: ['admin'], title: '饼图' },
      },
      {
        path: 'bar_mng',
        component: () => import('@/views/echartsMng/barMng'),
        name: 'barMng',
        meta: { roles: ['admin'], title: '柱状图' },
      },
      {
        path: 'line_mng',
        component: () => import('@/views/echartsMng/lineMng'),
        name: 'LineMng',
        meta: { roles: ['admin'], title: '折线图' },
      },
      {
        path: 'word_cloud',
        component: () => import('@/views/echartsMng/wordcloud'),
        name: 'WordCloud',
        meta: { roles: ['admin'], title: '词云' },
      },
    ],
  },
]

// antv管理模块路由
export const contentMngRouter = [
  {
    path: '/content_mng',
    component: Layout,
    name: 'ContentMng',
    redirect: '/content_mng/antv_bar',
    meta: { roles: ['admin'], title: 'antv管理', icon: 'el-icon-document' },
    children: [
      {
        path: 'antv_bar',
        component: () => import('@/views/antvMng/bar'),
        name: 'AntvBar',
        meta: { roles: ['admin'], title: '柱状图' },
      },
      {
        path: 'antv_line',
        component: () => import('@/views/antvMng/line'),
        name: 'AntvLine',
        meta: { roles: ['admin'], title: '折线图' },
      },
    ],
  },
]

export const textMngRouter = [
  {
    path: '/text_mng',
    component: Layout,
    name: 'TextMng',
    redirect: '/text_mng/text_index',
    meta: {
      roles: ['admin'],
      title: '文字管理',
      icon: 'el-icon-price-tag',
    },
    children: [
      {
        path: 'text_index',
        component: () => import('@/views/textMng'),
        name: 'TextIndex',
        meta: { roles: ['admin'], title: '文字管理' },
      },
    ],
  },
]

export const iframeLinkRouter = [
  {
    path: '/link',
    component: Layout,
    name: 'Link',
    redirect: '/link/taobao',
    meta: {
      roles: ['admin'],
      title: '外部链接',
      icon: 'el-icon-document',
    },
    children: [
      {
        path: 'taobao',
        component: Iframe,
        name: 'taobao',
        meta: {
          title: '淘宝',
          icon: 'form',
          noCache: true,
          pathUrl: 'https://es6.ruanyifeng.com/#docs/regex',
          iframe: 'https://www.taobao.com/',
        },
      },
      {
        path: 'baidu',
        component: Iframe,
        name: 'baidu',
        meta: {
          title: '百度',
          icon: 'pdf',
          noCache: true,
          pathUrl: 'https://es6.ruanyifeng.com/#docs/regex',
          iframe: 'https://www.baidu.com/',
        },
      },
    ],
  },
]

export const redirect404 = [{ path: '*', redirect: '/404', hidden: true }]

// 需要权限控制的路由
// export const asyncRouterMap = [...contentMngRouter, ...recommendMngRouter]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      ...constantRouterMap,
      ...echartsMngRouter,
      ...contentMngRouter,
      ...textMngRouter,
      ...iframeLinkRouter,
    ],
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
