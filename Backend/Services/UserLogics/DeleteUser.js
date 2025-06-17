import UserModel from '../../Models/UserModel.js';
import logger from '../../Utils/logger.js';

async function DeleteUser(userId) {
    try {
        const result = await UserModel.destroy({
            where: { userId: userId }
        });

        if (result === 0) {
            throw new Error('No user was deleted');
        }

        logger.info("delete user services successful")
    } catch (err) {
        logger.error("Error occurred in deleting the user in services, reason: ", err);
        throw err;
    }
}

export default DeleteUser;