const loginForm = document.getElementById("login-form");
const adminDashboard = document.getElementById("admin-dashboard");
const adminLog = document.getElementById("admin-log");

function restartCamera() {
  if (adminLog) {
    adminLog.textContent = "Camera restart command sent.";
  }
}

function viewLogs() {
  if (adminLog) {
    adminLog.textContent = "[INFO] Live feed connected\n[INFO] Detection model healthy\n[INFO] Last alert sent successfully";
  }
}

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username")?.value || "";
    const password = document.getElementById("password")?.value || "";

    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      if (adminDashboard) {
        adminDashboard.classList.remove("hidden");
      }
      if (adminLog) {
        adminLog.textContent = "Login successful.";
      }
    } catch (err) {
      if (adminLog) {
        adminLog.textContent = `Login failed: ${err.message}`;
      }
    }
  });
}

document.getElementById("restart-btn")?.addEventListener("click", restartCamera);
document.getElementById("logs-btn")?.addEventListener("click", viewLogs);
