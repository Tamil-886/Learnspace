/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Community & Messaging Controller
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Messages Interface
  const threadsContainer = document.getElementById('chat-threads-list');
  const chatMessagesScroll = document.getElementById('chat-messages-container');
  const chatRecipientName = document.getElementById('chat-recipient-name');
  const chatRecipientRole = document.getElementById('chat-recipient-role');
  const chatRecipientAvatar = document.getElementById('chat-recipient-avatar');
  const messageComposerForm = document.getElementById('message-composer-form');
  const messageInput = document.getElementById('chat-message-input');

  let activeThreadId = 'dr-sarah-chen';

  function renderThreadsList() {
    if (!threadsContainer || !window.StorageService) return;

    const threads = window.StorageService.getMessages();
    threadsContainer.innerHTML = threads.map(t => {
      const lastMsg = t.messages[t.messages.length - 1];
      const isActive = t.threadId === activeThreadId;

      return `
        <div class="thread-item ${isActive ? 'active' : ''}" data-id="${t.threadId}">
          <img src="${window.getAssetPath ? window.getAssetPath(t.withAvatar) : '../../' + t.withAvatar}" class="avatar avatar-sm" alt="${t.withName}" />
          <div class="thread-preview" style="flex:1;">
            <div style="display:flex; justify-content:space-between;">
              <strong style="font-size:0.875rem;">${t.withName}</strong>
              ${t.unread ? '<span style="width:8px; height:8px; border-radius:50%; background:#2563EB;"></span>' : ''}
            </div>
            <p>${lastMsg ? lastMsg.text : 'No messages yet'}</p>
          </div>
        </div>
      `;
    }).join('');

    // Bind thread click
    threadsContainer.querySelectorAll('.thread-item').forEach(item => {
      item.addEventListener('click', function () {
        activeThreadId = this.getAttribute('data-id');
        renderThreadsList();
        renderActiveChat();
      });
    });
  }

  function renderActiveChat() {
    if (!chatMessagesScroll || !window.StorageService) return;

    const threads = window.StorageService.getMessages();
    const thread = threads.find(t => t.threadId === activeThreadId) || threads[0];
    if (!thread) return;

    if (chatRecipientName) chatRecipientName.textContent = thread.withName;
    if (chatRecipientRole) chatRecipientRole.textContent = thread.withRole;
    if (chatRecipientAvatar) chatRecipientAvatar.src = window.getAssetPath ? window.getAssetPath(thread.withAvatar) : `../../${thread.withAvatar}`;

    chatMessagesScroll.innerHTML = thread.messages.map(m => `
      <div class="chat-bubble ${m.sender === 'you' ? 'outgoing' : 'incoming'}">
        <div>${m.text}</div>
        <div style="font-size:0.7rem; opacity:0.8; margin-top:4px; text-align:${m.sender === 'you' ? 'right' : 'left'};">
          ${m.time}
        </div>
      </div>
    `).join('');

    chatMessagesScroll.scrollTop = chatMessagesScroll.scrollHeight;
  }

  if (messageComposerForm) {
    messageComposerForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!messageInput || !messageInput.value.trim()) return;

      const text = messageInput.value.trim();
      messageInput.value = '';

      window.StorageService.sendMessage(activeThreadId, text);
      renderActiveChat();
      renderThreadsList();

      // Show typing indicator
      const typingEl = document.createElement('div');
      typingEl.className = 'chat-bubble incoming';
      typingEl.id = 'chat-typing-indicator';
      typingEl.style.cssText = 'font-style: italic; opacity: 0.75; font-size: 0.8rem; display: flex; align-items: center; gap: 6px;';
      typingEl.innerHTML = '<span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:currentColor; animation:pulseDot 1.2s infinite;"></span> Typing response...';
      chatMessagesScroll.appendChild(typingEl);
      chatMessagesScroll.scrollTop = chatMessagesScroll.scrollHeight;

      // Simulate realistic instructor reply after 1.4 seconds
      setTimeout(() => {
        const ind = document.getElementById('chat-typing-indicator');
        if (ind) ind.remove();

        const replies = [
          "Thank you for reaching out! I've noted this down and will prepare materials for our next session.",
          "Sounds great! The students have been making wonderful progress this term.",
          "Received! Feel free to stop by the faculty desk after Tuesday's lab if you have any questions."
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        const threads = window.StorageService.getMessages();
        const thread = threads.find(t => t.threadId === activeThreadId);
        if (thread) {
          const now = new Date();
          thread.messages.push({
            sender: "them",
            time: "Today, " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            text: randomReply
          });
          localStorage.setItem('learnspace_messages', JSON.stringify(threads));
          renderActiveChat();
          renderThreadsList();
        }
      }, 1400);
    });
  }

  renderThreadsList();
  renderActiveChat();
});
