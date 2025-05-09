import UserModel from '../../Models/UserModel.js';
import logger from "../Utils/logger.js";

async function DeleteUser(userId){
    try{
        await UserModel.destroy({
            where: {userId: userId}
        })
    }catch(err){
        logger.error("Error occured in deleting the user in services, reason: ", err)
        throw err;
    }
};

export default DeleteUser;