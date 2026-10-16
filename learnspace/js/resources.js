/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Resource Center Catalog & Lending Management
 */

document.addEventListener('DOMContentLoaded', function () {
  const resourcesGrid = document.getElementById('resources-grid');
  const resourceSearchInput = document.getElementById('resource-search-input');
  const resourceCategoryFilter = document.getElementById('resource-category-filter');
  const resourceFormatFilter = document.getElementById('resource-format-filter');

  if (typeof RESOURCES_DATA === 'undefined') return;

  let activeCategory = 'all';
  let activeFormat = 'all';
  let searchQuery = '';

  function createResourceCardHTML(res, isSaved) {
    const isDashboard = window.location.pathname.includes('/dashboard/');
    const detailLink = isDashboard ? `resource-details.html?id=${res.id}` : (window.getPagePath ? window.getPagePath(`resource-details.html?id=${res.id}`) : `resource-details.html?id=${res.id}`);
    const imgSrc = window.getAssetPath ? window.getAssetPath(res.image) : res.image;

    return `
      <div class="resource-card animate-fade-in" data-id="${res.id}">
        <div class="resource-media">
          <img src="${imgSrc}" alt="${res.title}" loading="lazy" />
        </div>
        <div class="resource-card-body">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span class="badge badge-blue">${res.category}</span>
            <button class="btn-save-resource" data-id="${res.id}" style="background:none; border:none; color: ${isSaved ? '#EF4444' : 'var(--color-text-muted)'}; cursor:pointer; font-size: 1.2rem;">
              ${isSaved ? '★' : '☆'}
            </button>
          </div>
          <h4><a href="${detailLink}">${res.title}</a></h4>
          <p style="font-size: 0.825rem; color: var(--color-text-secondary); line-height: 1.4; margin-bottom: 12px; flex-grow: 1;">
            ${res.description.substring(0, 110)}...
          </p>
          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 16px; display: flex; justify-content: space-between;">
            <span>Format: <strong>${res.format}</strong></span>
            <span>★ ${res.rating} (${res.reviewsCount})</span>
          </div>
          <div style="display: flex; gap: 8px;">
            <a href="${detailLink}" class="btn btn-secondary btn-sm" style="flex: 1;">Details</a>
            ${res.downloadable ? `
              <button class="btn btn-primary btn-sm btn-download-demo" data-id="${res.id}" style="flex: 1;">Download</button>
            ` : `
              <button class="btn btn-primary btn-sm btn-borrow-demo" data-id="${res.id}" style="flex: 1;">Borrow Kit</button>
            `}
          </div>
        </div>
      </div>
    `;
  }

  function renderResources() {
    if (!resourcesGrid) return;

    let filtered = RESOURCES_DATA;
    const savedList = window.StorageService ? window.StorageService.getSavedResources() : [];

    // Filter by search
    if (searchQuery) {
      filtered = SearchFilter.filterBySearch(filtered, searchQuery, ['title', 'description', 'category', 'subject']);
    }

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(r => r.category.toLowerCase().includes(activeCategory.toLowerCase()));
    }

    // Filter by format
    if (activeFormat !== 'all') {
      filtered = filtered.filter(r => r.format.toLowerCase().includes(activeFormat.toLowerCase()));
    }

    // If on saved resources tab
    if (document.body.getAttribute('data-view-saved') === 'true') {
      filtered = filtered.filter(r => savedList.includes(r.id));
    }

    if (filtered.length === 0) {
      resourcesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--color-bg-secondary); border-radius: 16px; border: 1px dashed var(--color-border);">
          <h4 style="font-size: 1.25rem; margin-bottom: 8px;">No matching resources found</h4>
          <p style="color: var(--color-text-secondary); margin-bottom: 16px;">Try adjusting your keyword search or category filter.</p>
        </div>
      `;
      return;
    }

    resourcesGrid.innerHTML = filtered.map(r => createResourceCardHTML(r, savedList.includes(r.id))).join('');

    // Bind Bookmark Save Buttons
    document.querySelectorAll('.btn-save-resource').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        const isNowSaved = window.StorageService.toggleSaveResource(id);
        this.innerHTML = isNowSaved ? '★' : '☆';
        this.style.color = isNowSaved ? '#EF4444' : 'var(--color-text-muted)';
        showToast(isNowSaved ? 'Resource added to your saved list!' : 'Resource removed from saved list.', 'info');
      });
    });

    // Bind Download Buttons
    document.querySelectorAll('.btn-download-demo').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        const res = RESOURCES_DATA.find(r => r.id === id);
        showToast(`Downloading demo curriculum file: ${res.title}...`, 'success');
      });
    });

    // Bind Borrow Buttons
    document.querySelectorAll('.btn-borrow-demo').forEach(btn => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('data-id');
        const res = RESOURCES_DATA.find(r => r.id === id);
        if (confirm(`Reserve "${res.title}" for pickup at the Resource Center Room B? Loan period is 3 weeks.`)) {
          showToast(`Kit reserved! Your confirmation code is #RES-${Math.floor(1000 + Math.random() * 9000)}. Pickup at desk.`, 'success');
        }
      });
    });
  }

  // Bind Filters
  if (resourceSearchInput) {
    resourceSearchInput.addEventListener('input', function () {
      searchQuery = this.value;
      renderResources();
    });
  }

  if (resourceCategoryFilter) {
    resourceCategoryFilter.addEventListener('change', function () {
      activeCategory = this.value;
      renderResources();
    });
  }

  if (resourceFormatFilter) {
    resourceFormatFilter.addEventListener('change', function () {
      activeFormat = this.value;
      renderResources();
    });
  }

  SearchFilter.setupPillFilters('#resource-category-pills', function (val) {
    activeCategory = val;
    renderResources();
  });

  renderResources();

  // -------------------------------------------------------------
  // Resource Details View Hydration
  // -------------------------------------------------------------
  const resourceDetailRoot = document.getElementById('resource-detail-container');
  if (resourceDetailRoot) {
    const urlParams = new URLSearchParams(window.location.search);
    const resId = urlParams.get('id') || 'curriculum-guide';
    const res = RESOURCES_DATA.find(r => r.id === resId) || RESOURCES_DATA[0];

    if (res) {
      document.title = `${res.title} – LearnSpace Resource Center`;

      const titleEl = document.getElementById('res-detail-title');
      if (titleEl) titleEl.textContent = res.title;

      const categoryEl = document.getElementById('res-detail-category');
      if (categoryEl) categoryEl.textContent = res.category;

      const formatEl = document.getElementById('res-detail-format');
      if (formatEl) formatEl.textContent = res.format;

      const descEl = document.getElementById('res-detail-desc');
      if (descEl) descEl.textContent = res.description;

      const imgEl = document.getElementById('res-detail-image');
      if (imgEl) {
        imgEl.src = window.getAssetPath ? window.getAssetPath(res.image) : res.image;
        imgEl.alt = res.title;
      }

      // Specs list
      const specsList = document.getElementById('res-detail-specs');
      if (specsList && res.specs) {
        specsList.innerHTML = Object.entries(res.specs).map(([k, v]) => `
          <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--color-border); font-size:0.875rem;">
            <span style="color:var(--color-text-secondary); text-transform:capitalize;">${k}:</span>
            <strong>${Array.isArray(v) ? v.join(', ') : v}</strong>
          </div>
        `).join('');
      }

      // Contents list
      const contentsList = document.getElementById('res-detail-contents');
      if (contentsList && res.contents) {
        contentsList.innerHTML = res.contents.map(c => `
          <li style="margin-bottom:8px; display:flex; align-items:flex-start; gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" style="flex-shrink:0; margin-top:2px;">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${c}</span>
          </li>
        `).join('');
      }

      // Action Button
      const actionBtn = document.getElementById('res-detail-action-btn');
      if (actionBtn) {
        actionBtn.textContent = res.downloadable ? 'Download Complete PDF' : 'Reserve Physical Kit';
        actionBtn.addEventListener('click', function () {
          if (res.downloadable) {
            showToast(`Downloading "${res.title}" (${res.fileSize})...`, 'success');
          } else {
            showToast(`Kit reserved! Pickup ready at Resource Center Room B.`, 'success');
          }
        });
      }
    }
  }
});
