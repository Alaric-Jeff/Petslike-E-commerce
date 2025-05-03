import {sequelize} from "../Config/database.js";
import { DataTypes, Model } from "sequelize";
import UserModel from "./UserModel.js";
import ProductModel from './ProductModel.js'

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
    },productId:{
        type: DataTypes.INTEGER,
        references: {
            model: ProductModel,
            key: "productId"
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
