

"use client";

import { useEffect,useMemo, useState,} from "react";
import {BookOpen, Heart,ImagePlus,LoaderCircle,LogOut,Megaphone,Plus, Sparkles,Trash2, UploadCloud,} from "lucide-react";
import Link from "next/link";

const initialForm = {
  resource: "news",
  monthLabel: "",
  title: "",
  scripture: "",
  description: "",
  whyStayConnected: "",
  excerpt: "",
  body: "",
  image: "",
  theme: "",
  date: "",
  location: "",
};

export default function InformationDashboardClient({
  adminName,
  adminRole,
}) {
  const [themes, setThemes] = useState([]);
  const [weeklyNews, setWeeklyNews] =
    useState([]);
  const [outreaches, setOutreaches] =
    useState([]);
  const [testimonies, setTestimonies] =
    useState([]);

  const [tab, setTab] = useState("overview");

  const [form, setForm] = useState({
    ...initialForm,
  });

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [
    uploadingImage,
    setUploadingImage,
  ] = useState(false);

  const [deletingKey, setDeletingKey] =
    useState("");

  const [message, setMessage] =
    useState("");

  const [messageType, setMessageType] =
    useState("");

  async function loadDashboard() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/information",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        window.location.href =
          "/admin/signin";
        return;
      }

      setThemes(data.themes || []);
      setWeeklyNews(
        data.weeklyNews || []
      );
      setOutreaches(
        data.outreaches || []
      );
      setTestimonies(
        data.testimonies || []
      );
    } catch (error) {
      console.error(
        "LOAD_INFORMATION_DASHBOARD_ERROR:",
        error
      );

      setMessage(
        "Failed to load dashboard."
      );

      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const newTestimonies = useMemo(() => {
    return testimonies.filter(
      (testimony) =>
        testimony.status === "new"
    ).length;
  }, [testimonies]);

  async function updateTestimony(
    id,
    status
  ) {
    try {
      const response = await fetch(
        "/api/testimonies",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message ||
            "Failed to update testimony."
        );
        return;
      }

      setTestimonies((current) =>
        current.map((item) =>
          item._id === id
            ? {
                ...item,
                status,
              }
            : item
        )
      );
    } catch (error) {
      console.error(
        "UPDATE_TESTIMONY_ERROR:",
        error
      );

      alert(
        "Failed to update testimony."
      );
    }
  }

  async function deleteContent(
    resource,
    id,
    title
  ) {
    const resourceLabels = {
      theme: "theme of the month",
      news: "weekly news post",
      outreach: "mission or outreach",
    };

    const label =
      resourceLabels[resource] ||
      "post";

    const confirmed = window.confirm(
      `Delete "${title}"?\n\nThis ${label} will be permanently removed. This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    const key = `${resource}:${id}`;

    try {
      setDeletingKey(key);
      setMessage("");
      setMessageType("");

      const response = await fetch(
        "/api/admin/information",
        {
          method: "DELETE",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            resource,
            id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(
          data.message ||
            "Failed to delete post."
        );

        setMessageType("error");
        return;
      }

      if (resource === "theme") {
        setThemes((current) =>
          current.filter(
            (item) => item._id !== id
          )
        );
      }

      if (resource === "news") {
        setWeeklyNews((current) =>
          current.filter(
            (item) => item._id !== id
          )
        );
      }

      if (resource === "outreach") {
        setOutreaches((current) =>
          current.filter(
            (item) => item._id !== id
          )
        );
      }

      setMessage(
        data.message ||
          "Post deleted successfully."
      );

      setMessageType("success");

      // Reload so active theme changes are
      // reflected immediately.
      await loadDashboard();
    } catch (error) {
      console.error(
        "DELETE_CONTENT_ERROR:",
        error
      );

      setMessage(
        "Something went wrong while deleting the post."
      );

      setMessageType("error");
    } finally {
      setDeletingKey("");
    }
  }

  async function uploadImage(event) {
    const file =
      event.target.files?.[0];

    event.target.value = "";

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(file.type)
    ) {
      setMessage(
        "Only JPG, PNG and WEBP images are allowed."
      );

      setMessageType("error");
      return;
    }

    if (
      file.size >
      3 * 1024 * 1024
    ) {
      setMessage(
        "Image must not exceed 3 MB."
      );

      setMessageType("error");
      return;
    }

    try {
      setUploadingImage(true);
      setMessage("");
      setMessageType("");

      const uploadData =
        new FormData();

      uploadData.append(
        "image",
        file
      );

      const response = await fetch(
        "/api/admin/upload",
        {
          method: "POST",
          body: uploadData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(
          data.message ||
            "Failed to upload image."
        );

        setMessageType("error");
        return;
      }

      setForm((current) => ({
        ...current,
        image: data.image.url,
      }));

      setMessage(
        "Image uploaded successfully."
      );

      setMessageType("success");
    } catch (error) {
      console.error(
        "IMAGE_UPLOAD_ERROR:",
        error
      );

      setMessage(
        "Something went wrong while uploading the image."
      );

      setMessageType("error");
    } finally {
      setUploadingImage(false);
    }
  }

  function removeUploadedImage() {
    setForm((current) => ({
      ...current,
      image: "",
    }));

    setMessage("");
    setMessageType("");
  }

  async function createContent(event) {
    event.preventDefault();

    if (uploadingImage) {
      setMessage(
        "Please wait for the image upload to finish."
      );

      setMessageType("error");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setMessageType("");

      const response = await fetch(
        "/api/admin/information",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        setMessage(
          data.message ||
            "Failed to create content."
        );

        setMessageType("error");
        return;
      }

      setForm({
        ...initialForm,
      });

      await loadDashboard();

      setMessage(
        "Church update published successfully."
      );

      setMessageType("success");
    } catch (error) {
      console.error(
        "CREATE_INFORMATION_ERROR:",
        error
      );

      setMessage(
        "Failed to publish update."
      );

      setMessageType("error");
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/";
  }

  return (
    <main className="min-h-screen bg-[#fff7fb]">
      <header className="sticky top-0 z-30 border-b border-[#FF0080]/10 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
          <div className="min-w-0">
            <p className="truncate text-xs font-black uppercase tracking-[0.18em] text-[#FF0080]">
              Information Administration
            </p>

            <h1 className="mt-1 truncate text-xl font-black">
              Welcome, {adminName}
            </h1>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            {adminRole ===
            "super_admin" ? (
              <Link
                href="/admin/prayers"
                className="hidden rounded-full border border-[#FF0080] px-5 py-3 text-sm font-black text-[#FF0080] transition hover:bg-[#FF0080] hover:text-white sm:inline-flex"
              >
                Prayer Dashboard
              </Link>
            ) : null}

            <button
              type="button"
              onClick={logout}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#25131d] px-4 text-sm font-black text-white transition hover:bg-[#FF0080] sm:px-5"
            >
              <LogOut className="size-4" />

              <span className="hidden sm:inline">
                Logout
              </span>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">
        <nav className="flex gap-2 overflow-x-auto rounded-2xl bg-white p-2 shadow-sm">
          {[
            ["overview", "Content"],
            [
              "testimonies",
              `Testimonies (${newTestimonies})`,
            ],
            ["create", "Add Update"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setTab(value);
                setMessage("");
                setMessageType("");
              }}
              className={`shrink-0 rounded-xl px-5 py-3 text-sm font-black transition ${
                tab === value
                  ? "bg-[#FF0080] text-white"
                  : "text-[#705c67] hover:bg-[#fff1f8]"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {message ? (
          <div
            className={`mt-5 flex items-start justify-between gap-4 rounded-2xl border p-4 text-sm font-bold ${
              messageType === "success"
                ? "border-green-200 bg-green-50 text-green-700"
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
              <LoaderCircle className="mx-auto size-8 animate-spin text-[#FF0080]" />

              <p className="mt-4 font-black text-[#FF0080]">
                Loading dashboard...
              </p>
            </div>
          </div>
        ) : null}

        {!loading &&
        tab === "overview" ? (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                label="Themes"
                value={themes.length}
                icon={Sparkles}
              />

              <StatCard
                label="Weekly News"
                value={
                  weeklyNews.length
                }
                icon={Megaphone}
              />

              <StatCard
                label="Outreaches"
                value={
                  outreaches.length
                }
                icon={Heart}
              />

              <StatCard
                label="New Testimonies"
                value={
                  newTestimonies
                }
                icon={BookOpen}
              />
            </div>

            <div className="mt-8 grid gap-7 xl:grid-cols-3">
              <DashboardList
                title="Theme History"
                resource="theme"
                items={themes.map(
                  (item) => ({
                    id: item._id,
                    title: item.title,
                    subtitle:
                      item.monthLabel,
                    image: item.image,
                    badge: item.active
                      ? "Active"
                      : "",
                  })
                )}
                onDelete={deleteContent}
                deletingKey={
                  deletingKey
                }
              />

              <DashboardList
                title="Weekly News"
                resource="news"
                items={weeklyNews.map(
                  (item) => ({
                    id: item._id,
                    title: item.title,
                    subtitle:
                      item.excerpt,
                    image: item.image,
                  })
                )}
                onDelete={deleteContent}
                deletingKey={
                  deletingKey
                }
              />

              <DashboardList
                title="Upcoming Outreaches"
                resource="outreach"
                items={outreaches.map(
                  (item) => ({
                    id: item._id,
                    title: item.title,
                    subtitle:
                      item.location ||
                      "Location pending",
                    image: item.image,
                  })
                )}
                onDelete={deleteContent}
                deletingKey={
                  deletingKey
                }
              />
            </div>
          </>
        ) : null}

        {!loading &&
        tab === "testimonies" ? (
          <section className="mt-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#FF0080]">
                Testimony Inbox
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-[-0.04em]">
                Submitted testimonies
              </h2>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {testimonies.map(
                (item) => (
                  <article
                    key={item._id}
                    className="rounded-[26px] bg-white p-6 shadow-[0_14px_45px_rgba(255,0,128,0.08)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-black">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs font-bold text-[#8c7581]">
                          {new Date(
                            item.createdAt
                          ).toLocaleDateString(
                            "en-NG",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>

                      <StatusBadge
                        status={
                          item.status
                        }
                      />
                    </div>

                    <p className="mt-5 leading-7 text-[#705c67]">
                      {
                        item.testimony
                      }
                    </p>

                    <select
                      value={
                        item.status
                      }
                      onChange={(
                        event
                      ) =>
                        updateTestimony(
                          item._id,
                          event.target
                            .value
                        )
                      }
                      className="mt-6 h-11 w-full rounded-xl border border-[#eadde4] px-3 font-bold outline-none focus:border-[#FF0080]"
                    >
                      <option value="new">
                        New
                      </option>

                      <option value="reviewed">
                        Reviewed
                      </option>

                      <option value="published">
                        Published
                      </option>

                      <option value="archived">
                        Archived
                      </option>
                    </select>
                  </article>
                )
              )}

              {!testimonies.length ? (
                <div className="rounded-2xl bg-white p-10 text-center text-[#8c7581] md:col-span-2 xl:col-span-3">
                  No testimonies have
                  been submitted.
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {!loading &&
        tab === "create" ? (
          <form
            onSubmit={createContent}
            className="mt-8 rounded-[30px] bg-white p-6 shadow-[0_18px_60px_rgba(255,0,128,0.08)] sm:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-full bg-[#FF0080] text-white">
                <Plus className="size-5" />
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.17em] text-[#FFA500]">
                  New Content
                </p>

                <h2 className="text-2xl font-black">
                  Publish a church
                  update
                </h2>
              </div>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <Field label="Content Type">
                <select
                  value={
                    form.resource
                  }
                  onChange={(
                    event
                  ) => {
                    setForm(
                      (current) => ({
                        ...current,
                        resource:
                          event.target
                            .value,
                      })
                    );

                    setMessage("");
                    setMessageType("");
                  }}
                  className="input-style"
                >
                  <option value="news">
                    Weekly News
                  </option>

                  <option value="theme">
                    Theme of the Month
                  </option>

                  <option value="outreach">
                    Mission / Outreach
                  </option>
                </select>
              </Field>

              <Field label="Title">
                <input
                  value={form.title}
                  onChange={(
                    event
                  ) =>
                    setForm(
                      (current) => ({
                        ...current,
                        title:
                          event.target
                            .value,
                      })
                    )
                  }
                  placeholder="Enter update title"
                  className="input-style"
                  required
                />
              </Field>

              <Field
                label="Upload Image"
                className="md:col-span-2"
              >
                <div className="overflow-hidden rounded-[20px] border border-[#eadde4] bg-[#fffafd]">
                  {form.image ? (
                    <div className="relative">
                      <img
                        src={
                          form.image
                        }
                        alt="Church update preview"
                        className="h-[260px] w-full object-cover sm:h-[340px]"
                      />

                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-4 pt-16">
                        <div className="min-w-0">
                          <p className="font-black text-white">
                            Image
                            uploaded
                          </p>

                          <p className="mt-1 truncate text-xs font-semibold text-white/70">
                            Ready to
                            publish
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={
                            removeUploadedImage
                          }
                          disabled={
                            uploadingImage
                          }
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
                          : "cursor-pointer hover:bg-[#fff0f7]"
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={
                          uploadImage
                        }
                        disabled={
                          uploadingImage
                        }
                        className="hidden"
                      />

                      <span className="grid size-16 place-items-center rounded-full bg-[#fff0f7] text-[#FF0080]">
                        {uploadingImage ? (
                          <LoaderCircle className="size-7 animate-spin" />
                        ) : (
                          <ImagePlus className="size-7" />
                        )}
                      </span>

                      <span className="mt-4 text-base font-black text-[#25131d]">
                        {uploadingImage
                          ? "Uploading image..."
                          : "Choose image from device"}
                      </span>

                      <span className="mt-2 max-w-sm text-xs font-semibold leading-5 text-[#8c7581]">
                        Select a JPG, PNG
                        or WEBP image.
                        Maximum file size
                        is 3 MB.
                      </span>

                      {!uploadingImage ? (
                        <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FF0080] px-5 py-3 text-xs font-black text-white">
                          <UploadCloud className="size-4" />
                          Select Image
                        </span>
                      ) : null}
                    </label>
                  )}
                </div>
              </Field>

              {form.resource ===
              "theme" ? (
                <>
                  <Field label="Month Label">
                    <input
                      value={
                        form.monthLabel
                      }
                      onChange={(
                        event
                      ) =>
                        setForm(
                          (current) => ({
                            ...current,
                            monthLabel:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                      placeholder="June 2026"
                      className="input-style"
                      required
                    />
                  </Field>

                  <Field label="Scripture">
                    <input
                      value={
                        form.scripture
                      }
                      onChange={(
                        event
                      ) =>
                        setForm(
                          (current) => ({
                            ...current,
                            scripture:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                      placeholder="Example: Isaiah 40:31"
                      className="input-style"
                    />
                  </Field>
                </>
              ) : null}

              {form.resource ===
              "outreach" ? (
                <>
                  <Field label="Outreach Theme">
                    <input
                      value={
                        form.theme
                      }
                      onChange={(
                        event
                      ) =>
                        setForm(
                          (current) => ({
                            ...current,
                            theme:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                      placeholder="Enter outreach theme"
                      className="input-style"
                    />
                  </Field>

                  <Field label="Date">
                    <input
                      type="date"
                      value={
                        form.date
                      }
                      onChange={(
                        event
                      ) =>
                        setForm(
                          (current) => ({
                            ...current,
                            date:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                      className="input-style"
                    />
                  </Field>

                  <Field label="Location">
                    <input
                      value={
                        form.location
                      }
                      onChange={(
                        event
                      ) =>
                        setForm(
                          (current) => ({
                            ...current,
                            location:
                              event
                                .target
                                .value,
                          })
                        )
                      }
                      placeholder="Enter outreach location"
                      className="input-style"
                    />
                  </Field>
                </>
              ) : null}
            </div>

            {form.resource ===
            "news" ? (
              <>
                <Field
                  label="News Summary"
                  className="mt-5"
                >
                  <textarea
                    rows={4}
                    value={
                      form.excerpt
                    }
                    onChange={(
                      event
                    ) =>
                      setForm(
                        (current) => ({
                          ...current,
                          excerpt:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                    placeholder="Enter a short news summary"
                    className="input-style py-4"
                    required
                  />
                </Field>

                <Field
                  label="Full News Body"
                  className="mt-5"
                >
                  <textarea
                    rows={7}
                    value={
                      form.body
                    }
                    onChange={(
                      event
                    ) =>
                      setForm(
                        (current) => ({
                          ...current,
                          body:
                            event
                              .target
                              .value,
                        })
                      )
                    }
                    placeholder="Enter the complete news update"
                    className="input-style py-4"
                  />
                </Field>
              </>
            ) : null}

            {form.resource !==
            "news" ? (
              <Field
                label="Description"
                className="mt-5"
              >
                <textarea
                  rows={6}
                  value={
                    form.description
                  }
                  onChange={(
                    event
                  ) =>
                    setForm(
                      (current) => ({
                        ...current,
                        description:
                          event.target
                            .value,
                      })
                    )
                  }
                  placeholder="Enter the description"
                  className="input-style py-4"
                  required
                />
              </Field>
            ) : null}

            {form.resource ===
            "theme" ? (
              <Field
                label="Why People Should Stay Connected"
                className="mt-5"
              >
                <textarea
                  rows={5}
                  value={
                    form.whyStayConnected
                  }
                  onChange={(
                    event
                  ) =>
                    setForm(
                      (current) => ({
                        ...current,
                        whyStayConnected:
                          event.target
                            .value,
                      })
                    )
                  }
                  placeholder="Explain why members should stay connected throughout the month"
                  className="input-style py-4"
                  required
                />
              </Field>
            ) : null}

            <button
              type="submit"
              disabled={
                saving ||
                uploadingImage
              }
              className="mt-7 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#FF0080] font-black text-white transition hover:bg-[#FFA500] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ||
              uploadingImage ? (
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
        ) : null}
      </div>

      <style jsx global>{`
        .input-style {
          width: 100%;
          min-height: 48px;
          border: 1px solid #eadde4;
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
          border-color: #ff0080;
          box-shadow: 0 0 0 4px
            rgba(255, 0, 128, 0.08);
        }
      `}</style>
    </main>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
}) {
  return (
    <article className="rounded-[24px] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-[#8c7581]">
            {label}
          </p>

          <p className="mt-2 text-4xl font-black">
            {value}
          </p>
        </div>

        <div className="grid size-12 place-items-center rounded-full bg-[#fff1f8] text-[#FF0080]">
          <Icon className="size-5" />
        </div>
      </div>
    </article>
  );
}

function DashboardList({
  title,
  resource,
  items,
  onDelete,
  deletingKey,
}) {
  return (
    <section className="rounded-[26px] bg-white p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-black">
          {title}
        </h2>

        <span className="rounded-full bg-[#fff0f7] px-3 py-1 text-xs font-black text-[#FF0080]">
          {items.length}
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {items.map((item) => {
          const itemKey = `${resource}:${item.id}`;

          const deleting =
            deletingKey === itemKey;

          return (
            <article
              key={item.id}
              className="rounded-2xl border border-[#f3e7ed] bg-[#fff8fc] p-3 transition hover:border-[#FF0080]/20 hover:bg-white"
            >
              <div className="flex items-start gap-3">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="size-16 shrink-0 rounded-xl object-cover sm:size-20"
                  />
                ) : (
                  <div className="grid size-16 shrink-0 place-items-center rounded-xl bg-[#fff0f7] text-[#FF0080] sm:size-20">
                    <ImagePlus className="size-5" />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="line-clamp-2 font-black">
                          {item.title}
                        </h3>

                        {item.badge ? (
                          <span className="rounded-full bg-green-100 px-2 py-1 text-[10px] font-black uppercase tracking-wide text-green-700">
                            {item.badge}
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#8c7581]">
                        {item.subtitle}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        onDelete(
                          resource,
                          item.id,
                          item.title
                        )
                      }
                      disabled={
                        Boolean(
                          deletingKey
                        )
                      }
                      className="grid size-10 shrink-0 place-items-center rounded-full border border-red-100 bg-white text-red-500 transition hover:border-red-600 hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                      aria-label={`Delete ${item.title}`}
                      title="Delete post"
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

        {!items.length ? (
          <p className="py-8 text-center text-sm font-bold text-[#8c7581]">
            No content yet.
          </p>
        ) : null}
      </div>
    </section>
  );
}

function StatusBadge({ status }) {
  const styles = {
    new: "bg-[#fff0f7] text-[#FF0080]",
    reviewed:
      "bg-orange-100 text-orange-700",
    published:
      "bg-green-100 text-green-700",
    archived:
      "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-black capitalize ${
        styles[status] ||
        "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function Field({
  label,
  children,
  className = "",
}) {
  return (
    <label
      className={`block ${className}`}
    >
      <span className="mb-2 block text-sm font-black">
        {label}
      </span>

      {children}
    </label>
  );
}
