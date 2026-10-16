# LearnSpace – Homeschool Co-Op & Resource Center

LearnSpace is a modern, responsive website and parent dashboard developed for a collaborative homeschool cooperative and educational lending resource center. Built exclusively with semantic **HTML5**, modern **CSS3**, and modular **Vanilla JavaScript**.

---

## 1. Mandatory Colour Theme (Black, White, and Blue)

The design strictly implements a premium **Black + White + Blue** palette:

| Element / Role | Color Hex | CSS Variable |
|---|---|---|
| **Primary Blue** | `#2563EB` | `--color-primary` |
| **Bright Blue Accent** | `#3B82F6` | `--color-accent` |
| **Deep Navy** | `#0F172A` | `--color-navy` |
| **Black** | `#000000` | `--color-black` |
| **White** | `#FFFFFF` | `--color-white` |
| **Light Background** | `#F8FAFC` | `--color-bg-secondary` |
| **Card Background** | `#FFFFFF` | `--color-card-bg` |
| **Border** | `#E2E8F0` | `--color-border` |
| **Secondary Text** | `#64748B` | `--color-text-secondary` |
| **Success** | `#16A34A` | `--color-success` |
| **Error** | `#DC2626` | `--color-error` |

### Dark Mode Tokens (`[data-theme="dark"]`)
- **Main Background**: `#0B1120`
- **Card Background**: `#111827`
- **Sidebar Background**: `#0F172A`
- **Primary Blue**: `#3B82F6`
- **Main Text**: `#F8FAFC`
- **Secondary Text**: `#CBD5E1`
- **Borders**: `#334155`

---

## 2. Project Directory Structure

```text
learnspace/
│
├── index.html                  # Home 1 (Co-Op Community & Featured Highlights)
├── home-2.html                 # Home 2 (Interactive Class & Resource Finder)
├── 404.html                    # Custom 404 Not Found Page
├── coming-soon.html            # Feature Launch Countdown & Email Notification
├── maintenance.html            # Scheduled Maintenance Status Page
├── README.md                   # Complete Documentation
│
├── pages/
│   ├── about.html              # Mission, History, 12-Acre Campus & Values
│   ├── how-it-works.html       # Cooperative 4-Step Process & Committee Roles
│   ├── classes.html            # Filterable Class Catalog (STEM, Arts, Lit)
│   ├── class-details.html      # 12-Week Syllabus, Lab Specs & Enrollment Trigger
│   ├── instructors.html        # Faculty Biographies & Academic Credentials
│   ├── instructor-details.html # Individual Profile, Classes Taught & Office Hours
│   ├── membership.html         # Pricing Tiers & Benefit Comparison
│   ├── resources.html          # Resource Center & Lending Library
│   ├── resource-details.html   # Kit Specs, Contents & Download / Reservation
│   ├── community.html          # Park Days, Forums & Parent Volunteer Roles
│   ├── events.html             # Co-Op Calendar, STEM Expo & Hikes
│   ├── event-details.html      # Event Agenda, Map & Interactive RSVP
│   ├── testimonials.html       # Verified Parent Reviews & Video Previews
│   ├── blog.html               # Homeschool Articles & Scheduling Guides
│   ├── blog-details.html       # Full Article with Table of Contents & Comments
│   ├── faq.html                # Categorized Interactive Accordions
│   └── contact.html            # Campus Tour Form & Oakwood Map Preview
│
├── auth/
│   ├── login.html              # Demo Login (In-place "Login successful!" message)
│   ├── register.html           # Family Membership Application
│   ├── forgot-password.html    # Password Recovery Link Dispatcher
│   ├── reset-password.html     # New Password Form & Strength Validation
│   └── verify-email.html       # 6-Digit Verification Code (OTP) Demo
│
├── dashboard/
│   ├── index.html              # Parent Dashboard Overview & Metrics
│   │
│   ├── children/
│   │   ├── index.html          # Child Profiles, Class Tallies, Edit & Delete
│   │   └── add-child.html      # Register New Child Profile Form
│   │
│   ├── classes/
│   │   ├── browse.html         # In-Dashboard Course Catalog & Filter
│   │   ├── class-details.html  # Class Details & Child Enrollment Modal
│   │   ├── my-enrollments.html # Active Registrations & Cancellation Demo
│   │   └── schedule.html       # Weekly Monday–Friday Timetable Grid
│   │
│   ├── resources/
│   │   ├── index.html          # Resource Center Lending Catalog
│   │   └── resource-details.html # Kit Reservation & PDF Download
│   │
│   ├── membership/
│   │   └── index.html          # Membership Tier, Upgrade Demo & Receipts
│   │
│   ├── community/
│   │   ├── announcements.html  # Urgent Board Notices & Lab Updates
│   │   ├── events.html         # Co-Op Events & RSVP Counter
│   │   └── messages.html       # Faculty Messenger with Simulated Replies
│   │
│   └── account/
│       ├── profile.html        # Parent Profile & Emergency Contact Info
│       ├── settings.html       # Notifications & Display Preferences
│       └── help-support.html   # Helpdesk Support Tickets & Hotline
│
├── assets/
│   ├── images/
│   │   ├── logo/               # logo.svg, logo-light.svg, favicon.svg
│   │   ├── hero/               # hero-main.svg, hero-alt.svg
│   │   ├── classes/            # science-lab, robotics-stem, studio-art, etc.
│   │   ├── instructors/        # dr-sarah-chen, marcus-vance, etc.
│   │   ├── community/          # co-op-gathering, park-day, etc.
│   │   ├── resources/          # curriculum-guide, lab-kit, etc.
│   │   ├── events/             # annual-stem-expo, autumn-park-day, etc.
│   │   ├── blog/               # homeschool-planning, stem-curriculum, etc.
│   │   └── avatars/            # parent-sarah, parent-michael, child-leo, etc.
│   ├── icons/
│   └── fonts/
│
├── css/
│   ├── variables.css           # Black, White & Blue palette and dark mode tokens
│   ├── reset.css               # Normalize & box-sizing
│   ├── main.css                # Global typography, containers, buttons & cards
│   ├── layout.css              # Page banners, sidebars & dashboard shell
│   ├── components.css          # Modals, tabs, accordions, alerts & avatars
│   ├── navigation.css          # Sticky navbar, mega dropdowns & offcanvas drawer
│   ├── footer.css              # Footer grid, newsletter & bottom bar
│   ├── home.css                # Hero sections, stats strip & pillar cards
│   ├── pages.css               # About, membership, blog & 404 styles
│   ├── classes.css             # Class cards, capacity bars & syllabus
│   ├── auth.css                # Login/register cards, banners & OTP grid
│   ├── dashboard.css           # Sidebar, metric tiles, schedule grid & chat UI
│   ├── theme.css               # Dark/Light toggle animations & scrollbars
│   ├── rtl.css                 # Bidirectional styles (LTR / RTL support)
│   ├── responsive.css          # Breakpoints (320px to 1920px+)
│   └── animations.css          # Keyframes, fade-in & pulse dots
│
├── js/
│   ├── main.js                 # Modals, tabs, accordions & toast notifications
│   ├── navigation.js           # Active link highlighting & sticky header
│   ├── responsive-menu.js      # Mobile drawer & sidebar toggles
│   ├── theme.js                # Theme switcher with localStorage persistence
│   ├── direction.js            # LTR/RTL switcher with localStorage persistence
│   ├── validation.js           # Form inputs & error messaging
│   ├── auth.js                 # Demo login (displays "Login successful!" in place)
│   ├── storage.js              # State manager for children, enrollments & chats
│   ├── dashboard.js            # Summary metrics, schedules & children snippets
│   ├── children.js             # Add, edit, calculate age & delete child profiles
│   ├── classes.js              # Catalog filters, syllabus & enrollment modal
│   ├── enrollments.js          # Active registration table & cancellation
│   ├── schedule.js             # Weekly timetable grid & print handling
│   ├── resources.js            # Resource catalog, bookmarks & kit reservation
│   ├── membership.js           # Tier status, upgrade demo & invoice receipts
│   ├── community.js            # Chat messaging with simulated faculty replies
│   ├── events.js               # Events calendar & interactive RSVP
│   ├── search-filter.js        # Instant live search across all datasets
│   └── blog.js                 # Blog filters & demo comment submission
│
└── data/
    ├── classes.js              # 9 Comprehensive Courses with full syllabi
    ├── instructors.js          # 6 Detailed Faculty Biographies & credentials
    ├── resources.js            # 6 Physical Kits & Digital Curriculum items
    ├── events.js               # 6 Co-op Events with detailed agendas
    └── blog-posts.js           # 6 In-depth Homeschooling Articles
```

---

## 3. Key Functionality & Behaviors

### Authentication Requirement
- On the **Login Page** (`auth/login.html`), entering valid credentials displays **`Login successful!`** inside the card.
- **The page does NOT redirect** and does NOT automatically reload.
- An autofill button is provided (`parent@learnspace.org` / `demo123`) for one-click testing.

### Parent Dashboard Demonstrations
- **Children Management**: Add new child with date-of-birth, automatic age calculation, grade level, and allergies. Edit profile or remove with confirmation.
- **Class Enrollment**: Browse classes, select child from dropdown, and enroll. Enrollments appear immediately in **My Enrollments** and in the **Weekly Schedule**.
- **Cancellation**: Cancel demo enrollments with instant table update and feedback toast.
- **Timetable**: Filter by child or view all children combined. Print button opens clean printer layout.
- **Curriculum Lending**: Bookmark favorites (saved in `localStorage`), reserve physical chemistry kits, or download curriculum PDFs.
- **Faculty Messenger**: Send messages to educators and receive a simulated response after 1.5 seconds.
- **Membership**: Preview billing cycles, download receipts, and switch tiers.

### Bidirectional Support (LTR / RTL)
Clicking the **RTL / LTR** button in the navbar or footer toggles the layout direction:
- Mirrors dashboard sidebar and mobile navigation drawer.
- Inverts schedules, form icons, dropdowns, and text alignments.
- Stored in `localStorage`.

### Dark Mode & Light Mode
Clicking the theme toggle switches between clean light mode and deep navy dark mode (`#0B1120`, `#111827`, `#0F172A`).
- Contrast verified across all text, forms, tables, modals, and badges.
- Automatically synced across all pages.
