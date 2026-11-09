import { useRef } from 'react';
import { useInView, useScrollFrame, clamp, prefersReducedMotion } from '../hooks.js';
import { company } from '../data/content.js';

/** Gold text with a light sweep on hover and once when it scrolls in. */
export function Shine({ as: Tag = 'span', className = '', children }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <Tag ref={ref} className={`shine ${inView ? 'shine--play' : ''} ${className}`}>
      {children}
    </Tag>
  );
}

/** Fades and lifts its children in when scrolled into view. */
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-in' : ''} ${className}`}
      style={{ '--delay': `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Text that rolls to a duplicate of itself on hover. */
export function Roll({ children }) {
  return (
    <span className="roll">
      <span className="roll__text">{children}</span>
      <span className="roll__text" aria-hidden="true">{children}</span>
    </span>
  );
}

const Corners = () => (
  <svg className="btn__corners" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 8V0h8M92 0h8v8M100 32v8h-8M8 40H0v-8" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
  </svg>
);

export function Btn({ children, onClick, href, type = 'button', className = '' }) {
  const inner = (
    <>
      <Corners />
      <Roll>{children}</Roll>
    </>
  );
  return href ? (
    <a className={`btn label ${className}`} href={href}>{inner}</a>
  ) : (
    <button type={type} className={`btn label ${className}`} onClick={onClick}>{inner}</button>
  );
}

/** Image that drifts slightly against the scroll direction. */
export function ParallaxImg({ src, alt, className = '', strength = 12 }) {
  const wrap = useRef(null);
  const imgRef = useRef(null);
  useScrollFrame(wrap, (r, vh) => {
    if (!imgRef.current || prefersReducedMotion()) return;
    const p = clamp((vh - r.top) / (vh + r.height));
    imgRef.current.style.transform = `translate3d(0, ${(p - 0.5) * -strength}%, 0) scale(1.18)`;
  });
  return (
    <div ref={wrap} className={`parallax ${className}`}>
      <img ref={imgRef} src={src} alt={alt} loading="lazy" />
    </div>
  );
}

/** Chapter heading lines: thin rows plus a gold "shine" word. */
export function Title({ thin = [], shine, after = [], size = 'h1', className = '' }) {
  return (
    <Reveal className={`title ${className}`}>
      {thin.map((t) => <div key={t} className={`${size} thin`}>{t}</div>)}
      {shine && <Shine as="div" className={`${size} book`}>{shine}</Shine>}
      {after.map((t) => <div key={t} className={`${size} thin`}>{t}</div>)}
    </Reveal>
  );
}

export function ContactBlock({ className = '' }) {
  return (
    <div className={`contact-block ${className}`}>
      <div className="contact-block__item">
        <p className="body muted">Phone</p>
        {company.phones.map((p) => (
          <a key={p.tel} className="body strong" href={`tel:${p.tel}`}><Roll>{p.display}</Roll></a>
        ))}
      </div>
      <div className="contact-block__item">
        <p className="body muted">Mail</p>
        <a className="body strong" href={`mailto:${company.email}`}><Roll>{company.email}</Roll></a>
      </div>
      <div className="contact-block__item">
        <p className="body muted">Offices</p>
        <p className="body strong">HQ in Karu, Abuja</p>
        <p className="body">Nyanya &amp; Mbora, FCT</p>
      </div>
    </div>
  );
}
