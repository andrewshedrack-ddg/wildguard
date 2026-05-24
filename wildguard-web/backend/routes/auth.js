const express = require("express");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  // Placeholder auth logic; replace with DB or OAuth as needed.
  if (username === "admin" && password === "admin123") {
    return res.json({ status: "ok", role: "admin" });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

module.exports = router;
