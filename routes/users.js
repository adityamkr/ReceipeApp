import express, { json } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register",async(req,res)=>
{
    console.log("this is register");
     const {username, password} = req.body;

     const user = await UserModel.findOne({username});

      if(user){
        return res.json({message:"User Already exists !"});
      }
    
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = new UserModel({username,password:hashedPassword});
    await newUser.save();
     res.json({message:"User registered Successfully"});
});


router.post("/login",async(req,res)=>
{
    console.log("This is Login");
    const {username,password} = req.body;
    const user = await UserModel.findOne({username});
  console.log("User login",user);
     if(!user)
     {
        return res.status(200).json({message:"NO"});
       // return res.json();
     }
     const isPasswordValid = await bcrypt.compare(password,user.password);

       if(!isPasswordValid)
        return res.json({message:"UserName or Password is Incorrect"});

        const token = jwt.sign({id:user._id},"secret");
        res.json({token,userID:user._id});

});

export {router as UserRouter};

export const verifyToken = (req,res,next) =>
{
    const token = req.headers.authorization;
    console.log("Token ",token);
     if(token) 
     {
        jwt.verify(token,"secret",(err)=>
        {
            if(err)
            return res.sendStatus(403); 
            next();
        })
     }
     else
     {
        res.sendStatus(401);
     }
}

