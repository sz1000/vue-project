import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
* alwaysShow: true               当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
                                 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
                                 若你想不管路由下面的 children 声明的个数都显示你的根路由
                                 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
* redirect: noredirect           当设置 noredirect 的时候该路由在面包屑导航中不可被点击
* name:'router-name'             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* meta : {
    roles: ['admin', 'editor']   设置该路由进入的权限，支持多个权限叠加
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    noCache: true                如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb: false            如果设置为false，则不会在breadcrumb面包屑中显示
  }
**/
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   name: '首页',
  //   meta: {
  //     title: '首页',
  //     icon: 'example'
  //   },
  //   // hidden: ,
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index')
  //   }]
  // },
  // 订单管理
  {
    path: '/',
    component: Layout,
    redirect: '/networkAttack',
    name: '态势感知',
    meta: {
      title: '态势感知',
      icon: 'situation'
    },
    children: [{
        name: '态势感知',
        meta: {
          title: '网络攻击',
          icon: 'network'
        },
        path: 'networkAttack',
        component: () => import('@/views/situationAwareness/networkAttack')
      },
      {
        name: 'DDOSAttack',
        meta: {
          title: 'DDOS攻击',
          icon: 'DDoS'
        },
        path: 'DDOSAttack',
        component: () => import('@/views/situationAwareness/DDOSAttack')
      },
      {
        name: 'virusInfection',
        meta: {
          title: '病毒感染',
          icon: 'virus-fill'
        },
        path: 'virusInfection',
        component: () => import('@/views/situationAwareness/virusInfection')
      },
      {
        name: 'security',
        meta: {
          title: '防毒安装数',
          icon: 'security'
        },
        path: 'security',
        component: () => import('@/views/situationAwareness/security')
      },
      {
        name: 'phishingSite',
        meta: {
          title: '防钓鱼假冒',
          icon: 'phishing'
        },
        path: 'phishingSite',
        component: () => import('@/views/situationAwareness/phishingSite')
      },
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
