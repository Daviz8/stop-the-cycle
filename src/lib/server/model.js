import { model, models, Schema } from "mongoose";

const AdminUserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    image: {
      type: String,
      default: "",
    },

    googleSub: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    role: {
      type: String,
      enum: ["information_admin", "prayer_admin", "super_admin"],
      required: true,
      index: true,
    },

    active: {
      type: Boolean,
      default: true,
      index: true,
    },

    lastLoginAt: Date,
  },
  { timestamps: true }
);

const ThemeSchema = new Schema(
  {
    monthLabel: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    scripture: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    whyStayConnected: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    active: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

const ChurchNewsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    excerpt: {
      type: String,
      required: true,
      trim: true,
    },

    body: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    publishedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },

    published: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

const OutreachSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    theme: {
      type: String,
      default: "",
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    date: {
      type: Date,
      index: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    published: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

const TestimonySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    testimony: {
      type: String,
      required: true,
      trim: true,
      maxlength: 250,
    },

    status: {
      type: String,
      enum: ["new", "reviewed", "published", "archived"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true }
);

const PrayerRequestSchema = new Schema(
  {
    prayer: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    status: {
      type: String,
      enum: ["new", "praying", "answered", "archived"],
      default: "new",
      index: true,
    },
  },
  { timestamps: true }
);

export const ChurchAdminModel =
  models.ChurchAdmin || model("ChurchAdmin", AdminUserSchema);

export const ThemeModel =
  models.ChurchTheme || model("ChurchTheme", ThemeSchema);

export const ChurchNewsModel =
  models.ChurchNews || model("ChurchNews", ChurchNewsSchema);

export const OutreachModel =
  models.ChurchOutreach || model("ChurchOutreach", OutreachSchema);

export const TestimonyModel =
  models.ChurchTestimony || model("ChurchTestimony", TestimonySchema);

export const PrayerRequestModel =
  models.ChurchPrayerRequest ||
  model("ChurchPrayerRequest", PrayerRequestSchema);