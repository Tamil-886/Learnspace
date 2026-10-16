/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Text Direction Switcher (LTR / RTL)
 */

(function () {
  const DIR_KEY = 'learnspace_direction';

  function getPreferredDirection() {
    return localStorage.getItem(DIR_KEY) || 'ltr';
  }

  function applyDirection(dir) {
    document.documentElement.setAttribute('dir', dir);
    localStorage.setItem(DIR_KEY, dir);

    const toggleButtons = document.querySelectorAll('.dir-toggle-btn');
    toggleButtons.forEach(btn => {
      const textSpan = btn.querySelector('.dir-label') || btn;
      if (dir === 'rtl') {
        textSpan.textContent = 'LTR';
      } else {
        textSpan.textContent = 'RTL';
      }
    });
  }

  // Apply immediately
  applyDirection(getPreferredDirection());

  document.addEventListener('DOMContentLoaded', function () {
    const toggleButtons = document.querySelectorAll('.dir-toggle-btn');

    toggleButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        applyDirection(newDir);
      });
    });
  });

  window.LearnSpaceDir = {
    get: () => document.documentElement.getAttribute('dir') || 'ltr',
    set: applyDirection
  };
})();
