import {sequelize} from "../Config/database.js";
import { DataTypes, Model } from "sequelize";

class CartModel extends Model {}

CartModel.init({
    cartId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'ordered', 'cancelled', 'abandoned'),
        defaultValue: 'active',
        allowNull: false
    }, itemCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    totalAmount: {
        type: DataTypes.DOUBLE(10, 2),
        defaultValue: 0.00
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize,
    modelName: "CartModel",
    tableName: "Carts",
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
        { fields: ['userId'] },
        { fields: ['status'] }
    ]
});

export default CartModel;