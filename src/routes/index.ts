import { Router } from 'express';
import authRouter from './auth';
import userRouter from './user';
import imageRouter from './image';
import searchRouter from './search';



const router: Router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/image', imageRouter);
router.use('/image', imageRouter);
router.use('/search', searchRouter);




// router.use('/user', userRouter);
// router.use('/finance', financeRouter);

export default router;