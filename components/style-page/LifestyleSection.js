import PhotoCredit from '../shared/PhotoCredit';
import { photoSrc } from '../../lib/paths';
import { LIFE_LABELS, LIFE_GRID_ORDER, LIFE_LINKS } from '../../lib/life-links';

export default function LifestyleSection({ style }) {
  const travel = style.lifestyle.travel;
  const travelSrc = photoSrc(travel.photo, 'w=1200&h=900&q=80&auto=format&fit=crop');
  const travelParagraphs = travel.paragraphs || [travel];

  return (
    <>
      <div className="travel-feature">
        {travelSrc ? (
          <div className="life-photo">
            <img src={travelSrc} alt={`${style.name} — ${LIFE_LABELS.travel}`} loading="lazy" />
            <PhotoCredit photo={travel.photo} />
          </div>
        ) : null}
        <div className="life-label">{LIFE_LABELS.travel}</div>
        {travelParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <div className="lifestyle-grid">
        {LIFE_GRID_ORDER.map((k) => {
          const section = style.lifestyle[k];
          const paragraphs = section.paragraphs || [section];
          return (
            <div className="life-item" key={k}>
              <div className="life-label">{LIFE_LABELS[k]}</div>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              {k === 'reading' && section.magazines && section.magazines.length ? (
                <div className="magazine-links">
                  {section.magazines.map((m, i) => (
                    <span key={i}>
                      {i > 0 ? ' · ' : ''}
                      <a href={m.url} target="_blank" rel="noopener">
                        {m.name}
                      </a>
                    </span>
                  ))}
                </div>
              ) : null}
              {LIFE_LINKS[k] && section.query ? (
                <a className="life-link" href={LIFE_LINKS[k].build(section.query)} target="_blank" rel="noopener">
                  {LIFE_LINKS[k].label} →
                </a>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
}
