import { images, record } from '../data/content.js';
import ChapterCover from './ChapterCover.jsx';
import { Reveal, Shine, Title } from './ui.jsx';

const institutions = [
  'Central Bank of Nigeria',
  'ASUU National Secretariat',
  'Federal University Lokoja',
  'Veritas University',
];

function RecordCard({ r, i }) {
  return (
    <article className="rcard" style={{ '--i': i }}>
      <div className={`rcard__imgs rcard__imgs--${r.images.length}`}>
        {r.images.map((src) => <img key={src} src={src} alt={`${r.project} — ${r.location}`} loading="lazy" />)}
      </div>
      <div className="rcard__info">
        <p className="label thin">Project {String(i + 1).padStart(2, '0')} / {String(record.length).padStart(2, '0')}</p>
        <h3 className="h2 thin">{r.project}</h3>
        <dl className="rcard__meta body">
          <div><dt className="muted">Location</dt><dd>{r.location}</dd></div>
          <div><dt className="muted">Consultant</dt><dd>{r.consultant}</dd></div>
          <div><dt className="muted">Role</dt><dd>Samuel Gayya, {r.role}</dd></div>
          {r.year && <div><dt className="muted">Year</dt><dd>{r.year}</dd></div>}
        </dl>
      </div>
    </article>
  );
}

export default function Record() {
  return (
    <section id="record" className="chapter">
      <ChapterCover num="III" image={images.coverRecord} alt="The remodelled ASUU National Secretariat in Giri, FCT">
        a record of <strong>trust</strong>
      </ChapterCover>
      <div className="chapter__body">
        <section className="record">
          <div className="record__intro">
            <Title thin={['Experience', 'that']} shine="precedes" after={['us']} />
            <Reveal className="body record__lede">
              Before and alongside 4D-Scale, our Executive Director led renovation, remodelling and new-build
              work for federal institutions, universities and private clients &mdash; experience the company now
              brings to every site.
            </Reveal>
          </div>
          <div className="record__stack">
            {record.map((r, i) => <RecordCard key={r.project} r={r} i={i} />)}
          </div>
        </section>

        <section className="trusted">
          <Reveal className="label thin trusted__kicker">Where <strong>serious work</strong> finds its builders.</Reveal>
          <div className="trusted__title">
            <Title thin={['Trusted', 'by']} shine="institutions" />
          </div>
          <ul className="trusted__list">
            {institutions.map((name, i) => (
              <Reveal as="li" key={name} delay={i * 80} className="trusted__item">
                <span className="label thin">0{i + 1}</span>
                <Shine className="h2 book">{name}</Shine>
              </Reveal>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
