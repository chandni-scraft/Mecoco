import { Component } from '@theme/component';

/** @typedef {typeof globalThis} Window */

/**
 * A component that handles title truncation with responsive behavior
 *
 * @typedef {Object} Refs
 * @property {HTMLElement} [text] - The text element to truncate (optional)
 *
 * @extends {Component<Refs>}
 */
class ProductTitle extends Component {
  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('ProductTitle component connected:', this);
    this.#initializeTruncation();
  }

  /**
   * Initialize the title truncation
   */
  #initializeTruncation() {
    // Apply truncation immediately
    this.#calculateTruncation();
    
    // Also apply after a short delay to ensure DOM is ready
    setTimeout(() => {
      this.#calculateTruncation();
    }, 100);
    
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => {
        this.#calculateTruncation();
      });

      this.resizeObserver.observe(this);
      this.#calculateTruncation();
    } else {
      /** @type {Window} */
      (window).addEventListener('resize', this.#handleResize.bind(this));
      this.#calculateTruncation();
    }
  }

  /**
   * Calculate truncation for the title
   */
  #calculateTruncation() {
    /** @type {HTMLElement} */
    const textElement = this.refs.text || this.querySelector('.title-text') || this;
    console.log('Text element found:', textElement, 'Content:', textElement?.textContent);
    if (!textElement.textContent) return;

    // Check if this is a product card title
    const isProductCard = this.closest('.product-card') || this.closest('.product-grid__card');
    console.log('Is product card:', isProductCard, 'Element:', this);
    
    if (isProductCard) {
      // For product cards, always use exactly 2 lines
      console.log('Applying 2-line truncation to product card title:', textElement.textContent);
      
      // Apply styles to the text element
      textElement.style.setProperty('display', '-webkit-box', 'important');
      textElement.style.setProperty('-webkit-box-orient', 'vertical', 'important');
      textElement.style.setProperty('overflow', 'hidden', 'important');
      textElement.style.setProperty('text-overflow', 'ellipsis', 'important');
      textElement.style.setProperty('-webkit-line-clamp', '2', 'important');
      textElement.style.setProperty('min-height', 'calc(2 * 1.5em)', 'important');
      textElement.style.setProperty('max-height', 'calc(2 * 1.5em)', 'important');
      
      // Also apply to any child elements
      const childElements = textElement.querySelectorAll('p, h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6');
      childElements.forEach(child => {
        if (child instanceof HTMLElement) {
          child.style.setProperty('display', '-webkit-box', 'important');
          child.style.setProperty('-webkit-box-orient', 'vertical', 'important');
          child.style.setProperty('overflow', 'hidden', 'important');
          child.style.setProperty('text-overflow', 'ellipsis', 'important');
          child.style.setProperty('-webkit-line-clamp', '2', 'important');
          child.style.setProperty('min-height', 'calc(2 * 1.5em)', 'important');
          child.style.setProperty('max-height', 'calc(2 * 1.5em)', 'important');
        }
      });
      
      console.log('Applied styles:', {
        display: textElement.style.display,
        webkitLineClamp: textElement.style.webkitLineClamp,
        minHeight: textElement.style.minHeight
      });
      return;
    }

    // For other elements, use the original dynamic calculation
    const containerHeight = this.clientHeight;
    const computedStyle = window.getComputedStyle(this);
    const lineHeight = parseFloat(computedStyle.lineHeight);
    const paddingTop = parseFloat(computedStyle.paddingTop);
    const paddingBottom = parseFloat(computedStyle.paddingBottom);

    const availableHeight = containerHeight - paddingTop - paddingBottom;
    const maxLines = Math.max(1, Math.floor(availableHeight / lineHeight));

    textElement.style.display = '-webkit-box';
    textElement.style.webkitBoxOrient = 'vertical';
    textElement.style.overflow = 'hidden';
    textElement.style.textOverflow = 'ellipsis';
    textElement.style.webkitLineClamp = String(maxLines);
  }

  /**
   * Handle window resize events
   */
  #handleResize() {
    this.#calculateTruncation();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    window.removeEventListener('resize', this.#handleResize);
  }
}

if (!customElements.get('product-title')) {
  customElements.define('product-title', ProductTitle);
}

export default ProductTitle;
