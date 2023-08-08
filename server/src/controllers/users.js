const Users = require('../models/users')
const bcrypt = require('bcrypt');
const registerNewUser = async(req,res)=>{
   //1 if Email is Already exists
   const matched = await Users.exists({email: req.body.email})
   if(matched){
      res.status(409).json({
         msg: 'user already exists'
         })
   }else{
      // encrypt the password
      const hashPassword = await bcrypt.hash(req.body.password,10);
      req.body.password=hashPassword
      await Users.create(req.body)
      res.status(201).json({
         msg: 'user created successfully'
         })
   }
   // console.log(matched)
   // await Users.create(req.body)
    
   }

   module.exports = {registerNewUser}