// Drives the two scroll-linked effects on a static style page: the
// background layer's opacity crossfades continuously with scroll position
// (see the comment in style.css above .section-wrap for the exact rule),
// and the side-nav highlights whichever section is currently in view.
//
// Previously this ~40 lines were regenerated verbatim into all 27 static
// style pages by build-pages.js. It's identical on every page -- only the
// per-page image data differs -- so it now lives here once, and each page
// just supplies its own image map via a small inline JSON script tag:
//
//   <script type="application/json" id="scrollImages">{"photo":"...", ...}</script>
//   <script src="../../scroll-effects.js"></script>
(function(){
  var dataEl = document.getElementById('scrollImages');
  if(!dataEl) return;
  var images = JSON.parse(dataEl.textContent);

  var layerDivs = Object.keys(images).map(function(k){
    return '<div class="scroll-visual-layer" data-layer="' + k + '" style="background-image:url(\'' + images[k] + '\')"></div>';
  }).join('');
  document.getElementById('scrollVisual').innerHTML = layerDivs;

  var layers = document.querySelectorAll('.scroll-visual-layer');
  var bgTargets = Array.prototype.slice.call(document.querySelectorAll('[data-bg]'))
    .filter(function(t){ return t.dataset.bg !== 'none' && images[t.dataset.bg]; });

  function updateBgOpacity(){
    if(!bgTargets.length) return;
    var vCenter = window.innerHeight / 2;
    var rects = bgTargets.map(function(t){ return t.getBoundingClientRect(); });
    var opacities = {};
    if(vCenter <= rects[0].top){
      opacities[bgTargets[0].dataset.bg] = 1;
    } else if(vCenter >= rects[rects.length - 1].bottom){
      opacities[bgTargets[bgTargets.length - 1].dataset.bg] = 1;
    } else {
      for(var i = 0; i < bgTargets.length; i++){
        if(vCenter >= rects[i].top && vCenter <= rects[i].bottom){
          opacities[bgTargets[i].dataset.bg] = 1;
          break;
        }
        if(i < bgTargets.length - 1 && vCenter > rects[i].bottom && vCenter < rects[i+1].top){
          var progress = (vCenter - rects[i].bottom) / (rects[i+1].top - rects[i].bottom);
          opacities[bgTargets[i].dataset.bg] = 1 - progress;
          opacities[bgTargets[i+1].dataset.bg] = progress;
          break;
        }
      }
    }
    layers.forEach(function(l){
      var v = opacities[l.dataset.layer];
      l.style.opacity = v == null ? 0 : v;
    });
  }

  var ticking = false;
  function onScroll(){
    if(ticking) return;
    ticking = true;
    requestAnimationFrame(function(){ updateBgOpacity(); ticking = false; });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateBgOpacity();

  if(typeof IntersectionObserver === 'undefined') return;
  var navLinks = document.querySelectorAll('.side-nav a');
  var navObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      navLinks.forEach(function(a){ a.classList.toggle('active', a.dataset.target === entry.target.id); });
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  Array.prototype.slice.call(navLinks)
    .map(function(a){ return document.getElementById(a.dataset.target); })
    .filter(Boolean)
    .forEach(function(t){ navObserver.observe(t); });
})();
