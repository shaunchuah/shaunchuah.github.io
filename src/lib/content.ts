import { type CollectionEntry, getCollection } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', (post) => import.meta.env.DEV || !post.data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function postUrl(post: Post): string {
  return `/posts/${post.id}/`;
}

/** Matches Hugo's urlize so existing /tags/<slug>/ links keep working. */
export function tagSlug(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9_-]/g, '');
}

/** Tags merged by slug ("data engineering" and "data-engineering" are one tag). */
export function getTags(posts: Post[]): { slug: string; label: string; posts: Post[] }[] {
  const tags = new Map<string, { slug: string; label: string; posts: Post[] }>();
  for (const post of posts) {
    for (const label of post.data.tags) {
      const slug = tagSlug(label);
      const tag = tags.get(slug) ?? { slug, label: label.replace(/-/g, ' '), posts: [] };
      tag.posts.push(post);
      tags.set(slug, tag);
    }
  }
  return [...tags.values()].sort((a, b) => b.posts.length - a.posts.length || a.label.localeCompare(b.label));
}

export function readingMinutes(body = ''): number {
  const words = body.replace(/```[\s\S]*?```/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

/** Plain-text summary of a post for meta descriptions and the RSS feed. */
export function excerpt(post: Post, length = 170): string {
  if (post.data.description) return post.data.description;
  const firstParagraph =
    (post.body ?? '')
      .split(/\n\s*\n/)
      .map((block) => block.trim())
      .find((block) => block && !/^(#|```|>|!\[|<|\||-|\d+\.)/.test(block)) ?? '';
  const text = firstParagraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= length) return text;
  return `${text.slice(0, text.lastIndexOf(' ', length))}…`;
}

export function groupByYear(posts: Post[]): { year: number; posts: Post[] }[] {
  const groups = new Map<number, Post[]>();
  for (const post of posts) {
    const year = post.data.date.getUTCFullYear();
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups].map(([year, posts]) => ({ year, posts }));
}

/** 04.06 */
export function dayMonth(date: Date): string {
  const dd = String(date.getUTCDate()).padStart(2, '0');
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}`;
}

/** 4 June 2026 */
export function longDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** Oct 2025 */
export function monthYear(date: Date): string {
  return date.toLocaleDateString('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}
