import SignInService from '../../Services/UserLogics/SignInService.js'
import logger from "../../Utils/logger.js";

const SignInController = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        logger.info("Incomplete fields");
        return res.status(400).json({
            success: false,
            message: "Incomplete fields",
            error: "Missing required fields"
        })
    }

    try{
        const user = await SignInService(email, password);
        
        req.session.user = {
            userId: user.userId,
            email: user.email
        };
        
        logger.info("Sign in successful");
        return res.status(200).json({
            success: true,
            message: "Sign in successful"
        })

    }catch(err){
        logger.error("Error in SignInController, reason: ", err.message);
        
        if (err.message === "User not found") {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: err.message
            });
        }

        if (err.message === "Invalid password") {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
                error: err.message
            });
        }
        
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
};

export default SignInController;
