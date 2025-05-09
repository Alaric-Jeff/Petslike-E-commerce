import UserModel from "../../Models/UserModel.js";
import bcrypt from "bcrypt";
import logger from "../../Utils/logger.js";

async function SignInService(email, password){
    try{
        const User = await UserModel.findOne({
            where: {email}
        })

        if(!User){
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, User.password);

        if(!isPasswordValid){
            throw new Error("Invalid password");
        }
        return User;
    }catch(err){
        logger.error("Error in SignInService, reason: ", err);
        throw err;
    }
}

export default SignInService;