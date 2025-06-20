import DeleteUserController from '../../Controllers/UserController/DeleteUserController.js';
import GetAllUsersController from '../../Controllers/UserController/GetAllUserController.js';
import UpdateUserController from '../../Controllers/UserController/UpdateUserController.js';
import express from 'express'

const router = express.Router();

router 
    .put('/', UpdateUserController)
    .delete('/:userId', DeleteUserController)
    .get('/', GetAllUsersController)
export default router;
