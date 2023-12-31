const Users = require('../models/users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
   }

   const loginUser = async(req,res)=>{
      console.log(req.body)
      //req.body -> email,password
      const data = await Users.findOne({email: req.body.email}).lean()
      
      if(data){
         const isMatched = await bcrypt.compare(req.body.password, data.password)
         if(isMatched){
         const {password, ...userDetails} = data
          const token = jwt.sign({ email: req.body.email }, process.env.SECRET_KEY);
          res.json({
            success: true,
            token,
            userDetails
         })
         }else{
            res.json({
               success: false,
               msg: "Incorrect login credentials"
            })
         }

      }else{
         res.json({
            success: false,
            msg: "No User Found"
         })
      }

    
   }

   module.exports = {registerNewUser,loginUser}