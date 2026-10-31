# Publish and maintain the roadmap

## GitHub Pages

The site is published from `dist/` using `.github/workflows/pages.yml`.

1. In the repository, open **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`, or open **Actions → Validate and publish roadmap → Run workflow**.
4. Wait for the validation and deployment jobs to succeed. The deployment environment records the public URL.

Public URL: <https://sohila-khaled-abbas.github.io/forward-deployed-engineer-roadmap/>

The workflow uses `contents: read`; only the deploy job receives `pages: write` and `id-token: write`. The `github-pages` environment binds the deployment. No personal access token, npm install, framework build, or custom domain is required.

## Validate a change

```bash
node scripts/docs.mjs
npm test
npm run check
npm run dev
```

Check search, stage/status filters, detail drawers, the next-topic button, local persistence, progress export/import, project diagrams, resource links, and keyboard navigation. Verify a narrow viewport when changing layout.

The integrity check verifies 36 unique topic IDs, 24 weeks, 216 total topic hours, valid resource references, prerequisite ordering, required assets, and JavaScript syntax. Progress tests reject malformed or incompatible imports.

## Recover a failed publish

- A validation failure prevents the deploy job. Open the failed job log, fix the source problem, and push a new commit.
- A Pages configuration error usually means the repository has not enabled GitHub Actions as its publishing source. Verify Settings → Pages before rerunning.
- For an incorrect published change, revert its Git commit and let the same workflow deploy the previous content. User progress stays in the browser as long as topic IDs and the site origin remain stable.
- Export progress before moving to a custom domain; browser storage does not move between origins.

## Hosting boundaries

The roadmap is public, static, and dependency-free. It has no analytics, sign-in, model calls, or backend database. Notes and progress live in browser storage and user-controlled JSON exports. Never put API keys or customer data into the site bundle, fixtures, notes, or source repository.

## Official references

- [Create a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)
- [Use custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
