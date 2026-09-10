import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { adminHasRole, getAdminSession } from "@/lib/server/auth";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 3 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function uploadImageBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "church-information",
          resource_type: "image",
          unique_filename: true,
          overwrite: false,
          transformation: [
            {
              width: 1800,
              height: 1800,
              crop: "limit",
              quality: "auto",
              fetch_format: "auto",
            },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        }
      );

    uploadStream.end(buffer);
  });
}
//TODO 
function uploadVideoBuffer(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          folder: "church-information",
          resource_type: "video",
          unique_filename: true,
          overwrite: false,
          transformation: [
            {
              width: 1800,
              height: 1800,
              crop: "limit",
              quality: "auto",
              fetch_format: "auto",
            },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        }
      );

    uploadStream.end(buffer);
  });
}


export async function POST(request) {
  try {
    const session = await getAdminSession();

    if (
      !adminHasRole(session, ["information_admin"])
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Cloudinary environment variables are not configured.",
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("image");

    if (!file || typeof file === "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Please select an image.",
        },
        { status: 400 }
      );
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only JPG, PNG and WEBP images are allowed.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          message: "Image must not exceed 3 MB.",
        },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadImageBuffer(buffer);

    if (!result?.secure_url) {
      throw new Error(
        "Cloudinary did not return an image URL."
      );
    }

    return NextResponse.json({
      success: true,
      image: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
      },
    });
  } catch (error) {
    console.error("ADMIN_IMAGE_UPLOAD_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to upload image.",
      },
      { status: 500 }
    );
  }
}

