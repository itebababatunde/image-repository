import { RequestHandler } from 'express';

import upload from '../../utils/upload';
import AppError from '../../errors/AppError';
import User, { UserDocument } from '../../model/User';
import Image, { ImageDocument } from '../../model/Image';
import ImageTag, { ImageTagDocument } from '../../model/ImageTag';

import successResponse from '../../middleware/response';
import axios, { AxiosError } from 'axios'
import env from './../../env.config';
const { IMAGGA_AUTH }: { IMAGGA_AUTH: string } = env;


const getImages = async (tag: string): Promise<string[]> => {
    const allImageTags: ImageTagDocument[] = await ImageTag.find({ tag: { $regex: new RegExp(`.*${tag}.*`, 'i') } });
  
    // get all image ids from the tags
    const allImageIds = [];
    for (const imageTag of allImageTags) {
      allImageIds.push(String(imageTag.image));
    }
    return allImageIds;
  };
  
  const getImagesFromTags = async (allTags: string[], _page: number, _limit: number): Promise<any> => {
    const countMap = new Map<string, number>();
    const allImageIds = [];
    for (const tag of allTags) {
      const imageIds = await getImages(tag);
      for (const imageId of imageIds) {
        if (!countMap.has(imageId)) {
          countMap.set(imageId, 0);
          allImageIds.push(imageId);
        }
        countMap.set(imageId, (countMap.get(imageId) as number) + 1);
      }
    }
  
    allImageIds.sort((a, b) => {
      return -(countMap.get(a)! - countMap.get(b)!);
    });
  
    const start = (_page - 1) * _limit;
    const end = start + _limit;
    const imageResults: ImageDocument[] = [];
  
    for (let i = start; i < end; i++) {
      if (i >= allImageIds.length) {
        break;
      }
      const image = await Image.findById(allImageIds[i]);
      imageResults.push(image as ImageDocument);
    }
  
    const totalDocs: number = allImageIds.length;
    const totalPages: number = Math.ceil(totalDocs / _limit);
    const response: any = {};
  
    response.currentPage = _page;
    response.prevPage = _page > 1 ? _page - 1 : null;
    response.nextPage = _page < totalPages ? _page + 1 : null;
    response.totalPages = totalPages;
    response.totalResults = totalDocs;
    response.results = imageResults;
  
    return response;
  };

const searchImage: RequestHandler = async (req, res, next) => {
     
    try{

        const { page, limit } = req.query;

        let _page = parseInt(page as string) || 1;
        _page = Math.max(_page, 1);
      
        let _limit = parseInt(limit as string) || 10;
        _limit = Math.max(_limit, 1);
      

        if (!(req as any).file) {
            return next(new AppError('No file uploaded', 400));
          }
    
        const imageUrl: string = (req as any).file.path
        
    
        const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(imageUrl);
    
        const tags:any = await axios.get(url, {
            headers: {
            Authorization: IMAGGA_AUTH
            }
        }); 


        const allTags = tags.data.result.tags.map((tag: any) => {
            const key = Object.keys(tag.tag)[0];
            return tag.tag[key];
          });
      
        // get all images with similar tags
        const response = await getImagesFromTags(allTags, _page, _limit);

        return successResponse(res, 200, 'Sucessful', {
            response
        });
      

    }catch(err){
        console.log(err)
        next(err)
    }

  

};

export default searchImage;