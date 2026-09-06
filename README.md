# Maxwell Education — Website

A Vite + React + Tailwind CSS project, set up to auto-deploy to **GitHub
Pages** every time you push to `main`.

## 1. Run it locally (optional, to preview before publishing)

```bash
npm install
npm run dev
```

## 2. Before you publish — 2 things to replace

- **Certificate images**: `public/assets/credentials/*.svg` are placeholders.
  Replace each file with the real scanned certificate (keep the same
  filename, or update the `image:` paths in `src/App.jsx` inside the
  `CredentialsWall` component).
- **Domain in structured data**: `src/App.jsx` has a `SCHEMA_ORG_JSONLD`
  object near the top using `maxwelleducation.example` as a placeholder.
  Once GitHub Pages gives you a real URL (step 4 below), swap it in here.

## 3. Push to GitHub

Create a new **public** repository on GitHub first (empty, no README), then:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

## 4. Turn on GitHub Pages (one-time setup)

1. On GitHub, open your repo → **Settings** → **Pages** (left sidebar).
2. Under "Build and deployment" → **Source**, choose **GitHub Actions**.
3. That's it — don't pick a branch/folder option, the workflow handles it.

The moment you pushed in step 3, the workflow in
`.github/workflows/deploy.yml` already ran automatically (check the
**Actions** tab on GitHub to watch it build). Once it finishes and Pages
is turned on, your site is live at:

```
https://<your-username>.github.io/<your-repo>/
```

(If you name the repo exactly `<your-username>.github.io`, it's served at
the root instead: `https://<your-username>.github.io/` — the workflow
detects this automatically, no config changes needed either way.)

## 5. Every future update

Just commit and push to `main` — the workflow rebuilds and redeploys
automatically. Nothing else to run.

```bash
git add .
git commit -m "Update site"
git push
```

## Project structure

```
├── .github/workflows/deploy.yml   ← builds + deploys to GitHub Pages on push
├── index.html
├── package.json / vite.config.js / tailwind.config.js / postcss.config.js
├── public/
│   └── assets/credentials/        ← certificate images go here
└── src/
    ├── main.jsx                   ← React entry point
    ├── index.css                  ← Tailwind directives
    └── App.jsx                    ← the whole website (single component file)
```

## Troubleshooting

- **Actions tab shows a red ❌**: click into the failed run to see the
  error — usually a typo introduced while editing `src/App.jsx`.
- **Page loads but with no styling**: hard-refresh (styles are
  cache-busted per deploy, but browsers can be stubborn). If it persists,
  check that the Pages source is set to "GitHub Actions" and not "Deploy
  from a branch".
- **Custom domain**: Settings → Pages → "Custom domain" — GitHub gives
  you the DNS records to add at your domain registrar.
