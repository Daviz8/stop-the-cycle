import { redirect } from "next/navigation";
import {
  adminHasRole,
  getAdminSession,
} from "@/lib/server/auth";
import InformationDashboardClient from "./information-dashboard-client";

export default async function InformationDashboardPage() {
  const session = await getAdminSession();

  if (
    !adminHasRole(session, ["information_admin"])
  ) {
    redirect("/admin/signin");
  }

  return (
    <InformationDashboardClient
      adminName={session?.name || "Administrator"}
      adminRole={session?.role || ""}
    />
  );
}