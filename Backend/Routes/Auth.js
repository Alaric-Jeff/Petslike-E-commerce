import express from 'express';
import SignUpController from '../Controllers/Users/SignUpController.js';
import SignInController from '../Controllers/Users/SignInController.js';

const router = express.Router()

router
    .post('/sign-up', SignUpController)
    .post('/sign-in', SignInController);

export default router;