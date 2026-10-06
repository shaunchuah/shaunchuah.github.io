// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://shaunchuah.github.io',
  trailingSlash: 'always',
  integrations: [sitemap()],
  redirects: {
    '/archives': '/posts/',
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
