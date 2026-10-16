/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Enrollments Management
 */

document.addEventListener('DOMContentLoaded', function () {
  const enrollmentsTableBody = document.getElementById('enrollments-table-body');
  const enrollmentsFilterChild = document.getElementById('filter-enrollments-child');

  function renderEnrollmentsTable() {
    if (!enrollmentsTableBody || !window.StorageService) return;

    const enrollments = window.StorageService.getEnrollments();
    const selectedChild = enrollmentsFilterChild ? enrollmentsFilterChild.value : 'all';

    let filtered = enrollments;
    if (selectedChild !== 'all') {
      filtered = filtered.filter(e => e.childId === selectedChild);
    }

    if (filtered.length === 0) {
      enrollmentsTableBody.innerHTML = `
        <tr>
          <td colspan="6" style="text-align: center; padding: 48px 16px; color: var(--color-text-secondary);">
            <div style="font-size: 2rem; margin-bottom: 8px;">📚</div>
            <strong>No active enrollments found</strong>
            <p style="margin-top: 4px; font-size: 0.875rem;">Browse the class catalog to register your children.</p>
            <a href="browse.html" class="btn btn-primary btn-sm" style="margin-top: 12px;">Browse Available Classes</a>
          </td>
        </tr>
      `;
      return;
    }

    enrollmentsTableBody.innerHTML = filtered.map(item => `
      <tr class="animate-fade-in" style="border-bottom: 1px solid var(--color-border);">
        <td style="padding: 16px; font-weight: 600; color: var(--color-text-main);">
          ${item.childName}
        </td>
        <td style="padding: 16px;">
          <a href="class-details.html?id=${item.classId}" style="font-weight: 600;">${item.className}</a>
          <div style="font-size: 0.75rem; color: var(--color-text-muted);">${item.room}</div>
        </td>
        <td style="padding: 16px; font-size: 0.875rem; color: var(--color-text-secondary);">
          ${item.schedule}
        </td>
        <td style="padding: 16px; font-size: 0.875rem;">
          ${item.instructor}
        </td>
        <td style="padding: 16px;">
          <span class="badge badge-green">${item.status}</span>
        </td>
        <td style="padding: 16px; text-align: right;">
          <button class="btn btn-danger btn-sm btn-cancel-enrollment" data-id="${item.id}" data-name="${item.className}" data-child="${item.childName}">
            Cancel Enrollment
          </button>
        </td>
      </tr>
    `).join('');

    // Bind Cancel Enrollment Buttons
    document.querySelectorAll('.btn-cancel-enrollment').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const className = this.getAttribute('data-name');
        const childName = this.getAttribute('data-child');

        if (confirm(`Are you sure you want to cancel ${childName}'s enrollment in "${className}"?`)) {
          window.StorageService.cancelEnrollment(id);
          showToast(`Enrollment for ${childName} in ${className} was cancelled.`, 'info');
          renderEnrollmentsTable();
        }
      });
    });
  }

  // Populate Child Filter Dropdown
  if (enrollmentsFilterChild && window.StorageService) {
    const children = window.StorageService.getChildren();
    enrollmentsFilterChild.innerHTML = '<option value="all">All Children</option>' + 
      children.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    enrollmentsFilterChild.addEventListener('change', renderEnrollmentsTable);
  }

  renderEnrollmentsTable();
});
