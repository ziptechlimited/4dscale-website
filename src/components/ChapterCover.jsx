import { useRef } from 'react';
import { clamp, prefersReducedMotion, useScrollFrame } from '../hooks.js';

/**
 * Full-screen sticky chapter opener. As it scrolls in, the image is revealed
 * through a soft ellipse that sweeps from the left, then the chapter body
 * slides up over it.
 */
export default function ChapterCover({ num, image, alt, children }) {
  const wrap = useRef(null);
  const cover = useRef(null);
  useScrollFrame(wrap, (r, vh) => {
    const p = prefersReducedMotion() ? 1 : clamp((vh - r.top) / (vh * 1.15));
    cover.current?.style.setProperty('--p', p.toFixed(4));
  });

  return (
    <div ref={wrap} className="cover-wrap">
      <div className="cover-sticky">
        <div ref={cover} className="cover">
          <img src={image} alt={alt} loading="lazy" />
          <div className="cover__shade" />
          <div className="cover__title label thin">
            <span className="cover__decor" aria-hidden="true" />
            <h2>{children}</h2>
          </div>
          <div className="cover__count label thin">chapter {num}</div>
        </div>
      </div>
    </div>
  );
}
