import UserModel from "../Models/UserModel.js";
import OrderModel from "../Models/OrderModel.js";
import ProductModel from "../Models/ProductModel.js";
import ProfileModel from "../Models/ProfileModel.js";
import logger from "../Utils/logger.js";

const initializeAssociation = () => {
    try {
        UserModel.hasMany(OrderModel, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });

        OrderModel.belongsTo(UserModel, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });

        ProductModel.hasMany(OrderModel, {
            foreignKey: "productId",
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        });

        OrderModel.belongsTo(ProductModel, {
            foreignKey: "productId",
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        });

        UserModel.hasOne(ProfileModel, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });

        ProfileModel.belongsTo(UserModel, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });

        logger.info("Associations initialized successfully.");
    } catch (err) {
        logger.error("Error occurred in defining associations:", err);
    }
};

export default initializeAssociation;
