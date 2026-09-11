import PhotoCredit from '../shared/PhotoCredit';
import TierCard from './TierCard';
import { photoSrc } from '../../lib/paths';

export default function CapsuleItem({ item }) {
  return (
    <div className="capsule-item">
      {item.photo ? (
        <div className="capsule-photo">
          <img src={photoSrc(item.photo)} alt={item.category} loading="lazy" />
          <PhotoCredit photo={item.photo} />
        </div>
      ) : null}
      <h4>{item.category}</h4>
      <p className="cap-bg">{item.background}</p>
      <div className="capsule-meta">
        <div>
          <div className="cap-label">Look For</div>
          <p>{item.lookFor}</p>
        </div>
        <div>
          <div className="cap-label">How To Wear It</div>
          <p>{item.pairing}</p>
        </div>
      </div>
      <div className="tier-grid">
        <TierCard label="Low" tier={item.tiers.low} />
        <TierCard label="Mid" tier={item.tiers.mid} />
        <TierCard label="High" tier={item.tiers.high} />
      </div>
    </div>
  );
}
