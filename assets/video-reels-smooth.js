class VideoReelsSmooth {
  constructor(section) {
    this.section = section;
    this.stack = section.querySelector('.video-reels-stack');
    this.cards = section.querySelectorAll('.video-reel-stack-card');
    this.progressFill = section.querySelector('.progress-fill');
    this.soundButtons = section.querySelectorAll('.reel-sound');
    
    // Smooth scrolling variables
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.scrollX = 0;
    this.velocity = 0;
    this.animationId = null;
    this.lastTime = 0;
    this.lastX = 0;
    
    // Settings
    this.dragMultiplier = 2; // Increase drag sensitivity
    this.momentumMultiplier = 0.92; // Smooth deceleration
    this.snapThreshold = 0.5;
    this.elasticStrength = 0.05;
    
    if (this.cards.length > 0) {
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
    // Mouse events
    this.stack.addEventListener('mousedown', (e) => this.onPointerDown(e));
    window.addEventListener('mousemove', (e) => this.onPointerMove(e));
    window.addEventListener('mouseup', () => this.onPointerUp());
    
    // Touch events
    this.stack.addEventListener('touchstart', (e) => this.onPointerDown(e), { passive: true });
    window.addEventListener('touchmove', (e) => this.onPointerMove(e), { passive: false });
    window.addEventListener('touchend', () => this.onPointerUp());
    
    // Prevent default drag
    this.stack.addEventListener('dragstart', (e) => e.preventDefault());
    
    // Sound toggle
    this.soundButtons.forEach(button => {
      button.addEventListener('click', (e) => this.toggleSound(e));
    });
    
    // Wheel event for horizontal scroll
    this.stack.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        this.scrollX -= e.deltaY;
        this.velocity = -e.deltaY * 0.3;
      }
    }, { passive: false });
  }
  
  onPointerDown(e) {
    this.isDragging = true;
    this.stack.classList.add('dragging');
    this.velocity = 0;
    
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    this.startX = clientX;
    this.lastX = clientX;
    this.lastTime = performance.now();
    
    // Get current scroll position
    this.scrollX = this.stack.scrollLeft;
  }
  
  onPointerMove(e) {
    if (!this.isDragging) return;
    
    const currentTime = performance.now();
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    
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
  
  onPointerUp() {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.stack.classList.remove('dragging');
    
    // Continue momentum
    this.scrollX = this.stack.scrollLeft;
  }
  
  startAnimation() {
    const animate = () => {
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
    const cardWidth = this.cards[0].offsetWidth;
    const gap = 20;
    const snapInterval = cardWidth + gap;
    
    const currentScroll = this.stack.scrollLeft;
    const targetIndex = Math.round(currentScroll / snapInterval);
    const targetScroll = targetIndex * snapInterval;
    
    // Smooth snap animation
    const diff = targetScroll - currentScroll;
    if (Math.abs(diff) > 1) {
      this.velocity = diff * 0.1;
    }
  }
  
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const card = entry.target;
        const video = card.querySelector('video');
        
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
    const scrollPercentage = this.stack.scrollLeft / (this.stack.scrollWidth - this.stack.clientWidth);
    const progressWidth = Math.max(10, Math.min(100, scrollPercentage * 100));
    
    if (this.progressFill) {
      this.progressFill.style.width = progressWidth + '%';
    }
  }
  
  updateActiveCards() {
    const scrollCenter = this.stack.scrollLeft + this.stack.clientWidth / 2;
    
    this.cards.forEach((card) => {
      const cardLeft = card.offsetLeft;
      const cardCenter = cardLeft + card.offsetWidth / 2;
      const distance = Math.abs(scrollCenter - cardCenter);
      
      // Smooth scale based on distance
      const maxDistance = this.stack.clientWidth;
      const normalizedDistance = Math.min(distance / maxDistance, 1);
      const scale = 0.9 + (1 - normalizedDistance) * 0.1;
      const opacity = 0.6 + (1 - normalizedDistance) * 0.4;
      
      card.style.transform = `scale(${scale})`;
      card.style.opacity = opacity;
    });
  }
  
  toggleSound(e) {
    const button = e.currentTarget;
    const video = button.closest('.video-reel-stack-card').querySelector('video');
    const soundOn = button.querySelector('.sound-on');
    const soundOff = button.querySelector('.sound-off');
    
    if (video) {
      video.muted = !video.muted;
      soundOn.style.display = video.muted ? 'none' : 'block';
      soundOff.style.display = video.muted ? 'block' : 'none';
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
  sections.forEach(section => {
    new VideoReelsSmooth(section);
  });
});

// Handle Shopify theme editor
if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const section = event.target.querySelector('.video-reels-stack-section');
    if (section) {
      new VideoReelsSmooth(section);
    }
  });
  
  document.addEventListener('shopify:section:unload', (event) => {
    const section = event.target.querySelector('.video-reels-stack-section');
    if (section && section.videoReelsInstance) {
      section.videoReelsInstance.destroy();
    }
  });
}class VideoReelsSmooth {
  constructor(section) {
    this.section = section;
    this.stack = section.querySelector('.video-reels-stack');
    this.cards = section.querySelectorAll('.video-reel-stack-card');
    this.progressFill = section.querySelector('.progress-fill');
    this.soundButtons = section.querySelectorAll('.reel-sound');
    
    // Smooth scrolling variables
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.scrollX = 0;
    this.velocity = 0;
    this.animationId = null;
    this.lastTime = 0;
    this.lastX = 0;
    
    // Settings
    this.dragMultiplier = 2; // Increase drag sensitivity
    this.momentumMultiplier = 0.92; // Smooth deceleration
    this.snapThreshold = 0.5;
    this.elasticStrength = 0.05;
    
    if (this.cards.length > 0) {
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
    // Mouse events
    this.stack.addEventListener('mousedown', (e) => this.onPointerDown(e));
    window.addEventListener('mousemove', (e) => this.onPointerMove(e));
    window.addEventListener('mouseup', () => this.onPointerUp());
    
    // Touch events
    this.stack.addEventListener('touchstart', (e) => this.onPointerDown(e), { passive: true });
    window.addEventListener('touchmove', (e) => this.onPointerMove(e), { passive: false });
    window.addEventListener('touchend', () => this.onPointerUp());
    
    // Prevent default drag
    this.stack.addEventListener('dragstart', (e) => e.preventDefault());
    
    // Sound toggle
    this.soundButtons.forEach(button => {
      button.addEventListener('click', (e) => this.toggleSound(e));
    });
    
    // Wheel event for horizontal scroll
    this.stack.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        this.scrollX -= e.deltaY;
        this.velocity = -e.deltaY * 0.3;
      }
    }, { passive: false });
  }
  
  onPointerDown(e) {
    this.isDragging = true;
    this.stack.classList.add('dragging');
    this.velocity = 0;
    
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    this.startX = clientX;
    this.lastX = clientX;
    this.lastTime = performance.now();
    
    // Get current scroll position
    this.scrollX = this.stack.scrollLeft;
  }
  
  onPointerMove(e) {
    if (!this.isDragging) return;
    
    const currentTime = performance.now();
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    
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
  
  onPointerUp() {
    if (!this.isDragging) return;
    
    this.isDragging = false;
    this.stack.classList.remove('dragging');
    
    // Continue momentum
    this.scrollX = this.stack.scrollLeft;
  }
  
  startAnimation() {
    const animate = () => {
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
    const cardWidth = this.cards[0].offsetWidth;
    const gap = 20;
    const snapInterval = cardWidth + gap;
    
    const currentScroll = this.stack.scrollLeft;
    const targetIndex = Math.round(currentScroll / snapInterval);
    const targetScroll = targetIndex * snapInterval;
    
    // Smooth snap animation
    const diff = targetScroll - currentScroll;
    if (Math.abs(diff) > 1) {
      this.velocity = diff * 0.1;
    }
  }
  
  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const card = entry.target;
        const video = card.querySelector('video');
        
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
    const scrollPercentage = this.stack.scrollLeft / (this.stack.scrollWidth - this.stack.clientWidth);
    const progressWidth = Math.max(10, Math.min(100, scrollPercentage * 100));
    
    if (this.progressFill) {
      this.progressFill.style.width = progressWidth + '%';
    }
  }
  
  updateActiveCards() {
    const scrollCenter = this.stack.scrollLeft + this.stack.clientWidth / 2;
    
    this.cards.forEach((card) => {
      const cardLeft = card.offsetLeft;
      const cardCenter = cardLeft + card.offsetWidth / 2;
      const distance = Math.abs(scrollCenter - cardCenter);
      
      // Smooth scale based on distance
      const maxDistance = this.stack.clientWidth;
      const normalizedDistance = Math.min(distance / maxDistance, 1);
      const scale = 0.9 + (1 - normalizedDistance) * 0.1;
      const opacity = 0.6 + (1 - normalizedDistance) * 0.4;
      
      card.style.transform = `scale(${scale})`;
      card.style.opacity = opacity;
    });
  }
  
  toggleSound(e) {
    const button = e.currentTarget;
    const video = button.closest('.video-reel-stack-card').querySelector('video');
    const soundOn = button.querySelector('.sound-on');
    const soundOff = button.querySelector('.sound-off');
    
    if (video) {
      video.muted = !video.muted;
      soundOn.style.display = video.muted ? 'none' : 'block';
      soundOff.style.display = video.muted ? 'block' : 'none';
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
  sections.forEach(section => {
    new VideoReelsSmooth(section);
  });
});

// Handle Shopify theme editor
if (window.Shopify && window.Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    const section = event.target.querySelector('.video-reels-stack-section');
    if (section) {
      new VideoReelsSmooth(section);
    }
  });
  
  document.addEventListener('shopify:section:unload', (event) => {
    const section = event.target.querySelector('.video-reels-stack-section');
    if (section && section.videoReelsInstance) {
      section.videoReelsInstance.destroy();
    }
  });
}