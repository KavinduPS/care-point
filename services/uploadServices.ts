import { v2 as cloudinary } from "cloudinary";
import { File } from "node:buffer";

const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  apiSecret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  cloudinaryURL: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
};

export const uploadDoc = async (file: Blob) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "unsigned_preset");
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.log(error);
  }
};
