import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

// "style" is the footer used on the generic style-profile pages and the
// styles index; "app" is the richer footer used on the home/quiz/results
// pages, which also carries the theme toggle.
export default function SiteFooter({ variant = 'style' }) {
  if (variant === 'app') {
    return (
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="footer-nav">
            <Link className="footer-link" href="/styles">
              Browse All Styles →
            </Link>
            <span className="footer-sep">·</span>
            <ThemeToggle />
          </div>
          <div className="colophon">
            The Measure — a style diagnostic, drafted for one reader at a time.
            <br />
            Your answers and result are saved to this browser only, never sent anywhere. Photography is
            AI-generated; see each style&apos;s page for details.
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="colophon">
          The Measure — a style diagnostic, drafted for one reader at a time. This page is one of 27 style
          profiles; <Link href="/styles">see them all</Link> or <Link href="/">take the quiz</Link> to find
          your own.
        </div>
      </div>
    </footer>
  );
}
