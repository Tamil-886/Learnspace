/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Children Profiles Management
 */

document.addEventListener('DOMContentLoaded', function () {
  const childrenGrid = document.getElementById('dashboard-children-grid');
  const addChildForm = document.getElementById('add-child-form');
  const editChildForm = document.getElementById('edit-child-form');

  function calculateAge(birthDateString) {
    if (!birthDateString) return '';
    const today = new Date();
    const birthDate = new Date(birthDateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function renderChildrenCards() {
    if (!childrenGrid || !window.StorageService) return;

    const children = window.StorageService.getChildren();
    const enrollments = window.StorageService.getEnrollments();

    if (children.length === 0) {
      childrenGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: var(--color-bg-secondary); border-radius: 16px; border: 1px dashed var(--color-border);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">👶</div>
          <h4 style="font-size: 1.25rem; margin-bottom: 8px;">No Child Profiles Added Yet</h4>
          <p style="color: var(--color-text-secondary); margin-bottom: 20px;">Add your children to begin browsing and enrolling in co-op classes.</p>
          <a href="add-child.html" class="btn btn-primary">+ Add First Child</a>
        </div>
      `;
      return;
    }

    childrenGrid.innerHTML = children.map(child => {
      const childEnrollments = enrollments.filter(e => e.childId === child.id);
      const ageDisplay = child.age || calculateAge(child.birthDate) || '10';

      const nameLower = (child.name || '').toLowerCase();
      let fallbackFile = 'child-leo.jpg';
      if (nameLower.includes('maya')) fallbackFile = 'child-maya.jpg';
      else if (nameLower.includes('ethan')) fallbackFile = 'child-ethan.jpg';

      let rawAvatar = child.avatar;
      if (!rawAvatar || rawAvatar.includes('avatar-default')) {
        rawAvatar = `assets/images/avatars/${fallbackFile}`;
      }
      const avatarSrc = window.getAssetPath ? window.getAssetPath(rawAvatar) : (rawAvatar || `../../assets/images/avatars/${fallbackFile}`);

      return `
        <div class="child-card animate-fade-in" id="card-${child.id}">
          <div class="child-card-header">
            <img src="${avatarSrc}" 
                 alt="${child.name}" 
                 class="avatar avatar-md" 
                 onerror="this.onerror=null; this.src='../../assets/images/avatars/${fallbackFile}'; if (!this.complete) this.src='../assets/images/avatars/${fallbackFile}';" />
            <div class="child-card-details">
              <h4>${child.name}</h4>
              <p>Age ${ageDisplay} • ${child.grade}</p>
            </div>
          </div>

          <div class="child-card-enrollments">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
              <span style="color: var(--color-text-muted);">Enrolled Classes</span>
              <strong style="color: var(--color-primary);">${childEnrollments.length} Active</strong>
            </div>
            ${childEnrollments.length > 0 ? `
              <ul style="margin: 0; padding-left: 16px; font-size: 0.75rem; color: var(--color-text-secondary);">
                ${childEnrollments.slice(0, 2).map(e => `<li>${e.className}</li>`).join('')}
                ${childEnrollments.length > 2 ? `<li>+${childEnrollments.length - 2} more...</li>` : ''}
              </ul>
            ` : '<span style="color: var(--color-text-muted); font-size: 0.75rem;">No active enrollments</span>'}
          </div>

          <div style="font-size: 0.75rem; color: var(--color-text-muted); margin-bottom: 16px;">
            <span>Allergies: <strong>${child.allergies || 'None'}</strong></span>
          </div>

          <div class="child-card-actions">
            <a href="child-details.html?id=${child.id}" class="btn btn-outline btn-sm" style="flex:1;">View Details</a>
            <a href="../classes/schedule.html?child=${child.id}" class="btn btn-secondary btn-sm" style="flex:1;">Schedule</a>
            <button class="btn btn-outline btn-sm btn-edit-child" data-id="${child.id}">Edit</button>
            <button class="btn btn-danger btn-sm btn-delete-child" data-id="${child.id}" title="Remove Child">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Bind Edit Buttons
    document.querySelectorAll('.btn-edit-child').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        openEditChildModal(id);
      });
    });

    // Bind Delete Buttons
    document.querySelectorAll('.btn-delete-child').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        if (confirm('Are you sure you want to remove this child profile? Associated class enrollments will also be removed.')) {
          window.StorageService.removeChild(id);
          showToast('Child profile removed.', 'info');
          renderChildrenCards();
        }
      });
    });
  }

  // Open Edit Child Modal
  function openEditChildModal(childId) {
    const children = window.StorageService.getChildren();
    const child = children.find(c => c.id === childId);
    if (!child) return;

    const modal = document.getElementById('modal-edit-child');
    if (!modal) return;

    document.getElementById('edit-child-id').value = child.id;
    document.getElementById('edit-child-name').value = child.name;
    document.getElementById('edit-child-dob').value = child.birthDate || '';
    document.getElementById('edit-child-grade').value = child.grade || 'Grade 5';
    document.getElementById('edit-child-allergies').value = child.allergies || 'None';

    openModal('modal-edit-child');
  }

  // Handle Edit Submission
  if (editChildForm) {
    editChildForm.addEventListener('submit', function (e) {
      e.preventDefault();
      Validation.clearAllErrors(editChildForm);

      const id = document.getElementById('edit-child-id').value;
      const nameInput = document.getElementById('edit-child-name');
      const dobInput = document.getElementById('edit-child-dob');
      const grade = document.getElementById('edit-child-grade').value;
      const allergies = document.getElementById('edit-child-allergies').value;

      let isValid = true;
      if (!nameInput || !Validation.isNotEmpty(nameInput.value)) {
        Validation.showError(nameInput, "Please enter your child's full name.");
        isValid = false;
      } else if (!Validation.isValidName(nameInput.value)) {
        Validation.showError(nameInput, "Name must contain letters only (no numbers or special characters).");
        isValid = false;
      }

      if (!dobInput || !Validation.isNotEmpty(dobInput.value)) {
        Validation.showError(dobInput, "Please select your child's birth date.");
        isValid = false;
      }

      if (!isValid) return;

      try {
        window.StorageService.updateChild(id, {
          name: nameInput.value.trim(),
          birthDate: dobInput.value,
          age: calculateAge(dobInput.value),
          grade,
          allergies
        });

        closeModal('modal-edit-child');
        showToast('Child profile updated successfully!', 'success');
        renderChildrenCards();
      } catch (err) {
        showToast(err.message || 'Error updating child profile.', 'error');
      }
    });
  }

  // Handle Add Child Form on add-child.html
  if (addChildForm) {
    addChildForm.addEventListener('submit', function (e) {
      e.preventDefault();
      Validation.clearAllErrors(addChildForm);

      const nameInput = document.getElementById('child-name');
      const dobInput = document.getElementById('child-dob');
      const gradeInput = document.getElementById('child-grade');
      const allergiesInput = document.getElementById('child-allergies');
      const interestsInput = document.getElementById('child-interests');

      let isValid = true;
      if (!nameInput || !Validation.isNotEmpty(nameInput.value)) {
        Validation.showError(nameInput, "Please enter your child's full name.");
        isValid = false;
      } else if (!Validation.isValidName(nameInput.value)) {
        Validation.showError(nameInput, "Name must contain letters only (no numbers or special characters).");
        isValid = false;
      }

      if (!dobInput || !Validation.isNotEmpty(dobInput.value)) {
        Validation.showError(dobInput, "Please select your child's birth date.");
        isValid = false;
      }

      if (!isValid) return;

      const age = calculateAge(dobInput.value);
      const newChild = {
        name: nameInput.value.trim(),
        birthDate: dobInput.value,
        age: age,
        grade: gradeInput ? gradeInput.value : 'Grade 1',
        allergies: allergiesInput ? allergiesInput.value.trim() : 'None',
        interests: interestsInput && interestsInput.value ? interestsInput.value.split(',').map(s => s.trim()) : [],
        avatar: age <= 6 ? 'assets/images/avatars/child-ethan.jpg' : 'assets/images/avatars/child-leo.jpg'
      };

      try {
        window.StorageService.addChild(newChild);

        const banner = document.getElementById('add-child-feedback');
        if (banner) {
          banner.className = 'alert alert-success visible';
          banner.style.display = 'block';
          banner.innerHTML = `<strong>Success!</strong> ${newChild.name}'s profile has been created. You can now <a href="index.html" style="font-weight:bold; text-decoration:underline;">view all children</a> or <a href="../classes/browse.html" style="font-weight:bold; text-decoration:underline;">browse classes</a>.`;
        } else {
          showToast(`Profile created for ${newChild.name}!`, 'success');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 1200);
        }

        addChildForm.reset();
      } catch (err) {
        showToast(err.message || 'Error adding child.', 'error');
      }
    });
  }

  // Initial render on children page
  renderChildrenCards();
});
