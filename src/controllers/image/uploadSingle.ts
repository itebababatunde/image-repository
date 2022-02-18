import { RequestHandler } from 'express';
import axios, { AxiosError } from 'axios'

import AppError from '../../errors/AppError';
import Image, { ImageDocument } from '../../model/Image';
import ImageTag, { ImageTagDocument } from '../../model/ImageTag';
import successResponse from '../../middleware/response';


const uploadSingle: RequestHandler = async (req, res, next) => {
        
        var image = {}
        try{
          if (!(req as any).file) {
            return next(new AppError('No file uploaded', 400));
          }
          const { permission } = req.body
          const imageUrl = (req as any).file.path 
  
          
          if (imageUrl.endsWith('jpg') || imageUrl.endsWith('png') ){
              image = await Image.create({
              imageUrl,
              createdBy: req.user._id,
              permission
             })
          }else{
            next(new AppError('Unable to upload, bad file extention', 400))
          }
          return successResponse(res, 200, 'Image successfully uploaded', {
            image
          });

        }catch(err){
          next(err)
        }

};


export default uploadSingle;
