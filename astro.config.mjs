// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://shaunchuah.github.io',
  trailingSlash: 'always',
  integrations: [sitemap()],
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
