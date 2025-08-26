// import mongoose from "mongoose";

// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) {
//     console.log("Already connected to the database");
//     return;
//   }
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("Connected to the database");
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//   }
// };
// export default connectDB;

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error("MONGO_URI not defined");

let cached = global.mongoose;

if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
