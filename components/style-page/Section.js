export default function Section({ id, title, note, dataBg, last, children }) {
  return (
    <section className={'section-wrap' + (last ? ' last-section' : '')} id={id} data-bg={dataBg}>
      {title ? <div className="section-title">{title}</div> : null}
      <div className="content-block">
        {note ? <div className="section-note">{note}</div> : null}
        {children}
      </div>
    </section>
  );
}
