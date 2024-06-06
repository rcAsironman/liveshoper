// src/fetchImageUrl.js
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "./aws-config";
import { GetObjectCommand } from "@aws-sdk/client-s3";

const fetchImageUrl = async (key) => {
  const command = new GetObjectCommand({
    Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
    Key: key,
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    return url;
  } catch (error) {
    console.error('Error generating signed URL', error);
    throw new Error('Could not generate signed URL');
  }
};

export default fetchImageUrl;
