import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { UserRouter } from "../routes/users.js";
import { ReceipeRouter } from "../routes/receipes.js";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth",UserRouter)
app.use("/receipes",ReceipeRouter);


mongoose.connect("mongodb+srv://adityamatkar:aditya201602@receipes.8kgolwo.mongodb.net/receipes?retryWrites=true&w=majority&appName=receipes")



app.listen(2001,()=>
{
    console.log("Server started on 2001");
})
