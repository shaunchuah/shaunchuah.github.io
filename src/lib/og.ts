import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import satori from 'satori';
import sharp from 'sharp';
import { getPosts, getTags, longDate, readingMinutes } from './content';

/** Share images are 1200 x 630, the size LinkedIn, X and Slack show as a large card. */
const WIDTH = 1200;
const HEIGHT = 630;

const INK = '#111111';
const INK_2 = '#3a3a3a';
const MUTED = '#6b6b6b';
const SOFT = '#8a8a8a';
const RED = '#d0261c';

export interface OgCard {
  /** Image path under /og/, without .png. Mirrors the page URL; the homepage is "index". */
  key: string;
  /** home: large photo and hero headline. page: title, with a small photo above the site address. */
  kind: 'home' | 'page';
  title: string;
  kicker?: string;
  meta?: string;
}

/** One card for every page that uses the Base layout, except the 404 page. */
export async function getOgCards(): Promise<OgCard[]> {
  const posts = await getPosts();
  const cards: OgCard[] = [
    { key: 'index', kind: 'home', title: 'Shaun Chuah' },
    { key: 'posts', kind: 'page', title: 'Writing' },
    { key: 'projects', kind: 'page', title: 'Projects' },
    { key: 'publications', kind: 'page', title: 'Publications' },
    { key: 'talks', kind: 'page', title: 'Talks & media' },
    { key: 'tags', kind: 'page', title: 'Tags', kicker: 'Writing' },
  ];
  for (const post of posts) {
    cards.push({
      key: `posts/${post.id}`,
      kind: 'page',
      title: post.data.title,
      kicker: 'Writing',
      meta: `${longDate(post.data.date)} · ${readingMinutes(post.body)} min read`,
    });
  }
  for (const tag of getTags(posts)) {
    cards.push({
      key: `tags/${tag.slug}`,
      kind: 'page',
      title: tag.label.charAt(0).toUpperCase() + tag.label.slice(1),
      kicker: 'Writing',
      meta: `${tag.posts.length} ${tag.posts.length === 1 ? 'post' : 'posts'}`,
    });
  }
  return cards;
}

/** The share image URL path for a page, matching getOgCards keys. */
export function ogImagePath(pathname: string): string {
  const key = pathname.replace(/^\/|\/$/g, '') || 'index';
  return `/og/${key}.png`;
}

// Satori takes React-style element objects; this keeps the layout readable without JSX.
type Node = { type: string; props: Record<string, unknown> };
type Child = Node | string | false | undefined;

function h(type: string, style: Record<string, unknown>, ...children: Child[]): Node {
  const kids = children.filter((child): child is Node | string => Boolean(child));
  // Satori treats any array as several children, so pass none or one directly.
  return { type, props: { style, children: kids.length > 1 ? kids : kids[0] } };
}

function img(src: string, size: number, style: Record<string, unknown>): Node {
  return { type: 'img', props: { src, width: size, height: size, style } };
}

function titleSize(title: string): number {
  if (title.length <= 28) return 84;
  if (title.length <= 50) return 72;
  if (title.length <= 80) return 60;
  return 52;
}

function frame(kicker: string | undefined, body: Node, avatar?: string): Node {
  return h(
    'div',
    {
      width: WIDTH,
      height: HEIGHT,
      display: 'flex',
      flexDirection: 'column',
      padding: '56px 72px 52px',
      background: '#ffffff',
      color: INK,
      fontFamily: 'Schibsted Grotesk',
    },
    h(
      'div',
      {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingBottom: 22,
        borderBottom: `3px solid ${INK}`,
        fontSize: 28,
        fontWeight: 600,
      },
      h('span', {}, 'Shaun Chuah'),
      kicker && h('span', { color: RED }, kicker),
    ),
    body,
    h(
      'div',
      { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
      avatar && img(avatar, 64, { borderRadius: 32, marginBottom: 14 }),
      h(
        'div',
        { display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', fontSize: 24, color: MUTED },
        h('span', {}, 'shaunchuah.github.io'),
        h('div', { width: 72, height: 8, background: RED }),
      ),
    ),
  );
}

function pageCard(card: OgCard, photo: string): Node {
  return frame(
    card.kicker,
    h(
      'div',
      { display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, paddingRight: 40 },
      h(
        'div',
        {
          fontSize: titleSize(card.title),
          fontWeight: 600,
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
        },
        card.title,
      ),
      card.meta && h('div', { marginTop: 28, fontSize: 28, color: MUTED }, card.meta),
    ),
    photo,
  );
}

function homeCard(photo: string): Node {
  return frame(
    undefined,
    h(
      'div',
      { display: 'flex', alignItems: 'center', flexGrow: 1 },
      img(photo, 200, { borderRadius: 100, marginRight: 52 }),
      h(
        'div',
        { display: 'flex', flexDirection: 'column' },
        h(
          'div',
          { display: 'flex', flexDirection: 'column', fontSize: 64, fontWeight: 600, lineHeight: 1.04, letterSpacing: '-0.03em' },
          h('span', {}, 'IBD gastroenterologist.'),
          h('span', { color: SOFT }, 'AI engineer.'),
        ),
        h(
          'div',
          { display: 'flex', flexDirection: 'column', marginTop: 26, fontSize: 22, lineHeight: 1.4, color: INK_2 },
          h('span', {}, 'Clinical Senior Research Fellow, University of Glasgow'),
          h('span', {}, 'Honorary Consultant Gastroenterologist, NHS Greater Glasgow and Clyde'),
        ),
      ),
    ),
  );
}

let fonts: { name: string; data: Buffer; weight: 400 | 500 | 600; style: 'normal' }[] | undefined;

async function loadFonts() {
  if (fonts) return fonts;
  const dir = join(process.cwd(), 'node_modules/@fontsource/schibsted-grotesk/files');
  const load = async (weight: 400 | 500 | 600) => ({
    name: 'Schibsted Grotesk',
    data: await readFile(join(dir, `schibsted-grotesk-latin-${weight}-normal.woff`)),
    weight,
    style: 'normal' as const,
  });
  fonts = await Promise.all([load(400), load(500), load(600)]);
  return fonts;
}

export async function renderOgCard(card: OgCard): Promise<Buffer> {
  const photo = await readFile(join(process.cwd(), 'src/assets/profile.jpg'));
  const src = `data:image/jpeg;base64,${photo.toString('base64')}`;
  const node = card.kind === 'home' ? homeCard(src) : pageCard(card, src);
  const svg = await satori(node as unknown as Parameters<typeof satori>[0], {
    width: WIDTH,
    height: HEIGHT,
    fonts: await loadFonts(),
  });
  return sharp(Buffer.from(svg)).png().toBuffer();
}
