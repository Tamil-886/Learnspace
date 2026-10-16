/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Parent Dashboard Overview Controller
 */

document.addEventListener('DOMContentLoaded', function () {
  if (!window.StorageService) return;

  const user = window.StorageService.getUser();
  const children = window.StorageService.getChildren();
  const enrollments = window.StorageService.getEnrollments();
  const savedResources = window.StorageService.getSavedResources();
  const announcements = window.StorageService.getAnnouncements();

  // 1. Update User Profile Info across Dashboard
  const parentNameEls = document.querySelectorAll('.user-parent-name');
  parentNameEls.forEach(el => el.textContent = user.name);

  const parentTierEls = document.querySelectorAll('.user-parent-tier');
  parentTierEls.forEach(el => el.textContent = user.tier);

  const parentAvatarEls = document.querySelectorAll('.user-parent-avatar');
  parentAvatarEls.forEach(el => {
    el.src = window.getAssetPath ? window.getAssetPath(user.avatar) : user.avatar;
  });

  // 2. Overview Metrics Cards
  const metricChildren = document.getElementById('metric-total-children');
  if (metricChildren) metricChildren.textContent = children.length;

  const metricClasses = document.getElementById('metric-active-classes');
  if (metricClasses) metricClasses.textContent = enrollments.length;

  const metricHours = document.getElementById('metric-weekly-hours');
  if (metricHours) {
    // Approximate 3 hours per active enrollment
    metricHours.textContent = `${enrollments.length * 3} hrs`;
  }

  const metricResources = document.getElementById('metric-saved-resources');
  if (metricResources) metricResources.textContent = savedResources.length;

  // 3. Render Quick Children Preview Cards on Dashboard Home
  const quickChildrenList = document.getElementById('dashboard-quick-children');
  if (quickChildrenList) {
    if (children.length === 0) {
      quickChildrenList.innerHTML = `
        <div class="dash-empty-state">
          <div class="dash-empty-icon">👶</div>
          <p class="dash-empty-text">No children profiles registered yet.</p>
          <a href="children/add-child.html" class="btn btn-primary btn-sm">+ Add Child</a>
        </div>
      `;
    } else {
      quickChildrenList.innerHTML = children.map(child => {
        const childEnrs = enrollments.filter(e => e.childId === child.id);
        const nameLower = (child.name || '').toLowerCase();
        let fallbackFile = 'child-leo.jpg';
        if (nameLower.includes('maya')) fallbackFile = 'child-maya.jpg';
        else if (nameLower.includes('ethan')) fallbackFile = 'child-ethan.jpg';

        let rawAvatar = child.avatar;
        if (!rawAvatar || rawAvatar.includes('avatar-default')) {
          rawAvatar = `assets/images/avatars/${fallbackFile}`;
        }
        const avatarSrc = window.getAssetPath ? window.getAssetPath(rawAvatar) : rawAvatar;

        return `
          <div class="dash-child-item">
            <div class="dash-child-info">
              <img src="${avatarSrc}" 
                   class="dash-child-avatar" 
                   alt="${child.name}" 
                   onerror="this.onerror=null; this.src='../assets/images/avatars/${fallbackFile}'; if (!this.complete) this.src='assets/images/avatars/${fallbackFile}';" />
              <div>
                <h4 class="dash-child-name">${child.name}</h4>
                <div class="dash-child-meta">${child.grade} • Age ${child.age}</div>
              </div>
            </div>
            <div class="dash-child-right">
              <span class="badge badge-blue">${childEnrs.length} ${childEnrs.length === 1 ? 'Class' : 'Classes'}</span>
              <a href="children/child-details.html?id=${child.id}" class="dash-item-link" title="View Details">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
              </a>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // 4. Render Today's Schedule Preview
  const todayScheduleList = document.getElementById('dashboard-today-schedule');
  if (todayScheduleList) {
    if (enrollments.length === 0) {
      todayScheduleList.innerHTML = `
        <div class="dash-empty-state">
          <div class="dash-empty-icon">🗓️</div>
          <p class="dash-empty-text">No classes scheduled for today.</p>
          <a href="classes/browse.html" class="btn btn-secondary btn-sm">Browse Classes</a>
        </div>
      `;
    } else {
      todayScheduleList.innerHTML = enrollments.slice(0, 3).map(enr => `
        <div class="dash-schedule-item">
          <div class="dash-schedule-time">
            <span class="dash-time-badge">${enr.schedule}</span>
          </div>
          <div class="dash-schedule-details">
            <h5 class="dash-schedule-title">${enr.className}</h5>
            <div class="dash-schedule-meta">
              <span>👤 ${enr.childName}</span>
              <span class="dash-meta-dot">•</span>
              <span>📍 ${enr.room}</span>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // 5. Render Announcements on Dashboard Home
  const announcementsList = document.getElementById('dashboard-announcements-list');
  if (announcementsList) {
    announcementsList.innerHTML = announcements.slice(0, 3).map(ann => `
      <div class="dash-notice-item">
        <div class="dash-notice-header">
          <span class="badge ${ann.priority === 'High' ? 'badge-amber' : 'badge-blue'}">${ann.category}</span>
          <span class="dash-notice-date">${ann.date}</span>
        </div>
        <h5 class="dash-notice-title">${ann.title}</h5>
        <p class="dash-notice-body">${ann.body}</p>
      </div>
    `).join('');
  }
});
