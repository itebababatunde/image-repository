import { RequestHandler } from 'express';
import got, { GotBodyOptions } from 'got'
import axios, { AxiosError } from 'axios'

import AppError from '../../errors/AppError';
import User, { UserDocument } from '../../model/User';
import Image, { ImageDocument } from '../../model/Image';
import ImageTag, { ImageTagDocument } from '../../model/ImageTag';

import successResponse from '../../middleware/response';

import env from '../../env.config';


const uploadMultiple: RequestHandler = async (req, res, next) => {

        if (!(req as any).files) {
          return next(new AppError('No file uploaded', 400));
        }
        const { permission } = req.body
        const images = (req as any).files 

        var count: number = 0

        images.forEach(async function(image: { path: string; }) {
            const imageUrl = image.path
            count+= 1
            await Image.create({
              createdBy: req.user._id,
              imageUrl,
              permission,
            })
            
        })        
      return successResponse(res, 200, 'Sucessful', {
      message: `${count} Images successfully uploaded`, 
  });
};

export default uploadMultiple;
