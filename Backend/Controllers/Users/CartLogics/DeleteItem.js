import DeleteItem from '../../../Services/CartLogics/DeleteItem.js'
import logger from '../../../Utils/logger.js'

const DeleteItemController = async (req, res) => {
    const {cartItemId} = req.body;
    if(!cartItemId){
        logger.info("Incomplete fields");
        return res.status(400).json({
            success: false,
            message: "Incomplete fields"
        })
    }

    try{
        await DeleteItem(cartItemId);
        logger.info("Item deleted successfully");
        return res.status(200).json({
            success: true,
            message: "Item deleted successfully"
        });
    }catch(err){
        logger.error("Error occured in DeleteItemController, error: ", err.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

export default DeleteItemController;