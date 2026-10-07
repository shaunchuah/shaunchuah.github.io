import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { excerpt, getPosts, postUrl } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = (await getPosts()).filter((post) => !post.data.draft);
  const site = (context.site ?? new URL(SITE.url)).href;
  return rss({
    title: SITE.title,
    description: SITE.description,
    site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: excerpt(post),
      // Full text, with root-relative links made absolute so feed readers can follow them.
      content: (post.rendered?.html ?? '').replace(/(href|src)="\//g, `$1="${site}`),
      link: postUrl(post),
      categories: post.data.tags,
    })),
    customData: '<language>en-gb</language>',
  });
}
