import bcrypt from "bcryptjs";
import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { AuthPayload } from "./AuthPayload";
import { createToken } from "../../utils";
import { InstanceType } from "typegoose";
import { User } from "../../entities/user";

@Resolver()
export default class ChangePassword {
  @Mutation(returns => AuthPayload)
  async changePassword(
    @Arg("token") token: string,
    @Arg("password") password: string,
    @Ctx() { UserModel }: MyContext
  ): Promise<AuthPayload> {
    const user: InstanceType<User> = await UserModel.findOne({ resetPasswordToken: token });
  
    if (!user || user.resetPasswordExpires > Date.now())
      throw new Error("Reset password token is invalid or expired");
  
    const updatedPassword = await bcrypt.hash(password, 10);
    user.password = updatedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    
    await user.save();
    const jwtToken = createToken(user);

    return {
      user,
      token: jwtToken
    };
  }
}
