import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import First from '@/components/First'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          component: Login
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/first',
      component: First
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'login',
          component: Login
        },
        {
          path: 'first',
          name: 'first',
          component: First
        }
      ]
    }
  ]
})
