import {v2 as cloudinary} from "cloudinary"
// Imports Cloudinary's Node SDK.

import fs from "fs"
// Used here to delete the local file after uploading it to Cloudinary.This module is built in nodejs.

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

const uploadOnCloudinary = async (localFilePaths) => {
  try {
    // Handle single file path (string)
    if (typeof localFilePaths === 'string') {
      if (!localFilePaths) return null;
      
      const response = await cloudinary.uploader.upload(localFilePaths, {
        resource_type: "auto"
      });
      
      fs.unlinkSync(localFilePaths);
      return [response]; // Return as array for consistency
    }
    
    // Handle array of file paths
    if (Array.isArray(localFilePaths)) {
      if (localFilePaths.length === 0) return [];
      
      const uploadPromises = localFilePaths.map(filePath => 
        cloudinary.uploader.upload(filePath, { resource_type: "auto" })
      );
      
      const results = await Promise.all(uploadPromises);
      localFilePaths.forEach(filePath => fs.unlinkSync(filePath));
      return results;
    }
    
    return null;
  } catch (error) {
    // Handle single file cleanup
    if (typeof localFilePaths === 'string' && fs.existsSync(localFilePaths)) {
      fs.unlinkSync(localFilePaths);
    }
    
    // Handle array cleanup
    if (Array.isArray(localFilePaths)) {
      localFilePaths.forEach(filePath => {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      });
    }
    
    console.error("Cloudinary upload error:", error);
    return null;
  }
}

export {uploadOnCloudinary}