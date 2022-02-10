import { RequestHandler } from 'express';
import AppError from '../../errors/AppError';
import UserModel, { UserDocument } from '../../model/User';
import successResponse from '../../middleware/response';
import validator from 'validator';



const getUser: RequestHandler = async (req, res, next) => {
    return successResponse(res, 200, 'Sucessful', {
        data: req.user
  });
};

export default getUser;