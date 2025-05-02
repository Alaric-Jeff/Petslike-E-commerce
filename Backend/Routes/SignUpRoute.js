import express from 'express';
import SignUpController from '../Controllers/SignUpController.js';

const router = express.Router()

router.post('/', SignUpController);

export default router;