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
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Schibsted Grotesk',
      cssVariable: '--font-sans',
      weights: ['300 700'],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    },
    {
      provider: fontProviders.fontsource(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      weights: [400],
      subsets: ['latin'],
      fallbacks: ['ui-monospace', 'monospace'],
    },
  ],
});
