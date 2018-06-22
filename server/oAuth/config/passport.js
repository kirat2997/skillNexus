const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const authConfig = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
}

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user)
  })
  passport.deserializeUser(function(obj, done) {
    done(null, obj)
  })
  passport.use(new GoogleStrategy(
    authConfig,
    function(accessToken,refreshToken,params,profile,done){
      process.nextTick(async function() {
        let user = {profile,accessToken,refreshToken,params}
        return done(null,user)
      })
    }
  ))
}
