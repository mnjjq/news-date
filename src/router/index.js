import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/views/layout'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/question',
        name: 'question',
        component: () => import('@/views/question')
      },
      {
        path: '/vedio',
        name: 'vedio',
        component: () => import('@/views/vedio')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/mysearch',
    name: 'MySearch',
    component: () => import('@/views/search')
  },
  {
    path: '/article/:articleId',
    name: 'ArticleIndex',
    component: () => import('@/views/article'),
    props: true
  },
  {
    path: '/user/userinfo',
    name: 'UserInfo',
    component: () => import('@/views/userInfo')
  }
]

const router = new VueRouter({
  routes
})

export default router
