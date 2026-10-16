/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Blog & Articles Controller
 */

document.addEventListener('DOMContentLoaded', function () {
  const blogGrid = document.getElementById('blog-grid');
  const blogSearchInput = document.getElementById('blog-search-input');

  if (typeof BLOG_POSTS_DATA === 'undefined') return;

  let activeCategory = 'all';
  let searchQuery = '';

  function createBlogCardHTML(post) {
    const detailLink = window.getPagePath ? window.getPagePath(`blog-details.html?id=${post.id}`) : `blog-details.html?id=${post.id}`;
    const imgSrc = window.getAssetPath ? window.getAssetPath(post.image) : post.image;
    const authorAvatar = window.getAssetPath ? window.getAssetPath(post.author.avatar) : post.author.avatar;

    return `
      <div class="card card-interactive animate-fade-in" style="display:flex; flex-direction:column; height:100%;">
        <div style="height:190px; overflow:hidden;">
          <img src="${imgSrc}" alt="${post.title}" style="width:100%; height:100%; object-fit:cover;" loading="lazy" />
        </div>
        <div class="card-body" style="display:flex; flex-direction:column; flex:1;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <span class="badge badge-blue">${post.category}</span>
            <span style="font-size:0.75rem; color:var(--color-text-muted);">${post.readTime}</span>
          </div>
          <h3 style="font-size:1.15rem; margin-bottom:8px; line-height:1.3;">
            <a href="${detailLink}">${post.title}</a>
          </h3>
          <p style="font-size:0.875rem; color:var(--color-text-secondary); line-height:1.4; margin-bottom:16px; flex:1;">
            ${post.excerpt}
          </p>
          <div style="display:flex; align-items:center; gap:10px; padding-top:12px; border-top:1px solid var(--color-border); font-size:0.8rem;">
            <img src="${authorAvatar}" class="avatar avatar-sm" alt="${post.author.name}" />
            <div>
              <strong>${post.author.name}</strong>
              <div style="font-size:0.7rem; color:var(--color-text-muted);">${post.date}</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function renderBlog() {
    if (!blogGrid) return;

    let filtered = BLOG_POSTS_DATA;

    if (searchQuery) {
      filtered = SearchFilter.filterBySearch(filtered, searchQuery, ['title', 'excerpt', 'category', 'tags']);
    }

    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));
    }

    blogGrid.innerHTML = filtered.map(p => createBlogCardHTML(p)).join('');
  }

  if (blogSearchInput) {
    blogSearchInput.addEventListener('input', function () {
      searchQuery = this.value;
      renderBlog();
    });
  }

  SearchFilter.setupPillFilters('#blog-category-pills', function (val) {
    activeCategory = val;
    renderBlog();
  });

  renderBlog();

  // -------------------------------------------------------------
  // Blog Details Page Hydration
  // -------------------------------------------------------------
  const blogDetailRoot = document.getElementById('blog-detail-container');
  if (blogDetailRoot) {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id') || 'homeschool-planning';
    const post = BLOG_POSTS_DATA.find(p => p.id === postId) || BLOG_POSTS_DATA[0];

    if (post) {
      document.title = `${post.title} – LearnSpace Homeschool Blog`;

      const titleEl = document.getElementById('blog-detail-title');
      if (titleEl) titleEl.textContent = post.title;

      const categoryEl = document.getElementById('blog-detail-category');
      if (categoryEl) categoryEl.textContent = post.category;

      const dateEl = document.getElementById('blog-detail-date');
      if (dateEl) dateEl.textContent = post.date;

      const readTimeEl = document.getElementById('blog-detail-read-time');
      if (readTimeEl) readTimeEl.textContent = post.readTime;

      const authorNameEl = document.getElementById('blog-detail-author-name');
      if (authorNameEl) authorNameEl.textContent = post.author.name;

      const authorRoleEl = document.getElementById('blog-detail-author-role');
      if (authorRoleEl) authorRoleEl.textContent = post.author.role;

      const authorAvatarEl = document.getElementById('blog-detail-author-avatar');
      if (authorAvatarEl) authorAvatarEl.src = window.getAssetPath ? window.getAssetPath(post.author.avatar) : post.author.avatar;

      const imgEl = document.getElementById('blog-detail-image');
      if (imgEl) {
        imgEl.src = window.getAssetPath ? window.getAssetPath(post.image) : post.image;
        imgEl.alt = post.title;
      }

      const contentEl = document.getElementById('blog-detail-content');
      if (contentEl) contentEl.innerHTML = post.content;

      // Comments List
      const commentsContainer = document.getElementById('blog-comments-list');
      function renderComments() {
        if (!commentsContainer) return;
        if (!post.comments || post.comments.length === 0) {
          commentsContainer.innerHTML = '<p style="color:var(--color-text-muted); font-size:0.875rem;">Be the first to leave a comment on this guide!</p>';
          return;
        }
        commentsContainer.innerHTML = post.comments.map(c => `
          <div style="padding:14px; background:var(--color-bg-secondary); border-radius:10px; margin-bottom:12px; border:1px solid var(--color-border);">
            <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
              <strong style="font-size:0.875rem;">${c.author}</strong>
              <span style="font-size:0.75rem; color:var(--color-text-muted);">${c.date}</span>
            </div>
            <p style="font-size:0.875rem; margin:0; color:var(--color-text-main);">${c.text}</p>
          </div>
        `).join('');
      }
      renderComments();

      // Comment Form
      const commentForm = document.getElementById('blog-comment-form');
      if (commentForm) {
        commentForm.addEventListener('submit', function (e) {
          e.preventDefault();
          if (window.Validation) Validation.clearAllErrors(commentForm);

          const nameInput = document.getElementById('comment-name');
          const textInput = document.getElementById('comment-text');

          let isValid = true;
          if (!nameInput || !window.Validation || !Validation.isNotEmpty(nameInput.value)) {
            if (window.Validation && nameInput) Validation.showError(nameInput, 'Please enter your name.');
            isValid = false;
          } else if (!Validation.isValidName(nameInput.value)) {
            Validation.showError(nameInput, 'Name must contain letters only (e.g. Jessica Miller). No numbers or special characters.');
            isValid = false;
          }

          if (!textInput || (window.Validation ? !Validation.isNotEmpty(textInput.value) : !textInput.value.trim())) {
            if (window.Validation && textInput) Validation.showError(textInput, 'Please enter your comment.');
            isValid = false;
          }

          if (!isValid) return;

          if (!post.comments) post.comments = [];
          post.comments.push({
            author: nameInput.value.trim(),
            date: 'Just now',
            text: textInput.value.trim()
          });
          textInput.value = '';
          nameInput.value = '';
          showToast('Comment posted successfully!', 'success');
          renderComments();
        });
      }
    }
  }
});
