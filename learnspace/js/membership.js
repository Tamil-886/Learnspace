/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Membership Management Controller
 */

document.addEventListener('DOMContentLoaded', function () {
  const upgradeBtn = document.getElementById('btn-upgrade-tier');
  const upgradeModal = document.getElementById('modal-upgrade-membership');
  const upgradeForm = document.getElementById('form-upgrade-membership');

  if (upgradeBtn) {
    upgradeBtn.addEventListener('click', function () {
      openModal('modal-upgrade-membership');
    });
  }

  if (upgradeForm) {
    upgradeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const selectedPlan = document.querySelector('input[name="membership_tier_choice"]:checked');
      if (selectedPlan && window.StorageService) {
        const user = window.StorageService.getUser();
        user.tier = selectedPlan.value;
        window.StorageService.setUser(user);

        const currentTierDisplay = document.getElementById('current-tier-display');
        if (currentTierDisplay) currentTierDisplay.textContent = user.tier;

        closeModal('modal-upgrade-membership');
        showToast(`Membership plan upgraded to "${user.tier}"!`, 'success');
      }
    });
  }
});
