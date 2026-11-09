import { useEffect, useRef, useState } from 'react';
import { company, compliance, equipment, hse, images, mottos, stats } from '../data/content.js';
import { prefersReducedMotion, useInView } from '../hooks.js';
import ChapterCover from './ChapterCover.jsx';
import { Btn, ContactBlock, ParallaxImg, Reveal, Shine } from './ui.jsx';

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

export default function Contact({ onContact }) {
  return (
    <section id="contact" className="chapter">
      <ChapterCover num="V" image={images.coverContact} alt="Finishing works on a 4D-Scale bungalow in Yelwa Shandam">
        where every <strong>build</strong> begins
      </ChapterCover>
      <div className="chapter__body">
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

        <section className="connect">
          <div className="connect__img">
            <span className="connect__letter" aria-hidden="true">4D</span>
            <img src={images.contact} alt="Interlocking paving being laid at a 4D-Scale site" loading="lazy" />
          </div>
          <div className="connect__title">
            <div className="h2 thin">Every</div>
            <div className="h2 thin">build</div>
            <div className="h2 thin">begins</div>
            <div className="connect__row"><span className="h2 thin">with a</span></div>
            <Shine as="div" className="h2 book">conversation</Shine>
          </div>
          <div className="connect__cta">
            <Btn onClick={onContact}>Get in touch</Btn>
            <p className="label thin connect__motto">{mottos.measure}</p>
          </div>
          <div className="connect__word" aria-hidden="true">
            {'scale'.split('').map((ch, i) => <span key={i} style={{ '--i': i }}>{ch}</span>)}
          </div>
          <ContactBlock className="connect__info" />
          <div className="connect__offices body">
            <p className="muted">Office addresses</p>
            {company.offices.map((o) => <p key={o.area}>{o.address}</p>)}
          </div>
          <footer className="footer body muted">
            <span>© {new Date().getFullYear()} {company.name}. All rights reserved.</span>
            <span>RC {company.rc} · Incorporated {company.incorporated}</span>
            <a href="#top">Back to top ↑</a>
          </footer>
        </section>
      </div>
    </section>
  );
}
