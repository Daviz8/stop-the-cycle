import { NextResponse } from "next/server";
import { Types } from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { connectDB } from "@/lib/server/db";
import { ChurchNewsModel, OutreachModel, TestimonyModel, ThemeModel } from "@/lib/server/model";
import { adminHasRole, getAdminSession } from "@/lib/server/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_RESOURCES = [
  "theme",
  "news",
  "outreach",
];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function hasCloudinaryConfiguration() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

function getCloudinaryPublicId(imageUrl) {
  if (!imageUrl) {
    return null;
  }

  try {
    const parsedUrl = new URL(imageUrl);

    if (
      !parsedUrl.hostname.includes(
        "res.cloudinary.com"
      )
    ) {
      return null;
    }

    const uploadMarker = "/upload/";
    const uploadIndex =
      parsedUrl.pathname.indexOf(uploadMarker);

    if (uploadIndex === -1) {
      return null;
    }

    const pathAfterUpload =
      parsedUrl.pathname.slice(
        uploadIndex + uploadMarker.length
      );

    const pathParts = pathAfterUpload
      .split("/")
      .filter(Boolean);

    const versionIndex = pathParts.findIndex(
      (part) => /^v\d+$/.test(part)
    );

    const assetParts =
      versionIndex >= 0
        ? pathParts.slice(versionIndex + 1)
        : pathParts;

    if (!assetParts.length) {
      return null;
    }

    const assetPath = assetParts.join("/");

    return decodeURIComponent(
      assetPath.replace(/\.[^/.]+$/, "")
    );
  } catch {
    return null;
  }
}

async function deleteCloudinaryImage(imageUrl) {
  if (
    !imageUrl ||
    !hasCloudinaryConfiguration()
  ) {
    return;
  }

  const publicId =
    getCloudinaryPublicId(imageUrl);

  if (!publicId) {
    return;
  }

  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });
  } catch (error) {
    // Do not prevent the database post from being deleted
    // just because the Cloudinary cleanup failed.
    console.error(
      "CLOUDINARY_IMAGE_DELETE_ERROR:",
      error
    );
  }
}

async function requireInformationAdmin() {
  const session = await getAdminSession();

  if (
    !adminHasRole(session, [
      "information_admin",
    ])
  ) {
    return null;
  }

  return session;
}

export async function GET() {
  try {
    await connectDB();

    const session =
      await requireInformationAdmin();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const [
      themes,
      weeklyNews,
      outreaches,
      testimonies,
    ] = await Promise.all([
      ThemeModel.find({})
        .sort({ createdAt: -1 })
        .lean(),

      ChurchNewsModel.find({})
        .sort({
          publishedAt: -1,
          createdAt: -1,
        })
        .lean(),

      OutreachModel.find({})
        .sort({
          date: 1,
          createdAt: -1,
        })
        .lean(),

      TestimonyModel.find({})
        .sort({ createdAt: -1 })
        .lean(),
    ]);

    return NextResponse.json({
      success: true,
      themes,
      weeklyNews,
      outreaches,
      testimonies,
    });
  } catch (error) {
    console.error(
      "LOAD_INFORMATION_DASHBOARD_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const session =
      await requireInformationAdmin();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const resource = String(
      body.resource || ""
    );

    if (
      !ALLOWED_RESOURCES.includes(resource)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid content type",
        },
        { status: 400 }
      );
    }

    if (resource === "theme") {
      const title = String(
        body.title || ""
      ).trim();

      const monthLabel = String(
        body.monthLabel || ""
      ).trim();

      const description = String(
        body.description || ""
      ).trim();

      const whyStayConnected = String(
        body.whyStayConnected || ""
      ).trim();

      if (
        !title ||
        !monthLabel ||
        !description ||
        !whyStayConnected
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Month, title, description and connection message are required",
          },
          { status: 400 }
        );
      }

      await ThemeModel.updateMany(
        {},
        {
          $set: {
            active: false,
          },
        }
      );

      const theme = await ThemeModel.create({
        monthLabel,
        title,
        scripture: String(
          body.scripture || ""
        ).trim(),
        description,
        whyStayConnected,
        image: String(
          body.image || ""
        ).trim(),
        active: true,
      });

      return NextResponse.json(
        {
          success: true,
          item: theme,
        },
        { status: 201 }
      );
    }

    if (resource === "news") {
      const title = String(
        body.title || ""
      ).trim();

      const excerpt = String(
        body.excerpt || ""
      ).trim();

      if (!title || !excerpt) {
        return NextResponse.json(
          {
            success: false,
            message:
              "News title and summary are required",
          },
          { status: 400 }
        );
      }

      const news =
        await ChurchNewsModel.create({
          title,
          excerpt,
          body: String(
            body.body || ""
          ).trim(),
          image: String(
            body.image || ""
          ).trim(),
          publishedAt: new Date(),
          published: true,
        });

      return NextResponse.json(
        {
          success: true,
          item: news,
        },
        { status: 201 }
      );
    }

    const title = String(
      body.title || ""
    ).trim();

    const description = String(
      body.description || ""
    ).trim();

    if (!title || !description) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Outreach title and description are required",
        },
        { status: 400 }
      );
    }

    const parsedDate = body.date
      ? new Date(body.date)
      : null;

    const validDate =
      parsedDate &&
      !Number.isNaN(parsedDate.getTime())
        ? parsedDate
        : undefined;

    const outreach =
      await OutreachModel.create({
        title,
        theme: String(
          body.theme || ""
        ).trim(),
        description,
        image: String(
          body.image || ""
        ).trim(),
        date: validDate,
        location: String(
          body.location || ""
        ).trim(),
        published: true,
      });

    return NextResponse.json(
      {
        success: true,
        item: outreach,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CREATE_INFORMATION_CONTENT_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to create church content",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();

    const session = await requireInformationAdmin();

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await request.json();

    const resource = String( body.resource || "" ).trim();

    const id = String(body.id || "").trim();

    if (
      !ALLOWED_RESOURCES.includes(resource)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid content type",
        },
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid post ID",
        },
        { status: 400 }
      );
    }

    let deletedPost = null;

    if (resource === "theme") {
      deletedPost = await ThemeModel.findByIdAndDelete(id);

      if (
        deletedPost &&
        deletedPost.active
      ) {
        await ThemeModel.findOneAndUpdate(
          {},
          {
            $set: {
              active: true,
            },
          },
          {
            sort: {
              createdAt: -1,
            },
            new: true,
          }
        );
      }
    }

    if (resource === "news") {
      deletedPost =  await ChurchNewsModel.findByIdAndDelete(id);
    }

    if (resource === "outreach") {
      deletedPost =  await OutreachModel.findByIdAndDelete(id);
    }

    if (!deletedPost) {
      return NextResponse.json(
        {
          success: false,
          message: "Post not found",
        },
        { status: 404 }
      );
    }

    await deleteCloudinaryImage(
      deletedPost.image
    );

    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
      deleted: {
        id: deletedPost._id.toString(),
        resource,
      },
    });
  } catch (error) {
    console.error(
      "DELETE_INFORMATION_CONTENT_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete post",
      },
      { status: 500 }
    );
  }
}