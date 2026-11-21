import { leaders, staff } from '../data/content.js';
import { projectBySlug } from '../data/pages.js';
import { Reveal } from '../components/ui.jsx';

/** Photo header for inner pages: breadcrumbs, the page's <h1> and an intro line. */
export function PageHero({ crumbs, kicker, children, intro, image, imageAlt }) {
  return (
    <section id="top" className="page-hero">
      <img className="page-hero__img" src={image} alt={imageAlt} fetchpriority="high" />
      <div className="page-hero__shade" />
      <div className="page-hero__content">
        <Breadcrumbs crumbs={crumbs} />
        {kicker && <p className="label thin page-hero__kicker">{kicker}</p>}
        <h1 className="page-hero__title">{children}</h1>
        {intro && <p className="body page-hero__intro">{intro}</p>}
      </div>
    </section>
  );
}

export function Breadcrumbs({ crumbs }) {
  const trail = [{ name: 'Home', path: '/' }, ...crumbs];
  return (
    <nav className="crumbs label thin" aria-label="Breadcrumb">
      <ol>
        {trail.map((c, i) => (
          <li key={c.path}>
            {i < trail.length - 1 ? <a href={c.path}>{c.name}</a> : <span aria-current="page">{c.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Card linking to a project page. */
export function ProjectCard({ slug, i = 0 }) {
  const p = projectBySlug[slug];
  return (
    <Reveal as="article" className="pcard" delay={(i % 3) * 90}>
      <a href={`/projects/${p.slug}`} className="pcard__link">
        <div className="pcard__img"><img src={p.image} alt={p.imageAlt} loading="lazy" /></div>
        <p className="label pcard__meta">{p.scope}{p.year ? ` · ${p.year}` : ''}</p>
        <h3 className="pcard__title">{p.name} <span aria-hidden="true">↗</span></h3>
        <p className="body muted">{p.location}</p>
      </a>
    </Reveal>
  );
}

const people = [
  ...leaders.map((l) => [l.name, l.title]),
  ...staff.executive,
  ...staff.technical,
];
/** Job title for a team member, from the leaders and staff lists. */
export const roleOf = (name) => {
  const plain = (n) => n.replace(/^(Arc|Bld|Engr|QS)\.?\s+/, '').replace(/\s+[A-Z]\.\s+/, ' ');
  const hit = people.find(([n]) => n === name) ?? people.find(([n]) => plain(n) === plain(name));
  return hit ? hit[1] : '';
};
