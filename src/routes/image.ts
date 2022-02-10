import { Router } from 'express';
// import signUp from '../controllers/auth/signup';
import uploadSingle from '../controllers/image/uploadSingle';
import uploadMultiple from '../controllers/image/uploadMultiple';

import {requireSignIn} from '../middleware/protect';
import upload from '../utils/upload';


import joiMiddleware from '../middleware/joiMiddleware';
import { addImageSchema } from '../validators/auth';


const router: Router = Router();
router.post('/add-single', requireSignIn, upload.single('image'), joiMiddleware(addImageSchema), uploadSingle);
router.post('/add-multiple', requireSignIn, upload.array('images', 5), joiMiddleware(addImageSchema), uploadMultiple);

// router.post('/login', joiMiddleware(logInSchema), logIn);


export default router;