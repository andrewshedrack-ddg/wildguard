AI image generation helper
=========================

This document explains two quick ways to generate photorealistic wildlife images for the WildGuard site.

1) OpenAI Images API (if you have an API key)

Example cURL (replace `OPENAI_API_KEY`):

```bash
curl -s -X POST "https://api.openai.com/v1/images" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"prompt":"photorealistic African lion close-up, 16:9, high resolution","size":"1600x900"}' \
  | jq -r '.data[0].url' | xargs curl -s -o lion-1600x900.jpg
```

2) Replicate / Stable Diffusion (local or cloud)

Use your preferred SD endpoint; save output files into `wildguard-web/assets/images/` with names like `lion-hero.jpg`, `elephant-hero.jpg` and update `wildguard-web/js/script.js` to point to them.

3) Quick alternative: use Unsplash stock images without keys.

Example hero queries used by this project:

- https://source.unsplash.com/1600x900/?lion
- https://source.unsplash.com/1600x900/?elephant
- https://source.unsplash.com/1600x900/?leopard

Notes
-----
- If you want me to run generation for you, paste an API key here (only if you consent). Otherwise use the commands above locally.
- After images are saved to `wildguard-web/assets/images/` I can update the site to reference them and commit/push.
