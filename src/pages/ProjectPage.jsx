import { Case } from '../components/Cases.jsx';
import Connect from '../components/Connect.jsx';
import { Reveal, Title } from '../components/ui.jsx';
import { projectBySlug, projectPages, serviceBySlug } from '../data/pages.js';
import { PageHero, ProjectCard } from './parts.jsx';

export default function ProjectPage({ route, onContact }) {
  const p = projectBySlug[route.slug];
  const service = serviceBySlug[p.service];
  const others = projectPages.filter((o) => o.slug !== p.slug).slice(0, 3);
  const facts = [
    ['Location', p.location],
    ['Client', p.client],
    ['Scope', p.scope],
    ['Service', <a key="s" href={`/services/${service.slug}`}>{service.name} ↗</a>],
    p.year && ['Year', p.year],
  ].filter(Boolean);

  return (
    <>
      <PageHero crumbs={route.crumbs} kicker={`Project · ${p.location}`} intro={p.intro} image={p.image} imageAlt={p.imageAlt}>
        <span className="thin">{p.name}</span>
      </PageHero>

      <div className="page-body">
        <section className="facts">
          <dl className="facts__list">
            {facts.map(([k, v]) => (
              <div key={k}><dt className="label thin">{k}</dt><dd className="body">{v}</dd></div>
            ))}
          </dl>
        </section>

        {p.story && <Case c={p.story} kicker="Stage by stage" link={false} />}

        {p.gallery.length > 0 && (
          <section className="gallery">
            <Reveal as="h2" className="label thin">{p.story ? 'More from the project' : 'The project'}</Reveal>
            <div className={`gallery__grid gallery__grid--${Math.min(p.gallery.length, 4)}`}>
              {p.gallery.map((src, i) => (
                <figure key={src} className="gallery__img">
                  <img src={src} alt={`${p.name}, ${p.location} — photo ${i + 1}`} loading="lazy" />
                </figure>
              ))}
            </div>
          </section>
        )}

        <section className="related">
          <Title size="h2" thin={['More']} shine="projects" />
          <div className="related__grid">
            {others.map((o, i) => <ProjectCard key={o.slug} slug={o.slug} i={i} />)}
          </div>
          <a className="btn-link label related__all" href="/projects">All projects ↗</a>
        </section>

        <Connect onContact={onContact} />
      </div>
    </>
  );
}
