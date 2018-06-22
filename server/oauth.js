const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get('/auth/google',
  passport.authenticate('google', {session : false, scope: ['openid email profile'],accessType: 'offline',prompt: 'consent'}))

router.get('/oauth/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
    session : false
  }),
  async function(req, res) {
    // Authenticated successfully
    res.json(req.user)
  })

module.exports = router
