import DeleteUser from '../../Services/UserServices/DeleteUser.js'
import logger from '../../Utils/logger.js'

const DeleteUserController = async (req, res) => {
    const{userId} = req.params

    if(!userId){
        logger.info("user id is undefined")
        return res.status(400).json({
            success: false,
            message: "user id is undefined"
        })
    }

    try{
        await DeleteUser(userId)
        logger.info("Successfully deleted user with id: ", userId)

        return res.status(200).json({
            success: true,
            message: "Successfully deleted user with id: ", userId
        })

    }catch(err){
        if(err.message === "User not found"){
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    }
};

export default DeleteUserController;