'use client';

import { useState } from 'react';

export default function ShareLinkButton({ url }) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      /* clipboard permission denied, insecure context, etc. */
    }
  }

  return (
    <button className="btn btn-ghost" onClick={handleClick}>
      {copied ? 'Copied!' : 'Copy Link to Share'}
    </button>
  );
}
