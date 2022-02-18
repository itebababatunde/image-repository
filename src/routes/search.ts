import { Router } from 'express';
// import signUp from '../controllers/auth/signup';

import searchTags from '../controllers/search/searchTags';
import searchImage from '../controllers/search/searchImage';

import upload from '../utils/upload';

import joiMiddleware from '../middleware/joiMiddleware';
import { addImageSchema, searchImageSchema } from '../validators/image';


import {requireSignIn} from '../middleware/protect';



const router: Router = Router();

router.get('/:key', requireSignIn, searchTags);
router.post('/image', requireSignIn, upload.single('image'), joiMiddleware(searchImageSchema), searchImage);



// router.post('/login', joiMiddleware(logInSchema), logIn);


export default router;