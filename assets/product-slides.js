// product-card-hover.js — reliable DOM-reset approach (DEBUG=true while testing)
(function () {
  'use strict';
  var DEBUG = true;
  function log(){ if(!DEBUG) return; try{ console.log('[pc-reset]', ...arguments); }catch(e){} }
  function warn(){ if(!DEBUG) return; try{ console.warn('[pc-reset]', ...arguments); }catch(e){} }

  function clickEl(el){ if(!el) return false; try{ el.click(); return true; }catch(e){ try{ el.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true})); return true;}catch(e){return false;} } }

  // find the slideshow element from a card/gallery node
  function getSlideshow(node){
    if(!node) return null;
    try {
      if(node.tagName && node.tagName.toLowerCase() === 'slideshow-component') return node;
      var inner = node.querySelector && (node.querySelector('slideshow-component') || node.querySelector('[ref="slideshow"]'));
      if(inner) return inner;
      // fallback: look up the tree
      var up = node.closest && (node.closest('slideshow-component') || node.closest('.card-gallery') || node.closest('.product-card'));
      if(up && up.tagName && up.tagName.toLowerCase()==='slideshow-component') return up;
      if(up && up.querySelector) return up.querySelector('slideshow-component') || up;
    } catch(e) { /* ignore */ }
    return null;
  }

  // get prev/next buttons
  function findControls(slideshow){
    if(!slideshow) return { prev:null, next:null };
    try {
      var prev = slideshow.querySelector && (slideshow.querySelector('.slideshow-control--previous') || slideshow.querySelector('[ref="previous"]') || slideshow.querySelector('button[aria-label*="Previous"]'));
      var next = slideshow.querySelector && (slideshow.querySelector('.slideshow-control--next') || slideshow.querySelector('[ref="next"]') || slideshow.querySelector('button[aria-label*="Next"]'));
      return { prev: prev||null, next: next||null };
    } catch(e){ return {prev:null,next:null}; }
  }

  // create and attach hover behavior to a slideshow element (or its container)
  function attachResettableHover(slideshow) {
    if(!slideshow || slideshow.__pcResetAttached) return;
    slideshow.__pcResetAttached = true;

    // detect touch-capable devices — used to prevent touch from triggering hover autoplay
    try {
      slideshow.__pcIsTouch = !!('ontouchstart' in window) || (navigator && navigator.maxTouchPoints && navigator.maxTouchPoints > 0);
    } catch(e) {
      slideshow.__pcIsTouch = false;
    }

    // save original outerHTML (snapshot of initial DOM)
    try { slideshow.__pcOriginalHTML = slideshow.outerHTML; } catch(e){ slideshow.__pcOriginalHTML = null; }
    try { slideshow.__pcInitialSlide = parseInt(slideshow.getAttribute && slideshow.getAttribute('initial-slide') || 0, 10) || 0; } catch(e){ slideshow.__pcInitialSlide = 0; }

    // state holders
    slideshow.__pcHoverInterval = null;
    slideshow.__pcRestoring = false;

    function startHover() {
      if(slideshow.__pcRestoring) return;
      // clear any previous interval
      if (slideshow.__pcHoverInterval) { clearInterval(slideshow.__pcHoverInterval); slideshow.__pcHoverInterval = null; }

      // try to call play() if available
      try {
        if(typeof slideshow.play === 'function') { slideshow.play(); log('called slideshow.play()'); return; }
        if(typeof slideshow.setAttribute === 'function') { slideshow.removeAttribute && slideshow.removeAttribute('paused'); }
      } catch(e){ /* ignore */ }

      // fallback: simulate autoplay by clicking next repeatedly
      var controls = findControls(slideshow);
      if(controls.next) {
        var ms = 900;
        slideshow.__pcHoverInterval = setInterval(function(){ try { clickEl(controls.next); } catch(e){} }, ms);
        log('started simulated hover interval for slideshow');
      } else {
        log('no next control found for simulated autoplay');
      }
    }

    function stopHoverAndReset() {
      if(slideshow.__pcRestoring) return;
      slideshow.__pcRestoring = true; // block re-entrant calls
      // stop simulated autoplay
      try { if (slideshow.__pcHoverInterval) { clearInterval(slideshow.__pcHoverInterval); slideshow.__pcHoverInterval = null; } } catch(e){}
      // try to pause component (best-effort)
      try { if (typeof slideshow.pause === 'function') { slideshow.pause(); log('called slideshow.pause()'); } } catch(e){}
      try { if (typeof slideshow.setAttribute === 'function') slideshow.setAttribute('paused','true'); } catch(e){}

      // if we have a saved original HTML, replace the element with a fresh copy to restore initial slide
      var originalHTML = slideshow.__pcOriginalHTML || null;
      if (!originalHTML) {
        // no snapshot — fallback: try to set to initial slide with DOM patch (less reliable)
        try {
          var idx = slideshow.__pcInitialSlide || 0;
          // attempt to set aria-hidden and classes
          var slides = slideshow.querySelectorAll && slideshow.querySelectorAll('slideshow-slide, .slideshow__slide, .slide, [data-slide]');
          if (slides && slides.length) {
            for(var i=0;i<slides.length;i++){
              try { slides[i].classList.remove('is-active','is-selected'); slides[i].setAttribute && slides[i].setAttribute('aria-hidden','true'); slides[i].setAttribute && slides[i].setAttribute('hidden',''); } catch(e){}
            }
            var targ = slides[idx] || slides[0];
            try { targ.classList.add('is-active','is-selected'); targ.removeAttribute && targ.removeAttribute('hidden'); targ.setAttribute && targ.setAttribute('aria-hidden','false'); } catch(e){}
          }
        } catch(e){ warn('fallback DOM reset error', e); }
        slideshow.__pcRestoring = false;
        return;
      }

      try {
        // create element from saved HTML and replace
        var wrapper = document.createElement('div');
        wrapper.innerHTML = originalHTML;
        var newNode = wrapper.firstElementChild;
        if (!newNode) {
          log('no new node from originalHTML, aborting replacement');
          slideshow.__pcRestoring = false;
          return;
        }
        // keep a reference to parent to reinsert at same position
        var parent = slideshow.parentNode;
        if (!parent) {
          slideshow.__pcRestoring = false;
          return;
        }
        // Replace in DOM
        slideshow.replaceWith(newNode);
        log('replaced slideshow DOM with original snapshot');

        // small delay for custom element to upgrade / theme scripts to run
        setTimeout(function(){
          try {
            // attach behavior to the new node
            attachResettableHover(newNode);
            // mark not restoring
            newNode.__pcRestoring = false;
            log('reattached hover behavior to new slideshow element');
          } catch(e){ warn('reattach error', e); }
        }, 40);
      } catch (err) {
        warn('replacement error', err);
        slideshow.__pcRestoring = false;
      }
    }

    // attach events to the slideshow element and also to its container (.card-gallery) if present
    try {
      // For pointer events: ignore pointer enter events that originate from touch on touch-capable devices.
      function onPointerEnter(e){
        // If this device is touch-capable and event is a touch pointer, ignore to preserve native swipe.
        if (slideshow.__pcIsTouch && e && e.pointerType === 'touch') {
          // do nothing — allow native touch/swipe
          return;
        }
        // Check if the event target is a variant select or its child
        if (e && e.target) {
          var target = e.target;
          if (target.classList && (target.classList.contains('variant-select') || 
              target.classList.contains('product-variant-selects') ||
              target.classList.contains('variant-select-wrapper') ||
              target.classList.contains('select-container'))) {
            return; // Don't start hover for variant selects
          }
          // Check parent elements
          var variantParent = target.closest && target.closest('.product-variant-selects');
          if (variantParent) {
            return; // Don't start hover if inside variant selects
          }
        }
        startHover();
      }
      function onPointerLeave(e){
        // If this device is touch-capable and event is a touch pointer, ignore.
        if (slideshow.__pcIsTouch && e && e.pointerType === 'touch') {
          return;
        }
        // Check if leaving from a variant select
        if (e && e.target) {
          var target = e.target;
          if (target.classList && (target.classList.contains('variant-select') || 
              target.classList.contains('product-variant-selects'))) {
            return; // Don't reset for variant selects
          }
          var variantParent = target.closest && target.closest('.product-variant-selects');
          if (variantParent) {
            return;
          }
        }
        stopHoverAndReset();
      }

      slideshow.addEventListener('pointerenter', onPointerEnter, { passive:true });
      slideshow.addEventListener('mouseenter', onPointerEnter, { passive:true });
      slideshow.addEventListener('pointerleave', onPointerLeave, { passive:true });
      slideshow.addEventListener('mouseleave', onPointerLeave, { passive:true });

      // also attach to container fallback (some themes bind preview on .card-gallery)
      var container = slideshow.closest && (slideshow.closest('.card-gallery') || slideshow.closest('.product-card'));
      if (container && container !== slideshow) {
        container.addEventListener('pointerenter', onPointerEnter, { passive:true });
        container.addEventListener('pointerleave', onPointerLeave, { passive:true });
        container.addEventListener('mouseenter', onPointerEnter, { passive:true });
        container.addEventListener('mouseleave', onPointerLeave, { passive:true });
      }

      // TOUCH: do not start simulated hover on touchstart — leave touch to native interaction (swipe).
      // Also avoid calling stopHoverAndReset on touchend so user can swipe freely without forced reset.
      // We keep these listeners intentionally minimal / no-op on touch devices.
      if (!slideshow.__pcIsTouch) {
        // non-touch fallback: keep touchstart/end behavior as a safety net (rare)
        slideshow.addEventListener('touchstart', function(){ startHover(); }, { passive:true });
        slideshow.addEventListener('touchend', function(){ stopHoverAndReset(); }, { passive:true });
      } else {
        // touch device: do not attach autoplay on touch to preserve swipe behaviour.
        log('touch-capable device detected — hover autoplay suppressed for touch interactions');
      }
    } catch(e){
      warn('attach listeners failed', e);
    }
  }

  // initialize existing slideshows
  function initAll() {
    try {
      var nodes = Array.prototype.slice.call(document.querySelectorAll('slideshow-component, .card-gallery slideshow-component, [ref="slideshow"], .slideshow-component'));
      log('initAll found slideshows:', nodes.length);
      nodes.forEach(function(n){ attachResettableHover(n.tagName && n.tagName.toLowerCase()==='slideshow-component' ? n : (n.querySelector && n.querySelector('slideshow-component') || n) ); });
    } catch(e){ warn('initAll error', e); }
  }

  // watch for new slideshows added later
  function watch() {
    try {
      var mo = new MutationObserver(function(records){
        records.forEach(function(rec){
          Array.prototype.forEach.call(rec.addedNodes, function(node){
            try {
              if(!node || !node.querySelectorAll) return;
              if (node.matches && (node.matches('slideshow-component') || node.matches('.card-gallery') || node.matches('.slideshow-component'))) {
                var s = node.tagName && node.tagName.toLowerCase()==='slideshow-component' ? node : (node.querySelector && node.querySelector('slideshow-component') || node);
                if (s) attachResettableHover(s);
              } else {
                var nested = node.querySelectorAll && node.querySelectorAll('slideshow-component, .slideshow-component, .card-gallery slideshow-component');
                Array.prototype.forEach.call(nested || [], function(el){ var s = el.tagName && el.tagName.toLowerCase()==='slideshow-component' ? el : (el.querySelector && el.querySelector('slideshow-component') || el); if(s) attachResettableHover(s); });
              }
            } catch(e){}
          });
        });
      });
      mo.observe(document.documentElement || document.body, { childList: true, subtree: true });
      log('MutationObserver watching for new slideshows');
    } catch(e){ warn('watch error', e); }
  }

  // run
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function(){ initAll(); watch(); });
  else { initAll(); watch(); }

  log('product-card-hover: reset-on-leave strategy loaded (DEBUG on).');
})();
