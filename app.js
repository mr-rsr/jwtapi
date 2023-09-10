import dotenv from 'dotenv'; //importing dotenv
import cors from 'cors'; //importing cors
import express from 'express';  //importing express
import connectDb from './config/connectdb.js'; //importing connectdb.js
import userRoutes from './routes/userRoutes.js'; //importing userRoutes.js

dotenv.config(); // to access .env variables
const port=process.env.PORT;    //setting up the port
const app =express();   //creating an express app
const DATABASE_URL=process.env.DATABASE_URL; //setting up the database url

app.use(cors()) ;//using cors
connectDb(DATABASE_URL); //connecting to the database
app.use(express.json()); //using express.json

app.use('/api/users',userRoutes); //using userRoutes.js

app.listen(port, () => { //listening to the port
console.log('Server listening at http://localhost:${port}') //listening to the port
})