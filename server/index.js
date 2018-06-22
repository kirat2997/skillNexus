require('dotenv').config()

const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 3000

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/skill-nexus-test")

app.set('view engine','html')
app.use(passport.initialize())

require('./oAuth/config/passport')(passport)

app.use('/',require('./oauth'))

app.listen(PORT, () => {
  console.log(`SERVER UP AT ${PORT}`)
})