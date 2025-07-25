// utils/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key:    process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// --- buffer upload helper (used by /upload) ---
export function uploadBufferToCloudinary(buffer, opts = {}) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image", ...opts },
      (error, result) => (error ? reject(error) : resolve(result))
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
}

// --- file-path upload helper (legacy/local-or-/tmp) ---
export async function uploadOnCloudinary(localFilePaths, opts = {}) {
  const uploadSingle = async (p) => {
    const res = await cloudinary.uploader.upload(p, {
      resource_type: "image",
      ...opts,
    });
    try { fs.unlinkSync(p); } catch {}
    return res;
  };

  if (typeof localFilePaths === "string") return [await uploadSingle(localFilePaths)];
  if (Array.isArray(localFilePaths))
    return Promise.all(localFilePaths.map(uploadSingle));

  return [];
}

// --- remote URL upload helper (used by /upload-by-link) ---
export async function uploadUrlToCloudinary(url, opts = {}) {
  return cloudinary.uploader.upload(url, {
    resource_type: "image",
    ...opts,
  });
}

export { cloudinary };
