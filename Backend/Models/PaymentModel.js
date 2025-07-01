// models/PaymentModel.js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../Config/database.js";

class PaymentModel extends Model {}

PaymentModel.init({
  paymentId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  paymentIntentId: { 
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  status: {
    type: DataTypes.ENUM(
      'requires_action',
      'requires_confirmation',
      'requires_payment_method',
      'processing',
      'succeeded',
      'canceled'
    ),
    allowNull: false,
    defaultValue: 'requires_payment_method'
  },
  currency: {
    type: DataTypes.ENUM('php', 'usd', 'eur'),
    allowNull: false,
    defaultValue: 'php'
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0.00
  }
}, {
  sequelize,
  modelName: "PaymentModel",
  tableName: "PaymentTable",
  timestamps: true,
  createdAt: 'orderDate',
  updatedAt: 'updatedAt',
  indexes: [
    {
      fields: ['userId', 'status'],
    },
  ],
});

export default PaymentModel;
