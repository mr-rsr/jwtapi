import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    userRegistration: async (req, res) => {
        const { name, email, password, tc } = req.body;
        try {
            const user = await UserModel.findOne({ email: email }); //check if user exists
            if (user) {
                return res.status(400).json({ message: "User already exists" }); //if user exists, return error
            }
            if (name && email && password && tc) { //check if all fields are filled
                const hashedPassword = await bcrypt.hash(password, 10); //hash the password
                const newUser = await UserModel.create({ //create a new user
                    name: name, //name:name
                    email: email,
                    password: hashedPassword,
                    tc: tc,
                });
                const token=jwt.sign({id:newUser._id},process.env.JWT_TOKEN_KEY,{expiresIn:"15d"}); //create a token
                return res.status(201).json({ message: "User created successfully" ,token:token}); //return success message
            } else {
                return res.status(400).json({ message: "Please fill in all fields" }); //return error message      }
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });   //return error message
        };
    },
    userLogin: async (req, res) => {
        try {
            const { email, password } = req.body; //get email and password from request body
            if (email && password) { //check if email and password are provided
                const user = await UserModel.findOne({ email: email }); //check if user exists
                if (user) { //if user exists
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (email === user.email && isMatch) { //check if email and password match
                        const token=jwt.sign({id:user._id},process.env.JWT_TOKEN_KEY,{expiresIn:"15d"}); //create a token
                        return res.status(200).json({ message: "Login successful",token:token }); //return success message
                    }
                    else {
                        return res.status(400).json({ message: "Invalid credentials" }); //return error message
                    }
                }
                else {
                    return res.status(400).json({ message: "User does not exist" }); //return error message
                }
            }
            else {
                return res.status(400).json({ message: "Please fill in all fields" }); //return error message
            }
        }
        catch (error) {
            return res.status(500).json({ message: error.message }); //return error message
        }


    },
    changePassword: async (req, res) => {
        const { oldPassword, newPassword } = req.body;
        if(oldPassword && newPassword){
     if (oldPassword!==newPassword) {
         try{
           const user=await UserModel.findById(req.user._id);
           if(user){
             const isMatch=await bcrypt.compare(oldPassword,user.password);
             if(isMatch){
               const hashedPassword = await bcrypt.hash(newPassword, 10); //hash the password
               user.password=hashedPassword;
               await user.save();
               return res.status(200).json({ message: "Password changed successfully" }); //return success message
             }
             else{
               return res.status(400).json({ message: "Invalid credentials" }); //return error message
             }
           }
           else{
             return res.status(400).json({ message: "User does not exist" }); //return error message
           }
   
         }
         catch(error){
           return res.status(500).json({ message: error.message }); //return error message
         }
     } else {
            return res.status(400).json({ message: "Old Password and New password can't be same " }); //return error message
        
     }
    }
    else{
        return res.status(400).json({ message: "Please fill in all fields" }); //return error message
    }
    },
    userProfile: async (req, res) => {
        try{
          
            return res.status(200).json({user:req.user});
        }
        catch(error){   
            return res.status(500).json({ message: error.message }); //return error message
        }
    },
    // forgot password  reset for the android user
    forgotPassword: async (req, res) => {
        const { email } = req.body;
       // console.log(email);
        try {
            const user = await UserModel.findOne({ email: email }); //check if user exists
           
            if (user) {
                const token=jwt.sign({id:user._id},process.env.JWT_TOKEN_KEY,{expiresIn:"15d"}); //create a token
                return res.status(200).json({ message: "User exists",token:token }); //return success message
            }
            else {
                return res.status(400).json({ message: "User does not exist" }); //return error message
            }
        }
        catch (error) {
            return res.status(500).json({ message: error.message }); //return error message
        }
    },
    // reset password for the android user
    resetPassword: async (req, res) => {
        const { newPassword } = req.body;
        try {
            const user=await UserModel.findById(req.user._id);
            if(user){
                const hashedPassword = await bcrypt.hash(newPassword, 10); //hash the password
                user.password=hashedPassword;
                await user.save();
                return res.status(200).json({ message: "Password changed successfully" }); //return success message
            }
            else{
                return res.status(400).json({ message: "User does not exist" }); //return error message
            }
        }
        catch (error) {
            return res.status(500).json({ message: error.message }); //return error message
        }
    },

    //update profile for the android user
    updateProfile: async (req, res) => {
        const { name, email, tc } = req.body;
        try {
            const user=await UserModel.findById(req.user._id);
            if(user){
                user.name=name;
                user.email=email;
                user.tc=tc;
                await user.save();
                return res.status(200).json({ message: "Profile updated successfully" }); //return success message
            }
            else{
                return res.status(400).json({ message: "User does not exist" }); //return error message
            }
        }
        catch (error) {
            return res.status(500).json({ message: error.message }); //return error message
        }
    },
    
    //logout for the android user
    logout: async (req, res) => {
        try {
            return res.status(200).json({ message: "Logout successful" }); //return success message
        }
        catch (error) {
            return res.status(500).json({ message: error.message }); //return error message
        }
    }
}