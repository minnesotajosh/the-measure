import PhotoCredit from '../shared/PhotoCredit';
import BrandLine from '../shared/BrandLine';
import CapsuleItem from './CapsuleItem';
import { photoSrc } from '../../lib/paths';

export default function WardrobeSection({ style }) {
  return (
    <>
      {style.flatlay ? (
        <div className="shop-look-inline">
          <div className="shop-look-label">Shop The Look</div>
          <img src={photoSrc(style.flatlay)} alt={`${style.name} capsule wardrobe, flat-laid`} />
          <PhotoCredit photo={style.flatlay} />
        </div>
      ) : null}
      <div className="mini-title">The Brands</div>
      <div className="brandline">
        <BrandLine brands={style.brands} />
      </div>
      <div className="mini-title">The Capsule</div>
      <div className="capsule-list">
        {style.capsule.map((item, i) => (
          <CapsuleItem key={i} item={item} />
        ))}
      </div>
    </>
  );
}
