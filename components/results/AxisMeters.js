'use client';

import { useEffect, useState } from 'react';

function Meter({ meta, value }) {
  const [left, setLeft] = useState('50%'); // start centered, then glide to the real value

  useEffect(() => {
    const id = requestAnimationFrame(() => setLeft((value / 10) * 100 + '%'));
    return () => cancelAnimationFrame(id);
  }, [value]);

  return (
    <div className="meter">
      <div className="plabels">
        <span>{meta.poles[0]}</span>
        <b>{meta.label}</b>
        <span>{meta.poles[1]}</span>
      </div>
      <div className="track">
        <div className="dot" style={{ left }} />
      </div>
    </div>
  );
}

export default function AxisMeters({ AXES, AXIS_META, user }) {
  return (
    <div className="meters">
      {AXES.map((ax) => (
        <Meter key={ax} meta={AXIS_META[ax]} value={user[ax]} />
      ))}
    </div>
  );
}
