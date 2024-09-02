// uploadToCloud.js

import cloudinary from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: "do3vqgriw",
  api_key: "627626665991989",
  api_secret: "UYYlTVbI15U5vaffObsutVZWq4w",
});



const uploadToCloud = async (filePath) => {
  try {
    const result = await cloudinary.v2.uploader.upload(filePath, {
      folder: 'VahanBazar', // Optional: Folder to upload within Cloudinary
    });

    // Optionally, delete the local file after successful upload
    fs.unlinkSync(filePath);

    return result.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    console.error(error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

export default uploadToCloud;
