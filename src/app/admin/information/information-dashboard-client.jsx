"use client";

import { useEffect, useState } from "react";
import {
  ImagePlus,
  LoaderCircle,
  LogOut,
  Megaphone,
  Plus,
  Trash2,
  UploadCloud,
} from "lucide-react";

const initialForm = {
  resource: "news",
  title: "",
  excerpt: "",
  body: "",
  image: "",
};

export default function InformationDashboardClient({ adminName, adminRole }) {
  const [weeklyNews, setWeeklyNews] = useState([]);
  const [form, setForm] = useState({ ...initialForm });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [deletingKey, setDeletingKey] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  async function loadDashboard() {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/information", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        window.location.href = "/admin/signin";
        return;
      }

      setWeeklyNews(data.weeklyNews || []);
    } catch (error) {
      console.error("LOAD_INFORMATION_DASHBOARD_ERROR:", error);
      setMessage("Failed to load dashboard.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function deleteContent(resource, id, title) {
    const confirmed = window.confirm(
      `Delete "${title}"?\n\nThis weekly update will be permanently removed. This action cannot be undone.`
    );

    if (!confirmed) return;

    const key = `${resource}:${id}`;

    try {
      setDeletingKey(key);
      setMessage("");
      setMessageType("");

      const response = await fetch("/api/admin/information", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resource, id }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message || "Failed to delete update.");
        setMessageType("error");
        return;
      }

      setWeeklyNews((current) => current.filter((item) => item._id !== id));

      setMessage(data.message || "Update deleted successfully.");
      setMessageType("success");
    } catch (error) {
      console.error("DELETE_CONTENT_ERROR:", error);
      setMessage("Something went wrong while deleting the update.");
      setMessageType("error");
    } finally {
      setDeletingKey("");
    }
  }

  async function uploadImage(event) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      setMessage("Only JPG, PNG and WEBP images are allowed.");
      setMessageType("error");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setMessage("Image must not exceed 3 MB.");
      setMessageType("error");
      return;
    }

    try {
      setUploadingImage(true);
      setMessage("");
      setMessageType("");

      const uploadData = new FormData();
      uploadData.append("image", file);

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message || "Failed to upload image.");
        setMessageType("error");
        return;
      }

      setForm((current) => ({ ...current, image: data.image.url }));

      setMessage("Image uploaded successfully.");
      setMessageType("success");
    } catch (error) {
      console.error("IMAGE_UPLOAD_ERROR:", error);
      setMessage("Something went wrong while uploading the image.");
      setMessageType("error");
    } finally {
      setUploadingImage(false);
    }
  }

  function removeUploadedImage() {
    setForm((current) => ({ ...current, image: "" }));
    setMessage("");
    setMessageType("");
  }

  async function createContent(event) {
    event.preventDefault();

    if (uploadingImage) {
      setMessage("Please wait for the image upload to finish.");
      setMessageType("error");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setMessageType("");

      const response = await fetch("/api/admin/information", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(data.message || "Failed to create update.");
        setMessageType("error");
        return;
      }

      setForm({ ...initialForm });
      await loadDashboard();

      setMessage("Update published successfully.");
      setMessageType("success");
    } catch (error) {
      console.error("CREATE_INFORMATION_ERROR:", error);
      setMessage("Failed to publish update.");
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-[#F9F2ED]">
      <header className="sticky top-0 z-30 border-b border-[#217A4B]/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-xs font-black uppercase tracking-[0.18em] text-[#217A4B]">
              Media Administration
            </p>

            <h1 className="mt-1 truncate text-xl font-black text-[#172546]">
              Welcome, {adminName}
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {adminRole === "super_admin" ? (
              <span className="hidden rounded-full border border-[#D4A024]/40 bg-[#D4A024]/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-[#D4A024] sm:inline-flex">
                Super Admin
              </span>
            ) : null}

            <button
              type="button"
              onClick={logout}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#172546] px-4 text-sm font-black text-white transition hover:bg-[#217A4B] sm:px-5"
            >
              <LogOut className="size-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        {message ? (
          <div
            className={`flex items-start justify-between gap-4 rounded-2xl border p-4 text-sm font-bold ${
              messageType === "success"
                ? "border-[#217A4B]/20 bg-[#E9F4F1] text-[#217A4B]"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <p>{message}</p>
            <button
              type="button"
              onClick={() => {
                setMessage("");
                setMessageType("");
              }}
              className="shrink-0 text-lg leading-none opacity-60 transition hover:opacity-100"
              aria-label="Dismiss message"
            >
              ×
            </button>
          </div>
        ) : null}

        {loading ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <LoaderCircle className="mx-auto size-8 animate-spin text-[#217A4B]" />
              <p className="mt-4 font-black text-[#217A4B]">
                Loading dashboard...
              </p>
            </div>
          </div>
        ) : null}

        {!loading ? (
          <>
            {/* CREATE FORM */}
            <form
              onSubmit={createContent}
              className="mt-8 rounded-[30px] bg-white p-6 shadow-[0_18px_60px_rgba(23,37,70,0.08)] sm:p-8"
            >
              <div className="flex items-center gap-3">
                <div className="grid size-12 place-items-center rounded-full bg-[#217A4B] text-white">
                  <Plus className="size-5" />
                </div>

                <div>
                  <p className="text-xs font-black uppercase tracking-[0.17em] text-[#D4A024]">
                    New Update
                  </p>
                  <h2 className="text-2xl font-black text-[#172546]">
                    What's New at the Stop The Cycle Global Initiative
                  </h2>
                </div>
              </div>

              <div className="mt-7 grid gap-5 md:grid-cols-2">
                <Field label="Title" className="md:col-span-2">
                  <input
                    value={form.title}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    placeholder="Enter update title"
                    className="input-style"
                    required
                  />
                </Field>

                <Field label="Upload Image" className="md:col-span-2">
                  <div className="overflow-hidden rounded-[20px] border border-[#217A4B]/15 bg-[#F9F2ED]">
                    {form.image ? (
                      <div className="relative">
                        <img
                          src={form.image}
                          alt="Update preview"
                          className="h-[260px] w-full object-cover sm:h-[340px]"
                        />

                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-[#172546]/95 via-[#172546]/45 to-transparent p-4 pt-16">
                          <div className="min-w-0">
                            <p className="font-black text-white">
                              Image uploaded
                            </p>
                            <p className="mt-1 truncate text-xs font-semibold text-white/70">
                              Ready to publish
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={removeUploadedImage}
                            disabled={uploadingImage}
                            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-white px-4 text-xs font-black text-red-600 transition hover:bg-red-600 hover:text-white disabled:opacity-50"
                          >
                            <Trash2 className="size-4" />
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label
                        className={`flex min-h-[260px] flex-col items-center justify-center px-6 py-10 text-center transition ${
                          uploadingImage
                            ? "cursor-wait opacity-60"
                            : "cursor-pointer hover:bg-[#E9F4F1]"
                        }`}
                      >
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={uploadImage}
                          disabled={uploadingImage}
                          className="hidden"
                        />

                        <span className="grid size-16 place-items-center rounded-full bg-[#E9F4F1] text-[#217A4B]">
                          {uploadingImage ? (
                            <LoaderCircle className="size-7 animate-spin" />
                          ) : (
                            <ImagePlus className="size-7" />
                          )}
                        </span>

                        <span className="mt-4 text-base font-black text-[#172546]">
                          {uploadingImage
                            ? "Uploading image..."
                            : "Choose image from device"}
                        </span>

                        <span className="mt-2 max-w-sm text-xs font-semibold leading-5 text-[#172546]/60">
                          Select a JPG, PNG or WEBP image. Maximum file size is
                          3 MB.
                        </span>

                        {!uploadingImage ? (
                          <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#217A4B] px-5 py-3 text-xs font-black text-white">
                            <UploadCloud className="size-4" />
                            Select Image
                          </span>
                        ) : null}
                      </label>
                    )}
                  </div>
                </Field>

                <Field label="Update Summary" className="md:col-span-2">
                  <textarea
                    rows={4}
                    value={form.excerpt}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        excerpt: event.target.value,
                      }))
                    }
                    placeholder="Enter a short summary of the update"
                    className="input-style py-4"
                    required
                  />
                </Field>

                <Field label="Full Update Body" className="md:col-span-2">
                  <textarea
                    rows={7}
                    value={form.body}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        body: event.target.value,
                      }))
                    }
                    placeholder="Enter the complete update"
                    className="input-style py-4"
                  />
                </Field>
              </div>

              <button
                type="submit"
                disabled={saving || uploadingImage}
                className="mt-7 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#217A4B] font-black text-white transition hover:bg-[#D4A024] hover:text-[#172546] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving || uploadingImage ? (
                  <LoaderCircle className="size-5 animate-spin" />
                ) : (
                  <Plus className="size-5" />
                )}

                {uploadingImage
                  ? "Uploading Image..."
                  : saving
                    ? "Publishing..."
                    : "Publish Update"}
              </button>
            </form>

            {/* EXISTING WEEKLY UPDATES */}
            <section className="mt-8 rounded-[26px] bg-white p-5 shadow-[0_18px_60px_rgba(23,37,70,0.08)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid size-11 place-items-center rounded-full bg-[#E9F4F1] text-[#217A4B]">
                    <Megaphone className="size-5" />
                  </div>
                  <h2 className="text-xl font-black text-[#172546]">
                    Published Updates
                  </h2>
                </div>

                <span className="rounded-full bg-[#E9F4F1] px-3 py-1 text-xs font-black text-[#217A4B]">
                  {weeklyNews.length}
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {weeklyNews.map((item) => {
                  const itemKey = `news:${item._id}`;
                  const deleting = deletingKey === itemKey;

                  return (
                    <article
                      key={item._id}
                      className="rounded-2xl border border-[#217A4B]/10 bg-[#F9F2ED] p-3 transition hover:border-[#217A4B]/30 hover:bg-white"
                    >
                      <div className="flex items-start gap-3">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            className="size-16 shrink-0 rounded-xl object-cover sm:size-20"
                          />
                        ) : (
                          <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-[#E9F4F1] text-[#217A4B] sm:size-20">
                            <ImagePlus className="size-5" />
                          </div>
                        )}

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="line-clamp-2 font-black text-[#172546]">
                                {item.title}
                              </h3>
                              <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#172546]/60">
                                {item.excerpt}
                              </p>
                            </div>

                            <button
                              type="button"
                              onClick={() =>
                                deleteContent("news", item._id, item.title)
                              }
                              disabled={Boolean(deletingKey)}
                              className="grid size-10 shrink-0 place-items-center rounded-full border border-red-100 bg-white text-red-500 transition hover:border-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                              aria-label={`Delete ${item.title}`}
                              title="Delete update"
                            >
                              {deleting ? (
                                <LoaderCircle className="size-4 animate-spin" />
                              ) : (
                                <Trash2 className="size-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}

                {!weeklyNews.length ? (
                  <p className="py-8 text-center text-sm font-bold text-[#172546]/50">
                    No updates published yet.
                  </p>
                ) : null}
              </div>
            </section>
          </>
        ) : null}
      </div>

      <style jsx global>{`
        .input-style {
          width: 100%;
          min-height: 48px;
          border: 1px solid rgba(33, 122, 75, 0.2);
          border-radius: 14px;
          padding-left: 14px;
          padding-right: 14px;
          outline: none;
          background: white;
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease;
        }

        textarea.input-style {
          padding-top: 14px;
          padding-bottom: 14px;
          resize: vertical;
        }

        .input-style:focus {
          border-color: #217a4b;
          box-shadow: 0 0 0 4px rgba(33, 122, 75, 0.1);
        }
      `}</style>
    </main>
  );
}

function Field({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-black text-[#172546]">
        {label}
      </span>
      {children}
    </label>
  );
}