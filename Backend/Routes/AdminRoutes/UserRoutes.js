import DeleteUserController from '../../Controllers/UserController/DeleteUserController.js';

import express from 'express'

const router = express.Router();

router 
    .put('/', UpdateUserController)
    .delete('/:userId', DeleteUserController)
    .get('/', GetAllUsersController)
export default router;
