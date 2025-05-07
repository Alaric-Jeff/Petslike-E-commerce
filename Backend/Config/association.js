import UserModel from "../Models/UserModel.js";
import OrderModel from "../Models/OrderModel.js";
import ProductModel from "../Models/ProductModel.js";
import logger from "../Utils/logger.js";

const initializeAssociation = () => {
    try {
        UserModel.hasMany(OrderModel, {
            foreignKey: "userId",
            onDelete: "CASCADE"
        });

        OrderModel.belongsTo(UserModel, {
            foreignKey: "userId"
        });

        logger.info("Associations initialized successfully.");
    } catch (err) {
        logger.error("Error occurred in defining associations:", err);
    }
};

export default initializeAssociation;
