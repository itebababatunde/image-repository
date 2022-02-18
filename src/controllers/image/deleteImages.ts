import { RequestHandler } from 'express';
import axios, { AxiosError } from 'axios'

import AppError from '../../errors/AppError';
import Image, { ImageDocument } from '../../model/Image';
import ImageTag, { ImageTagDocument } from '../../model/ImageTag';
import successResponse from '../../middleware/response';


const deleteAll: RequestHandler = async (req, res, next) => {

        await Image.deleteMany()
        await ImageTag.deleteMany()

      return successResponse(res, 200, 'Sucessful', {
      message: `All images deleted `, 
  
  });
};


export default deleteAll;
