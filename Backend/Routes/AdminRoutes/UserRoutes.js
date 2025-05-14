import DeleteUserController from '../../Controllers/Admin/UserManagement/DeleteUserController.js';
import UpdateUserController from "../../Controllers/Admin/UserManagement/UpdateUserController.js";
import GetAllUsersController from '../../Controllers/Admin/UserManagement/GetAllUserController.js';
import express from 'express'
const router = express.Router();

router 
    .put('/', UpdateUserController)
    .delete('/:userId', DeleteUserController)
    .get('/', GetAllUsersController)
    
export default router;
