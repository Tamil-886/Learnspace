/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Navigation & Active Link Manager
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Highlight Active Nav Links
  const currentPath = window.location.pathname.toLowerCase().replace(/\\/g, '/');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .sidebar-link');
  const isCurrentInDashboard = currentPath.includes('/dashboard/');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#' || href.startsWith('javascript:')) return;

    const isDashboardLink = href.includes('dashboard/');

    // Never highlight dashboard link on public pages, or public link on dashboard pages
    if (isDashboardLink !== isCurrentInDashboard) {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
      return;
    }

    // Normalize href
    const cleanHref = href.split('/').pop().toLowerCase();
    const cleanCurrent = currentPath.split('/').pop().toLowerCase() || 'index.html';

    if (cleanHref === cleanCurrent || (cleanHref === 'index.html' && cleanCurrent === '')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');

      // If inside dropdown, mark parent active
      const parentDropdown = link.closest('.nav-dropdown');
      if (parentDropdown) {
        const toggle = parentDropdown.querySelector('.nav-link');
        if (toggle) toggle.classList.add('active');
      }
    }
  });

  // 2. Navbar Scroll Shadow Effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
        navbar.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.08)';
      } else {
        navbar.classList.remove('scrolled');
        navbar.style.boxShadow = 'none';
      }
    }, { passive: true });
  }

  // 3. Dropdown Keyboard Accessibility
  const dropdownToggles = document.querySelectorAll('.nav-dropdown > .nav-link');
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const parent = this.closest('.nav-dropdown');
        parent.classList.toggle('active');
      }
    });
  });
});
