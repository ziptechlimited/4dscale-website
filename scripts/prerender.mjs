// Runs after `vite build`: writes one prerendered HTML file per page (with its
// own title, description, canonical, link-preview tags and structured data),
// plus 404.html, robots.txt and sitemap.xml, so crawlers get real content.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';

const { VITE_SITE_URL } = loadEnv('production', process.cwd(), 'VITE_');
const site = (VITE_SITE_URL || '').replace(/\/$/, '');
if (!site) throw new Error('VITE_SITE_URL is not set (see .env)');

const { render, routes, notFound, headTags, structuredData } = await import(
  pathToFileURL('dist-ssr/entry-server.js').href
);
const template = await readFile('dist/index.html', 'utf8');
const HEAD = /<title>[^<]*<\/title>\s*<!--page-head[^>]*-->/;
if (!HEAD.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('Prerender: placeholders missing from index.html');
}

// "/" -> dist/index.html, "/services/x" -> dist/services/x.html (served as /services/x).
const fileFor = (path) => (path === '/' ? 'dist/index.html' : `dist${path}.html`);

async function writePage(route, file) {
  const hero = route.kind === 'home' ? '/assets/img/hero.jpg' : route.image;
  const jsonLd = JSON.stringify(structuredData(site, route)).replace(/</g, '\\u003c');
  const html = template
    .replace(HEAD, () =>
      [
        headTags(route, site),
        `<link rel="preload" as="image" href="${hero}" fetchpriority="high" />`,
        `<script type="application/ld+json">${jsonLd}</script>`,
      ].join('\n    '),
    )
    .replace('<div id="root"></div>', () => `<div id="root">${render(route.path)}</div>`);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
}

for (const route of routes) await writePage(route, fileFor(route.path));
await writePage(notFound, 'dist/404.html');

const today = new Date().toISOString().slice(0, 10);
const loc = (path) => (path === '/' ? `${site}/` : `${site}${path}`);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .map(
    (r) => `  <url>
    <loc>${loc(r.path)}</loc>
    <lastmod>${today}</lastmod>
    <image:image><image:loc>${site}${r.kind === 'home' ? '/assets/img/hero.jpg' : r.image}</image:loc></image:image>
  </url>`,
  )
  .join('\n')}
</urlset>
`,
);

await rm('dist-ssr', { recursive: true, force: true });
console.log(`prerendered ${routes.length} pages + 404 for ${site}`);
