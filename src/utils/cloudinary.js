// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs"

//     cloudinary.config({ 
//         cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//         api_key: process.env.CLOUDINARY_API_KEY, 
//         api_secret: process.env.CLOUDINARY_API_SECRET 
//     });

//     const uploadOnCloudinary = async (localFilePath) => {
//         try {
//             if(!localFilePath) return null
//             cloudinary.uploader.upload(localFilePath,{
//              resource_type:"auto"   
//             })
// // file uplooooad3ed succesfullly 
// console.log("file is uploaed on cloudinary",response.url);
// return response
//         } catch (error) {
//             fs.unlinkSync(localFilePath)
//             return null
//         }
//     }


//     export {uploadOnCloudinary}


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // 🔥 Normalize for Windows
    const normalizedPath = path.resolve(localFilePath).replace(/\\/g, "/");

    // Upload
    const response = await cloudinary.uploader.upload(normalizedPath, {
      resource_type: "auto",
    });

    // Remove temp file
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.error("Cloudinary upload error:", error.message);
    fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
