const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config();

import env from '../env.config';


const { CLOUDINARY_NAME }: { CLOUDINARY_NAME: string } = env;
const { CLOUDINARY_API_KEY }: { CLOUDINARY_API_KEY: string } = env;
const { CLOUDINARY_API_SECRET }: { CLOUDINARY_API_SECRET: string } = env;


const params = {
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
};

cloudinary.config(params);

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "image-repo",
    },
});

const upload = multer({ storage: storage });

export default upload