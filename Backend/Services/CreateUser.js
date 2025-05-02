import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'
import logger from "../Utils/logger.js";

async function CreateUser(firstName, lastName, middleName, email, password){
    const hashedPassword = await bcrypt.hash(password, 10);
   

   try{
 
    console.log(`${firstName, " ", lastName}`);
    const newUser = await UserModel.create({
        firstName,
        lastName,
        middleName,
        email,
        password: hashedPassword
    });

    logger.info(`successfully created user ${newUser.firstName + " "+newUser.lastName}, user Id: ${newUser.userId}`);
    return newUser;
   }catch(err){
    logger.error("Error creating user in services, reason:: ", err)
    return null;
   }
}
export default CreateUser;