import {sequelize} from "../Config/database.js";
import { DataTypes, Model } from "sequelize";

class OrderModel extends Model {}

OrderModel.init({
    orderId: {
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
    productId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    productPrice: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00
    },
    orderPrice: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00
    }
}, {
    sequelize,
    modelName: "OrderModel",
    tableName: "Orders",
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
        { fields: ['userId'] },
        { fields: ['productId'] }
    ]
});

export default OrderModel;
