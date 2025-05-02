import UserModel from "../Models/UserModel.js";
import logger from "../Utils/logger.js";

async function CheckUser(email){
    try{
        const isExisting = await UserModel.findOne({
            email
        });

        if(!isExisting){
            logger.info(`User not found`)
            return false;
        }
        
        logger.info(`User found, id: ${isExisting.userId}`)
        return true;
    }catch(err){
        logger.error("Error in checking user services, reason: ", err)
    }
}

export default CheckUser;