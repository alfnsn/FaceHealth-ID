const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const recommendationRoutes = require("./routes/recommendationRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
// connectDB();

const app = express();

// Routes
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request ke: ${req.url}`);
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.get("/", (req, res) => {
  res.send("Backend FaceHealt ID Berjalan...");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
