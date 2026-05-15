# Deploying the Frontend to GitHub Pages

This repo includes an automated GitHub Actions workflow that publishes the static frontend in `app/static` to the `gh-pages` branch.

Quick steps you should run locally (from the repo root):

```bash
git add .
git commit -m "UI: KWS-like theme, sidebar, accordions, gh-pages workflow"
git push origin main
```

What the workflow does
- On push to `main` or `master`, `.github/workflows/deploy.yml` will run and publish `app/static` to `gh-pages` using `peaceiris/actions-gh-pages`.
- If you set a repository secret named `WG_API_BASE`, the workflow writes it into `app/static/WG_CONFIG.js` so the deployed site can reach your backend.

Repository secrets (optional but recommended)
- `WG_API_BASE`: Full backend base URL (e.g. `https://wildguard-live.onrender.com`).

Where to check progress
- GitHub Actions -> locate the `Deploy Static Site to GitHub Pages` workflow run and inspect logs.
- After success, GitHub Pages will serve from `gh-pages`; check Settings → Pages for the public URL.

Quick local preview of the static site
- Serve `app/static` locally (no backend required for layout/JS testing):

```bash
cd app/static
python -m http.server 8000
# open http://127.0.0.1:8000 in your browser
```

If your frontend needs the API during testing, set the backend base in your browser:

```js
localStorage.setItem('wg_api_base', 'https://your-backend.example');
location.reload();
```

Notes
- I can't push to your GitHub from here — you'll need to run the `git` commands above.
- If you want, I can prepare a PR branch instead (I will create files/commits and tell you the exact commands to push that branch).

Need help next?
- I can: create a short `README` in `app/static`, improve accessibility, or match exact screenshots you provide.

