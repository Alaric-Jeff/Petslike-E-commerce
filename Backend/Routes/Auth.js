import express from 'express';
import SignUpController from '../Controllers/Users/SignUpController.js';
import SignInController from '../Controllers/Users/SignInController.js';
import { authLimiter, signUpLimiter} from '../Middleware/rateLimitMiddleware.js';

const router = express.Router()

router
    .post('/sign-up', signUpLimiter, SignUpController)
    .post('/sign-in', authLimiter, SignInController);

export default router;