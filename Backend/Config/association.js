import UserModel from "../Models/UserModel.js";
import OrderModel from "../Models/OrderModel.js";
import ProductModel from "../Models/ProductModel.js";
import ProfileModel from "../Models/ProfileModel.js";
import CartModel from "../Models/CartModel.js";
import CartItemModel from "../Models/CartItemModel.js";
import logger from "../Utils/logger.js";

const initializeAssociation = () => {
    try {
        // User associations
        UserModel.hasMany(CartModel, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        UserModel.hasMany(OrderModel, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        UserModel.hasOne(ProfileModel, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });

        // Cart associations
        CartModel.belongsTo(UserModel, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        CartModel.hasMany(CartItemModel, {
            foreignKey: "cartId",
            as: "cart",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        CartModel.hasOne(OrderModel, {
            foreignKey: "cartId",
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        });

        // CartItem associations
        CartItemModel.belongsTo(CartModel, {
            foreignKey: "cartId",
            as: "items",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        CartItemModel.belongsTo(ProductModel, {
            foreignKey: "productId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });

        // Product associations
        ProductModel.hasMany(CartItemModel, {
            foreignKey: "productId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });

        // Order associations
        OrderModel.belongsTo(UserModel, {
            foreignKey: "userId",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        });
        OrderModel.belongsTo(CartModel, {
            foreignKey: "cartId",
            onDelete: "SET NULL",
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
