import { DataTypes, Model } from "sequelize";
import {sequelize} from "../Config/database.js";

class UserModel extends Model {}   

UserModel.init({
    userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    firstName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    middleName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },contactNumber:{
        type: DataTypes.STRING,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: "UserModel",
    tableName: "Users",
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
});

export default UserModel

