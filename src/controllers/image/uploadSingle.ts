import { RequestHandler } from 'express';
import axios, { AxiosError } from 'axios'

import AppError from '../../errors/AppError';
import Image, { ImageDocument } from '../../model/Image';
import ImageTag, { ImageTagDocument } from '../../model/ImageTag';
import successResponse from '../../middleware/response';


const uploadSingle: RequestHandler = async (req, res, next) => {

      
        if (!(req as any).file) {
          return next(new AppError('No file uploaded', 400));
        }
        const { permission } = req.body
        const imageUrl = (req as any).file.path 
        
        const image = await Image.create({
          imageUrl,
          createdBy: req.user._id,
          permission
         })

      return successResponse(res, 200, 'Sucessful', {
      message: `Image successfully uploaded`, 
      image     
  });
};


export default uploadSingle;
