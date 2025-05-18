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
    cartId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled'),
        defaultValue: 'pending',
        allowNull: false
    },
    totalAmount: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false
    },
    shippingAddress: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: "OrderModel",
    tableName: "Orders",
    timestamps: true,
    createdAt: 'orderDate',
    updatedAt: 'updatedAt',
    indexes: [
        { fields: ['userId'] },
        { fields: ['cartId'] },
        { fields: ['status'] }
    ]
});

export default OrderModel;
