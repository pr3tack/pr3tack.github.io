# PR3TACK Website (GitHub Pages)

A minimal, fast static site for **PR3TACK — Preemptive Tactics & Countermeasures**.

## Quick Start (User/Org Pages)

1. Create a repository named **`your-username.github.io`** (or for orgs, `your-org.github.io`).
2. Copy the contents of this folder into that repo.
3. Commit & push to the **`main`** branch.
4. Visit `https://your-username.github.io` — it should be live within minutes.

## Quick Start (Project Pages)

If you prefer a project site (e.g., `your-org.github.io/pr3tack`):

1. Create a repository **`pr3tack`** under your user or org.
2. Copy this folder into the repo.
3. Enable GitHub Pages: *Settings → Pages* → Deploy from branch → **`main`** → `/ (root)`.
4. Optionally add the provided GitHub Actions workflow for auto-deploy on push (see `.github/workflows/pages.yml`).

## Local Preview

Any static file server will do:
```bash
python3 -m http.server 4000
# then open http://localhost:4000
```

## Editing the Matrix

- Data lives in **`/data/seed-matrix.json`**.
- Each entry is a JSON object with **tactic**, **technique**, **feasibility**, **defense**, and optional **rationale**, **status**, **last_updated**.
- The **Matrix** section dynamically renders from this JSON.

## Theming

- Auto light/dark via `prefers-color-scheme` with a manual toggle (stored in `localStorage`).
- Customize colors in `css/styles.css` under `:root`.

## License

- Code: MIT (see `LICENSE`)
- Content (JSON entries): CC BY 4.0 recommended (adjust as needed)
