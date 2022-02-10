import mongoose, { ConnectOptions } from 'mongoose';
import env from './.././env.config';
import logger from './logger';
import constants from '../utils/constants';
const { TEST } = constants.environments;
const { MONGO_URI } = env;

export default async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    logger.info('DB connected successfully');
  } catch (err) {
    console.log(err);
    logger.error('DB connection not successful');
  }
};