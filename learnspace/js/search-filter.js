/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Search & Filter Engine
 */

const SearchFilter = {
  // Generic filter array by search query across multiple fields
  filterBySearch(items, query, fields = ['title', 'description', 'category']) {
    if (!query || !query.trim()) return items;
    const cleanQuery = query.toLowerCase().trim();

    return items.filter(item => {
      return fields.some(field => {
        const val = item[field];
        if (!val) return false;
        if (typeof val === 'string') {
          return val.toLowerCase().includes(cleanQuery);
        }
        if (Array.isArray(val)) {
          return val.some(v => String(v).toLowerCase().includes(cleanQuery));
        }
        return false;
      });
    });
  },

  // Filter by category or grade level
  filterByProperty(items, prop, value) {
    if (!value || value === 'all' || value === '*') return items;
    return items.filter(item => {
      const itemVal = item[prop];
      if (Array.isArray(itemVal)) {
        return itemVal.includes(value);
      }
      return String(itemVal).toLowerCase() === String(value).toLowerCase();
    });
  },

  // Setup pill filter click listeners
  setupPillFilters(containerSelector, onFilterChange) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const pills = container.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', function () {
        pills.forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        const filterVal = this.getAttribute('data-filter') || 'all';
        onFilterChange(filterVal);
      });
    });
  }
};

window.SearchFilter = SearchFilter;
