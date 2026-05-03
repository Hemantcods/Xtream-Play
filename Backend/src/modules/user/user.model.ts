import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";
export interface IUser extends Document {
  name: string;
  email?: string;
  phone?: string;
  isPhoneVerified?: boolean;
  isEmailVerified?: boolean;
  password?: string;
  role: "admin" | "user" | "moderator";
  provider: "local" | "google";
  googleId?: string;
  deviceToken?: string;
  //   methods/functions
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    isEmailVerified:{
      type:Boolean,
      default:false
    },
    password: {
      type: String,
      select: false,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin", "moderator"],
    },
    // select the provider
    provider:{
      type:String,
      enum:["local","google"]
    },
    googleId:{
      type:String,
      default:null,
      select:false
    },
    deviceToken:{
      type:String,
      default:null,
      select:false
    }
  },
  { timestamps: true },
);
// hash the pass before save

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const saltRounds = 10;
  if(this.password){
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
});

// compare password

userSchema.methods.comparePassword = async function (candidate: string) {
  if (!this.password) return false;
  return await bcrypt.compare(candidate, this.password);
};

export const User = mongoose.model<IUser>("User", userSchema);
