/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Events & Calendar Management
 */

document.addEventListener('DOMContentLoaded', function () {
  const eventsGrid = document.getElementById('events-grid');
  const eventSearchInput = document.getElementById('event-search-input');
  const eventCategoryFilter = document.getElementById('event-category-filter');

  if (typeof EVENTS_DATA === 'undefined') return;

  let activeCategory = 'all';
  let searchQuery = '';

  function createEventCardHTML(evt, isDashboard = false) {
    const detailLink = isDashboard ? `event-details.html?id=${evt.id}` : (window.getPagePath ? window.getPagePath(`event-details.html?id=${evt.id}`) : `event-details.html?id=${evt.id}`);
    const imgSrc = window.getAssetPath ? window.getAssetPath(evt.image) : evt.image;

    return `
      <div class="card card-interactive animate-fade-in" style="display:flex; flex-direction:column; height:100%;">
        <div style="height:180px; overflow:hidden;">
          <img src="${imgSrc}" alt="${evt.title}" style="width:100%; height:100%; object-fit:cover;" loading="lazy" />
        </div>
        <div class="card-body" style="display:flex; flex-direction:column; flex:1;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span class="badge badge-blue">${evt.category}</span>
            <span style="font-size:0.75rem; color:var(--color-primary); font-weight:700;">${evt.date}</span>
          </div>
          <h3 style="font-size:1.15rem; margin-bottom:8px;">
            <a href="${detailLink}">${evt.title}</a>
          </h3>
          <p style="font-size:0.875rem; color:var(--color-text-secondary); line-height:1.4; margin-bottom:12px; flex:1;">
            ${evt.shortDescription}
          </p>
          <div style="font-size:0.75rem; color:var(--color-text-muted); margin-bottom:16px;">
            <div>📍 ${evt.location}</div>
            <div>⏰ ${evt.time}</div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:12px; border-top:1px solid var(--color-border);">
            <span style="font-size:0.75rem; color:var(--color-text-secondary);"><strong>${evt.rsvpCount}</strong> attending</span>
            <a href="${detailLink}" class="btn btn-outline btn-sm">Event Details</a>
          </div>
        </div>
      </div>
    `;
  }

  function renderEvents() {
    if (!eventsGrid) return;

    let filtered = EVENTS_DATA;

    if (searchQuery) {
      filtered = SearchFilter.filterBySearch(filtered, searchQuery, ['title', 'description', 'category', 'location']);
    }

    if (activeCategory !== 'all') {
      filtered = filtered.filter(e => e.category.toLowerCase().includes(activeCategory.toLowerCase()));
    }

    const isDashboard = window.location.pathname.includes('/dashboard/');
    eventsGrid.innerHTML = filtered.map(e => createEventCardHTML(e, isDashboard)).join('');
  }

  if (eventSearchInput) {
    eventSearchInput.addEventListener('input', function () {
      searchQuery = this.value;
      renderEvents();
    });
  }

  if (eventCategoryFilter) {
    eventCategoryFilter.addEventListener('change', function () {
      activeCategory = this.value;
      renderEvents();
    });
  }

  SearchFilter.setupPillFilters('#event-category-pills', function (val) {
    activeCategory = val;
    renderEvents();
  });

  renderEvents();

  // -------------------------------------------------------------
  // Event Details Page Hydration
  // -------------------------------------------------------------
  const eventDetailRoot = document.getElementById('event-detail-container');
  if (eventDetailRoot) {
    const urlParams = new URLSearchParams(window.location.search);
    const evtId = urlParams.get('id') || 'annual-stem-expo';
    const evt = EVENTS_DATA.find(e => e.id === evtId) || EVENTS_DATA[0];

    if (evt) {
      document.title = `${evt.title} – LearnSpace Events`;

      const titleEl = document.getElementById('evt-detail-title');
      if (titleEl) titleEl.textContent = evt.title;

      const dateEl = document.getElementById('evt-detail-date');
      if (dateEl) dateEl.textContent = evt.date;

      const timeEl = document.getElementById('evt-detail-time');
      if (timeEl) timeEl.textContent = evt.time;

      const locEl = document.getElementById('evt-detail-location');
      if (locEl) locEl.textContent = evt.location;

      const descEl = document.getElementById('evt-detail-desc');
      if (descEl) descEl.textContent = evt.description;

      const imgEl = document.getElementById('evt-detail-image');
      if (imgEl) {
        imgEl.src = window.getAssetPath ? window.getAssetPath(evt.image) : evt.image;
        imgEl.alt = evt.title;
      }

      const agendaList = document.getElementById('evt-detail-agenda');
      if (agendaList && evt.agenda) {
        agendaList.innerHTML = evt.agenda.map(a => `
          <div style="display:flex; gap:16px; padding:12px 0; border-bottom:1px solid var(--color-border);">
            <div style="font-weight:700; color:var(--color-primary); min-width:85px; font-size:0.875rem;">${a.time}</div>
            <div style="font-size:0.875rem;">${a.item}</div>
          </div>
        `).join('');
      }

      // RSVP Button
      const rsvpBtn = document.getElementById('btn-rsvp-event');
      if (rsvpBtn) {
        rsvpBtn.addEventListener('click', function () {
          evt.rsvpCount++;
          showToast(`RSVP Confirmed for ${evt.title}! See you there.`, 'success');
          this.textContent = '✓ You are Attending';
          this.classList.remove('btn-primary');
          this.classList.add('btn-secondary');
          this.disabled = true;
        });
      }
    }
  }
});
