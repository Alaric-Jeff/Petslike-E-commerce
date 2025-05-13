import UpdateUser from '../../../Services/UserLogics/UpdateUser.js'
import UserModel from '../../../Models/UserModel.js';
import logger from '../../../Utils/logger.js'

const UpdateUserController = async (req, res) => {

    const {UpdateForm} = req.body;

    if(!UpdateForm){
        logger.debug("Update Form is null");
        return res.status(400).json({
            success: false, 
            message: "Update Form is null"
        })
    }

    try{
        const user = await UserModel.findOne({
            where: {
                email: UpdateForm.email
            }
        })

        if(!user){
            logger.debug("No user found for email: ", UpdateForm.email)
            return res.status(400).json({
                success: false,
                message: `Account not found for email ${UpdateForm.email}`
            })
        }

        await UpdateUser(UpdateForm);
        return res.status(200).json({
            success: false,
            message: "Update Success"
        })

    }catch(err){
        logger.error(`Error occured in Update user controller, reason: ${err}`)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err
        })
    }
};

export default UpdateUserController;