import jwt from 'jsonwebtoken';
import env from '../env.config';

const { JWT_SECRET, JWT_EXPIRES_IN } = env;

//generates jwt access token from user Id.
const generateAccessToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
};

export { generateAccessToken };