// Runs after `vite build`: writes the rendered page, structured data, robots.txt
// and sitemap.xml into dist/, so crawlers and link previews get real content.
import { readFile, rm, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';

const { VITE_SITE_URL } = loadEnv('production', process.cwd(), 'VITE_');
const site = (VITE_SITE_URL || '').replace(/\/$/, '');
if (!site) throw new Error('VITE_SITE_URL is not set (see .env)');

const { render, structuredData } = await import(pathToFileURL('dist-ssr/entry-server.js').href);
const file = 'dist/index.html';
let html = await readFile(file, 'utf8');

const appHtml = render();
const jsonLd = JSON.stringify(structuredData(site)).replace(/</g, '\\u003c');
html = html
  .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
  .replace('</head>', `  <script type="application/ld+json">${jsonLd}</script>\n  </head>`);
if (!html.includes(appHtml.slice(0, 80))) throw new Error('Prerender: #root placeholder not found');
await writeFile(file, html);

const today = new Date().toISOString().slice(0, 10);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`);
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${site}/</loc>
    <lastmod>${today}</lastmod>
    <image:image><image:loc>${site}/assets/img/hero.jpg</image:loc></image:image>
    <image:image><image:loc>${site}/assets/img/work-veritas-built.jpg</image:loc></image:image>
    <image:image><image:loc>${site}/assets/img/nnpc-finish-1.jpg</image:loc></image:image>
  </url>
</urlset>
`,
);

await rm('dist-ssr', { recursive: true, force: true });
console.log(`prerendered ${(appHtml.length / 1024).toFixed(0)} kB of HTML for ${site}`);
