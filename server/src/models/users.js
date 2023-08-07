const mongoose = require('mongoose')
 
const userSchema = new mongoose.Schema({
 fullName: String, // String is shorthand for {type: String}
 address: String,
 email: String,
 phoneNumber: String,
 password: String,
role:{
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
 }
});
 
const Users = mongoose.model('Users', userSchema);
 module.exports = Users