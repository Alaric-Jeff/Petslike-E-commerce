import UserModel from "../../Models/UserModel.js";
import bcrypt from "bcrypt";
import logger from "../../Utils/logger.js";

async function SignInService(email, password){
    try{
        const User = await UserModel.findOne({
            where: {email}
        })

        if(!User){
            logger.info(`Login attempt failed: User not found for email ${email}`);
            throw new Error("User not found");
        }

        const isPasswordValid = await bcrypt.compare(password, User.password);

        if(!isPasswordValid){
            logger.warn(`Login attempt failed: Invalid password for email ${email}`);
            throw new Error("Invalid password");
        }
        
        logger.info(`User ${User.userId} successfully authenticated`);
        return User;
    }catch(err){
        logger.error("Error in SignInService, reason: ", err);
        throw err;
    }
}

export default SignInService;