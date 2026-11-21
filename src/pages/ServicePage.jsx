import Connect from '../components/Connect.jsx';
import { Reveal, Shine, Title } from '../components/ui.jsx';
import { serviceBySlug, servicePages } from '../data/pages.js';
import { PageHero, ProjectCard, roleOf } from './parts.jsx';

export default function ServicePage({ route, onContact }) {
  const s = serviceBySlug[route.slug];
  const others = servicePages.filter((o) => o.slug !== s.slug);
  return (
    <>
      <PageHero crumbs={route.crumbs} kicker="Service" intro={s.intro} image={s.image} imageAlt={s.imageAlt}>
        {s.h1.map((t) => <span key={t} className="thin">{t} </span>)}
        <span className="shine shine--play book">{s.h1Shine}</span>
      </PageHero>

      <div className="page-body">
        <section className="scope">
          <div className="scope__head">
            <Reveal as="p" className="label thin">What&rsquo;s included</Reveal>
            <Title size="h2" thin={['From brief', 'to']} shine="handover" />
          </div>
          <ol className="scope__list">
            {s.scope.map(([title, text], i) => (
              <Reveal as="li" key={title} className="scope__item" delay={(i % 2) * 80}>
                <span className="label thin">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="scope__title">{title}</h3>
                <p className="body muted">{text}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="team-strip">
          <Reveal as="h2" className="label team-strip__label">Who leads it</Reveal>
          <ul className="team-strip__list">
            {s.team.map((name) => (
              <li key={name}>
                <span className="body strong">{name}</span>
                <span className="body muted">{roleOf(name)}</span>
              </li>
            ))}
          </ul>
          <a className="btn-link label" href="/#people">Meet the team ↗</a>
        </section>

        <section className="related">
          <Title size="h2" thin={['Projects that']} shine="show it" />
          <div className="related__grid">
            {s.projects.map((slug, i) => <ProjectCard key={slug} slug={slug} i={i} />)}
          </div>
        </section>

        <section className="also">
          <p className="label thin">Also from 4D-Scale</p>
          <ul>
            {others.map((o) => (
              <li key={o.slug}>
                <a className="h2 thin also__link" href={`/services/${o.slug}`}>
                  <Shine className="book">{o.name}</Shine> <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
            <li><a className="h2 thin also__link" href="/services">All services <span aria-hidden="true">↗</span></a></li>
          </ul>
        </section>

        <Connect onContact={onContact} />
      </div>
    </>
  );
}
