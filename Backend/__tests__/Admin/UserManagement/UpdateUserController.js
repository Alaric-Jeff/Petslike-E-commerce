import UpdateUser from '../../../Services/UserLogics/UpdateUser.js'
import UserModel from '../../../Models/UserModel.js';
import logger from '../../../Utils/logger.js'

const UpdateUserController = async (req, res) => {

    const {UpdateForm, userId} = req.body;

    if(!UpdateForm){
        logger.debug("Update Form is null");
        return res.status(400).json({
            success: false, 
            message: "Update Form is null"
        })
    }

    try{
        const user = await UserModel.findByPk(userId);

        if(!user){
            logger.debug("No user found for userId: ", userId)
            return res.status(400).json({
                success: false,
                message: `Account not found for userId ${userId}`
            })
        }

        await UpdateUser(userId ,UpdateForm);
        return res.status(200).json({
            success: true,
            message: "Update Success"
        })

    }catch(err){
        logger.error(`Error occurred in Update user controller, reason: ${err.message}`)

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        })
    }
};

export default UpdateUserController;