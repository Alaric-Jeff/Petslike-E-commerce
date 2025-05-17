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
    productStock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }, foodCategory: {
        type: DataTypes.ENUM('Dry Food', 'Wet Food', 'Treats', 'Supplements'),
        allowNull: false
    }, dietCategory: {
        type: DataTypes.ENUM('processed-meat', 'raw-meat', 'vegetarian', 'grain-free'),
        allowNull: false
    },
    lifeStage: {
        type: DataTypes.ENUM('baby', 'young', 'adult', 'mature', 'senior', 'all-stages'),
        allowNull: false
    }, productDescription: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A'
    }, productImage: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A'
    }, productBrand: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'N/A'
    }, animalType: {
        type: DataTypes.ENUM('dog', 'cat', 'bird', 'fish', 'hamster', 'rabbit'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: "ProductModel",
    tableName: "Products",
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
        { fields: ['foodCategory'] },
        { fields: ['lifeStage'] },
        { fields: ['dietCategory'] },
        { fields: ['animalType'] }
    ]
});

export default ProductModel;
