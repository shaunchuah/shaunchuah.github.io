import { SITE } from '../consts';
import { excerpt, type Post, postUrl } from './content';
import { ogImagePath } from './og';

// JSON-LD for search engines and AI agents. The Person is described in full on the home page;
// other pages refer back to it by @id.

const personId = new URL('/#person', SITE.url).href;

const personRef = { '@type': 'Person', '@id': personId, name: SITE.author, url: SITE.url };

export function homeSchema() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE.title,
      url: SITE.url,
      description: SITE.description,
      inLanguage: 'en-GB',
      author: { '@id': personId },
    },
    {
      '@context': 'https://schema.org',
      ...personRef,
      image: new URL('/shaun-chuah-headshot.jpg', SITE.url).href,
      email: `mailto:${SITE.email}`,
      honorificSuffix: 'MBChB MRCP(UK) MD',
      jobTitle: ['Clinical Senior Research Fellow', 'Honorary Consultant Gastroenterologist'],
      worksFor: [
        { '@type': 'CollegeOrUniversity', name: 'University of Glasgow', url: 'https://www.gla.ac.uk' },
        { '@type': 'MedicalOrganization', name: 'NHS Greater Glasgow and Clyde', url: 'https://www.nhsggc.scot' },
      ],
      alumniOf: { '@type': 'CollegeOrUniversity', name: 'University of Edinburgh' },
      knowsAbout: [
        'Inflammatory bowel disease',
        'Gastroenterology',
        'Translational research',
        'Clinical data infrastructure',
        'Artificial intelligence in medicine',
      ],
      sameAs: [SITE.orcid, SITE.github, SITE.x],
    },
  ];
}

export function postSchema(post: Post) {
  const url = new URL(postUrl(post), SITE.url).href;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.data.title,
    description: excerpt(post),
    url,
    mainEntityOfPage: url,
    datePublished: post.data.date.toISOString(),
    dateModified: (post.data.updated ?? post.data.date).toISOString(),
    image: new URL(ogImagePath(postUrl(post)), SITE.url).href,
    keywords: post.data.tags,
    inLanguage: 'en-GB',
    author: personRef,
  };
}
