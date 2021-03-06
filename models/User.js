const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   name: {type: String, required: true},
   lastName: {type: String, required: true},
   mail: {type: String, required: true},
   password: {type: String, required:true},
   image: {type: String},
   country: {type: String, required:true},
})

const User = mongoose.model('user', userSchema)

module.exports = User
