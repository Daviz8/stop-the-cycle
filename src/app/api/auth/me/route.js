import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/server/auth";

export async function GET() {
  const admin = await getAdminSession();

  return NextResponse.json({
    success: true,
    admin,
  });
}
