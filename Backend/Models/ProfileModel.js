import { DataTypes, Model } from "sequelize";
import {sequelize} from "../Config/database.js";

class ProfileModel extends Model {}

ProfileModel.init({
    profileId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    userImage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    contactNumber: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    city: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    province: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    postalCode: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    barangay: {
        type: DataTypes.STRING, 
        allowNull: true
    }
}, {
    sequelize,
    modelName: "ProfileModel",
    tableName: "Profiles",
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    indexes: [
        {fields: ['userId'], unique: true}
    ]
});

export default ProfileModel;