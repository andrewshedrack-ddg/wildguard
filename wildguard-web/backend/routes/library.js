const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

router.get("/species/:name", async (req, res) => {
  const { name } = req.params;
  try {
    const response = await fetch(`https://api.gbif.org/v1/species?name=${encodeURIComponent(name)}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch species data" });
  }
});

module.exports = router;
