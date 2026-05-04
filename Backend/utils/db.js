import mongoose from "mongoose";
import { User } from "../models/user.model.js";

const dropLegacyIndexes = async () => {
  try {
    const indexes = await User.collection.indexes();
    const legacy = ["pancard_1", "adharcard_1", "aadharcard_1"];
    for (const idx of indexes) {
      if (legacy.includes(idx.name)) {
        await User.collection.dropIndex(idx.name);
        console.log(`Dropped legacy index: ${idx.name}`);
      }
    }
  } catch (err) {
    console.warn("Could not check/drop legacy indexes:", err.message);
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
    await dropLegacyIndexes();
    await User.syncIndexes();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
