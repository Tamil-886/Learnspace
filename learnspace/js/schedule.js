/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Weekly Schedule Timetable Management
 */

document.addEventListener('DOMContentLoaded', function () {
  const scheduleContainer = document.getElementById('dashboard-schedule-grid');
  const childSelectFilter = document.getElementById('schedule-child-filter');
  const printBtn = document.getElementById('btn-print-schedule');

  function renderWeeklySchedule() {
    if (!scheduleContainer || !window.StorageService || typeof CLASSES_DATA === 'undefined') return;

    const enrollments = window.StorageService.getEnrollments();
    const selectedChild = childSelectFilter ? childSelectFilter.value : 'all';

    let filtered = enrollments;
    if (selectedChild !== 'all') {
      filtered = filtered.filter(e => e.childId === selectedChild);
    }

    const days = [
      { name: "Monday", key: "Monday" },
      { name: "Tuesday", key: "Tuesday" },
      { name: "Wednesday", key: "Wednesday" },
      { name: "Thursday", key: "Thursday" },
      { name: "Friday", key: "Friday" }
    ];

    scheduleContainer.innerHTML = days.map(day => {
      // Find classes on this day
      const dayClasses = [];
      filtered.forEach(enr => {
        const clsObj = CLASSES_DATA.find(c => c.id === enr.classId);
        if (clsObj && clsObj.scheduleDays && clsObj.scheduleDays.includes(day.key)) {
          dayClasses.push({
            enrollment: enr,
            classObj: clsObj
          });
        }
      });

      return `
        <div class="schedule-day-column">
          <div class="schedule-day-title">${day.name}</div>
          ${dayClasses.length > 0 ? dayClasses.map(item => `
            <div class="schedule-event-block animate-fade-in ${item.classObj.category.toLowerCase().includes('art') ? 'art' : item.classObj.category.toLowerCase().includes('math') ? 'math' : ''}">
              <div class="schedule-event-time">${item.classObj.scheduleTime}</div>
              <div class="schedule-event-title">${item.classObj.title}</div>
              <div class="schedule-event-child">
                <span class="badge badge-gray" style="font-size: 10px; padding: 1px 6px;">${item.enrollment.childName}</span>
                <span style="font-size: 11px; margin-left: 4px;">${item.classObj.room}</span>
              </div>
            </div>
          `).join('') : `
            <div style="flex: 1; display: flex; align-items: center; justify-content: center; color: var(--color-text-muted); font-size: 0.75rem; font-style: italic; text-align: center; padding: 20px 0;">
              No co-op classes scheduled
            </div>
          `}
        </div>
      `;
    }).join('');
  }

  // Populate Child Filter
  if (childSelectFilter && window.StorageService) {
    const children = window.StorageService.getChildren();
    childSelectFilter.innerHTML = '<option value="all">All Children Combined</option>' + 
      children.map(c => `<option value="${c.id}">${c.name}</option>`).join('');

    childSelectFilter.addEventListener('change', renderWeeklySchedule);
  }

  if (printBtn) {
    printBtn.addEventListener('click', function () {
      window.print();
    });
  }

  renderWeeklySchedule();
});
