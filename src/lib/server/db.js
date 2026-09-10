import mongoose from "mongoose";

const globalCache = globalThis;

if (!globalCache.churchMongooseCache) {
  globalCache.churchMongooseCache = {
    connection: null,
    promise: null,
  };
}

const cached = globalCache.churchMongooseCache;

export async function connectDB() {
  if (cached.connection) {
    return cached.connection;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  cached.connection = await cached.promise;

  return cached.connection;
}