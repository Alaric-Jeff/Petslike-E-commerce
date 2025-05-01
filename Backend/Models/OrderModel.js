import {sequelize} from "../Config/database.js";
import { DataTypes, Model } from "sequelize";
import UserModel from "./UserModel.js";

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
        allowNull: false,
        references: {   
            model: UserModel,
            key: "userId"
        }
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    unitPrice: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00
    },
    orderPrice: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.00
    }
}, {
    sequelize,
    modelName: "Order",
    tableName: "Orders",
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
        { fields: ['userId'] } 
    ]
});

export default OrderModel;
