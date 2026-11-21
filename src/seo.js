import { company, services } from './data/content.js';

/** Schema.org structured data for search engines, built from the site's content. */
export function structuredData(siteUrl) {
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
    ],
  };
}
