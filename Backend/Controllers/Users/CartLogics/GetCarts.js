import GetCarts from "../../../Services/CartLogics/GetCarts.js";
import logger from "../../../Utils/logger.js";

const GetCartsController = async (req, res) => {
    const {userId} = req.params;

    try {
        const carts = await GetCarts(userId);
        res.status(200).json({
            success: true,
            message: "Carts retrieved successfully",
            carts: carts
        });
    } catch (error) {
        logger.error("Error in GetCartsController: ", error);
        res.status(500).json({ message: "Internal server error" });
    }

};

export default GetCartsController;