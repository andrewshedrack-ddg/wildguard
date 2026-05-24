const express = require("express");
const twilio = require("twilio");

const router = express.Router();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFrom = process.env.TWILIO_FROM;
const alertTo = process.env.ALERT_TO;

const client = accountSid && authToken ? twilio(accountSid, authToken) : null;

router.post("/send", async (req, res) => {
  const { species = "Unknown species", location = "Unknown location" } = req.body || {};

  const message = `WildGuard Alert: ${species} detected near ${location}. Deterrent activated.`;

  if (!client || !twilioFrom || !alertTo) {
    console.log(`[ALERT-MOCK] ${message}`);
    return res.json({ status: "Alert logged (mock mode)", message });
  }

  try {
    await client.messages.create({
      body: message,
      from: twilioFrom,
      to: alertTo,
    });

    return res.json({ status: "Alert sent successfully", message });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send alert" });
  }
});

module.exports = router;
