import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.routes.js";
import userRoutes from "./routes/user.routes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(postRoutes)
app.use(userRoutes)

const start = async() =>
{
    const connectDB = await mongoose.connect("mongodb+srv://shubhamzawar55_db_user:mH54iLjnj7ZYhnM6@cluster0.9dvqduq.mongodb.net/?appName=Cluster0");
    app.listen(9090,()=>{
        console.log("Server is running on PORT 9090");
    })
}

start();