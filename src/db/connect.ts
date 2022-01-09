import mongoose, { ConnectOptions } from 'mongoose';

// export default async (): Promise<void> => {
//   try {
//     await mongoose.connect('mongodb+srv://ite:ite@cluster0.qlsv8.mongodb.net/image-repo?retryWrites=true&w=majority', {
//       useNewUrlParser: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//       useUnifiedTopology: true,
//     } as ConnectOptions);
//     console.log('connexted')
//   } catch (err) {
//     console.log(err);
//   }
// };

const connectToMongo = async (): Promise<void> => {
    try {
      await mongoose.connect('mongodb+srv://ite:ite@cluster0.qlsv8.mongodb.net/image-repo?retryWrites=true&w=majority', {
       useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);
      console.log('connexted')
    } catch (err) {
      console.log(err);
    }
 };

 export default connectToMongo