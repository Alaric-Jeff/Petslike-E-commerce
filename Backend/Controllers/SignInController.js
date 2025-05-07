import { log } from "winston";
import SignInService from "../Services/SignInService.js";
import logger from "../Utils/logger.js";

const SignInController = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        logger.debug("Incomplete fields");
        return res.status(400).json({
            success: false,
            message: "Incomplete fields",
            error: "Missing required fields"
        })
    }

    try{
        await SignInService(email, password);
        logger.info("Sign in successful");
        return res.status(200).json({
            success: true,
            message: "Sign in successful"
        })
    }catch(err){
        logger.error("Error in SignInController, reason: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
};

export default SignInController;
