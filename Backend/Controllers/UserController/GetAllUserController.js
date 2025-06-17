import GetAllUsers from '../../Services/UserLogics/GetAllUsers.js'
import logger from '../../Utils/logger.js'

const GetAllUsersController = async (req, res) => {
    try{
        const users = await GetAllUsers();
        logger.info("Successfully get all users")
        return res.status(200).json({
            success: true,
            message: "Successfully retrieved all users",
            users: users
        })
    }catch(err){
        logger.error("Error occured in Get user controller:  ", err)
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export default GetAllUsersController;