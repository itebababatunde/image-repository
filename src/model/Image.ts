import mongoose, { Document, Model, model, PopulatedDoc, Schema } from 'mongoose';


export interface ImageDocument extends Document {
  imageUrl: string,
  createdBy: PopulatedDoc<'User'>  
}

const imageSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    permission: {type: String, enum: ['private', 'public'], default: 'public'},
    tagged: {type: Boolean, default: false}
}, { timestamps: true });



const Image = model<ImageDocument>("Image", imageSchema);
  
export default Image;