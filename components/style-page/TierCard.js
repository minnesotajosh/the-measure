import { shopSearchUrl } from '../../lib/paths';

export default function TierCard({ label, tier }) {
  if (!tier) return null;
  return (
    <div className="tier-card">
      <div className="tier-label">{label}</div>
      <div className="tier-pick">{tier.pick}</div>
      <div className="tier-price">{tier.price}</div>
      <p className="tier-note">{tier.note}</p>
      <a className="tier-shop" href={shopSearchUrl(tier.pick)} target="_blank" rel="noopener">
        Shop this →
      </a>
    </div>
  );
}
