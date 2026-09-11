export default function TrademarksSection({ style }) {
  return (
    <ul className="trademarks">
      {style.trademarks.map((t, i) => (
        <li key={i}>{t}</li>
      ))}
    </ul>
  );
}
