import mongoose, { Document, Model, model, PopulatedDoc, Schema } from 'mongoose';


export interface ImageTagDocument extends Document {
  image: PopulatedDoc<'Image'>  ,
  tag: string
}

const imageTagSchema = new mongoose.Schema({
    image: { type: Schema.Types.ObjectId, ref: 'Image', required: true },
    tag: {type: String}
}, { timestamps: true });


// imageTagSchema.pre(/^find/, function populateImages(next) {
 

//   this.populate({
//     path: 'image',
//     select: 'imageUrl'
//   })
//   next()
// });


const ImageTag: Model<ImageTagDocument> = model<ImageTagDocument>("ImageTag", imageTagSchema);
  
export default ImageTag;