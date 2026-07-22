import { AppError } from "../../utils/AppError.js";
import { buildConditions } from "../../utils/helpers.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { IUser, User } from "../user/user.model.js";

export const registerUser = async (data: {
  name: string;
  password: string;
  email?: string;
  phone?: string;
}) => {
  const conditions = [];
  if (data.email) {
    conditions.push({
      email: data.email,
    });
  }

  if (data.phone) {
    conditions.push({
      phone: data.phone,
    });
  }
  const existingUser = await User.findOne({
    $or: conditions,
  });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const user = await User.create(data);
  // generate acess and refresh token
  const accessToken = generateAccessToken(user.id);
  // 3d expiry

  const refreshToken = generateRefreshToken(user.id);
  // 30d expiry

  user.refreshToken = refreshToken;
  await user.save();
  user.password = "";
  return { user, accessToken, refreshToken };
};

export const loginUser = async (data: {
  email?: string;
  password: string;
  phone?: string;
}) => {
  if ((!data.email && !data.phone) || !data.password) {
    throw new AppError("Invalid email or password", 401);
  }
  const conditions = buildConditions(data);
  const user = await User.findOne({
    $or: conditions,
  }).select("+password");
  if (!user) {
    throw new AppError("Email or phone Incorrect", 401);
  }
  // check password
  const isMatch = await user.comparePassword(data.password);

  if (isMatch == false) {
    throw new AppError("Password is incorrect, Try agian later", 401);
  }

  // generate acess and refresh token
  const accessToken = generateAccessToken(user.id);
  // 3d expiry

  const refreshToken = generateRefreshToken(user.id);
  // 30d expiry

  user.refreshToken = refreshToken;
  await user.save();

  // remove password from user object
  user.password = "";
  return {
    user,
    accessToken,
    refreshToken,
  };
};
export const getMeService = (user:IUser) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role:user.role,
  }
}