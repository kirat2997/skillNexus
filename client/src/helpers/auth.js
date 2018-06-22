import decode from 'jwt-decode'
import store from '../vuex/store'
import router from '../router/index'

import axios from 'axios'

export async function checkToken (to, from, next) {
  let decoded
  try {
    decoded = decode(to.params.jwtToken)
    if (!isTokenExpired(decoded)) {
      store.commit('SET_TOKEN', to.params.jwtToken)
      const result = await getUserFromToken(decoded)
      if (!result) {
        router.push('/')
      }
      store.commit('CHANGE_AUTH_STATE', true)
      if (to.params.exist === 'true') {
        const user = store.state.user
        console.log(user)
        next('/home')
      } else {
        next('/newUserWizard')
      }
    } else {
      store.commit('RESET_STATE')
      next('/')
    }
  } catch (e) {
    store.commit('RESET_STATE')
    next('/')
  }
  next()
}

export async function shouldContinueOrNot (to, from, next) {
  if (store.state.isAuthenticated) {
    next('/home')
  } else {
    next()
  }
}

export async function isAuthenticated (to, from, next) {
  if (store.state.isAuthenticated) {
    next()
  } else {
    next('/')
  }
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}

function getTokenExpirationDate (token) {
  if (!token.exp) { return null }
  const date = new Date(0)
  date.setUTCSeconds(token.exp)
  return date
}

async function getUserFromToken (decoded) {
  try {
    const response = await axios.request({
      url: `/api/accounts/${decoded.accountId}`,
      headers: {'Authorization': 'Bearer ' + store.state.token},
      method: 'get'
    })
    store.commit('USER_DATA', response.data)
  } catch (e) {
    if (e.response.status === 401) {
      return false
    }
  }
  return true
}
