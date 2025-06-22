import UserModel from '../../Models/UserModel.js';
import logger from "../../Utils/logger.js";

async function UpdateUser(userId, UpdateForm){
    try{
        const UserToUpd = await UserModel.findByPk(userId);
        UserToUpd.set(UpdateForm);
        await UserToUpd.save();
    }catch(err){
        logger.error("Error updating user in services, reason: ", err)
        throw new Error(err);
    }
};

export default UpdateUser;