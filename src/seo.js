import { company, services } from './data/content.js';
import { projectBySlug, serviceBySlug } from './data/pages.js';

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const abs = (site, path) => (path.startsWith('http') ? path : `${site}${path}`);
const pageUrl = (site, route) => (route.path === '/' ? `${site}/` : `${site}${route.path}`);

/** <title>, description, canonical and link-preview tags for one page. */
export function headTags(route, site) {
  const url = pageUrl(site, route);
  const image = abs(site, route.image);
  const t = esc(route.title);
  const d = esc(route.description);
  return [
    `<title>${t}</title>`,
    `<meta name="description" content="${d}" />`,
    route.noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    route.noindex ? '' : '<meta name="robots" content="index, follow, max-image-preview:large" />',
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="4D-Scale Limited" />',
    '<meta property="og:locale" content="en_NG" />',
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:image" content="${image}" />`,
    route.image === '/og-image.jpg' ? '<meta property="og:image:width" content="1200" />\n    <meta property="og:image:height" content="630" />' : '',
    `<meta property="og:image:alt" content="${esc(route.imageAlt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    '<meta name="geo.region" content="NG-FC" />',
    '<meta name="geo.placename" content="Abuja" />',
  ].filter(Boolean).join('\n    ');
}

/** Schema.org structured data for search engines, built from the site's content. */
export function structuredData(siteUrl, route = { path: '/', kind: 'home', crumbs: [] }) {
  const url = `${siteUrl}/`;
  const address = (o) => ({
    '@type': 'PostalAddress',
    streetAddress: o.address.replace(/,\s*[^,]+,\s*FCT$/, ''),
    addressLocality: o.area,
    addressRegion: 'Federal Capital Territory',
    addressCountry: 'NG',
  });
  const [hq, ...branches] = company.offices;
  const [email] = company.emails;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'GeneralContractor',
        '@id': `${url}#organization`,
        name: company.name,
        alternateName: company.short,
        legalName: company.name,
        description:
          'Abuja-based architects, project managers and building contractors delivering design, project management and construction across Nigeria.',
        url,
        logo: `${siteUrl}/icon-512.png`,
        image: `${siteUrl}/og-image.jpg`,
        email,
        telephone: company.phones[0].tel,
        foundingDate: '2020-08-26',
        identifier: { '@type': 'PropertyValue', propertyID: 'CAC RC number', value: company.rc },
        address: address(hq),
        areaServed: [
          { '@type': 'AdministrativeArea', name: 'Federal Capital Territory, Nigeria' },
          { '@type': 'Country', name: 'Nigeria' },
        ],
        knowsAbout: ['Architecture', 'Design and build', ...services],
        contactPoint: [
          { '@type': 'ContactPoint', contactType: 'customer service', telephone: company.phones[0].tel, email, areaServed: 'NG', availableLanguage: 'English' },
        ],
        department: branches.map((o) => ({
          '@type': 'GeneralContractor',
          name: `${company.name} — ${o.area} office`,
          address: address(o),
          telephone: company.phones[0].tel,
        })),
      },
      {
        '@type': 'WebSite',
        '@id': `${url}#website`,
        url,
        name: company.name,
        publisher: { '@id': `${url}#organization` },
        inLanguage: 'en',
      },
      ...pageNodes(siteUrl, route),
    ],
  };
}

function pageNodes(site, route) {
  if (route.kind === 'home' || route.noindex) return [];
  const url = pageUrl(site, route);
  const org = { '@id': `${site}/#organization` };
  const nodes = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: route.title,
      description: route.description,
      isPartOf: { '@id': `${site}/#website` },
      about: org,
      primaryImageOfPage: abs(site, route.image),
      breadcrumb: { '@id': `${url}#breadcrumb` },
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [{ name: 'Home', path: '/' }, ...route.crumbs].map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.path === '/' ? `${site}/` : `${site}${c.path}`,
      })),
    },
  ];
  if (route.kind === 'service') {
    const s = serviceBySlug[route.slug];
    nodes.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: s.name,
      serviceType: s.name,
      description: s.description,
      provider: org,
      areaServed: { '@type': 'Country', name: 'Nigeria' },
      url,
    });
  }
  if (route.kind === 'project') {
    const p = projectBySlug[route.slug];
    nodes[0].mainEntity = {
      '@type': 'CreativeWork',
      name: p.name,
      description: p.description,
      creator: org,
      locationCreated: { '@type': 'Place', name: `${p.location}, Nigeria` },
      image: abs(site, p.image),
      ...(p.year ? { dateCreated: p.year } : {}),
    };
  }
  return nodes;
}
