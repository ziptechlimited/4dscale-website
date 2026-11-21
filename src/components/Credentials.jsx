import { useEffect, useRef, useState } from 'react';
import { compliance, equipment, hse, images, stats } from '../data/content.js';
import { prefersReducedMotion, useInView } from '../hooks.js';
import { ParallaxImg, Reveal, Shine } from './ui.jsx';

function CountUp({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const from = to > 1000 ? to - 20 : 0;
  const [val, setVal] = useState(from);
  useEffect(() => {
    if (!inView) return;
    if (prefersReducedMotion()) { setVal(to); return; }
    let raf;
    const start = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - start) / 1400);
      const eased = 1 - Math.pow(1 - k, 3);
      setVal(Math.round(from + (to - from) * eased));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, from]);
  return <span ref={ref}>{val}</span>;
}

function Stats() {
  return (
    <section className="stats">
      <svg className="stats__union" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 150h1200M300 0v300M600 0v300M900 0v300" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>
      <div className="stats__items">
        {stats.map((s) => (
          <div key={s.label[0]} className="stat">
            <Shine as="div" className="stat__num"><CountUp to={s.value} /></Shine>
            <Reveal className="stat__label body">
              <strong>{s.label[0]}</strong>
              {s.label.slice(1).map((l) => <span key={l}><br />{l}</span>)}
            </Reveal>
          </div>
        ))}
      </div>
      <Reveal className="stats__descr body">
        <strong>Founded in 2020</strong>, built on the experience of directors who have delivered for federal
        institutions, universities and private clients. <strong>These numbers reflect a firm</strong> grounded in
        qualified people, honest budgets and careful workmanship.
      </Reveal>
    </section>
  );
}

function Capability() {
  const cols = [
    { title: 'Equipment — owned', items: equipment.owned },
    { title: 'Equipment — leased', items: equipment.leased },
    { title: 'Health, safety & environment', items: hse },
  ];
  return (
    <section className="capability">
      {cols.map((c, i) => (
        <Reveal key={c.title} className="capability__col" delay={i * 80}>
          <p className="label">{c.title}</p>
          <ul className="body">{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
        </Reveal>
      ))}
      <Reveal className="capability__col" delay={240}>
        <p className="label">Registration &amp; compliance</p>
        <ul className="body">
          {compliance.map((c) => (
            <li key={c.body}><span className="muted">{c.body}</span><br />{c.item}</li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/** Capability & credentials: closes chapter IV after the team. */
export default function Credentials() {
  return (
    <>
      <section className="promise">
        <ParallaxImg className="promise__img" src={images.capability} alt="Masons finishing the porch of a 4D-Scale bungalow" />
        <div className="promise__title">
          <div className="h1 thin">Designed,</div>
          <div className="h1 thin">managed</div>
          <div className="promise__row"><span className="h1 thin">&amp;</span><Shine className="h1 book">built</Shine></div>
        </div>
        <Reveal className="promise__descr body">
          <strong>Architecture</strong>, <strong>project management</strong> and <strong>contracting</strong> under
          one roof &mdash; so the people who draw your building are accountable for how it is built,
          what it costs and when it is handed over.
        </Reveal>
      </section>
      <Stats />
      <Capability />
    </>
  );
}
