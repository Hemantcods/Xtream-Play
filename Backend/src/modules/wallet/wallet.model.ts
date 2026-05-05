import mongoose, { ObjectId, Schema } from "mongoose";

export interface IWallet extends Document {
  userId: ObjectId;
  balance: number;
}

const WalletSchema=new Schema <IWallet>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    balance:{
        type:Number,
        default:0
    }
},{timestamps:true})

WalletSchema.index({ userId: 1 }, { unique: true });

export const Wallet = mongoose.model("Wallet", WalletSchema);