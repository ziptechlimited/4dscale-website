import { useEffect, useRef, useState } from 'react';
import { cases } from '../data/content.js';
import { Reveal, Title } from './ui.jsx';

const pad = (n) => String(n).padStart(2, '0');

function Phase({ c, p, k, setRef }) {
  return (
    <section id={`${c.id}-${k}`} ref={setRef} data-k={k} className="phase">
      <Reveal className="phase__head">
        <span className="phase__num h2 thin">{pad(k + 1)}</span>
        <div>
          <p className="label">{p.title}</p>
          <p className="body muted">{p.text}</p>
        </div>
      </Reveal>
      <Reveal className={`phase__imgs phase__imgs--${p.images.length}`} delay={120}>
        {p.images.map((src, j) => (
          <div key={src} className="phase__img">
            <img src={src} alt={`${c.project}, ${p.title.toLowerCase()} — photo ${j + 1}`} loading="lazy" />
          </div>
        ))}
      </Reveal>
    </section>
  );
}

function Case({ c, i }) {
  const [active, setActive] = useState(0);
  const phaseEls = useRef([]);

  // Highlight the phase crossing the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(Number(e.target.dataset.k))),
      { rootMargin: '-45% 0px -45% 0px' },
    );
    phaseEls.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <article className="case">
      <aside className="case__aside">
        <Reveal>
          <p className="label case__kicker">
            Project story {pad(i + 1)} / {pad(cases.length)} <span className="muted">· {c.scope}</span>
          </p>
          <h3 className="h2 thin case__title">{c.project}</h3>
          <p className="body muted">{c.location}</p>
          <p className="body case__summary">{c.summary}</p>
        </Reveal>
        <ol className="case__nav" aria-label={`${c.project} — stages`}>
          {c.phases.map((p, k) => (
            <li key={p.title} className={k === active ? 'is-active' : ''}>
              <a href={`#${c.id}-${k}`} className="label thin">
                <span>{pad(k + 1)}</span>
                {p.title}
              </a>
            </li>
          ))}
        </ol>
      </aside>
      <div className="case__phases">
        {c.phases.map((p, k) => (
          <Phase key={p.title} c={c} p={p} k={k} setRef={(el) => { phaseEls.current[k] = el; }} />
        ))}
      </div>
    </article>
  );
}

export default function Cases() {
  return (
    <section className="cases" aria-label="Project stories">
      <div className="cases__intro">
        <Title thin={['Inside', 'the']} shine="build" />
        <Reveal className="body cases__lede">
          Three projects followed <strong>stage by stage</strong> &mdash; from the ground we started on to
          the building we handed over.
        </Reveal>
      </div>
      {cases.map((c, i) => <Case key={c.id} c={c} i={i} />)}
    </section>
  );
}
