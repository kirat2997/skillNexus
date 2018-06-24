const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: String,
  email: String,
  contact: String,
  rollNo: String,
  university: String,
  skills: [{
    name: String,
    expertise: String,
    level: {
      type: Number,
      default: 1
    },
    authenticated: {
      type: Boolean,
      default: false
    }
  }]  
})
// Export Mongoose model
module.exports =  mongoose.model('account', userSchema)
