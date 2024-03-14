import mongoose from "mongoose";

const ReceipeSchema = new mongoose.Schema({
        
     name:{
         type:String,
         required:true,
     },
     ingredients:[{
        type:String,
        required:true
     }],
     instruction:{
        type:String,
        required:true
     },
     imageUrl:{
        type:String,
        required:true
     },
     cookingTime:{
        type:Number,
        required:true
     },
     userOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
     }
});

export const ReceipeModel = mongoose.model("receipe",ReceipeSchema)