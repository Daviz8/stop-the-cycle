import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = "church_admin_session";

function parseEmails(value) {
  return String(value || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function resolveAdminRole(email) {
  const normalizedEmail = String(email || "")
    .trim()
    .toLowerCase();

  const informationAdmins = parseEmails(
    process.env.INFORMATION_ADMIN_EMAILS
  );

  const prayerAdmins = parseEmails(
    process.env.PRAYER_ADMIN_EMAILS
  );

  const superAdmins = parseEmails(
    process.env.SUPER_ADMIN_EMAILS
  );

  const isInformationAdmin =
    informationAdmins.includes(normalizedEmail);

  const isPrayerAdmin =
    prayerAdmins.includes(normalizedEmail);

  if (
    superAdmins.includes(normalizedEmail) ||
    (isInformationAdmin && isPrayerAdmin)
  ) {
    return "super_admin";
  }

  if (isInformationAdmin) {
    return "information_admin";
  }

  if (isPrayerAdmin) {
    return "prayer_admin";
  }

  return null;
}

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
}

export function signAdminToken(session) {
  return jwt.sign(session, getJwtSecret(), {
    expiresIn: "7d",
  });
}

export async function setAdminSession(session) {
  const cookieStore = await cookies();
  const token = signAdminToken(session);

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());

    if (!decoded || typeof decoded === "string") {
      return null;
    }

    if (
      !decoded.id ||
      !decoded.name ||
      !decoded.email ||
      !decoded.role
    ) {
      return null;
    }

    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}

export function adminHasRole(session, allowedRoles) {
  if (!session) {
    return false;
  }

  if (session.role === "super_admin") {
    return true;
  }

  return allowedRoles.includes(session.role);
}

export async function clearAdminSession() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}