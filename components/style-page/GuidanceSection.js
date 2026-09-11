function GuidanceSide({ slug, label, paragraphs }) {
  return (
    <div className={`guidance-side guidance-${slug}`}>
      <div className="guidance-label">{label}</div>
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export default function GuidanceSection({ style }) {
  return (
    <div className="guidance-grid">
      <GuidanceSide slug="do" label="Do" paragraphs={style.guidance.dos} />
      <GuidanceSide slug="dont" label="Don't" paragraphs={style.guidance.donts} />
    </div>
  );
}
