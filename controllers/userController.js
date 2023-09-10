import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

 export default{
   userRegistration:async(req,res)=>{
        const {name,email,password,tc}=req.body;
        try{
            const user=await UserModel.findOne({email:email}); //check if user exists
            if(user){
                return res.status(400).json({message:"User already exists"}); //if user exists, return error
            }
            if(name&&email&&password&&tc){ //check if all fields are filled
            const hashedPassword=await bcrypt.hash(password,10); //hash the password
            const newUser=await UserModel.create({ //create a new user
                name:name, //name:name
                email:email,
                password:hashedPassword,
                tc:tc,
            });
            return res.status(201).json({message:"User created successfully"}); //return success message
        }else{
            return res.status(400).json({message:"Please fill in all fields"}); //return error message      }
        }
    }catch(error){
            return res.status(500).json({message:error.message});   //return error message
        }


}}