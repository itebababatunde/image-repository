import cron from 'node-cron'
import { RequestHandler } from 'express';
import axios, { AxiosError } from 'axios'

import AppError from '../../errors/AppError';
import User, { UserDocument } from '../../model/User';
import Image, { ImageDocument } from '../../model/Image';
import ImageTag, { ImageTagDocument } from '../../model/ImageTag';
import env from '../../env.config'

const { IMAGGA_AUTH }: { IMAGGA_AUTH: string } = env;
import successResponse from '../../middleware/response';
import { ObjectId } from 'mongoose';

const cronJob = async ()=> {

    const cronGenerateTags = cron.schedule(' */30 * * * * *', async()=> {

        const untagged = await Image.find({tagged:false})

        untagged.forEach(async function(obj){
            const imageUrl: string = obj['imageUrl']
            const imageID: ObjectId = obj['_id']
            const url = 'https://api.imagga.com/v2/tags?image_url=' + encodeURIComponent(imageUrl);
            
            try{

                const tags:any = await axios.get(url, {
                    headers: {
                    Authorization: IMAGGA_AUTH
                    }
                }); 
                const allTags: any[] = tags.data.result.tags
        
                var count: number = 0

                let filteredList = allTags.splice(0, 5)
                
                if (filteredList.length> 0){
                    filteredList.forEach(async function(obj){
                    
                        await ImageTag.create({
                            image: imageID,
                            tag: obj['tag']['en']
                        })
                    })
                    await Image.findByIdAndUpdate(imageID, {tagged:true}, {upsert: true})
                }

             
                
            }catch(err:any){
                if(err.response)
                    console.log(err.response.data)
                else
                    console.log(err)
            }
        }) 
}) 
}

cronJob()

export default cronJob;
