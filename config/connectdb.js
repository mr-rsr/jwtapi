import mongoose from 'mongoose'; //importing mongoose

const connectDb= async (DATABASE_URL)=>{ //creating a function to connect to the database   
    try{
    const DB_OPTIONS = { //setting up the options   
       dbName:"geekshop" //setting up the database name
    }
    await mongoose.connect(DATABASE_URL,DB_OPTIONS); //connecting to the database
    console.log('Database connected successfully'); //logging the message
    }catch(error){
        console.log(error); //logging the error 
    }}
export default connectDb; //exporting the function