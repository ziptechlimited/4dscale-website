import { images } from '../data/content.js';
import ChapterCover from './ChapterCover.jsx';
import Connect from './Connect.jsx';

export default function Contact({ onContact }) {
  return (
    <section id="contact" className="chapter">
      <ChapterCover num="V" image={images.coverContact} alt="Finishing works on a 4D-Scale bungalow in Yelwa Shandam">
        where every <strong>build</strong> begins
      </ChapterCover>
      <div className="chapter__body">
        <Connect onContact={onContact} />
      </div>
    </section>
  );
}
