import { Router } from 'express';
import signUp from '../controllers/auth/signup';
import logIn from '../controllers/auth/login';
import {requireSignIn} from '../middleware/protect';

import joiMiddleware from '../middleware/joiMiddleware';
import { signUpSchema,logInSchema } from '../validators/auth';


const router: Router = Router();
router.post('/signup', joiMiddleware(signUpSchema), signUp);
router.post('/login', joiMiddleware(logInSchema), logIn);


export default router;