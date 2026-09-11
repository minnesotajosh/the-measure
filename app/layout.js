import '../public/style.css';

export const metadata = {
  title: 'The Measure — A Style Diagnostic',
};

// Set before first paint so the page never flashes the system's dark theme
// -- this app defaults to light regardless of OS setting, remembering only
// an explicit choice the reader makes with the toggle.
const noFlashThemeScript = `(function(){
  try{
    var saved = localStorage.getItem('measure:theme');
    document.documentElement.setAttribute('data-theme', saved === 'dark' ? 'dark' : 'light');
  }catch(e){
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body>
        <div className="scroll-visual" id="scrollVisual" aria-hidden="true" hidden></div>
        <div className="page">{children}</div>
      </body>
    </html>
  );
}
