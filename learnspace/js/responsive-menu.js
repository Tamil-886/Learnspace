/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Responsive Mobile Navigation, Drawer & Dashboard Sidebar Handler
 */

document.addEventListener('DOMContentLoaded', function () {
  // -------------------------------------------------------------
  // 1. Website Public Mobile Off-Canvas Drawer
  // -------------------------------------------------------------
  const publicToggles = document.querySelectorAll('.mobile-nav-toggle:not(.dashboard-sidebar-toggle)');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
  const drawerCloseBtn = document.querySelector('.mobile-drawer-close');

  function openDrawer() {
    if (mobileDrawer) mobileDrawer.classList.add('open');
    if (drawerOverlay) drawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    if (drawerOverlay) drawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  publicToggles.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      openDrawer();
    });
  });

  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  // Close drawer when clicking a mobile nav link
  if (mobileDrawer) {
    const mobileLinks = mobileDrawer.querySelectorAll('.mobile-nav-link, .mobile-drawer-actions a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // -------------------------------------------------------------
  // 2. Parent Dashboard Mobile Sidebar & Backdrop
  // -------------------------------------------------------------
  const sidebarToggles = document.querySelectorAll('.dashboard-sidebar-toggle');
  const sidebar = document.querySelector('.dashboard-sidebar');

  if (sidebar) {
    // Create backdrop overlay if not already present in DOM
    let sidebarOverlay = document.querySelector('.dashboard-sidebar-overlay');
    if (!sidebarOverlay) {
      sidebarOverlay = document.createElement('div');
      sidebarOverlay.className = 'dashboard-sidebar-overlay';
      document.body.appendChild(sidebarOverlay);
    }

    function openSidebar() {
      sidebar.classList.add('mobile-open');
      if (sidebarOverlay) sidebarOverlay.classList.add('active');
      document.body.classList.add('dashboard-sidebar-open');
    }

    function closeSidebar() {
      sidebar.classList.remove('mobile-open');
      if (sidebarOverlay) sidebarOverlay.classList.remove('active');
      document.body.classList.remove('dashboard-sidebar-open');
    }

    function toggleSidebar() {
      if (sidebar.classList.contains('mobile-open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }

    sidebarToggles.forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleSidebar();
      });
    });

    if (sidebarOverlay) {
      sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Close on clicking links inside the sidebar when on mobile
    const sidebarLinks = sidebar.querySelectorAll('.sidebar-link, .sidebar-exit-btn');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 912) {
          closeSidebar();
        }
      });
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', function (e) {
      if (window.innerWidth <= 912 && 
          !sidebar.contains(e.target) && 
          sidebar.classList.contains('mobile-open')) {
        let isToggleClick = false;
        sidebarToggles.forEach(t => {
          if (t.contains(e.target)) isToggleClick = true;
        });
        if (!isToggleClick) {
          closeSidebar();
        }
      }
    });

    // Resize handler to clean up open states
    window.addEventListener('resize', function () {
      if (window.innerWidth > 912 && sidebar.classList.contains('mobile-open')) {
        closeSidebar();
      }
    });
  }

  // -------------------------------------------------------------
  // 3. Global Keyboard Accessibility (Escape key closes open menus)
  // -------------------------------------------------------------
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDrawer();
      if (sidebar && sidebar.classList.contains('mobile-open')) {
        sidebar.classList.remove('mobile-open');
        const overlay = document.querySelector('.dashboard-sidebar-overlay');
        if (overlay) overlay.classList.remove('active');
        document.body.classList.remove('dashboard-sidebar-open');
      }
    }
  });
});
