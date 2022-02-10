import dotenv from 'dotenv'
dotenv.config()

import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router from './routes/index';



import errorMiddleWare from './errors/errorHandler';

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use('/api/v1', router);


app.get('/', (req: Request, res: Response) => {
  return res.status(200).json({
    message: 'Image repository API by Iteoluwakishi',
    documentation: '',
  });
});

//unhandled routes
app.use('*', (req: Request, res: Response) => {
  return res.status(404).json({
    message: 'Specified route does not exist on this server',
  });
});

//error handling
app.use(errorMiddleWare);

export default app;

