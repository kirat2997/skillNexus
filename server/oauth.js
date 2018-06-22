const express = require('express')
const passport = require('passport')
const router = express.Router()

const checkUser = require('./integrations/checkUser')

router.get('/auth/google',
  passport.authenticate('google', {session : false, scope: ['openid email profile'],accessType: 'offline',prompt: 'consent'}))

router.get('/oauth/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session : false
  }),
  async function(req, res) {
    // Authenticated successfully
    let account = await checkUser(req.user)
    res.redirect(`http://localhost:8080/callback/${account.accountExist}/${account.token}`)
  })

module.exports = router
