const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  authId:{
      type: String,
      required: true
    },
  name:{
      type: String
    },
  email:{
    type: String
    },
    createdAt:{
        type:Date,
        default: Date.now
    }  
})

module.exports = mongoose.model('User',UserSchema)