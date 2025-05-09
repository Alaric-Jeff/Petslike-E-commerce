import UserModel from '../../Models/UserModel.js';
import logger from "../../Utils/logger.js";

async function UpdateUser(userId, FormData){
    try{
        const UserToUpd = await UserModel.findByPk(userId);

        UserToUpd.set(FormData);
        await UserToUpd.save();
    }catch(err){
        logger.error("Error updating user in services, reason: ", err)
        throw err;
    }
};

export default UpdateUser;