import UpdateUserController from "../../Controllers/Admin/UserManagement/UpdateUserController.js";
import express from 'express';

const router = express.Router();

router.put('/', UpdateUserController);

export default router;
