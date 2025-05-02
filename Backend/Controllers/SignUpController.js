import UserModel from "../Models/UserModel.js";
import CreateUser from "../Services/CreateUser.js";
import logger from "../Utils/logger.js";

const SignUpController = async (req, res) => {
    const {firstName, lastName, middleName, email, password} = req.body;

    if(!firstName || !lastName || !middleName || !email || !password){
        logger.error(`incomplete fields`)
        return res.status(400).json({message: "Incomplete fields"})
    }

    try{
        
        const isExisting = await UserModel.findOne({
            where: {email: email}
        })

        if(isExisting){
            logger.info("Account already exists");
            return res.status(401).json({message: "Account already exists"})
        }
        
        const newUser = await CreateUser(firstName, lastName, middleName, email, password);

        if(!newUser){
            return res.status(500).json({message: "Error occured in creating user"})
        }

        logger.info(`created user ${newUser}`);
        return res.status(200).json({message: `succcesfully created user ${newUser.userId}`});

    }catch(err){
        logger.error("Error occured in the Sign up Controller");
        return res.status(500).json({message: "Internal server error:"})
    }
};

export default SignUpController;