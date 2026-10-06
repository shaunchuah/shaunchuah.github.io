import type { APIRoute } from 'astro';
import { getOgCards, type OgCard, renderOgCard } from '../../lib/og';

export async function getStaticPaths() {
  return (await getOgCards()).map((card) => ({ params: { card: card.key }, props: card }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await renderOgCard(props as OgCard)), {
    headers: { 'Content-Type': 'image/png' },
  });
