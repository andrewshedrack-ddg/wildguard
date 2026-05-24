# WildGuard Web

This folder contains a standalone WildGuard web structure:

- Frontend pages: `index.html`, `dashboard.html`, `library.html`, `admin.html`
- Global CSS: `css/style.css`
- Frontend JS: `js/script.js`, `js/ai-dashboard.js`, `js/admin.js`, `js/library.js`
- Assets: `assets/images`, `assets/icons`
- Backend: `backend/server.js` with modular routes and model placeholders

## Run Backend Locally

```powershell
cd wildguard-web/backend
npm install
npm start
```

Server runs on `http://localhost:3000`.

## Notes

- `alerts` route supports Twilio if environment vars are set:
  - `TWILIO_ACCOUNT_SID`
  - `TWILIO_AUTH_TOKEN`
  - `TWILIO_FROM`
  - `ALERT_TO`
- Without these vars, alerts run in mock mode and log to console.
- Replace sample SVG assets with real species photos when available.
