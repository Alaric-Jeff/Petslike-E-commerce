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
        type: DataTypes.STRING(100), 
        allowNull: false
    },
    productPrice: {
        type: DataTypes.DOUBLE(10, 2), 
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
