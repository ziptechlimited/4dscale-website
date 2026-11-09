import { useEffect, useState } from 'react';
import { company, images } from '../data/content.js';

const Arrow = () => (
  <svg className="scroll__arrow" viewBox="0 0 12 18" aria-hidden="true">
    <path d="M6 0v16M1 11l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1" />
  </svg>
);

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="top" className={`hero ${loaded ? 'hero--loaded' : ''}`}>
      {[1, 2, 3].map((n) => (
        <div key={n} className={`hero__img hero__img--${n}`}>
          <img src={images.hero} alt={n === 3 ? 'A completed private residence in Abuja' : ''} />
        </div>
      ))}
      <div className="hero__shade" />
      <div className="hero__content">
        <p className="label">{company.name}</p>
        <h1 className="hero__title">
          <span className="thin">Designed in three dimensions,</span>{' '}
          <span className="shine shine--play book">delivered in the fourth.</span>
        </h1>
        <p className="label thin hero__roles">
          {company.roles.map((r) => <span key={r}>{r}</span>)}
        </p>
      </div>
      <a className="scroll" href="#about">
        <Arrow />
        <span className="label">Scroll down</span>
        <span className="label thin">to begin the story</span>
        <Arrow />
      </a>
    </section>
  );
}
