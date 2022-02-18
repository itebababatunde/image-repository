import mongoose, { Document, Model, model, PopulatedDoc, Schema } from 'mongoose';


export interface ImageDocument extends Document {
  imageUrl: string,
  createdBy: PopulatedDoc<'User'>,
  permission: string,
  tagged: boolean
}

const imageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    permission: {type: String, enum: ['private', 'public'], default: 'public'},
    tagged: {type: Boolean, default: false}
}, { timestamps: true });


const Image: Model<ImageDocument> = model<ImageDocument>("Image", imageSchema);
  
export default Image;