import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IPayment extends Document{
    userId:ObjectId,
    amount:Number,
    status?:"pending"|"success"|"failed",
}

const PaymentSchema=new Schema<IPayment>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","success","failed"],
        default:"pending"
    }
},{timestamps:true})

export const Payment=mongoose.model("Payment",PaymentSchema)