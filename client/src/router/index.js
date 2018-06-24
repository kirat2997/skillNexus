import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Main from '@/components/Main'
import NewUser from '@/components/NewUser'

import { checkToken, shouldContinueOrNot, isAuthenticated } from '../helpers/auth'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      beforeEnter: shouldContinueOrNot
    },
    {
      path: '/callback/:exist/:jwtToken',
      beforeEnter: checkToken
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      beforeEnter: isAuthenticated
    },
    {
      path: '/newUserWizard',
      name: 'NewUser',
      component: NewUser,
      beforeEnter: isAuthenticated
    }
  ]
})
