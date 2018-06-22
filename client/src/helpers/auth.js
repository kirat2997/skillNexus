import decode from 'jwt-decode'

export async function checkToken (to, from, next) {
  let decoded
  try {
    decoded = decode(to.params.jwtToken)
    if (!isTokenExpired(decoded)) {
      // store.commit('SET_TOKEN', to.query.token)
      // const result = await getUserFromToken(decoded)
      // if (!result) {
      //   router.push('/')
      // }
      // await fetchAllListings()
      // await populateChannel()
      // store.commit('CHANGE_AUTH_STATE', true)
      // if (to.query.exists === 'true') {
      //   const user = store.state.user
      //   const listingInfo = store.state.listing[0]
      //   if ((!listingInfo) || (!listingInfo.poc) || (user.users[0].channels.length === 0) || (!user.options.autoResponder && !user.options.bookingProcessing && !user.options.randomizedDoorCode && !user.options.createCleaningCalendar && !user.options.dynamicPricing)) {
      //     next('/newUserWizard')
      //   } else {
      //     next('/profile/listings')
      //   }
      // } else {
      //   next('/newUserWizard')
      // }
    } else {
      // store.commit('RESET_STATE')
      // next('/')
    }
  } catch (e) {
    // store.commit('RESET_STATE')
    // next('/')
  }
  next()
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
