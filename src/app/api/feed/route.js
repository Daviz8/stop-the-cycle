import { NextResponse } from "next/server";
import { connectDB } from "@/lib/server/db";
import { ChurchNewsModel,OutreachModel,ThemeModel } from "@/lib/server/model";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function serializeDocument(document) {
  if (!document) return null;

  return {
    ...document,
    _id: document._id ? String(document._id) : "",
  };
}

export async function GET() {
  try {
    await connectDB();

    const [theme, weeklyNews, outreaches] =
      await Promise.all([
        ThemeModel.findOne({
          active: true,
        })
          .sort({ createdAt: -1 })
          .lean(),

        ChurchNewsModel.find({
          published: true,
        })
          .sort({
            publishedAt: -1,
            createdAt: -1,
          })
          .limit(6)
          .lean(),

        OutreachModel.find({
          published: true,
        })
          .sort({
            date: 1,
            createdAt: -1,
          })
          .limit(4)
          .lean(),
      ]);

    return NextResponse.json({
      success: true,
      theme: serializeDocument(theme),
      weeklyNews: weeklyNews.map(serializeDocument),
      outreaches: outreaches.map(serializeDocument),
    });
  } catch (error) {
    console.error("LOAD_CHURCH_FEED_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load church updates",
      },
      { status: 500 }
    );
  }
}