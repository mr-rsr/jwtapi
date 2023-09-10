import mongoose from "mongoose";
const userSchema = new mongoose.Schema({//creating the schema for the user model 
    name:{type:String,required:true,trim:true}, 
    email:{type:String,required:true,trim:true,unique:true},//
    password:{type:String,required:true,trim:true},
    tc:{type:Boolean,required:true},
});
const UserModel=mongoose.model("User",userSchema); //creating the model
export default UserModel; //exporting the model