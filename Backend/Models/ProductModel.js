import {sequelize} from "../Config/database.js";
import { DataTypes, Model } from "sequelize";

class ProductModel extends Model {}

ProductModel.init({
    productId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    productName: {
        type: DataTypes.STRING(100), // limit to 100 chars
        allowNull: false
    },
    productPrice: {
        type: DataTypes.DOUBLE(10, 2), // precision: max 10 digits, 2 decimal places
        defaultValue: 0.00
    },
    productQuantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    meatType: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lifeStage: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "ProductModel",
    tableName: "Products",
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        { fields: ['meat_type'] },
        { fields: ['life_stage'] }
    ]
});

export default ProductModel;
