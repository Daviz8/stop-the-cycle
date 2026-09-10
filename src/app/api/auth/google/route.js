import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { connectDB } from "@/lib/server/db";
import { ChurchAdminModel } from "@/lib/server/model";
import { resolveAdminRole,setAdminSession } from "@/lib/server/auth";

export const runtime = "nodejs";

const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const credential = String(body.credential || "");

    if (!credential) {
      return NextResponse.json(
        {
          success: false,
          message: "Google credential is required",
        },
        { status: 400 }
      );
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email || !payload.sub) {
      return NextResponse.json(
        {
          success: false,
          message: "Google account information was not found",
        },
        { status: 400 }
      );
    }

    if (payload.email_verified === false) {
      return NextResponse.json(
        {
          success: false,
          message: "Your Google email must be verified",
        },
        { status: 403 }
      );
    }

    const email = payload.email.toLowerCase();
    const role = resolveAdminRole(email);

    if (!role) {
      return NextResponse.json(
        {
          success: false,
          message:
            "This Google account is not approved for church administration.",
        },
        { status: 403 }
      );
    }

    const admin = await ChurchAdminModel.findOneAndUpdate(
      { email },
      {
        $set: {
          name: payload.name || email.split("@")[0],
          email,
          image: payload.picture || "",
          googleSub: payload.sub,
          role,
          active: true,
          lastLoginAt: new Date(),
        },
      },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      }
    );

    await setAdminSession({
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });

    let redirectTo = "/admin/information";

    if (role === "prayer_admin") {
      redirectTo = "/admin/prayers";
    }

    return NextResponse.json({
      success: true,
      redirectTo,
      admin: {
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("CHURCH_GOOGLE_AUTH_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Admin authentication failed",
      },
      { status: 500 }
    );
  }
}
