import { RequestHandler } from 'express';


import AppError from '../../errors/AppError';
import User, { UserDocument } from '../../model/User';
import Image, { ImageDocument } from '../../model/Image';
import ImageTag, { ImageTagDocument } from '../../model/ImageTag';

import successResponse from '../../middleware/response';


const searchTags: RequestHandler = async (req, res, next) => {
  const {key} = req.params 
  const response: { tag: string, image:any }[] = []
  const results = await ImageTag.find({tag: key}).populate({path: 'image', select:'imageUrl -_id'}).select('image tag')
  results.forEach(async (result) => {
    var obj = {
       tag: result.tag,
       image: result.image
    }
    response.push(obj)
  });
  return successResponse(res, 200, 'Sucessful', {
  data: response
});
};

export default searchTags;