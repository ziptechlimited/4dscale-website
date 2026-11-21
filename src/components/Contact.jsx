import { company, images, mapUrl, mottos, whatsappUrl } from '../data/content.js';
import ChapterCover from './ChapterCover.jsx';
import { Btn, Roll, Shine } from './ui.jsx';

const ext = { target: '_blank', rel: 'noopener noreferrer' };

function Channel({ label, children }) {
  return (
    <li className="channel">
      <p className="label thin channel__label">{label}</p>
      <div className="channel__value">{children}</div>
    </li>
  );
}

export default function Contact({ onContact }) {
  return (
    <section id="contact" className="chapter">
      <ChapterCover num="V" image={images.coverContact} alt="Finishing works on a 4D-Scale bungalow in Yelwa Shandam">
        where every <strong>build</strong> begins
      </ChapterCover>
      <div className="chapter__body">
        <section id="get-in-touch" className="connect" aria-labelledby="connect-title">
          <div className="connect__img">
            <span className="connect__letter" aria-hidden="true">4D</span>
            <img src={images.contact} alt="Interlocking paving being laid at a 4D-Scale site" loading="lazy" />
          </div>

          <div className="connect__main">
            <h2 id="connect-title" className="connect__title">
              <span className="h2 thin">Every build begins</span>
              <span className="connect__row">
                <span className="h2 thin">with a</span>
                <Shine className="h2 book">conversation</Shine>
              </span>
            </h2>

            <ul className="channels">
              <Channel label="WhatsApp">
                <a className="body strong" href={whatsappUrl()} {...ext}>
                  <Roll>{company.whatsapp.display}</Roll>
                </a>
                <span className="body muted">Chat with us</span>
              </Channel>
              <Channel label="Call">
                {company.phones.map((p) => (
                  <a key={p.tel} className="body strong" href={`tel:${p.tel}`}><Roll>{p.display}</Roll></a>
                ))}
              </Channel>
              <Channel label="Email">
                {company.emails.map((m) => (
                  <a key={m} className="body strong" href={`mailto:${m}`}><Roll>{m}</Roll></a>
                ))}
              </Channel>
              <Channel label="Offices">
                {company.offices.map((o) => (
                  <a key={o.area} className="office" href={mapUrl(o.address)} {...ext}
                    aria-label={`${o.area}${o.hq ? ' head office' : ' office'}: ${o.address}. Open in Google Maps`}>
                    <span className="body strong">{o.area}{o.hq && <span className="office__tag label">HQ</span>}</span>
                    <span className="body muted">{o.address}</span>
                    <span className="label thin office__map">Map ↗</span>
                  </a>
                ))}
              </Channel>
            </ul>

            <div className="connect__cta">
              <Btn href={whatsappUrl()} className="connect__wa" {...ext}>Chat on WhatsApp</Btn>
              <button type="button" className="btn-link label" onClick={onContact}>Send an enquiry</button>
            </div>
            <p className="label thin connect__motto">{mottos.measure}</p>
          </div>

          <div className="connect__word" aria-hidden="true">
            {'scale'.split('').map((ch, i) => <span key={i} style={{ '--i': i }}>{ch}</span>)}
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
