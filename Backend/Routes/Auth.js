import express from 'express';
import SignUpController from '../Controllers/SignUpController.js'
import SignInController from '../Controllers/SignInController.js'
import { authLimiter, signUpLimiter} from '../Middleware/rateLimitMiddleware.js';

const router = express.Router()

router
    .post('/sign-up', signUpLimiter, SignUpController)
    .post('/sign-in', authLimiter, SignInController);

export default router;