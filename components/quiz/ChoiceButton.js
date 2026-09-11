export default function ChoiceButton({ letter, text, onClick }) {
  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }
  return (
    <div className="choice" tabIndex={0} role="button" onClick={onClick} onKeyDown={handleKeyDown}>
      <span className="lab">{letter}.</span>
      <span>{text}</span>
    </div>
  );
}
