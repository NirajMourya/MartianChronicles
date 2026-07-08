# Martian Chronicles

Martian Chronicles is a premium personal knowledge platform built with Next.js App Router, React, TypeScript, Material UI, and MDX.

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Material UI
- MDX + gray-matter + zod
- Fuse.js search with static build-time index

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run the app:

```bash
npm run dev
```

3. Open `http://localhost:3000`

## Build And Validation

The project generates a static search index before production builds.

```bash
npm run prebuild
npm run build
```

Or run a full production validation pass:

```bash
npm run validate:prod
```

## Production Routes

The app includes deployment-ready metadata and crawler routes:

- `/robots.txt` from app router metadata route
- `/sitemap.xml` with article and taxonomy URLs
- `/manifest.webmanifest`
- `/opengraph-image` and `/twitter-image` generated via `next/og`
- `/rss.xml`
- `/atom.xml`
- `/feed.json`

## Content Authoring

Content lives in the `content` directory as MDX files:

- `content/articles`
- `content/notes`
- `content/projects`
- `content/resources`
- `content/series`

Frontmatter is validated with zod. In production, malformed files are skipped with warnings to preserve uptime.

## Deployment Checklist

Use this checklist before deploying:

1. Run `npm run validate:prod`
2. Verify no draft content is unintentionally published
3. Verify canonical domain in `siteMetadata` is correct
4. Verify social preview images are accessible
5. Verify robots/sitemap/feed endpoints return valid responses

## Notes For Windows

If PowerShell script execution policy blocks npm scripts, run via cmd:

```bash
cmd /c npm run build
```
