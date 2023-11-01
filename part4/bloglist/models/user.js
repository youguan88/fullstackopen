const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
  })

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject.password
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
module.exports = mongoose.model('User', UserSchema)