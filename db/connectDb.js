// lib/connectDB.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables.");
}

mongoose.set("strictQuery", true);

let cached = global.mongoose || { conn: null, promise: null };
global.mongoose = cached;

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    if (process.env.NODE_ENV === "development") {
      console.log("🟢 Connecting to MongoDB...");
    }

    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;

  if (process.env.NODE_ENV === "development") {
    console.log("✅ MongoDB connected.");
  }

  return cached.conn;
}

export default connectDB;