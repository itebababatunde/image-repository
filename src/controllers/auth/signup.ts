import { RequestHandler } from 'express';
import AppError from '../../errors/AppError';
import User, { UserDocument } from '../../model/User';
import successResponse from '../../middleware/response';
import { generateAccessToken } from '../../utils/token';
import env from '../../env.config';


const { JWT_COOKIE_EXPIRES_IN } = env;

const signUp: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  // check that the email is not in use
  const prevUsers: UserDocument[] = await User.find({ email });

  if (prevUsers.length > 0) {
    return next(new AppError('User with this email already exists', 400));
  }

  // create user
  const user: UserDocument = await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  const accessToken = generateAccessToken(String(user._id));

  //send the token in a cookie as well
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    expires: new Date(Date.now() + parseInt(JWT_COOKIE_EXPIRES_IN) * 60 * 60 * 1000),
  });

  return successResponse(res, 200, 'User Logged in sucessfully', {
    firstName: user.firstName,
    lastName: user.lastName,
    email,
    accessToken,
  });
};

export default signUp;