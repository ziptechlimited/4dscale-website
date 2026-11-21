import { useEffect, useState } from 'react';
import { useOverlay, useTheme } from '../hooks.js';
import { chapters, company, images, whatsappUrl } from '../data/content.js';
import { Btn, ContactBlock, Roll, Shine } from './ui.jsx';

const themeIcons = {
  auto: <path d="M12 3a9 9 0 1 0 0 18V3Z" fill="currentColor" />,
  light: (
    <g stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
    </g>
  ),
  dark: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />,
};
const nextMode = { auto: 'light', light: 'dark', dark: 'auto' };

// TEMPORARY: theme toggle for testing. Removing it (and its .theme-toggle CSS)
// leaves the site following the device's light/dark setting.
function ThemeToggle() {
  const [mode, cycle] = useTheme();
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycle}
      aria-label={`Theme: ${mode}. Switch to ${nextMode[mode]}`}
      title={`Theme: ${mode} (click for ${nextMode[mode]})`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        {mode === 'auto' && <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.3" />}
        {themeIcons[mode]}
      </svg>
    </button>
  );
}

export function Header({ menuOpen, onToggleMenu, onContact }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header ${scrolled || menuOpen ? 'header--solid' : ''}`}>
      <a href="#top" className="header__logo" aria-label={`${company.name} — back to top`}>
        <img className="header__mark--on-dark" src={images.logoMark} alt="" />
        <img className="header__mark--on-light" src={images.logoMarkLight} alt="" />
        <span className="header__wordmark" aria-hidden="true">
          <span className="header__name">4D-Scale</span>
          <span className="header__ltd">Limited</span>
        </span>
      </a>
      <Btn className="header__cta" onClick={onContact}>Get in touch</Btn>
      <div className="header__actions">
        <ThemeToggle />
        <button
          type="button"
          className={`burger ${menuOpen ? 'burger--open' : ''}`}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={onToggleMenu}
        >
          <span /><span />
        </button>
      </div>
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
              <a href={`#${c.target ?? c.id}`} className="menu__item" onClick={onClose} tabIndex={open ? 0 : -1}>
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

  const subject = `Project enquiry${form.project ? ` — ${form.project}` : ''}`;
  const body = `Name: ${form.name}\nPhone / email: ${form.contact}\nProject type: ${form.project}\n\n${form.message}`;

  const submit = (e) => {
    e.preventDefault();
    const [to, ...cc] = company.emails;
    window.location.href = `mailto:${to}?cc=${cc.join(',')}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  const sendWhatsApp = (e) => {
    if (!e.currentTarget.form.reportValidity()) return;
    window.open(whatsappUrl(`${subject}\n\n${body}`), '_blank', 'noopener');
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
            <div className="form__actions">
              <Btn type="submit" className="form__submit">Send by email</Btn>
              <button type="button" className="btn-link label" onClick={sendWhatsApp}>Send on WhatsApp</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
