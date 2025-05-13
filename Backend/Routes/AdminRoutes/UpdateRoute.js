import UpdateUserController from "../../Controllers/Admin/UserManagement/UpdateUserController.js";
import express from 'express';

const router = express.Router();

router.update('/', UpdateUserController);

export default router;