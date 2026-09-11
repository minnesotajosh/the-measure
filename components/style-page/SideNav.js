export default function SideNav({ hasGuidance }) {
  return (
    <nav className="side-nav" aria-label="Jump to section">
      <a href="#sec-essay" data-target="sec-essay">The Argument</a>
      <a href="#sec-trademarks" data-target="sec-trademarks">Trademarks</a>
      <a href="#sec-wardrobe" data-target="sec-wardrobe">The Wardrobe</a>
      {hasGuidance ? (
        <a href="#sec-guidance" data-target="sec-guidance">Do&apos;s &amp; Don&apos;ts</a>
      ) : null}
      <a href="#sec-dressing" data-target="sec-dressing">Dressing For It</a>
      <a href="#sec-lifestyle" data-target="sec-lifestyle">Beyond The Closet</a>
    </nav>
  );
}
