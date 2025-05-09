import UserModel from '../../Models/UserModel.js';
import logger from "../../Utils/logger.js";

async function GetAllUsers(){
    try{
        const users = await User.findAll();
        return users;
    }catch(err){
        logger.error("Error in GetAllUsers, reason: ", err);
        throw err;
    }
}

export default GetAllUsers;