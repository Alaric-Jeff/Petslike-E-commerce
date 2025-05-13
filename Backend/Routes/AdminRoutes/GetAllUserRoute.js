import GetAllUsersController from '../../Controllers/Admin/UserManagement/GetAllUserController.js';
import express from 'express';

const router = express.Router();

router.get('/', GetAllUsersController);

export default router;