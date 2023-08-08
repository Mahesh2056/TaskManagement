const Users = require('../models/users')
const registerNewUser = async(req,res)=>{
   //1 if Email is Already exists
   const matched = await Users.exists({email: req.body.email})
   if(matched){
      res.status(409).json({
         msg: 'user already exists'
         })
   }
   // console.log(matched)
   // await Users.create(req.body)
    
   }

   module.exports = {registerNewUser}