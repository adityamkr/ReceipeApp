import { ReceipeModel } from "../models/Receipes.js";
import express from "express";
import mongoose from "mongoose";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router  = express.Router();

router.get("/", async(req,res) =>
{
     try
     {
         const response = await ReceipeModel.find({});
         res.json(response);
         
     }
     catch(error)
     {
        console.log(error);
        res.json(error)
     }
});

router.post("/", verifyToken ,async (req,res) => {

   console.log("In receipe Post");
   console.log(req.body);
      const receipe  = new ReceipeModel(req.body);
    try {

    const response  = await receipe.save();
    res.json(response);
    } catch (error) {
        
        res.json(error);
    }
});

router.put("/",verifyToken,async (req,res)=>
{
   console.log("I came in Put");
   console.log(req.body.receipeID,req.body.userID);
     try {
    const receipe = await ReceipeModel.findById(req.body.receipeID);
    console.log(receipe);
    const user = await UserModel.findById(req.body.userID);
     user.savedReceipes.push(receipe);
    await user.save();
    res.json({savedReceipes:user.savedReceipes});
     } 
     catch (error) {
        res.json(error);
     }
});

router.get("/savedReceipes/ids/:userID",  async (req,res) =>
{
  console.log("req is here");
     try {
        const user = await UserModel.findById(req.params.userID);
         res.json({savedReceipes:user?.savedReceipes});
     } catch (error) {
        console.log(error);
        res.json(error);
     }
});

router.get("/savedReceipes/:userID" , async(req,res)=>
{
     try
     {
        const user = await UserModel.findById(req.params.userID);
        const savedReceipes = await ReceipeModel.find({
            _id: { $in: user.savedReceipes}
        });

        res.json({ savedReceipes});
     }
     catch(error)
     {
        console.log(error);
        res.json(error);
     }
})


export {router as ReceipeRouter};