import UserModel from "../../Models/UserModel.js"; 
import DeleteUser from "../../Services/DeleteUser.js";
import logger from "../../Utils/logger.js";

const DeleteUserController = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            logger.error("Undefined User Id");
            return res.status(400).json({
                success: false,
                message: "User Id is undefined",
                error: "User Id is undefined"
            });
        }

        const User = await UserModel.findOne({
            where: { userId: userId }
        });

        if (!User) {
            logger.info(`Account doesn't exist for user: ${userId}`);
            return res.status(400).json({
                success: false,
                message: "Account doesn't exist",
                error: "Account doesn't exist"
            });
        }
        await DeleteUser(userId);
        logger.info(`Successfully deleted user: ${userId}`);
        return res.status(200).json({
            success: true,
            message: `Successfully deleted user ${userId}`
        });

    } catch (err) {
        logger.error(`Error occurred in Delete User Controller: ${err.message}`);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
         });
    }
};

export default DeleteUserController;
