"use client";

import { GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function AdminSignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleGoogleSuccess(response) {
    const credential = response.credential;

    if (!credential) {
      alert("Google did not provide a valid credential.");
      return;
    }

    setLoading(true);

    try {
      const apiResponse = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential }),
      });

      const data = await apiResponse.json();

      if (!apiResponse.ok || !data.success) {
        setLoading(false);
        alert(data.message || "Sign in failed.");
        return;
      }

      router.replace(data.redirectTo || "/admin/information");
      router.refresh();
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Sign in failed.");
    }
  }

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#F9F2ED] px-4">
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#172546]/80 backdrop-blur-sm">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent" />
          <h2 className="mt-6 text-xl font-bold text-white">
            Signing you in...
          </h2>
        </div>
      )}

      <div className="absolute -left-32 top-10 size-96 rounded-full bg-[#217A4B]/20 blur-[100px]" />
      <div className="absolute -right-32 bottom-0 size-96 rounded-full bg-[#D4A024]/25 blur-[100px]" />

      <section className="relative w-full max-w-md rounded-[32px] bg-white p-8 text-center shadow-[0_25px_80px_rgba(23,37,70,0.13)]">
        <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#217A4B] text-white">
          <ShieldCheck className="size-8" />
        </div>

        <h1 className="mt-6 text-3xl font-black tracking-[-0.04em] text-[#172546]">
          Media Team Sign In
        </h1>

        <p className="mt-3 text-sm leading-6 text-[#172546]/70">
          Only approved members of the Stop The Cycle Media Team can sign in to
          manage information, updates, and content.
        </p>

        <div className="mt-8 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              alert("Google sign in failed.");
            }}
          />
        </div>
      </section>
    </main>
  );
}