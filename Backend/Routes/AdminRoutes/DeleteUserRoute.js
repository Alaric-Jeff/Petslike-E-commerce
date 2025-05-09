import DeleteUserController from '../../Controllers/Admin/DeleteUserController.js'
import express from 'express';

const router = express.Router();

router.delete('/:userId', DeleteUserController)

export default router;