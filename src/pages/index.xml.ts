import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../consts';
import { excerpt, getPosts, postUrl } from '../lib/content';

export async function GET(context: APIContext) {
  const posts = (await getPosts()).filter((post) => !post.data.draft);
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.repo,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: excerpt(post),
      link: postUrl(post),
      categories: post.data.tags,
    })),
    customData: '<language>en-gb</language>',
  });
}
