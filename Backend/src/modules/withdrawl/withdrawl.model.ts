import mongoose, { Document } from "mongoose";

export interface IWithdrawl extends Document{
    userId:mongoose.Types.ObjectId,
    amount:Number,
    status:"pending"|"success"|"rejected"
}


const WithdrawlSchema=new mongoose.Schema<IWithdrawl> ({
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        amount:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            enum:["pending", "success", "rejected"],
            default:"pending"
        }
},{ timestamps:true})

export const Withdrawl=mongoose.model("Withdrawl",WithdrawlSchema)  