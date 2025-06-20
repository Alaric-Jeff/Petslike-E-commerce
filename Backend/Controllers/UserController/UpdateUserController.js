import UpdateUser from '../../Services/UserLogics/UpdateUser.js'
import logger from '../../Utils/logger.js'

const UpdateUserController = async (req, res) => {

    const {userId} = req.params;
    const {updateForm} = req.body;

    if(!userId || !updateForm){
        logger.info("Undefined request fields")
        return res.status(400).json({
            message: "Undefined request body",
            success: false
        })
    }

    try{
        const user = await UpdateUser(userId, updateForm);
        logger.info("successfully updated user: ", user.firstName)
        return res.status(200).json({
            success: true,
            message: `Successfully updated user: ${user.firstName}`,
            user: user
        })
    }catch(err){
        logger.error("Error occured in update user controller:  ", err)
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export default UpdateUserController;