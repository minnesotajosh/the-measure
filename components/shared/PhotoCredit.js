export default function PhotoCredit({ photo }) {
  if (!photo) return null;
  if (photo.generated) {
    return <div className="photo-credit">AI-generated image</div>;
  }
  return (
    <div className="photo-credit">
      Photo by{' '}
      <a href={photo.profile} target="_blank" rel="noopener">
        {photo.credit}
      </a>{' '}
      on{' '}
      <a href="https://unsplash.com" target="_blank" rel="noopener">
        Unsplash
      </a>
    </div>
  );
}
