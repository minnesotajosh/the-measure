export default function EssaySection({ style }) {
  return (
    <div className="essay">
      {style.essay.map((p, i) => (
        <p key={i} className={i === 0 ? 'dropcap' : undefined}>
          {p}
        </p>
      ))}
    </div>
  );
}
