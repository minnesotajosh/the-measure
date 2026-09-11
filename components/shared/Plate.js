import PhotoCredit from './PhotoCredit';
import { photoSrc } from '../../lib/paths';

// A style's mood plate: its real photo, resized for how it's displayed, or
// (if it has none) a generated SVG monogram card using the style's palette.
export default function Plate({ style, size = 260, mode }) {
  if (style.photo && mode === 'wide') {
    const ww = Math.round(size * 1.6);
    const wh = Math.round((ww * 9) / 16);
    return (
      <>
        <img
          className="plate"
          src={photoSrc(style.photo, `w=${ww}&h=${wh}&q=80&auto=format&fit=crop`)}
          alt={`Mood photograph for ${style.name}`}
          loading="lazy"
        />
        <PhotoCredit photo={style.photo} />
      </>
    );
  }

  if (style.photo) {
    const w = Math.round(size * 2.4);
    const h = Math.round((w * 380) / 300); // matches the fallback plate's portrait ratio
    return (
      <>
        <img
          className="plate"
          src={photoSrc(style.photo, `w=${w}&h=${h}&q=80&auto=format&fit=crop`)}
          alt={`Mood photograph for ${style.name}`}
          width={size}
          loading="lazy"
        />
        <PhotoCredit photo={style.photo} />
      </>
    );
  }

  const pal = style.palette;
  return (
    <svg
      className="plate"
      viewBox="0 0 300 380"
      width={size}
      role="img"
      aria-label={`Mood plate for ${style.name}`}
    >
      <rect width="300" height="380" fill={pal[2]} />
      <polygon points="0,380 0,170 300,0 300,380" fill={pal[0]} />
      <polygon points="300,0 170,0 300,140" fill={pal[1]} />
      <rect x="10" y="10" width="280" height="360" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="1" />
      <text
        x="150"
        y="318"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="86"
        fill={pal[2]}
      >
        {style.monogram}
      </text>
    </svg>
  );
}
