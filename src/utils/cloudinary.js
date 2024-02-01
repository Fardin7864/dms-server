import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloydinary = async (localFilePath) =>{
    try {
        if (!localFilePath) return null;
       const respons = await cloudinary.uploader.upload(localFilePath,{
            resource_type: 'auto'
        })
        // console.log("file is uploaded on cloudinary", respons.url)
        fs.unlinkSync(localFilePath)
        return respons;
    } catch (error) {
        fs.unlinkSync(localFilePath) //removed the locally saved temporary file 
        return null;
    }
}


export {uploadOnCloydinary}

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });