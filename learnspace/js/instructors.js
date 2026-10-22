/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Faculty Directory & Profile Details Page Handler
 */

document.addEventListener('DOMContentLoaded', function () {
  // Check if INSTRUCTORS_DATA is loaded
  if (typeof INSTRUCTORS_DATA === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);

  // -------------------------------------------------------------
  // 1. Directory Page Handler (pages/instructors.html)
  // -------------------------------------------------------------
  const instructorsGrid = document.getElementById('instructors-grid');
  if (instructorsGrid) {
    renderInstructorsDirectory(instructorsGrid);
  }

  // -------------------------------------------------------------
  // 2. Instructor Profile Page Handler (pages/instructor-details.html)
  // -------------------------------------------------------------
  const instructorDetailContainer = document.getElementById('instructor-detail-container');
  if (instructorDetailContainer) {
    renderInstructorDetailsPage(urlParams);
  }
});

/**
 * Render the Faculty Directory Grid (instructors.html)
 */
function renderInstructorsDirectory(gridEl) {
  gridEl.innerHTML = INSTRUCTORS_DATA.map(inst => {
    const avatarSrc = window.getAssetPath ? window.getAssetPath(inst.avatar) : inst.avatar;
    const detailLink = `instructor-details.html?id=${inst.id}`;
    const subjectBadges = inst.subjects.slice(0, 3).map(s => `
      <span class="badge badge-secondary">${s}</span>
    `).join('');

    return `
      <div class="instructor-card animate-fade-in">
        <div class="instructor-avatar-wrap">
          <div class="instructor-avatar-inner">
            <img src="${avatarSrc}" alt="${inst.name}" loading="lazy" class="instructor-avatar-img" />
            <span class="badge badge-primary instructor-exp-badge">
              ${inst.experience} Exp
            </span>
          </div>
        </div>
        <div class="instructor-card-body">
          <div class="instructor-role">${inst.title}</div>
          <h3 class="instructor-name">
            <a href="${detailLink}">${inst.name}</a>
          </h3>
          <p class="instructor-bio">
            ${inst.shortBio || (inst.bio && inst.bio[0])}
          </p>

          <div class="instructor-badges">
            ${subjectBadges}
          </div>

          <div class="instructor-meta">
            <span class="instructor-rating">★ <strong>${inst.rating}</strong> (${inst.reviewCount} Reviews)</span>
            <span class="instructor-desk" title="${inst.desk || 'Oakwood Co-Op Campus'}">📍 ${inst.desk ? inst.desk.split('Room')[0].trim() : 'Campus'}</span>
          </div>

          <a href="${detailLink}" class="btn btn-outline btn-sm btn-block instructor-btn">
            View Full Profile
          </a>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Hydrate the Faculty Profile Page (instructor-details.html)
 */
function renderInstructorDetailsPage(urlParams) {
  const instructorId = urlParams.get('id') || 'dr-sarah-chen';
  let inst = INSTRUCTORS_DATA.find(i => i.id === instructorId);
  
  if (!inst) {
    inst = INSTRUCTORS_DATA[0];
  }

  // Update Page Title
  document.title = `${inst.name} – Faculty Profile | LearnSpace Co-Op`;

  // Update Breadcrumbs
  const breadcrumbEl = document.getElementById('breadcrumb-instructor-name');
  if (breadcrumbEl) breadcrumbEl.textContent = inst.name;

  // Update Page Hero Banner
  const bannerTitle = document.getElementById('detail-instructor-name');
  if (bannerTitle) bannerTitle.textContent = inst.name;

  const bannerTagline = document.getElementById('detail-instructor-tagline');
  if (bannerTagline) {
    bannerTagline.textContent = `${inst.title} • ${inst.role}`;
  }

  // Update Sidebar Info
  const avatarImg = document.getElementById('detail-instructor-avatar');
  if (avatarImg) {
    avatarImg.src = window.getAssetPath ? window.getAssetPath(inst.avatar) : inst.avatar;
    avatarImg.alt = inst.name;
  }

  const expBadge = document.getElementById('detail-sidebar-exp-badge');
  if (expBadge) expBadge.textContent = `${inst.experience} Experience`;

  const sidebarName = document.getElementById('detail-sidebar-name');
  if (sidebarName) sidebarName.textContent = inst.name;

  const sidebarRole = document.getElementById('detail-sidebar-role');
  if (sidebarRole) sidebarRole.textContent = inst.title;

  const sidebarRating = document.getElementById('detail-sidebar-rating');
  if (sidebarRating) {
    sidebarRating.innerHTML = `★ <strong>${inst.rating}</strong> (${inst.reviewCount} Parent & Student Reviews)`;
  }

  const sidebarEmail = document.getElementById('detail-sidebar-email');
  if (sidebarEmail) {
    sidebarEmail.textContent = inst.email;
    sidebarEmail.href = `mailto:${inst.email}`;
  }

  const sidebarPhone = document.getElementById('detail-sidebar-phone');
  if (sidebarPhone) sidebarPhone.textContent = inst.phone;

  const sidebarDesk = document.getElementById('detail-sidebar-desk');
  if (sidebarDesk) sidebarDesk.textContent = inst.desk;

  const sidebarHours = document.getElementById('detail-sidebar-hours');
  if (sidebarHours) sidebarHours.textContent = inst.officeHours;

  // Update Subjects / Specialties Badges
  const subjectsContainer = document.getElementById('detail-instructor-subjects');
  if (subjectsContainer && inst.subjects) {
    subjectsContainer.innerHTML = inst.subjects.map(sub => `
      <span class="badge badge-primary" style="font-size: 0.75rem; padding: 3px 8px;">${sub}</span>
    `).join('');
  }

  // Update Biography Paragraphs
  const bioContainer = document.getElementById('detail-instructor-bio');
  if (bioContainer) {
    const paragraphs = Array.isArray(inst.bio) ? inst.bio : [inst.bio];
    bioContainer.innerHTML = paragraphs.map(p => `
      <p style="line-height: 1.75; margin-bottom: 16px; font-size: 0.95rem;">${p}</p>
    `).join('');
  }

  // Update Credentials List
  const credsList = document.getElementById('detail-instructor-credentials');
  if (credsList && inst.credentials) {
    credsList.innerHTML = inst.credentials.map(c => `
      <li style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 8px;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2.5" style="flex-shrink:0; margin-top:3px;">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span>${c}</span>
      </li>
    `).join('');
  }

  // Update Philosophy Quote
  const philosophyEl = document.getElementById('detail-instructor-philosophy');
  if (philosophyEl) {
    philosophyEl.textContent = `“${inst.philosophy}”`;
  }

  // Update Classes Taught Heading & Grid
  const classesHeading = document.getElementById('detail-classes-heading');
  if (classesHeading) {
    classesHeading.textContent = `Classes Taught by ${inst.shortName || inst.name} This Term`;
  }

  const classesGrid = document.getElementById('detail-instructor-classes-grid');
  if (classesGrid && typeof CLASSES_DATA !== 'undefined') {
    // Filter classes taught by this instructor
    const matchedClasses = CLASSES_DATA.filter(cls => {
      if (inst.classesTaught && inst.classesTaught.includes(cls.id)) return true;
      if (cls.instructorName && cls.instructorName.includes(inst.name.split(',')[0])) return true;
      return false;
    });

    if (matchedClasses.length > 0) {
      classesGrid.innerHTML = matchedClasses.map(cls => {
        const classImg = window.getAssetPath ? window.getAssetPath(cls.image) : cls.image;
        const classUrl = `class-details.html?id=${cls.id}`;

        return `
          <div class="card animate-fade-in" style="border: 1px solid var(--color-border); border-radius: 12px; overflow: hidden; display: flex; flex-direction: column;">
            <div style="height: 140px; overflow: hidden; position: relative;">
              <img src="${classImg}" alt="${cls.title}" style="width: 100%; height: 100%; object-fit: cover;" />
              <span class="badge badge-blue" style="position: absolute; top: 10px; right: 10px;">${cls.gradeLevel}</span>
            </div>
            <div style="padding: 16px; display: flex; flex-direction: column; flex: 1;">
              <div style="font-size: 0.72rem; color: var(--color-primary); font-weight: 600; text-transform: uppercase; margin-bottom: 4px;">
                ${cls.category}
              </div>
              <strong style="font-size: 0.98rem; margin-bottom: 6px; line-height: 1.35;">
                <a href="${classUrl}" style="color: var(--color-text-main); text-decoration: none;">${cls.title}</a>
              </strong>
              <div style="font-size: 0.78rem; color: var(--color-text-secondary); margin-bottom: 4px; display: flex; align-items: center; gap: 4px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                <span>${cls.schedule}</span>
              </div>
              <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 14px;">
                📍 ${cls.room || 'Campus Studio'} • ${cls.tuition}
              </div>
              <div style="margin-top: auto; display: flex; gap: 8px;">
                <a href="${classUrl}" class="btn btn-primary btn-sm btn-block">View Syllabus</a>
              </div>
            </div>
          </div>
        `;
      }).join('');
    } else {
      classesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 24px; text-align: center; background: var(--color-bg-secondary); border-radius: 12px; color: var(--color-text-muted);">
          Currently advising and mentoring co-op independent study. New course catalog registrations open next term.
        </div>
      `;
    }
  }

  // Update Testimonials Grid
  const testimonialsGrid = document.getElementById('detail-instructor-testimonials-grid');
  if (testimonialsGrid && inst.testimonials) {
    testimonialsGrid.innerHTML = inst.testimonials.map(t => `
      <div class="card" style="padding: 20px; background: var(--color-bg-secondary); border-radius: 12px; display: flex; flex-direction: column;">
        <div style="font-size: 1.5rem; color: var(--color-primary); line-height: 1; margin-bottom: 6px;">“</div>
        <p style="font-style: italic; color: var(--color-text-main); font-size: 0.88rem; line-height: 1.6; margin-bottom: 14px; flex: 1;">
          ${t.quote}
        </p>
        <div style="border-top: 1px solid var(--color-border); padding-top: 10px;">
          <div style="font-weight: 600; font-size: 0.84rem; color: var(--color-text-main);">${t.parent}</div>
          <div style="font-size: 0.74rem; color: var(--color-text-muted);">${t.child}</div>
        </div>
      </div>
    `).join('');
  }

  // Update "Meet Other Faculty Mentors" Section
  const otherFacultyGrid = document.getElementById('detail-other-instructors-grid');
  if (otherFacultyGrid) {
    const siblingInstructors = INSTRUCTORS_DATA.filter(i => i.id !== inst.id);
    otherFacultyGrid.innerHTML = siblingInstructors.map(sibling => {
      const sibAvatar = window.getAssetPath ? window.getAssetPath(sibling.avatar) : sibling.avatar;
      return `
        <div class="card" style="padding: 16px; border: 1px solid var(--color-border); border-radius: 12px; text-align: center; display: flex; flex-direction: column; align-items: center;">
          <img src="${sibAvatar}" alt="${sibling.name}" style="width: 72px; height: 72px; border-radius: 50%; object-fit: cover; margin-bottom: 10px; border: 2px solid var(--color-primary);" />
          <h4 style="font-size: 0.95rem; margin-bottom: 2px; line-height: 1.3;">
            <a href="instructor-details.html?id=${sibling.id}" style="color: var(--color-text-main); text-decoration: none;">${sibling.name}</a>
          </h4>
          <span style="font-size: 0.72rem; color: var(--color-primary); font-weight: 600; margin-bottom: 6px; display: block;">${sibling.title}</span>
          <span style="font-size: 0.72rem; color: var(--color-text-muted); margin-bottom: 12px;">★ ${sibling.rating} (${sibling.reviewCount} Reviews)</span>
          <a href="instructor-details.html?id=${sibling.id}" class="btn btn-outline btn-sm btn-block" style="margin-top: auto; font-size: 0.75rem; padding: 4px 8px;">
            View Profile
          </a>
        </div>
      `;
    }).join('');
  }

  // Setup Contact Modal
  setupContactModal(inst);
}

/**
 * Contact Modal Handling for Instructor
 */
function setupContactModal(inst) {
  const openBtn = document.getElementById('btn-open-instructor-modal');
  const modal = document.getElementById('modal-contact-faculty');
  const recipientInput = document.getElementById('modal-faculty-recipient');
  const modalTitle = document.getElementById('modal-faculty-title');
  const form = document.getElementById('form-contact-faculty');
  const banner = document.getElementById('modal-faculty-alert');

  if (!openBtn || !modal) return;

  // Open Modal
  openBtn.addEventListener('click', function () {
    if (recipientInput) recipientInput.value = `${inst.name} (${inst.title})`;
    if (modalTitle) modalTitle.textContent = `Send a Message to ${inst.shortName || inst.name}`;
    if (banner) {
      banner.className = 'auth-banner';
      banner.innerHTML = '';
      banner.style.display = 'none';
    }
    modal.style.display = 'flex';
  });

  // Close Modal Buttons
  const closeBtn = modal.querySelector('.modal-close');
  const cancelBtn = modal.querySelector('.modal-cancel-btn');
  const overlay = modal.querySelector('.modal-overlay');

  function closeModal() {
    modal.style.display = 'none';
    if (form) form.reset();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  // Form Submission
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('contact-parent-name');
      const emailInput = document.getElementById('contact-parent-email');
      const messageInput = document.getElementById('contact-message');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        if (banner) {
          banner.className = 'auth-banner auth-banner-error visible';
          banner.style.display = 'flex';
          banner.innerHTML = '<span>Please complete your name, email, and message.</span>';
        }
        return;
      }

      // Success
      if (banner) {
        banner.className = 'auth-banner auth-banner-success visible';
        banner.style.display = 'flex';
        banner.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <div>
            <strong>Message dispatched!</strong>
            <p style="margin: 2px 0 0 0; font-size: 0.8rem;">Your message has been delivered to ${inst.shortName || inst.name}. A response will be sent to <strong>${emailInput.value.trim()}</strong> during scheduled office hours (${inst.officeHours}).</p>
          </div>
        `;
      }

      if (window.showToast) {
        window.showToast(`Message sent to ${inst.shortName || inst.name}!`, 'success');
      }

      setTimeout(() => {
        closeModal();
      }, 2500);
    });
  }
}
