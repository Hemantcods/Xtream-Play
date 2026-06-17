import jwt, { JwtPayload } from 'jsonwebtoken'
import {env} from '../config/env.js'
import { AppError } from './AppError.js';

if (!env.ACCESS_SECRET) throw new AppError("ACCESS_SECRET is not defined",500);
if (!env.REFRESH_SECRET) throw new AppError("REFRESH_SECRET is not defined",500);
interface TokenPayload extends JwtPayload {
  userId:string
}

export const generateAccessToken = (
 userId:string
)=>{
 return jwt.sign(
   { userId },
   env.ACCESS_SECRET,
   { expiresIn:"15m" }
 );
};

export const generateRefreshToken = (
 userId:string
)=>{
 return jwt.sign(
   { userId },
   env.REFRESH_SECRET,
   { expiresIn:"30d" }
 );
};

export const verifyAcessToken=(
    token:string
)=>{
    return jwt.verify(
        token,
        env.ACCESS_SECRET
    )
}
export const verifyRefreshToken=(
    token:string
):TokenPayload=>{
    return jwt.verify(
        token,
        env.REFRESH_SECRET
    ) as TokenPayload
}