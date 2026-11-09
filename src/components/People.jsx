import { images, leaders, staff } from '../data/content.js';
import ChapterCover from './ChapterCover.jsx';
import { ParallaxImg, Reveal, Shine, Title } from './ui.jsx';

function Leader({ l, i }) {
  return (
    <Reveal as="article" className="leader" delay={i * 100}>
      <div className="leader__photo">
        {l.photo ? (
          <img src={l.photo} alt={`Portrait of ${l.name}`} loading="lazy" />
        ) : (
          <span className="leader__initials" aria-hidden="true">{l.initials}</span>
        )}
      </div>
      <p className="label thin">{l.title}</p>
      <h3 className="h2 thin">{l.name}</h3>
      <p className="body">{l.bio}</p>
      <ul className="leader__creds body">
        {l.creds.map((c) => <li key={c}>{c}</li>)}
      </ul>
    </Reveal>
  );
}

function StaffTable({ title, rows }) {
  return (
    <Reveal className="staff__col">
      <p className="label">{title}</p>
      <ul>
        {rows.map(([name, role]) => (
          <li key={name} className="staff__row body">
            <span>{name}</span>
            <span className="muted">{role}</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default function People() {
  return (
    <section id="people" className="chapter">
      <ChapterCover num="IV" image={images.coverPeople} alt="Mineral-fibre ceiling installation inside the Veritas University auditorium">
        the <strong>people</strong>
      </ChapterCover>
      <div className="chapter__body">
        <section className="people">
          <div className="people__head">
            <Reveal as="p" className="label thin">Where experience leads</Reveal>
            <Title thin={['Qualified', 'hands,', 'sound']} shine="judgement" />
            <Reveal as="p" className="label thin">and process <strong>delivers.</strong></Reveal>
          </div>
          <div className="leaders">
            {leaders.map((l, i) => <Leader key={l.name} l={l} i={i} />)}
          </div>
          <div className="staff">
            <StaffTable title="Executive staff" rows={staff.executive} />
            <StaffTable title="Technical staff" rows={staff.technical} />
          </div>
        </section>

        <section className="onsite">
          <ParallaxImg className="onsite__a" src={images.team1} alt="4D-Scale site engineer in hard hat and hi-vis vest" />
          <div className="onsite__text">
            <div className="h1 thin">With</div>
            <Shine as="div" className="h1 book">safety</Shine>
            <div className="onsite__row"><span className="h1 thin">&amp;</span><Shine className="h1 book">quality</Shine></div>
            <div className="h1 thin">on site.</div>
          </div>
          <ParallaxImg className="onsite__b" src={images.team2} alt="4D-Scale team member in branded hard hat on site" />
        </section>
      </div>
    </section>
  );
}
