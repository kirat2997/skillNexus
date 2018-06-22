import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import { checkToken } from '../helpers/auth'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/callback/:exist/:jwtToken',
      beforeEnter: checkToken
    }
  ]
})
