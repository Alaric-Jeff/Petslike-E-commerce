import { loggers } from 'winston';
import GetAllUser from '../../../Services/UserLogics/GetAllUsers.js'
import logger from '../../../Utils/logger.js'

const GetAllUsersController = async (req, res)=> {
    try{
        const users = await GetAllUser();
        logger.info("Successfully Fetched all usera");
        
        return res.status(200).json({
            success: true,
            message: "Successfully Fetched all users",
            users
        })
    }catch(err){
        logger.error("Error occured in Get User Controller, reason: ", err)
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
};

export default GetAllUsersController;    