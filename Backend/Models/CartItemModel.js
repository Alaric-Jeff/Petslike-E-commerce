import {sequelize} from "../Config/database.js";
import { DataTypes, Model } from "sequelize";

class CartItemModel extends Model {}

CartItemModel.init({
    cartItemId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }, 
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    price: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "CartItemModel",
    tableName: "CartItems",
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
        { fields: ['cartId'] },
        { fields: ['productId'] }
    ]
});

export default CartItemModel; 