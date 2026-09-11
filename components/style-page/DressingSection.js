import { VARIANT_ORDER, VARIANT_LABELS } from '../../lib/life-links';

export default function DressingSection({ style }) {
  return (
    <div className="life-grid">
      {VARIANT_ORDER.map((k) => (
        <div className="life-item" key={k}>
          <div className="life-label">{VARIANT_LABELS[k]}</div>
          <p>{style.variants[k]}</p>
        </div>
      ))}
    </div>
  );
}
