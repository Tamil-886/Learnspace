/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Theme Switcher (Dark/Light Mode)
 */

(function () {
  const THEME_KEY = 'learnspace_theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) {
      return saved;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    // Update logos if available
    const darkLogos = document.querySelectorAll('.logo-img-dark');
    const lightLogos = document.querySelectorAll('.logo-img-light');

    if (theme === 'dark') {
      darkLogos.forEach(el => el.style.display = 'none');
      lightLogos.forEach(el => el.style.display = 'block');
    } else {
      darkLogos.forEach(el => el.style.display = 'block');
      lightLogos.forEach(el => el.style.display = 'none');
    }
  }

  // Apply immediately to prevent flash
  applyTheme(getPreferredTheme());

  document.addEventListener('DOMContentLoaded', function () {
    // Re-apply to update DOM elements like logos that weren't present in <head>
    applyTheme(getPreferredTheme());

    const toggleButtons = document.querySelectorAll('.theme-toggle-btn');

    toggleButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
      });
    });
  });

  window.LearnSpaceTheme = {
    get: () => document.documentElement.getAttribute('data-theme') || 'light',
    set: applyTheme
  };
})();
