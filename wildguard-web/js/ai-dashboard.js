const feed = document.querySelector("#camera-feed img");
const scanResults = document.getElementById("scan-results");

const sampleDetections = ["Elephant", "African Lion", "Leopard", "Giraffe"];
let idx = 0;

async function analyzeFrame() {
  const detected = sampleDetections[idx % sampleDetections.length];
  idx += 1;

  scanResults.textContent = `Detected: ${detected} - Risk Zone: High`;

  try {
    await fetch("/alerts/send", {
      method: "POST",
      body: JSON.stringify({ species: detected, location: "Field Zone A" }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Alert send failed:", err);
  }
}

if (feed) {
  setInterval(analyzeFrame, 5000);
}
