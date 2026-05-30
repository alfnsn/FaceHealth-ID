const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbURI =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/facehealth_db";

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Terhubung: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.log("Server tetap berjalan dalam mode cadangan tanpa database.");
    process.exit(1);
  }
};

module.exports = connectDB;
