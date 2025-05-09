import GetAllOrders from "../../../Services/GetAllOrders";
import logger from "../../../Utils/logger.js";

const GetAllOrdersController = async (req, res) => {
    try{
        const orders = await GetAllOrders();
        logger.info("Orders fetched in the controlers")
        return res.status({
            success: true,
            message: "Successfully fetched orders",
            orders
        })
    }catch(err){
        logger.error("Error occured in fetching orders");
        return res.status({
            success: false,
            message: "Internal server error",
            error: err
        })
    }
};

export default GetAllOrdersController;