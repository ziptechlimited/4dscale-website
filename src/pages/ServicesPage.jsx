import Connect from '../components/Connect.jsx';
import { Reveal, Title } from '../components/ui.jsx';
import { mottos } from '../data/content.js';
import { serviceBySlug, serviceList } from '../data/pages.js';
import { PageHero } from './parts.jsx';

export default function ServicesPage({ route, onContact }) {
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        kicker="Services"
        image={route.image}
        imageAlt={route.imageAlt}
        intro="Architecture, project management and contracting under one roof, so the people who draw your building are accountable for how it is built, what it costs and when it is handed over."
      >
        <span className="thin">One firm, </span>
        <span className="shine shine--play book">eight disciplines</span>
      </PageHero>

      <div className="page-body">
        <section className="svc">
          {serviceList.map((s, i) => {
            const page = s.page && serviceBySlug[s.page];
            return (
              <Reveal as="article" key={s.name} className={`svc__item ${page ? 'svc__item--main' : ''}`} delay={(i % 2) * 80}>
                <span className="label thin svc__num">{String(i + 1).padStart(2, '0')}</span>
                <h2 className="svc__title">{page ? <a href={`/services/${page.slug}`}>{s.name} <span aria-hidden="true">↗</span></a> : s.name}</h2>
                <p className="body muted">{s.text}</p>
                {page && <img className="svc__img" src={page.image} alt={page.imageAlt} loading="lazy" />}
              </Reveal>
            );
          })}
        </section>
        <section className="svc-motto">
          <Title size="h2" thin={[mottos.mind]} />
        </section>
        <Connect onContact={onContact} />
      </div>
    </>
  );
}
