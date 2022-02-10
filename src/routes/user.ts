import { Router } from 'express';
// import signUp from '../controllers/auth/signup';
import getUser from '../controllers/user/getUser';
import addSingle from '../controllers/image/uploadSingle';
import {requireSignIn} from '../middleware/protect';



const router: Router = Router();
router.get('/me', requireSignIn, getUser);
router.post('/add-single', requireSignIn, addSingle);

// router.post('/login', joiMiddleware(logInSchema), logIn);


export default router;