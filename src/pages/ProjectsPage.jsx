import Connect from '../components/Connect.jsx';
import { Reveal, Title } from '../components/ui.jsx';
import { record } from '../data/content.js';
import { projectPages } from '../data/pages.js';
import { PageHero, ProjectCard } from './parts.jsx';

export default function ProjectsPage({ route, onContact }) {
  return (
    <>
      <PageHero
        crumbs={route.crumbs}
        kicker="Projects"
        image={route.image}
        imageAlt={route.imageAlt}
        intro="Homes, a university auditorium, a fuel-station upgrade and a working farm — designed, managed and built by 4D-Scale."
      >
        <span className="thin">From drawing board to </span>
        <span className="shine shine--play book">ground</span>
      </PageHero>

      <div className="page-body">
        <section className="related related--all">
          <div className="related__grid">
            {projectPages.map((p, i) => <ProjectCard key={p.slug} slug={p.slug} i={i} />)}
          </div>
        </section>

        <section className="exp">
          <div className="exp__head">
            <Title size="h2" thin={['Experience that']} shine="precedes us" />
            <Reveal as="p" className="body muted">
              Before and alongside 4D-Scale, our Executive Director, Arc. Samuel Gayya, worked on these projects
              for the consultants named.
            </Reveal>
          </div>
          <ul className="exp__list">
            {record.map((r) => (
              <Reveal as="li" key={r.project} className="exp__item">
                <h3 className="body strong">{r.project}</h3>
                <p className="body muted">{r.location}</p>
                <p className="body muted">{r.role} · {r.consultant}{r.year ? ` · ${r.year}` : ''}</p>
              </Reveal>
            ))}
          </ul>
        </section>

        <Connect onContact={onContact} />
      </div>
    </>
  );
}
