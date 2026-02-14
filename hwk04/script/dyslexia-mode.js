class DyslexiaMode {
  constructor() {
    this.storageKey = 'dyslexia-mode-enabled';
    this.isEnabled = localStorage.getItem(this.storageKey) === 'true';
    this.init();
  }

  init() {
    this.createStyles();
    
    this.createButton();
    
    if (this.isEnabled) {
      this.enable();
    }
  }

  createStyles() {
    const styleId = 'dyslexia-friendly-styles';
    
    if (document.getElementById(styleId)) {
      return;
    }

    const styles = document.createElement('style');
    styles.id = styleId;
    styles.textContent = `
      body.dyslexia-mode {
        font-family: 'Open Dyslexic', Arial, sans-serif;
        font-size: 0.9em;
        letter-spacing: 0.12em;
        word-spacing: 0.16em;
        line-height: 1.8;
      }

      body.dyslexia-mode * {
        font-family: 'Open Dyslexic', Arial, sans-serif !important;
      }

      body.dyslexia-mode p,
      body.dyslexia-mode li,
      body.dyslexia-mode td,
      body.dyslexia-mode th,
      body.dyslexia-mode label,
      body.dyslexia-mode legend,
      body.dyslexia-mode input,
      body.dyslexia-mode textarea,
      body.dyslexia-mode select,
      body.dyslexia-mode button {
        letter-spacing: 0.12em;
        word-spacing: 0.16em;
        line-height: 1.8;
      }

      body.dyslexia-mode h1,
      body.dyslexia-mode h2,
      body.dyslexia-mode h3,
      body.dyslexia-mode h4,
      body.dyslexia-mode h5,
      body.dyslexia-mode h6 {
        letter-spacing: 0.08em;
        line-height: 1.4;
        margin-bottom: 0.8em;
      }

      /* FOOTER */
      body.dyslexia-mode .footer-links {
        font-size: calc(var(--font-large) * 0.35) !important;
        word-break: break-word;
      }

      body.dyslexia-mode .footer-link {
        word-break: break-word;
        overflow-wrap: break-word;
      }

      /* BUTTON */
      .dyslexia-toggle-btn {
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 1000;
        padding: 10px 16px;
        background-color: var(--primary-dark);
        color: white;
        border: 2px solid var(--neutral-white);
        border-radius: 999px;
        font-family: var(--font-sans);
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
        cursor: auto;
        transition: all 200ms ease;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      .dyslexia-toggle-btn:hover {
        cursor: pointer;
        background-color: var(--secondary-mid);
        color: var(--primary-dark);
        border-color: var(--primary-dark);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .dyslexia-toggle-btn.active {
        background-color: var(--secondary-mid);
        color: var(--primary-dark);
        border-color: var(--primary-dark);
      }

      .dyslexia-toggle-btn.active:hover {
        background-color: var(--primary-dark);
        color: var(--neutral-white);
        border-color: var(--neutral-white);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }

      /* MOBILE */
      @media (max-width: 767px) {
        .dyslexia-toggle-btn {
          top: auto;
          right: 10px;
          bottom: 20px;
          padding: 8px 12px;
          font-size: 12px;
        }
      }
    `;

    document.head.appendChild(styles);
  }

  createButton() {
    if (document.querySelector('.dyslexia-toggle-btn')) {
      return;
    }

    const button = document.createElement('button');
    button.className = 'dyslexia-toggle-btn';
    button.setAttribute('aria-label', 'Toggle dyslexia-friendly typography mode');
    button.textContent = 'Dyslexia Friendly';
    
    if (this.isEnabled) {
      button.classList.add('active');
    }

    button.addEventListener('click', () => this.toggle());

    const header = document.querySelector('header');
    if (header && header.nextSibling) {
      header.parentNode.insertBefore(button, header.nextSibling);
    } else {
      document.body.insertBefore(button, document.body.firstChild);
    }
  }

  enable() {
    document.body.classList.add('dyslexia-mode');
    const button = document.querySelector('.dyslexia-toggle-btn');
    if (button) {
      button.classList.add('active');
    }
    this.isEnabled = true;
    localStorage.setItem(this.storageKey, 'true');
  }

  disable() {
    document.body.classList.remove('dyslexia-mode');
    const button = document.querySelector('.dyslexia-toggle-btn');
    if (button) {
      button.classList.remove('active');
    }
    this.isEnabled = false;
    localStorage.setItem(this.storageKey, 'false');
  }

  toggle() {
    if (this.isEnabled) {
      this.disable();
    } else {
      this.enable();
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new DyslexiaMode();
  });
} else {
  new DyslexiaMode();
}
