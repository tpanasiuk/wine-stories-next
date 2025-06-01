import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const options = {};

// ✅ Add global type extension
declare global {
  // In ES modules, globalThis is preferred
  interface GlobalThis {
    _mongoClientPromise?: Promise<MongoClient>;
  }
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// ✅ Optional logging
clientPromise
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

export default clientPromise;
