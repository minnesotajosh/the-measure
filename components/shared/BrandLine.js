import { brandUrl } from '../../lib/brand-urls';

export default function BrandLine({ brands, limit }) {
  const list = limit ? brands.slice(0, limit) : brands;
  return (
    <>
      {list.map((b, i) => {
        const url = brandUrl(b);
        return (
          <span key={i}>
            {i > 0 ? '  •  ' : ''}
            {url ? (
              <a href={url} target="_blank" rel="noopener">
                <b>{b}</b>
              </a>
            ) : (
              <b>{b}</b>
            )}
          </span>
        );
      })}
    </>
  );
}
