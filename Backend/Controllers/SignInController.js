import SignInService from "../Services/UserServices/SignInService.js";
import logger from "../Utils/logger.js";

const SignInController = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        logger.warn("Email or password is missing in the request body");
        return res.status(400).json({
            success: false,
            message: "Email and password are required"
        });
    }   

    try{
        const user = await SignInService(email, password);
        logger.info(`User with email ${email} signed in successfully`);

        req.session.user = {
            sid: user.userId,
            email: user.email,
            name: user.firstName
        }

        return res.status(200).json({
            success: true,
            message: "Sign-in successful"
        });
    } catch (error) {
        logger.error("Error during sign-in: ", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export default SignInController;