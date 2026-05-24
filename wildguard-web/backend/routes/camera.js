const express = require("express");

const router = express.Router();

router.get("/feed", (_req, res) => {
  res.json({
    status: "ok",
    streamUrl: "http://esp32cam.local/stream",
    note: "Replace with deployed ESP32-CAM URL or relay endpoint",
  });
});

module.exports = router;
