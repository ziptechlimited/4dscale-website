import { about, company, images, mottos, partners, services } from '../data/content.js';
import ChapterCover from './ChapterCover.jsx';
import { ParallaxImg, Reveal, Shine, Title } from './ui.jsx';

function Bio() {
  return (
    <section className="bio">
      <svg className="bio__mark" viewBox="0 0 320 220" aria-hidden="true">
        <path d="M150 10 20 210h260L150 10Zm0 70 70 105H80l70-105Z" fill="none" stroke="currentColor" strokeWidth="0.6" />
      </svg>
      <ParallaxImg className="bio__photo" src={images.about} alt="A completed 4D-Scale bungalow with landscaped forecourt in Yelwa Shandam" />
      <div className="bio__texts">
        <Title thin={['Vision, craft &']} shine="delivery" />
        <Reveal className="bio__copy body">
          {about.paragraphs.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}
        </Reveal>
        <Reveal className="bio__sig label" delay={120}>
          <span>Est. {company.incorporated}</span>
          <span>RC {company.rc}</span>
        </Reveal>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="services">
      <div className="services__head">
        <Reveal as="p" className="label thin">What we do</Reveal>
        <Title thin={['One firm,', 'eight']} shine="disciplines" />
      </div>
      <ol className="services__list">
        {services.map((s, i) => (
          <Reveal as="li" key={s} className="services__item" delay={(i % 4) * 70}>
            <span className="label thin">{String(i + 1).padStart(2, '0')}</span>
            <span className="h2 thin">{s}</span>
          </Reveal>
        ))}
      </ol>
      <Reveal as="blockquote" className="services__motto">&ldquo;{mottos.mind}&rdquo;</Reveal>
    </section>
  );
}

function Ticker() {
  const track = (hidden) => (
    <ul className="ticker__track" aria-hidden={hidden || undefined}>
      {partners.map((p) => <li key={p} className="ticker__item">{p}</li>)}
    </ul>
  );
  return (
    <section className="ticker" aria-label="Firms our directors have worked and partnered with">
      <p className="label thin ticker__label">Firms our directors have worked &amp; partnered with</p>
      <div className="ticker__rail">
        {track(false)}
        {track(true)}
      </div>
    </section>
  );
}

function Based() {
  return (
    <section className="based">
      <div className="based__titles">
        <Shine as="div" className="based__t based__t--1">Karu</Shine>
        <Reveal className="based__t based__t--2">Nyanya</Reveal>
        <Reveal className="based__t based__t--3" delay={120}>Mbora</Reveal>
      </div>
      <div className="based__subs label thin">
        <Reveal as="p" className="based__s1">HQ in</Reveal>
        <Reveal as="p" className="based__s2">with offices in</Reveal>
        <Reveal as="p" className="based__s3">Our reach is <strong>nationwide</strong></Reveal>
      </div>
      <Reveal className="based__descr body">
        <p>
          From private residences and farm estates to fuel stations, university auditoriums and federal institutions,
          we take on building, civil, electrical and mechanical works across the FCT and beyond.
        </p>
        <p className="muted">We have served, and continue to serve:</p>
        <ul className="based__clients">
          {about.clients.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </Reveal>
    </section>
  );
}

export default function About() {
  return (
    <section id="about" className="chapter">
      <ChapterCover num="I" image={images.coverAbout} alt="Abstract glass facade">
        who we <strong>are</strong>
      </ChapterCover>
      <div className="chapter__body">
        <Bio />
        <Services />
        <Ticker />
        <Based />
      </div>
    </section>
  );
}
