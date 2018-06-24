import axios from 'axios'
import store from '../vuex/store'
import router from '../router/index'

export async function completeSignup (data) {
  const accountId = store.state.user._id
  const jwtToken = store.state.token
  try {
    const response = await axios.request({
      url: `/api/accounts/${accountId}/update`,
      method: 'put',
      headers: {'Authorization': 'Bearer ' + jwtToken},
      data
    })
    if (response.status === 200) {
      store.commit('USER_DATA', response.data)
    }
    return true
  } catch (e) {
    if (e.response.status === 401) {
      store.commit('RESET_STATE')
      router.push('/')
    }
    if (e.response.status === 400) {
      return false
    }
  }
}

export async function recommend () {
  try {
    const response = await axios.request({
      url: `/api/accounts/${store.state.user._id}/recommendations`,
      headers: {'Authorization': 'Bearer ' + store.state.token},
      method: 'get'
    })
    return response.data
  } catch (e) {
    if (e.response.status === 401) {
      return false
    }
  }
}
