/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Classes Management & Rendering
 */

document.addEventListener('DOMContentLoaded', function () {
  const classesGrid = document.getElementById('classes-grid');
  const classSearchInput = document.getElementById('class-search-input');
  const classGradeFilter = document.getElementById('class-grade-filter');
  const classCategoryFilter = document.getElementById('class-category-filter');

  // Check if CLASSES_DATA is loaded
  if (typeof CLASSES_DATA === 'undefined') return;

  let activeCategory = 'all';
  let activeGrade = 'all';
  let searchQuery = '';

  function createClassCardHTML(cls, isDashboard = false) {
    const detailLink = isDashboard ? `class-details.html?id=${cls.id}` : (window.getPagePath ? window.getPagePath(`class-details.html?id=${cls.id}`) : `class-details.html?id=${cls.id}`);
    const imgSrc = window.getAssetPath ? window.getAssetPath(cls.image) : cls.image;
    const pct = Math.round((cls.enrolledCount / cls.maxCapacity) * 100);
    const isHigh = pct >= 80;

    return `
      <div class="class-card animate-fade-in" data-category="${cls.category}" data-grade="${cls.gradeCategory}">
        <div class="class-card-media">
          <img src="${imgSrc}" alt="${cls.title}" loading="lazy" />
          <div class="class-badge-overlay">
            <span class="badge badge-blue">${cls.gradeLevel}</span>
          </div>
        </div>
        <div class="class-card-content">
          <div class="class-category-tag">${cls.category}</div>
          <h3 class="class-card-title">
            <a href="${detailLink}">${cls.title}</a>
          </h3>
          <p class="class-card-desc">${cls.shortDescription}</p>
          
          <div class="class-meta-list">
            <div class="class-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>${cls.schedule}</span>
            </div>
            <div class="class-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>${cls.instructorName}</span>
            </div>
          </div>

          <div class="class-capacity-bar-wrapper">
            <div class="class-capacity-header">
              <span>Class Capacity</span>
              <span><strong>${cls.enrolledCount}</strong> / ${cls.maxCapacity} Seats</span>
            </div>
            <div class="class-capacity-bar">
              <div class="class-capacity-fill ${isHigh ? 'high' : ''}" style="width: ${pct}%"></div>
            </div>
          </div>

          <div class="class-card-footer">
            <div class="class-tuition">${cls.tuition}</div>
            <a href="${detailLink}" class="btn btn-primary btn-sm">View Details</a>
          </div>
        </div>
      </div>
    `;
  }

  function renderClasses() {
    if (!classesGrid) return;

    let filtered = CLASSES_DATA;

    // Filter by search
    if (searchQuery) {
      filtered = SearchFilter.filterBySearch(filtered, searchQuery, ['title', 'shortDescription', 'category', 'instructorName']);
    }

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(c => c.category.toLowerCase().includes(activeCategory.toLowerCase()));
    }

    // Filter by grade
    if (activeGrade !== 'all') {
      filtered = filtered.filter(c => c.gradeCategory === activeGrade || c.gradeCategory === 'all');
    }

    if (filtered.length === 0) {
      classesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--color-bg-secondary); border-radius: 16px; border: 1px dashed var(--color-border);">
          <h4 style="font-size: 1.25rem; margin-bottom: 8px;">No matching classes found</h4>
          <p style="color: var(--color-text-secondary); margin-bottom: 16px;">Try adjusting your keyword search or grade filter.</p>
          <button id="btn-reset-class-filter" class="btn btn-secondary btn-sm">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-class-filter');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (classSearchInput) classSearchInput.value = '';
          searchQuery = '';
          activeCategory = 'all';
          activeGrade = 'all';
          if (classGradeFilter) { classGradeFilter.value = 'all'; classGradeFilter.dispatchEvent(new Event('change')); }
          if (classCategoryFilter) { classCategoryFilter.value = 'all'; classCategoryFilter.dispatchEvent(new Event('change')); }
          document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
          const allPill = document.querySelector('.filter-pill[data-filter="all"]');
          if (allPill) allPill.classList.add('active');
          renderClasses();
        });
      }
      return;
    }

    const isDashboard = window.location.pathname.includes('/dashboard/');
    classesGrid.innerHTML = filtered.map(cls => createClassCardHTML(cls, isDashboard)).join('');
  }

  // Bind Events
  if (classSearchInput) {
    classSearchInput.addEventListener('input', function () {
      searchQuery = this.value;
      renderClasses();
    });
  }

  if (classGradeFilter) {
    classGradeFilter.addEventListener('change', function () {
      activeGrade = this.value;
      renderClasses();
    });
  }

  if (classCategoryFilter) {
    classCategoryFilter.addEventListener('change', function () {
      activeCategory = this.value;
      renderClasses();
    });
  }

  // Setup Category Pills if present
  SearchFilter.setupPillFilters('#class-category-pills', function (val) {
    activeCategory = val;
    renderClasses();
  });

  // Initial render
  renderClasses();

  // -------------------------------------------------------------
  // Class Details Page Dynamic Hydration
  // -------------------------------------------------------------
  const classDetailRoot = document.getElementById('class-detail-container');
  if (classDetailRoot) {
    const urlParams = new URLSearchParams(window.location.search);
    const classId = urlParams.get('id') || 'science-lab';
    const cls = CLASSES_DATA.find(c => c.id === classId) || CLASSES_DATA[0];

    if (cls) {
      document.title = `${cls.title} – LearnSpace Co-Op`;

      const titleEl = document.getElementById('detail-class-title');
      if (titleEl) titleEl.textContent = cls.title;

      const categoryEl = document.getElementById('detail-class-category');
      if (categoryEl) categoryEl.textContent = cls.category;

      const gradeEl = document.getElementById('detail-class-grade');
      if (gradeEl) gradeEl.textContent = cls.gradeLevel;

      const ageEl = document.getElementById('detail-class-age');
      if (ageEl) ageEl.textContent = cls.ageRange;

      const descEl = document.getElementById('detail-class-overview');
      if (descEl) descEl.textContent = cls.overview;

      const tuitionEl = document.getElementById('detail-class-tuition');
      if (tuitionEl) tuitionEl.textContent = cls.tuition;

      const scheduleEl = document.getElementById('detail-class-schedule');
      if (scheduleEl) scheduleEl.textContent = cls.schedule;

      const roomEl = document.getElementById('detail-class-room');
      if (roomEl) roomEl.textContent = cls.room;

      const instructorEl = document.getElementById('detail-class-instructor');
      if (instructorEl) instructorEl.textContent = cls.instructorName;

      const imgEl = document.getElementById('detail-class-image');
      if (imgEl) {
        imgEl.src = window.getAssetPath ? window.getAssetPath(cls.image) : cls.image;
        imgEl.alt = cls.title;
      }

      // Render Syllabus
      const syllabusList = document.getElementById('detail-syllabus-list');
      if (syllabusList && cls.syllabus) {
        syllabusList.innerHTML = cls.syllabus.map(s => `
          <div class="syllabus-week-item">
            <div class="syllabus-week-num">Week ${s.week}</div>
            <div class="syllabus-week-text">
              <h5>${s.title}</h5>
              <p>${s.topic}</p>
            </div>
          </div>
        `).join('');
      }

      // Render Learning Outcomes
      const outcomesList = document.getElementById('detail-outcomes-list');
      if (outcomesList && cls.learningOutcomes) {
        outcomesList.innerHTML = cls.learningOutcomes.map(o => `
          <li style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" style="flex-shrink:0; margin-top:2px;">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${o}</span>
          </li>
        `).join('');
      }

      // Enrollment Trigger Button
      const enrollBtn = document.getElementById('btn-trigger-enroll');
      if (enrollBtn) {
        enrollBtn.addEventListener('click', function () {
          // Open enrollment modal and populate children select
          const childSelect = document.getElementById('enroll-child-select');
          if (childSelect && window.StorageService) {
            const children = window.StorageService.getChildren();
            childSelect.innerHTML = children.map(c => `
              <option value="${c.id}">${c.name} (${c.grade})</option>
            `).join('');
          }
          openModal('modal-enroll-class');
        });
      }

      // Handle Enrollment Submission in Modal
      const enrollForm = document.getElementById('form-confirm-enroll');
      if (enrollForm) {
        enrollForm.addEventListener('submit', function (e) {
          e.preventDefault();
          const childSelect = document.getElementById('enroll-child-select');
          if (!childSelect) return;
          const childId = childSelect.value;
          
          const result = window.StorageService.addEnrollment(childId, cls);
          closeModal('modal-enroll-class');
          
          if (result.success) {
            showToast(`Enrollment successful! ${result.enrollment.childName} is registered for ${cls.title}.`, 'success');
          } else {
            showToast(result.message, 'error');
          }
        });
      }
    }
  }
});
