import { cases, images, works } from '../data/content.js';
import Cases from './Cases.jsx';
import ChapterCover from './ChapterCover.jsx';
import { ParallaxImg, Reveal, Shine, Title } from './ui.jsx';

const projectCount = new Set(works.map((w) => w.project)).size + cases.filter((c) => !c.inWorksGrid).length;

function WorkItem({ w, index }) {
  return (
    <figure className={`work work--${w.span}`}>
      {index === 0 && (
        <Reveal className="work__count">
          <p className="body"><strong>Selected</strong> works by 4D-Scale</p>
          <Shine as="div" className="h1 book">{String(projectCount).padStart(2, '0')}</Shine>
        </Reveal>
      )}
      <ParallaxImg src={w.src} alt={`${w.project}, ${w.location}`} />
      <figcaption className="work__cap">
        <span className="label">{w.note ? `${w.note} · ` : ''}{w.year}</span>
        <span className="body">{w.project}</span>
        <span className="body muted">{w.location} · Design &amp; Build</span>
      </figcaption>
      {w.text && (
        <Reveal className="work__text">
          <Shine as="div" className="h2 book">{w.text[0]}</Shine>
          <div className="h2 thin">{w.text[1]}</div>
          <div className="h2 thin">{w.text[2]}</div>
        </Reveal>
      )}
    </figure>
  );
}

export default function Works({ onContact }) {
  return (
    <section id="works" className="chapter">
      <ChapterCover num="II" image={images.coverWorks} alt="A 4D-Scale bungalow with a curved lawn and paved walkway">
        designed &amp; <strong>built by us</strong>
      </ChapterCover>
      <div className="chapter__body">
        <section className="works">
          <Title className="works__title" thin={['From', 'drawing', 'board to']} shine="ground" />
          <div className="works__grid">
            {works.map((w, i) => <WorkItem key={w.src} w={w} index={i} />)}
          </div>
          <div className="works__more">
            <button type="button" className="btn-link label" onClick={onContact}>Discuss your project</button>
            <p className="label thin"><span className="works__dash" /> + 4 director-led projects in chapter III</p>
          </div>
        </section>

        <Cases />

        <section className="quote">
          <div className="quote__left">
            <Reveal className="label thin quote__words">
              <div>Qualitative,</div>
              <div>speedy &amp;</div>
              <div><strong>functional</strong></div>
            </Reveal>
            <ParallaxImg className="quote__photo" src={images.quote} alt="Crew installing mineral-fibre wall cladding at Veritas University" />
          </div>
          <Reveal as="blockquote" className="quote__text">
            Every project is measured against one standard: the client&rsquo;s requirement &mdash; met within a tight
            budget, without compromising on workmanship.
          </Reveal>
        </section>
      </div>
    </section>
  );
}
