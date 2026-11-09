import { useEffect, useState } from 'react';
import { useOverlay } from '../hooks.js';
import { chapters, company, images } from '../data/content.js';
import { Btn, ContactBlock, Roll, Shine } from './ui.jsx';

export function Header({ menuOpen, onToggleMenu, onContact }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <a href="#top" className="header__logo" aria-label={`${company.name} — back to top`}>
        <img src={images.logo} alt="" />
      </a>
      <Btn className="header__cta" onClick={onContact}>Get in touch</Btn>
      <button
        type="button"
        className={`burger ${menuOpen ? 'burger--open' : ''}`}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={onToggleMenu}
      >
        <span /><span />
      </button>
    </header>
  );
}

export function Menu({ open, onClose }) {
  useOverlay(open, onClose);
  return (
    <div className={`overlay menu ${open ? 'overlay--open' : ''}`} aria-hidden={!open}>
      <div className="overlay__blur" onClick={onClose} />
      <nav className="menu__panel" aria-label="Chapters">
        <ul className="menu__nav">
          {chapters.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} className="menu__item" onClick={onClose} tabIndex={open ? 0 : -1}>
                <span className="label">chapter {c.num}</span>
                <span className="h2 thin"><Roll>{c.label}</Roll></span>
              </a>
            </li>
          ))}
        </ul>
        <ContactBlock className="menu__contact" />
        <p className="body muted menu__foot">© {new Date().getFullYear()} {company.name} · RC {company.rc}</p>
      </nav>
    </div>
  );
}

export function ContactModal({ open, onClose }) {
  useOverlay(open, onClose);
  const [form, setForm] = useState({ name: '', contact: '', project: '', message: '' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const subject = `Project enquiry${form.project ? ` — ${form.project}` : ''}`;
    const body = `Name: ${form.name}\nPhone / email: ${form.contact}\nProject type: ${form.project}\n\n${form.message}`;
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className={`overlay modal ${open ? 'overlay--open' : ''}`} aria-hidden={!open} role="dialog" aria-modal="true" aria-label="Contact 4D-Scale">
      <div className="overlay__blur" onClick={onClose} />
      <div className="modal__panel">
        <button type="button" className="modal__close" onClick={onClose} aria-label="Close" tabIndex={open ? 0 : -1}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.2" /></svg>
        </button>
        <div className="modal__head">
          <div className="h1 thin">Let&rsquo;s</div>
          <Shine as="div" className="h1 book">build</Shine>
          <div className="h1 thin">what&rsquo;s</div>
          <div className="h1 thin">next</div>
        </div>
        <div className="modal__body">
          <ContactBlock />
          <form className="form" onSubmit={submit}>
            <label className="field">
              <span className="label muted">Your name</span>
              <input required value={form.name} onChange={set('name')} autoComplete="name" />
            </label>
            <label className="field">
              <span className="label muted">Phone or email</span>
              <input required value={form.contact} onChange={set('contact')} />
            </label>
            <label className="field">
              <span className="label muted">Project type</span>
              <select value={form.project} onChange={set('project')}>
                <option value="">Select…</option>
                <option>Architectural design</option>
                <option>Design &amp; build</option>
                <option>Project management</option>
                <option>Renovation / remodelling</option>
                <option>Civil, electrical or mechanical works</option>
              </select>
            </label>
            <label className="field">
              <span className="label muted">Tell us about it</span>
              <textarea rows="3" value={form.message} onChange={set('message')} />
            </label>
            <Btn type="submit" className="form__submit">Send enquiry</Btn>
          </form>
        </div>
      </div>
    </div>
  );
}
