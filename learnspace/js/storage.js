/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * LocalStorage State Management & Seed Data
 */

const STORAGE_KEYS = {
  USER: 'learnspace_user',
  CHILDREN: 'learnspace_children',
  ENROLLMENTS: 'learnspace_enrollments',
  SAVED_RESOURCES: 'learnspace_saved_resources',
  MESSAGES: 'learnspace_messages',
  ANNOUNCEMENTS: 'learnspace_announcements',
  NOTIFICATIONS: 'learnspace_notifications'
};

// Global Path Resolvers for multi-level directory compatibility
function getAssetPath(relativePath) {
  if (!relativePath) return '';
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://') || relativePath.startsWith('data:')) {
    return relativePath;
  }
  let clean = relativePath.replace(/^(\.\.\/)+/, '').replace(/^\//, '');
  if ((clean.startsWith('child-') || clean.startsWith('parent-') || clean.startsWith('avatar-')) && !clean.includes('/')) {
    clean = 'assets/images/avatars/' + clean;
  }
  const path = (window.location.pathname || '').replace(/\\/g, '/');
  if (path.match(/\/dashboard\/(children|classes|resources|membership|community|account)\//)) {
    return '../../' + clean;
  }
  if (path.match(/\/(pages|auth|dashboard)\//)) {
    return '../' + clean;
  }
  return clean;
}

function getPagePath(pageNameWithQuery) {
  const path = (window.location.pathname || '').replace(/\\/g, '/');
  if (path.match(/\/dashboard\/(children|classes|resources|membership|community|account)\//)) {
    return pageNameWithQuery;
  }
  if (path.match(/\/(auth|dashboard)\//)) {
    return '../pages/' + pageNameWithQuery;
  }
  if (path.match(/\/pages\//)) {
    return pageNameWithQuery;
  }
  return 'pages/' + pageNameWithQuery;
}

window.getAssetPath = getAssetPath;
window.getPagePath = getPagePath;

// Initial Seed Data
const DEFAULT_USER = {
  name: "Sarah Jenkins",
  email: "parent@learnspace.org",
  phone: "(555) 382-9104",
  tier: "Full Co-Op Member",
  memberSince: "August 2024",
  avatar: "assets/images/avatars/parent-sarah.jpg",
  emergencyContact: "Michael Jenkins - (555) 382-9105"
};

const DEFAULT_CHILDREN = [
  {
    id: "child-leo",
    name: "Leo Jenkins",
    birthDate: "2018-05-14",
    age: 8,
    grade: "3rd Grade",
    gradeLevel: "Elementary",
    avatar: "assets/images/avatars/child-leo.jpg",
    allergies: "Peanuts (Mild)",
    interests: ["Robotics", "Hands-on Science", "Lego"]
  },
  {
    id: "child-maya",
    name: "Maya Jenkins",
    birthDate: "2015-08-20",
    age: 11,
    grade: "6th Grade",
    gradeLevel: "Middle School",
    avatar: "assets/images/avatars/child-maya.jpg",
    allergies: "None",
    interests: ["Creative Writing", "Fine Arts", "Biology"]
  },
  {
    id: "child-ethan",
    name: "Ethan Jenkins",
    birthDate: "2021-02-10",
    age: 5,
    grade: "Kindergarten",
    gradeLevel: "Early Learning",
    avatar: "assets/images/avatars/child-ethan.jpg",
    allergies: "None",
    interests: ["Sensory STEAM", "Art & Discovery"]
  }
];

const DEFAULT_ENROLLMENTS = [
  {
    id: "enr-001",
    childId: "child-leo",
    childName: "Leo Jenkins",
    classId: "science-lab",
    className: "Hands-On Science Lab & Physics",
    schedule: "Tuesdays & Thursdays • 10:00 AM - 11:30 AM",
    instructor: "Dr. Sarah Chen, Ph.D.",
    room: "Science Lab Room 102",
    status: "Active",
    enrolledDate: "2026-09-01"
  },
  {
    id: "enr-002",
    childId: "child-leo",
    childName: "Leo Jenkins",
    classId: "math-olympiad",
    className: "Math Olympiad & Logic Quest",
    schedule: "Tuesdays & Fridays • 11:30 AM - 12:45 PM",
    instructor: "David Park, M.Ed.",
    room: "Math Studio Room 108",
    status: "Active",
    enrolledDate: "2026-09-01"
  },
  {
    id: "enr-003",
    childId: "child-maya",
    childName: "Maya Jenkins",
    classId: "robotics-stem",
    className: "Robotics & STEM Engineering Lab",
    schedule: "Mondays & Wednesdays • 1:00 PM - 2:30 PM",
    instructor: "Marcus Vance, B.S.",
    room: "Maker Space Lab 204",
    status: "Active",
    enrolledDate: "2026-09-02"
  },
  {
    id: "enr-004",
    childId: "child-maya",
    childName: "Maya Jenkins",
    classId: "creative-writing",
    className: "Creative Writing & Literature Circle",
    schedule: "Thursdays • 1:00 PM - 2:30 PM",
    instructor: "Aisha Patel, M.A.",
    room: "Library Reading Room",
    status: "Active",
    enrolledDate: "2026-09-02"
  }
];

const DEFAULT_SAVED_RESOURCES = [
  "curriculum-guide",
  "lab-kit"
];

const DEFAULT_MESSAGES = [
  {
    threadId: "dr-sarah-chen",
    withName: "Dr. Sarah Chen, Ph.D.",
    withRole: "STEM & Science Lead",
    withAvatar: "assets/images/instructors/dr-sarah-chen.jpg",
    unread: false,
    messages: [
      { sender: "them", time: "Oct 14, 10:30 AM", text: "Hi Sarah! Just letting you know Leo did a fantastic job on the density gradient lab yesterday." },
      { sender: "you", time: "Oct 14, 11:15 AM", text: "Thank you so much Dr. Chen! He came home talking non-stop about the multi-layer liquids." },
      { sender: "them", time: "Oct 15, 09:00 AM", text: "Wonderful. For next Tuesday, please ensure he brings his hardcover lab journal for graphing." }
    ]
  },
  {
    threadId: "marcus-vance",
    withName: "Marcus Vance, B.S.",
    withRole: "Robotics & Maker Space",
    withAvatar: "assets/images/instructors/marcus-vance.jpg",
    unread: true,
    messages: [
      { sender: "them", time: "Yesterday, 3:45 PM", text: "Hi Sarah, Maya's robot chassis 3D print finished cleanly! We'll start assembling servos next Monday." }
    ]
  },
  {
    threadId: "co-op-admin",
    withName: "Co-Op Welcome Desk",
    withRole: "Parent Coordinator",
    withAvatar: "assets/images/avatars/avatar-default.jpg",
    unread: false,
    messages: [
      { sender: "them", time: "Oct 10, 08:30 AM", text: "Reminder: The Autumn Community Park Day is scheduled for November 5th. Looking forward to seeing you!" }
    ]
  }
];

const DEFAULT_ANNOUNCEMENTS = [
  {
    id: "ann-01",
    title: "Annual STEM Expo Project Registration Closes This Friday",
    date: "October 14, 2026",
    category: "Academic",
    priority: "High",
    body: "Please register your child's STEM Expo presentation topic and table space requirements before 5:00 PM on Friday, October 18."
  },
  {
    id: "ann-02",
    title: "New Microscope and Chemistry Kits Added to Resource Center",
    date: "October 11, 2026",
    category: "Resources",
    priority: "Normal",
    body: "We have acquired 4 new compound light microscopes and advanced organic chemistry glassware kits available for 3-week family loan."
  },
  {
    id: "ann-03",
    title: "Volunteer Signups Open for November Park Day Cider Station",
    date: "October 8, 2026",
    category: "Community",
    priority: "Normal",
    body: "The social committee is looking for 3 parent volunteers to assist with warm spiced apple cider and family registration."
  }
];

// Helper Functions
const StorageService = {
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.USER)) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEFAULT_USER));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CHILDREN)) {
      localStorage.setItem(STORAGE_KEYS.CHILDREN, JSON.stringify(DEFAULT_CHILDREN));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ENROLLMENTS)) {
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(DEFAULT_ENROLLMENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SAVED_RESOURCES)) {
      localStorage.setItem(STORAGE_KEYS.SAVED_RESOURCES, JSON.stringify(DEFAULT_SAVED_RESOURCES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.MESSAGES)) {
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(DEFAULT_MESSAGES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS)) {
      localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(DEFAULT_ANNOUNCEMENTS));
    }
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER)) || DEFAULT_USER;
    } catch (e) {
      return DEFAULT_USER;
    }
  },

  validateUser(user) {
    const errors = [];
    if (!user) {
      return { valid: false, errors: ['User object is required.'] };
    }
    if (!user.name || typeof user.name !== 'string' || !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(user.name.trim())) {
      errors.push('User name must contain letters and spaces only (no numbers or special characters).');
    }
    if (!user.email || typeof user.email !== 'string') {
      errors.push('User email is required.');
    } else {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
      if (!emailRegex.test(user.email.trim())) {
        errors.push('User email must be a valid email format with @ and valid domain.');
      }
    }
    if (user.phone) {
      const digits = String(user.phone).replace(/\D/g, '');
      if (digits.length !== 10) {
        errors.push('User phone must contain exactly 10 digits.');
      }
    }
    return { valid: errors.length === 0, errors };
  },

  validateChild(child, isPartial = false) {
    const errors = [];
    if (!child) {
      return { valid: false, errors: ['Child object is required.'] };
    }
    if (!isPartial || child.name !== undefined) {
      if (!child.name || typeof child.name !== 'string' || !/^[A-Za-z]+(?: [A-Za-z]+)*$/.test(child.name.trim())) {
        errors.push('Child name must contain letters and spaces only (no numbers or special characters).');
      }
    }
    if (!isPartial || child.age !== undefined) {
      if (child.age !== undefined && child.age !== null && child.age !== '') {
        const ageNum = Number(child.age);
        if (!/^\d+$/.test(String(child.age).trim()) || isNaN(ageNum) || ageNum < 1 || ageNum > 20) {
          errors.push('Child age must be a valid number between 1 and 20.');
        }
      }
    }
    return { valid: errors.length === 0, errors };
  },

  setUser(user) {
    const validation = this.validateUser(user);
    if (!validation.valid) {
      console.error('StorageService: Cannot save user - backend validation failed:', validation.errors);
      throw new Error('Backend Validation Error: ' + validation.errors.join('; '));
    }
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return user;
  },

  getChildren() {
    try {
      let children = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHILDREN));
      if (!children || !Array.isArray(children) || children.length === 0) {
        children = DEFAULT_CHILDREN;
        localStorage.setItem(STORAGE_KEYS.CHILDREN, JSON.stringify(children));
      } else {
        let updated = false;
        children = children.map(child => {
          const nameLower = (child.name || '').toLowerCase();
          let expectedAvatar = child.avatar;
          if (nameLower.includes('leo')) {
            expectedAvatar = 'assets/images/avatars/child-leo.jpg';
          } else if (nameLower.includes('maya')) {
            expectedAvatar = 'assets/images/avatars/child-maya.jpg';
          } else if (nameLower.includes('ethan')) {
            expectedAvatar = 'assets/images/avatars/child-ethan.jpg';
          }
          if (expectedAvatar && expectedAvatar !== child.avatar) {
            child.avatar = expectedAvatar;
            updated = true;
          }
          return child;
        });

        // Ensure Ethan is included in default children set
        const hasEthan = children.some(c => (c.name || '').toLowerCase().includes('ethan'));
        if (!hasEthan && children.length <= 2) {
          children.push(DEFAULT_CHILDREN[2]);
          updated = true;
        }

        if (updated) {
          localStorage.setItem(STORAGE_KEYS.CHILDREN, JSON.stringify(children));
        }
      }
      return children;
    } catch (e) {
      return DEFAULT_CHILDREN;
    }
  },

  addChild(child) {
    const validation = this.validateChild(child);
    if (!validation.valid) {
      console.error('StorageService: Cannot add child - backend validation failed:', validation.errors);
      throw new Error('Backend Validation Error: ' + validation.errors.join('; '));
    }
    const children = this.getChildren();
    if (!child.id) {
      child.id = 'child-' + Date.now();
    }
    if (!child.avatar) {
      child.avatar = 'assets/images/avatars/avatar-default.jpg';
    }
    children.push(child);
    localStorage.setItem(STORAGE_KEYS.CHILDREN, JSON.stringify(children));
    return child;
  },

  updateChild(id, updatedData) {
    const validation = this.validateChild(updatedData, true);
    if (!validation.valid) {
      console.error('StorageService: Cannot update child - backend validation failed:', validation.errors);
      throw new Error('Backend Validation Error: ' + validation.errors.join('; '));
    }
    const children = this.getChildren();
    const index = children.findIndex(c => c.id === id);
    if (index !== -1) {
      children[index] = { ...children[index], ...updatedData };
      localStorage.setItem(STORAGE_KEYS.CHILDREN, JSON.stringify(children));
      return children[index];
    }
    return null;
  },

  removeChild(id) {
    let children = this.getChildren();
    children = children.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CHILDREN, JSON.stringify(children));

    // Also remove associated enrollments
    let enrollments = this.getEnrollments();
    enrollments = enrollments.filter(e => e.childId !== id);
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrollments));
  },

  getEnrollments() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ENROLLMENTS)) || DEFAULT_ENROLLMENTS;
    } catch (e) {
      return DEFAULT_ENROLLMENTS;
    }
  },

  addEnrollment(childId, classObj) {
    const enrollments = this.getEnrollments();
    const children = this.getChildren();
    const child = children.find(c => c.id === childId);
    const childName = child ? child.name : "Enrolled Child";

    // Check if already enrolled
    const exists = enrollments.find(e => e.childId === childId && e.classId === classObj.id);
    if (exists) {
      return { success: false, message: `${childName} is already enrolled in ${classObj.title}.` };
    }

    const newEnrollment = {
      id: "enr-" + Date.now(),
      childId: childId,
      childName: childName,
      classId: classObj.id,
      className: classObj.title,
      schedule: classObj.schedule,
      instructor: classObj.instructorName,
      room: classObj.room,
      status: "Active",
      enrolledDate: new Date().toISOString().split('T')[0]
    };

    enrollments.push(newEnrollment);
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrollments));
    return { success: true, enrollment: newEnrollment };
  },

  cancelEnrollment(enrollmentId) {
    let enrollments = this.getEnrollments();
    enrollments = enrollments.filter(e => e.id !== enrollmentId);
    localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrollments));
    return true;
  },

  getSavedResources() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SAVED_RESOURCES)) || DEFAULT_SAVED_RESOURCES;
    } catch (e) {
      return DEFAULT_SAVED_RESOURCES;
    }
  },

  toggleSaveResource(resourceId) {
    let saved = this.getSavedResources();
    const idx = saved.indexOf(resourceId);
    let isSaved = false;
    if (idx !== -1) {
      saved.splice(idx, 1);
      isSaved = false;
    } else {
      saved.push(resourceId);
      isSaved = true;
    }
    localStorage.setItem(STORAGE_KEYS.SAVED_RESOURCES, JSON.stringify(saved));
    return isSaved;
  },

  getMessages() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.MESSAGES)) || DEFAULT_MESSAGES;
    } catch (e) {
      return DEFAULT_MESSAGES;
    }
  },

  sendMessage(threadId, text) {
    const threads = this.getMessages();
    const thread = threads.find(t => t.threadId === threadId);
    if (thread) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      thread.messages.push({
        sender: "you",
        time: "Today, " + timeStr,
        text: text
      });
      localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(threads));
      return thread;
    }
    return null;
  },

  getAnnouncements() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS)) || DEFAULT_ANNOUNCEMENTS;
    } catch (e) {
      return DEFAULT_ANNOUNCEMENTS;
    }
  }
};

// Auto initialize storage on script load
StorageService.init();

window.StorageService = StorageService;
