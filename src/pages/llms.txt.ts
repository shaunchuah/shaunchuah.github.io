import { getCollection } from 'astro:content';
import { SITE } from '../consts';
import { excerpt, getPosts } from '../lib/content';

// An index of the site for AI agents (https://llmstxt.org). Built from the same content as the pages,
// so it stays current.

const abs = (path: string) => new URL(path, SITE.url).href;

export async function GET() {
  const posts = (await getPosts()).filter((post) => !post.data.draft);
  const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
  const publications = (await getCollection('publications')).sort((a, b) => a.data.order - b.data.order);
  const talks = (await getCollection('talks')).sort((a, b) => a.data.order - b.data.order);

  const text = `# ${SITE.title}

> ${SITE.description}

Shaun Chuah is a Clinical Senior Research Fellow at the University of Glasgow and Honorary Consultant Gastroenterologist at NHS Greater Glasgow and Clyde. Alongside clinical work in inflammatory bowel disease (IBD), he builds the software his research runs on, including Foundry120, a research data platform that tracks more than 30,000 samples, and ChatIBD, an AI guideline assistant for IBD clinicians.

Each post is also available as plain Markdown; the links below point to those copies.

## Writing

${posts.map((post) => `- [${post.data.title}](${abs(`/posts/${post.id}.md`)}): ${excerpt(post)}`).join('\n')}

## Projects

${projects.map((p) => `- [${p.data.title}](${p.data.url}): ${p.data.summary}`).join('\n')}

## Talks & media

${talks
  .map((t) => {
    const label = t.data.url ? `[${t.data.title}](${t.data.url})` : t.data.title;
    const kind = t.data.kind ? `${t.data.kind}, ` : '';
    return `- ${label}: ${kind}${t.data.event}, ${t.data.year}`;
  })
  .join('\n')}

## Publications

${publications
  .map((p) => `- [${p.data.title}](https://doi.org/${p.data.doi}): ${p.data.authors}. ${p.data.venue}, ${p.data.year}`)
  .join('\n')}

## Contact

- Email: ${SITE.email}
- ORCID: ${SITE.orcid}
- GitHub: ${SITE.github}
- X: ${SITE.x}

## Optional

- [Speaker bio and headshot](${abs('/talks/')})
- [RSS feed with full post text](${abs('/index.xml')})
`;
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
