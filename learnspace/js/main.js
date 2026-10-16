/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Main JavaScript (Modals, Tabs, Accordions, Toasts, Common UI)
 */

// Path Resolvers
function getAssetPath(relativePath) {
  if (!relativePath) return '';
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://') || relativePath.startsWith('data:')) {
    return relativePath;
  }
  let clean = relativePath.replace(/^(\.\.\/)+/, '').replace(/^\//, '');
  if ((clean.startsWith('child-') || clean.startsWith('parent-') || clean.startsWith('avatar-')) && !clean.includes('/')) {
    clean = 'assets/images/avatars/' + clean;
  }
  const path = (window.location.pathname || '').replace(/\\/g, '/');
  if (path.match(/\/dashboard\/(children|classes|resources|membership|community|account)\//)) {
    return '../../' + clean;
  }
  if (path.match(/\/(pages|auth|dashboard)\//)) {
    return '../' + clean;
  }
  return clean;
}

function getPagePath(pageNameWithQuery) {
  const path = (window.location.pathname || '').replace(/\\/g, '/');
  if (path.match(/\/dashboard\/(children|classes|resources|membership|community|account)\//)) {
    return pageNameWithQuery;
  }
  if (path.match(/\/(auth|dashboard)\//)) {
    return '../pages/' + pageNameWithQuery;
  }
  if (path.match(/\/pages\//)) {
    return pageNameWithQuery;
  }
  return 'pages/' + pageNameWithQuery;
}

window.getAssetPath = window.getAssetPath || getAssetPath;
window.getPagePath = window.getPagePath || getPagePath;

// Toast Notifications Helper
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  const bgCol = type === 'success' ? '#16A34A' : type === 'error' ? '#DC2626' : '#2563EB';
  const iconSvg = type === 'success' 
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>'
    : type === 'error'
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';

  toast.style.cssText = `
    background: ${bgCol};
    color: #FFFFFF;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.25), 0 8px 10px -6px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    gap: 10px;
    opacity: 0;
    transform: translateY(12px) scale(0.97);
    transition: all 0.28s cubic-bezier(0.34, 1.56, 0.64, 1);
    pointer-events: auto;
  `;
  toast.innerHTML = `<span>${iconSvg}</span><span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0) scale(1)';
  }, 10);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px) scale(0.95)';
    setTimeout(() => toast.remove(), 280);
  }, duration);
}

// Global Modal Helpers
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // 1. Modals close on click outside or close button
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', function (e) {
      if (e.target === this) {
        this.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
  });

  // Escape key closes modals
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const openModal = document.querySelector('.modal-backdrop.open');
      if (openModal) {
        openModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    }
  });

  // 2. Tabs system
  document.querySelectorAll('.tabs-nav').forEach(nav => {
    const buttons = nav.querySelectorAll('.tab-btn');
    const container = nav.closest('.tabs-container') || nav.parentElement;

    buttons.forEach(btn => {
      btn.addEventListener('click', function () {
        buttons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const targetId = this.getAttribute('data-tab');
        if (targetId && container) {
          const panes = container.querySelectorAll('.tab-pane');
          panes.forEach(p => p.classList.remove('active'));
          const activePane = container.querySelector('#' + targetId);
          if (activePane) activePane.classList.add('active');
        }
      });
    });
  });

  // 3. Accordions
  document.querySelectorAll('.accordion-trigger').forEach(trigger => {
    trigger.addEventListener('click', function () {
      const item = this.closest('.accordion-item');
      if (!item) return;

      const isAlreadyActive = item.classList.contains('active');
      const parentAccordion = item.closest('.accordion');

      // If single-open accordion:
      if (parentAccordion && !parentAccordion.hasAttribute('data-multi-expand')) {
        parentAccordion.querySelectorAll('.accordion-item').forEach(other => {
          other.classList.remove('active');
        });
      }

      if (!isAlreadyActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });

  // 4. Newsletter forms
  document.querySelectorAll('.newsletter-form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');
      if (input) {
        const val = input.value.trim();
        if (!val) {
          showToast('Please enter your email address.', 'error');
          if (window.Validation) Validation.showError(input, 'Email address is required.');
          return;
        }
        if (window.Validation && !window.Validation.isValidEmail(val)) {
          showToast('Please enter a valid email address (e.g. name@domain.com).', 'error');
          Validation.showError(input, 'Please enter a valid email address.');
          return;
        }
        if (window.Validation) Validation.clearError(input);
        showToast('Thank you for subscribing to our Co-Op newsletter!', 'success');
        input.value = '';
      }
    });
  });

  // 5. Current Year
  const yearEls = document.querySelectorAll('.current-year');
  const nowYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = nowYear);

  // 6. Sticky Navbar Scroll Enhancement
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 7. Accessible ESC Key to close open Modals, Drawers, or Dropdowns
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m.id));
      const drawer = document.querySelector('.mobile-drawer.open');
      const overlay = document.querySelector('.mobile-drawer-overlay.open');
      if (drawer) drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
        w.classList.remove('open');
        const t = w.querySelector('.custom-select-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
      document.body.style.overflow = '';
    }
  });

  // 8. Global Click to Close Custom Dropdowns
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.custom-select-wrapper')) {
      document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
        w.classList.remove('open');
        const t = w.querySelector('.custom-select-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // 9. Modern Custom Select Component Initializer
  initCustomSelects();
});

function initCustomSelects() {
  document.querySelectorAll('select.form-select, select.custom-select').forEach(select => {
    if (select.closest('.custom-select-wrapper') || select.dataset.customized === 'true') return;
    if (select.classList.contains('no-custom')) return;

    select.dataset.customized = 'true';

    const wrapper = document.createElement('div');
    wrapper.className = 'custom-select-wrapper';

    // Insert wrapper before select and move select inside
    select.parentNode.insertBefore(wrapper, select);
    wrapper.appendChild(select);
    select.classList.add('custom-select-native-hidden');
    select.tabIndex = -1;

    // Create trigger button
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'custom-select-trigger';
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');

    const labelSpan = document.createElement('span');
    labelSpan.className = 'custom-select-label';
    const selectedOption = select.options[select.selectedIndex] || select.options[0];
    labelSpan.textContent = selectedOption ? selectedOption.textContent : 'Select option...';

    const chevron = document.createElement('span');
    chevron.className = 'custom-select-chevron';
    chevron.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="6 9 12 15 18 9"/></svg>`;

    trigger.appendChild(labelSpan);
    trigger.appendChild(chevron);
    wrapper.appendChild(trigger);

    // Create dropdown menu
    const dropdown = document.createElement('div');
    dropdown.className = 'custom-select-dropdown';
    dropdown.setAttribute('role', 'listbox');

    function buildOptions() {
      dropdown.innerHTML = '';
      Array.from(select.options).forEach(opt => {
        const optionEl = document.createElement('div');
        optionEl.className = 'custom-select-option' + (opt.selected ? ' selected' : '');
        optionEl.setAttribute('role', 'option');
        optionEl.setAttribute('data-value', opt.value);
        optionEl.setAttribute('aria-selected', opt.selected ? 'true' : 'false');

        const textSpan = document.createElement('span');
        textSpan.textContent = opt.textContent;

        const checkSvg = document.createElement('span');
        checkSvg.className = 'option-check';
        checkSvg.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><polyline points="20 6 9 17 4 12"/></svg>`;

        optionEl.appendChild(textSpan);
        optionEl.appendChild(checkSvg);

        optionEl.addEventListener('click', (e) => {
          e.stopPropagation();
          select.value = opt.value;
          labelSpan.textContent = opt.textContent;

          dropdown.querySelectorAll('.custom-select-option').forEach(o => {
            o.classList.remove('selected');
            o.setAttribute('aria-selected', 'false');
          });
          optionEl.classList.add('selected');
          optionEl.setAttribute('aria-selected', 'true');

          wrapper.classList.remove('open');
          trigger.setAttribute('aria-expanded', 'false');

          // Trigger change event on native select so other scripts update
          select.dispatchEvent(new Event('change', { bubbles: true }));
        });

        dropdown.appendChild(optionEl);
      });

      const activeOpt = select.options[select.selectedIndex];
      if (activeOpt) {
        labelSpan.textContent = activeOpt.textContent;
      }
    }

    buildOptions();
    wrapper.appendChild(dropdown);

    // Observe changes to select options dynamically
    const observer = new MutationObserver(() => {
      buildOptions();
    });
    observer.observe(select, { childList: true, subtree: true });

    // Listen to programmatic value change on native select
    select.addEventListener('change', () => {
      const currentOpt = select.options[select.selectedIndex];
      if (currentOpt) {
        labelSpan.textContent = currentOpt.textContent;
        dropdown.querySelectorAll('.custom-select-option').forEach(o => {
          const isSel = o.getAttribute('data-value') === currentOpt.value;
          o.classList.toggle('selected', isSel);
          o.setAttribute('aria-selected', isSel ? 'true' : 'false');
        });
      }
    });

    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrapper.classList.contains('open');

      // Close all other open dropdowns
      document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
        if (w !== wrapper) {
          w.classList.remove('open');
          const t = w.querySelector('.custom-select-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        wrapper.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        wrapper.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        const sel = dropdown.querySelector('.custom-select-option.selected');
        if (sel) sel.scrollIntoView({ block: 'nearest' });
      }
    });
  });
}

window.showToast = showToast;
window.openModal = openModal;
window.closeModal = closeModal;
window.initCustomSelects = initCustomSelects;

