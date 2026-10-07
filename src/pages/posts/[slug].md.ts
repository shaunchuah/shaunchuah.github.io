import type { APIContext } from 'astro';
import { excerpt, getPosts, longDate, type Post, postUrl } from '../../lib/content';
import { SITE } from '../../consts';

// Plain Markdown copy of each post at /posts/<slug>.md, for AI agents and anyone who wants the source.

export async function getStaticPaths() {
  const posts = (await getPosts()).filter((post) => !post.data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export function GET({ props }: APIContext<{ post: Post }>) {
  const { post } = props;
  const { title, date, updated, tags } = post.data;
  const meta = [
    `By ${SITE.author}`,
    longDate(date),
    ...(updated ? [`Updated ${longDate(updated)}`] : []),
    ...(tags.length ? [tags.join(', ')] : []),
  ].join(' · ');
  const markdown = [
    `# ${title}`,
    meta,
    `> ${excerpt(post)}`,
    `Canonical: ${new URL(postUrl(post), SITE.url)}`,
    (post.body ?? '').trim(),
  ].join('\n\n');
  return new Response(`${markdown}\n`, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
