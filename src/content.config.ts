import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { parse as parseYaml } from 'yaml';

const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      url: z.url(),
      urlLabel: z.string(),
      group: z.enum(['platforms', 'studies', 'community', 'teaching']),
      order: z.number(),
      featured: z.boolean().default(false),
      image: image().optional(),
      summary: z.string(),
    }),
});

const publications = defineCollection({
  // `order` keeps the hand-edited file order, so the newest paper stays first within a year.
  loader: file('./src/data/publications.yaml', {
    parser: (text) =>
      (parseYaml(text) as Record<string, unknown>[]).map((entry, order) => ({ ...entry, order })),
  }),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    doi: z.string(),
    selected: z.boolean().default(false),
    order: z.number(),
  }),
});

const talks = defineCollection({
  loader: file('./src/data/talks.yaml', {
    parser: (text) =>
      (parseYaml(text) as Record<string, unknown>[]).map((entry, order) => ({ ...entry, order })),
  }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    year: z.number(),
    note: z.string().optional(),
    order: z.number(),
  }),
});

export const collections = { posts, projects, publications, talks };
