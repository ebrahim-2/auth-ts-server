import { Request } from 'express';
import  uuid  from "uuid/v4";
import jwt from "jsonwebtoken";
import { User, UserModel } from "./entities/user";
import { InstanceType } from 'typegoose';


const getUserId = (req: Request) => {
  const Authorization = req.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const res = <any>verifyToken(token);

    return res.userId;
  }

  throw new Error("Not Authenticated");
};

const verifyToken = (token: string) => {
  return jwt.verify(token, "this is my secret");
};

const createToken = (user: InstanceType<User>) => {
  return jwt.sign(
    {
      userId: user.id
    },
    "this is my secret"
  );0
};

const emailExists = async (email: string) => {
  const user = await UserModel.findOne({ email });
  if (user) return true;

  return false;
};

export const createResetPasswordUrl = async (userId: number) => {
  const token = uuid();

  return `${process.env.PROTOCOL}://${process.env.HOST}/reset/${token}`;
};

export { getUserId, createToken, verifyToken, emailExists };
