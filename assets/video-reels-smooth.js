/**
 * Smooth draggable reels with momentum and snapping.
 */
class VideoReelsSmooth {
  /**
   * @param {HTMLElement} section
   */
  constructor(section) {
    this.section = section;
    /** @type {HTMLElement|null} */
    this.stack = /** @type {HTMLElement|null} */(section.querySelector('.video-reels-stack'));
    /** @type {NodeListOf<HTMLElement>} */
    this.cards = /** @type {NodeListOf<HTMLElement>} */(section.querySelectorAll('.video-reel-stack-card'));
    /** @type {HTMLElement|null} */
    this.progressFill = /** @type {HTMLElement|null} */(section.querySelector('.progress-fill'));
    /** @type {NodeListOf<HTMLButtonElement>} */
    this.soundButtons = /** @type {NodeListOf<HTMLButtonElement>} */(section.querySelectorAll('.reel-sound'));
    this.prevButton = section.querySelector('.video-reels-nav-prev');
    this.nextButton = section.querySelector('.video-reels-nav-next');
    
    // Smooth scrolling variables
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.scrollX = 0;
    this.velocity = 0;
    this.animationId = null;
    this.lastTime = 0;
    this.lastX = 0;
    this.startY = 0;
    this.isPointerDown = false;
    this.dragThreshold = 8;
    
    // Settings
    this.dragMultiplier = 2; // Increase drag sensitivity
    this.momentumMultiplier = 0.92; // Smooth deceleration
    this.snapThreshold = 0.5;
    this.elasticStrength = 0.05;
    
    if (this.stack && this.cards.length > 0) {
      this.init();
    }
  }
  
  init() {
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.updateProgress();
    this.startAnimation();
    
    // Play first video
    const firstVideo = this.cards[0]?.querySelector('video');
    if (firstVideo) {
      firstVideo.play().catch(() => {});
    }
  }
  
  setupEventListeners() {
    if (!this.stack) return;
    // Mouse events
    this.stack.addEventListener('mousedown', (e) => this.onPointerDown(/** @type {MouseEvent} */(e)));
    window.addEventListener('mousemove', (e) => this.onPointerMove(/** @type {MouseEvent} */(e)));
    window.addEventListener('mouseup', () => this.onPointerUp());
    
    // Touch events
    this.stack.addEventListener('touchstart', (e) => this.onPointerDown(/** @type {TouchEvent} */(e)), { passive: true });
    window.addEventListener('touchmove', (e) => this.onPointerMove(/** @type {TouchEvent} */(e)), { passive: false });
    window.addEventListener('touchend', () => this.onPointerUp());
    
    // Prevent default drag
    this.stack.addEventListener('dragstart', (e) => e.preventDefault());
    
    // Sound toggle
    this.soundButtons.forEach((button) => {
      button.addEventListener('click', (e) => this.toggleSound(/** @type {MouseEvent} */(e)));
    });

    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.scrollByCard(-1));
    }

    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.scrollByCard(1));
    }
  }
  
  /**
   * @param {MouseEvent|TouchEvent} e
   */
  onPointerDown(e) {
    if (!this.stack) return;
    this.isPointerDown = false;
    this.isDragging = false;
    this.stack.classList.remove('dragging');
    this.velocity = 0;
    // Drag scrolling disabled; keep default browser behavior and nav buttons only.
  }
  
  /**
   * @param {MouseEvent|TouchEvent} e
   */
  onPointerMove(e) {
    if (!this.isPointerDown || !this.stack) return;
    const currentTime = performance.now();
    const clientX = this.getClientX(e);
    const clientY = this.getClientY(e);
    
    if (!this.isDragging) {
      const deltaXAbs = Math.abs(clientX - this.startX);
      const deltaYAbs = Math.abs(clientY - this.startY);
      
      if (deltaYAbs > this.dragThreshold && deltaYAbs > deltaXAbs) {
        // Gesture is vertical; release control so the page can scroll.
        this.isPointerDown = false;
        this.isDragging = false;
        this.stack.classList.remove('dragging');
        return;
      }
      
      if (deltaXAbs > this.dragThreshold && deltaXAbs >= deltaYAbs) {
        this.isDragging = true;
        this.stack.classList.add('dragging');
        this.lastX = clientX;
        this.lastTime = currentTime;
      } else {
        this.lastX = clientX;
        this.lastTime = currentTime;
        return;
      }
    }
    
    // Prevent page scroll while dragging on touch
    if ('touches' in e && typeof e.preventDefault === 'function' && e.cancelable) {
      e.preventDefault();
    }
    
    // Calculate velocity based on movement
    const deltaTime = currentTime - this.lastTime;
    const deltaX = clientX - this.lastX;
    
    if (deltaTime > 0) {
      this.velocity = deltaX / deltaTime * 16; // Normalize to 60fps
    }
    
    // Update position
    this.currentX = clientX;
    const diff = (this.currentX - this.startX) * this.dragMultiplier;
    
    // Apply elastic bounds at edges
    const maxScroll = this.stack.scrollWidth - this.stack.clientWidth;
    let targetScroll = this.scrollX - diff;
    
    if (targetScroll < 0) {
      targetScroll = targetScroll * this.elasticStrength;
    } else if (targetScroll > maxScroll) {
      targetScroll = maxScroll + (targetScroll - maxScroll) * this.elasticStrength;
    }
    
    this.stack.scrollLeft = targetScroll;
    
    this.lastX = clientX;
    this.lastTime = currentTime;
  }

  /**
   * Safely extract clientX from mouse/touch events.
   * @param {MouseEvent|TouchEvent} e
   * @returns {number}
   */
  getClientX(e) {
    if ('clientX' in e && typeof e.clientX === 'number') {
      return e.clientX;
    }
    const te = /** @type {TouchEvent} */(e);
    const t0 = te.touches && te.touches.length > 0 ? te.touches[0] : (te.changedTouches && te.changedTouches.length > 0 ? te.changedTouches[0] : null);
    return t0 ? t0.clientX : this.lastX || 0;
  }

  /**
   * Safely extract clientY from mouse/touch events.
   * @param {MouseEvent|TouchEvent} e
   * @returns {number}
   */
  getClientY(e) {
    if ('clientY' in e && typeof e.clientY === 'number') {
      return e.clientY;
    }
    const te = /** @type {TouchEvent} */(e);
    const t0 = te.touches && te.touches.length > 0 ? te.touches[0] : (te.changedTouches && te.changedTouches.length > 0 ? te.changedTouches[0] : null);
    return t0 ? t0.clientY : 0;
  }
  
  onPointerUp() {
    this.isPointerDown = false;
    if (!this.stack || !this.isDragging) return;
    this.isDragging = false;
    this.stack.classList.remove('dragging');
    
    // Continue momentum
    this.scrollX = this.stack.scrollLeft;
  }
  
  getComputedGap() {
    if (!this.stack) return 20;
    const style = getComputedStyle(this.stack);
    const gapVal = style.columnGap || style.gap || '20px';
    const parsed = parseInt(gapVal, 10);
    return Number.isNaN(parsed) ? 20 : parsed;
  }
  
  startAnimation() {
    const animate = () => {
      if (!this.stack) return;
      if (!this.isDragging && Math.abs(this.velocity) > 0.1) {
        this.scrollX -= this.velocity;
        this.velocity *= this.momentumMultiplier;
        
        // Apply bounds
        const maxScroll = this.stack.scrollWidth - this.stack.clientWidth;
        if (this.scrollX < 0) {
          this.scrollX = 0;
          this.velocity = 0;
        } else if (this.scrollX > maxScroll) {
          this.scrollX = maxScroll;
          this.velocity = 0;
        }
        
        this.stack.scrollLeft = this.scrollX;
      } else if (!this.isDragging && Math.abs(this.velocity) <= 0.1) {
        // Snap to nearest card when momentum stops
        this.velocity = 0;
        this.snapToNearestCard();
      }
      
      // Update UI
      this.updateProgress();
      this.updateActiveCards();
      
      this.animationId = requestAnimationFrame(animate);
    };
    
    this.animationId = requestAnimationFrame(animate);
  }
  
  snapToNearestCard() {
    if (!this.stack || this.cards.length === 0) return;
    const firstCard = this.cards.item(0);
    if (!firstCard) return;
    const cardWidth = firstCard.offsetWidth;
    const gap = this.getComputedGap();
    const snapInterval = cardWidth + gap;
    
    const currentScroll = this.stack.scrollLeft;
    const targetIndex = Math.round(currentScroll / snapInterval);
    const targetScroll = targetIndex * snapInterval;
    
    const diff = targetScroll - currentScroll;
    if (Math.abs(diff) > 1) {
      this.velocity = diff * 0.1;
    }
  }

  scrollByCard(direction) {
    if (!this.stack || this.cards.length === 0) return;
    const firstCard = this.cards.item(0);
    if (!firstCard) return;
    const gap = this.getComputedGap();
    const cardWidth = firstCard.offsetWidth;
    const snapInterval = cardWidth + gap;

    const currentScroll = this.stack.scrollLeft;
    const maxIndex = this.cards.length - 1;
    let targetIndex = Math.round(currentScroll / snapInterval) + direction;
    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex > maxIndex) targetIndex = maxIndex;

    const targetScroll = targetIndex * snapInterval;

    this.isPointerDown = false;
    this.isDragging = false;
    this.velocity = 0;
    this.scrollX = targetScroll;

    if (typeof this.stack.scrollTo === 'function') {
      this.stack.scrollTo({ left: targetScroll, behavior: 'smooth' });
    } else {
      this.stack.scrollLeft = targetScroll;
    }

    this.updateProgress();
    this.updateActiveCards();
  }

  setupIntersectionObserver() {
    if (!this.stack) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const card = /** @type {HTMLElement} */(entry.target);
        /** @type {HTMLVideoElement|null} */
        const video = /** @type {HTMLVideoElement|null} */(card.querySelector('video'));
        
        if (entry.intersectionRatio > 0.5) {
          card.classList.add('in-view');
          if (video && !this.isDragging) {
            video.play().catch(() => {});
          }
        } else {
          card.classList.remove('in-view');
          if (video) {
            video.pause();
          }
        }
      });
    }, {
      root: this.stack,
      threshold: [0, 0.5, 1],
      rootMargin: '0px'
    });
    
    this.cards.forEach(card => observer.observe(card));
  }
  
  updateProgress() {
    if (!this.stack) return;
    const max = (this.stack.scrollWidth - this.stack.clientWidth);
    const scrollPercentage = max > 0 ? (this.stack.scrollLeft / max) : 0;
    const progressWidth = Math.max(10, Math.min(100, scrollPercentage * 100));
    
    if (this.progressFill) {
      this.progressFill.style.width = progressWidth + '%';
    }
  }
  
  updateActiveCards() {
    if (!this.stack) return;
    const scrollCenter = this.stack.scrollLeft + this.stack.clientWidth / 2;
    
    this.cards.forEach((card) => {
      const cardLeft = card.offsetLeft;
      const cardCenter = cardLeft + card.offsetWidth / 2;
      const distance = Math.abs(scrollCenter - cardCenter);
      
      // Smooth scale based on distance
      const stackWidth = this.stack ? this.stack.clientWidth : 0;
      const maxDistance = Math.max(1, stackWidth);
      const normalizedDistance = Math.min(distance / maxDistance, 1);
      const scale = 0.9 + (1 - normalizedDistance) * 0.1;
      const opacity = 0.6 + (1 - normalizedDistance) * 0.4;
      
      card.style.transform = `scale(${scale})`;
      card.style.opacity = String(opacity);
    });
  }
  
  /**
   * @param {MouseEvent} e
   */
  toggleSound(e) {
    /** @type {HTMLButtonElement|null} */
    const button = /** @type {HTMLButtonElement} */(e.currentTarget);
    const cardEl = button ? button.closest('.video-reel-stack-card') : null;
    /** @type {HTMLVideoElement|null} */
    const video = cardEl ? cardEl.querySelector('video') : null;
    const soundOn = button ? button.querySelector('.sound-on') : null;
    const soundOff = button ? button.querySelector('.sound-off') : null;
    
    if (video && soundOn && soundOff) {
      video.muted = !video.muted;
      /** @type {HTMLElement} */(soundOn).style.display = video.muted ? 'none' : 'block';
      /** @type {HTMLElement} */(soundOff).style.display = video.muted ? 'block' : 'none';
    }
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.video-reels-stack-section');
  sections.forEach((el) => {
    if (el instanceof HTMLElement) {
      new VideoReelsSmooth(el);
    }
  });
});

// Handle Shopify theme editor
if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const target = /** @type {EventTarget} */(event.target);
    const container = target instanceof HTMLElement ? target : null;
    const section = container ? container.querySelector('.video-reels-stack-section') : null;
    if (section instanceof HTMLElement) {
      new VideoReelsSmooth(section);
    }
  });
  
  document.addEventListener('shopify:section:unload', (event) => {
    const target = /** @type {EventTarget} */(event.target);
    const container = target instanceof HTMLElement ? target : null;
    const section = container ? container.querySelector('.video-reels-stack-section') : null;
    if (section && /** @type {any} */(section).videoReelsInstance) {
      /** @type {any} */(section).videoReelsInstance.destroy();
    }
  });
}
