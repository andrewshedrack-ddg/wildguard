const path = require("path");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const cameraRoutes = require("./routes/camera");
const alertsRoutes = require("./routes/alerts");
const libraryRoutes = require("./routes/library");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

app.use("/auth", authRoutes);
app.use("/camera", cameraRoutes);
app.use("/alerts", alertsRoutes);
app.use("/library", libraryRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "wildguard-web backend" });
});

app.listen(PORT, () => {
  console.log(`WildGuard backend running on port ${PORT}`);
});
