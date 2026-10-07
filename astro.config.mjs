// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';
import { parse as parseYaml } from 'yaml';

const site = 'https://shaunchuah.github.io';

// Last-modified dates for the sitemap: a post's `updated` date, else its publish date. Other pages get
// none, since a guessed date is worse than no date. Git history can't be used: CI checks out one commit.
const postDir = new URL('./src/content/posts/', import.meta.url);
const lastmod = new Map(
  readdirSync(postDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const frontmatter = parseYaml(readFileSync(new URL(file, postDir), 'utf8').split(/^---$/m)[1]);
      const date = new Date(frontmatter.updated ?? frontmatter.date);
      return [`${site}/posts/${file.replace(/\.md$/, '')}/`, date.toISOString()];
    }),
);

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      serialize(item) {
        const date = lastmod.get(item.url);
        return date ? { ...item, lastmod: date } : item;
      },
    }),
  ],
  redirects: {
    '/archives': '/posts/',
    '/search': '/posts/',
    // Hugo category pages.
    '/categories': '/tags/',
    '/categories/web-development': '/tags/web-development/',
    // Tags retired when the tag list was consolidated.
    '/tags/agentic-ai': '/tags/ai/',
    '/tags/llms': '/tags/ai/',
    '/tags/medicine': '/tags/ai/',
    '/tags/foundry120': '/posts/building-the-research-operating-system/',
    '/tags/multi-omics': '/tags/data-engineering/',
    '/tags/django': '/tags/web-development/',
    '/tags/javascript': '/tags/web-development/',
    '/tags/python': '/tags/web-development/',
    '/tags/docker': '/tags/bioinformatics/',
    '/tags/cloud': '/tags/nextflow/',
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
  // Fonts come from npm packages, so builds never fetch them from a CDN.
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Schibsted Grotesk',
      cssVariable: '--font-sans',
      fallbacks: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-normal.woff2'],
            weight: '300 700',
            style: 'normal',
          },
          {
            src: ['@fontsource-variable/schibsted-grotesk/files/schibsted-grotesk-latin-wght-italic.woff2'],
            weight: '300 700',
            style: 'italic',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      fallbacks: ['ui-monospace', 'monospace'],
      options: {
        variants: [
          {
            src: ['@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2'],
            weight: 400,
            style: 'normal',
          },
        ],
      },
    },
  ],
});
