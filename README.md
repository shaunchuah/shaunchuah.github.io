# shaunchuah.github.io

Source for [shaunchuah.github.io](https://shaunchuah.github.io/), my personal site: writing, projects and publications.

Built with [Astro](https://astro.build/) and deployed to GitHub Pages by GitHub Actions on every push to `main`.

## Local development

Requires Node.js 22.12 or later.

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:4321. To check the production build:

```bash
npm run build
npm run preview
```

## Adding content

| What | Where |
| --- | --- |
| Post | `src/content/posts/<slug>.md`, served at `/posts/<slug>/` |
| Project | `src/content/projects/<slug>.md` (set `featured: true` to show it with a screenshot on the homepage) |
| Publication | `src/data/publications.yaml`, newest first (set `selected: true` to show it on the homepage) |
| Images for posts | `public/media/`, linked as `/media/<file>` |
| Project screenshots | `src/assets/projects/` |

Post front matter:

```yaml
---
title: 'Post title'
date: 2026-06-04T09:00:00Z
tags: ["agentic ai", "foundry120"]
description: Optional one-line summary for link previews and the RSS feed.
draft: false
---
```

Second-level headings (`##`) are numbered automatically and listed in the post's contents, so don't number them by hand.

## Structure

- `src/pages/` routes: home, writing, posts, tags, projects, publications, RSS (`/index.xml`)
- `src/layouts/Base.astro` page shell, metadata and analytics
- `src/components/` header, footer, post lists, project cards, publication entries
- `src/styles/global.css` the whole design: a 12-column grid with one red accent
- `src/content.config.ts` content schemas
