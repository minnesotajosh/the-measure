import Plate from '../shared/Plate';
import BrandLine from '../shared/BrandLine';

export default function SecondaryMatchTeaser({ style }) {
  return (
    <div className="sidebar">
      <div className="plate-wrap">
        <Plate style={style} size={160} />
      </div>
      <div className="section-title">Your Secondary Influence</div>
      <h3>{style.name}</h3>
      <p>{style.brief}</p>
      <div className="brandline">
        <BrandLine brands={style.brands} limit={5} />
      </div>
    </div>
  );
}
