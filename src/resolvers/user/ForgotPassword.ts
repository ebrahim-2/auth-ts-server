import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { MyContext } from "../../types/MyContext";
import { sendMail } from "../../services";
import { createResetPasswordUrl } from "../../utils";
import uuidv4 from 'uuid/v4';
import { InstanceType } from "typegoose";
import { User } from "../../entities/user";

@Resolver()
export default class ForgotPassword {
  @Mutation(returns => String)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { UserModel }: MyContext
  ) {
    const user: InstanceType<User> = await UserModel.findOne({ email });
    if (!user) throw new Error("There is no user with this account");

    const token = uuidv4();
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
    await user.save()
    await sendMail(email, await createResetPasswordUrl(user._id));

    return "Reset Password Link Sended Successfully";
  }
}
