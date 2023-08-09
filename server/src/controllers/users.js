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
      const data = await Users.findOne({email: req.body.email})
      
      if(data){
         const isMatched = await bcrypt.compare(req.body.password, data.password)
         if(isMatched){
          // token generating logic
          var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
          res.json({
            success: true,
            token
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

      //1. email
      //2.email user -> No: "no user found"
                   // -> YES: "comapre password (db.hashPassword-----req.body.password)"
                   // -> No: "Incorrect Password"
                   // -> YES: "generate a token"
                   // -> res.json({token...})
   }

   module.exports = {registerNewUser,loginUser}