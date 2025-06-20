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
    type: DataTypes.ENUM('requires_action', 'requires_confirmation','succeeded', 'canceled', 'processing'),
    allowNull: false,
    defaultValue: "requires_confirmation"
  },
}, {
  sequelize,
  modelName: "PaymentModel",
  tableName: "PaymentTable",
  timestamps: true,
  createdAt: 'orderDate', 
  indexes: [
    {
      fields: ['userId', 'status'],
    },
  ],
});

export default PaymentModel;
