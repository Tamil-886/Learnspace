/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Resources Data
 */

const RESOURCES_DATA = [
  {
    id: "curriculum-guide",
    title: "K-12 Homeschool Curriculum Guide 2026-2027",
    slug: "k-12-homeschool-curriculum-guide-2026",
    category: "Curriculum Guides",
    format: "Digital PDF & Printable",
    gradeLevel: "All Grades (K-12)",
    gradeCategory: "all",
    subject: "Multi-Subject Planning",
    author: "LearnSpace Academic Committee",
    rating: 4.95,
    reviewsCount: 88,
    borrowable: false,
    downloadable: true,
    fileSize: "14.2 MB",
    pageCount: "128 Pages",
    image: "assets/images/resources/curriculum-guide.jpg",
    featured: true,
    description: "Our definitive 128-page annual roadmap for homeschool families. Includes scope-and-sequence charts, Charlotte Mason and Classical literature booklists, high school transcript templates, state law compliance checklists, and vetted curricula reviews across all subjects.",
    specs: {
      edition: "2026-2027 Updated Edition",
      format: "PDF (Print-Ready 300 DPI)",
      includes: ["Scope & Sequence Charts", "High School Credit Worksheet", "Curriculum Comparison Rubric", "Daily Schedule Planners"]
    },
    contents: [
      "Introduction: Crafting a Personalized Homeschool Philosophy",
      "Chapter 1: Kindergarten through Grade 2 Foundational Literacy & Math",
      "Chapter 2: Grades 3-5 Elementary Inquiry & Living Books",
      "Chapter 3: Grades 6-8 Middle School Logic & Independent Study",
      "Chapter 4: Grades 9-12 High School Transcripts, AP & Dual Enrollment",
      "Appendix: Co-Op Resource Center Lending Catalog & State Checklists"
    ]
  },
  {
    id: "lab-kit",
    title: "Advanced Chemistry & Biology Lab Kit #4",
    slug: "advanced-chemistry-biology-lab-kit-4",
    category: "Science Lab Kits",
    format: "Physical Lending Kit",
    gradeLevel: "Grades 6-12",
    gradeCategory: "high",
    subject: "Chemistry & Life Science",
    author: "LearnSpace Science Lab",
    rating: 4.98,
    reviewsCount: 36,
    borrowable: true,
    availableUnits: 3,
    totalUnits: 5,
    location: "Science Storage Room B - Shelf 2",
    image: "assets/images/resources/lab-kit.jpg",
    featured: true,
    description: "A complete professional laboratory kit packed in a rugged, locked carry case. Contains borosilicate beakers, Erlenmeyer flasks, graduated cylinders, digital 0.01g scales, Bunsen burner alternative, safety goggles, test tube rack, and sealed safe reagent packs for 24 high school lab experiments.",
    specs: {
      contentsCount: "48 Pieces + Experiment Binder",
      weight: "6.8 kg",
      loanPeriod: "3 Weeks (Renewable)",
      safetyDeposit: "Included with Full Co-Op Membership"
    },
    contents: [
      "1x 250ml & 1x 100ml Borosilicate Beakers",
      "2x 150ml Erlenmeyer Flasks with Rubber Stoppers",
      "1x 50ml Graduated Cylinder & 6x Glass Test Tubes in Wooden Rack",
      "1x Digital Precision Scale (0.01g accuracy)",
      "2x Splash-resistant Safety Goggles & Chemical Apron",
      "Comprehensive 24-Experiment Step-by-Step Lab Manual with Safety Sheets"
    ]
  },
  {
    id: "literature-pack",
    title: "Classical Literature & Socratic Reading Guides",
    slug: "classical-literature-socratic-reading-guides",
    category: "Literature & Books",
    format: "Printable Study Pack & Audio",
    gradeLevel: "Grades 5-10",
    gradeCategory: "middle",
    subject: "Humanities & Language Arts",
    author: "Robert Jenkins & Aisha Patel",
    rating: 4.92,
    reviewsCount: 42,
    borrowable: false,
    downloadable: true,
    fileSize: "28.5 MB",
    pageCount: "94 Pages",
    image: "assets/images/resources/literature-pack.jpg",
    featured: true,
    description: "In-depth Socratic discussion guides for ten foundational literary works, including The Odyssey, Beowulf, The Hobbit, To Kill a Mockingbird, and Animal Farm. Includes historical context essays, vocabulary in context, character moral dilemmas, and comprehension prompts.",
    specs: {
      targetAges: "10-16 Years",
      license: "Co-Op Family Multi-Student License",
      format: "PDF Worksheets + MP3 Audio Pronunciation Guides"
    },
    contents: [
      "Module 1: Mythic Journeys & Epic Heroes (The Odyssey & Beowulf)",
      "Module 2: Allegory & Moral Courage (The Hobbit & The Lion, the Witch and the Wardrobe)",
      "Module 3: Justice, Empathy & Society (To Kill a Mockingbird)",
      "Module 4: Dystopian Governance & Rhetoric (Animal Farm & 1984)",
      "Printable Student Response Notebooks & Discussion Question Cards"
    ]
  },
  {
    id: "math-manipulatives",
    title: "Hands-on Math & Geometry Master Toolkit",
    slug: "hands-on-math-geometry-toolkit",
    category: "STEM Tools",
    format: "Physical Lending Kit",
    gradeLevel: "Grades K-6",
    gradeCategory: "elementary",
    subject: "Elementary & Middle Math",
    author: "LearnSpace Math Department",
    rating: 4.88,
    reviewsCount: 29,
    borrowable: true,
    availableUnits: 4,
    totalUnits: 6,
    location: "Resource Center Room A - Cabinet 4",
    image: "assets/images/resources/math-manipulatives.jpg",
    featured: false,
    description: "Transforms abstract mathematical equations into tactile, visual realizations. Packed with Base-10 wooden blocks, magnetic fraction circles and bars, 3D geometric folding nets, geoboards with bands, Cuisenaire rods, and a demonstration clock.",
    specs: {
      contentsCount: "250+ Tactile Components",
      storage: "Stackable Plastic Organizer Tote",
      loanPeriod: "4 Weeks"
    },
    contents: [
      "1x Base-10 Complete Set (Units, Rods, Flats, Cube)",
      "1x Magnetic Color-Coded Fraction Tiles & Circular Sectors",
      "12x Folding 3D Geometric Nets (Polyhedra & Prisms)",
      "2x Double-Sided Heavy Duty Geoboards with 100 Elastic Bands",
      "Teacher Demonstration Activity Card Deck (50 Hands-On Challenges)"
    ]
  },
  {
    id: "unit-study",
    title: "Ecology & Forest Wildlife Comprehensive Unit Study",
    slug: "ecology-forest-wildlife-unit-study",
    category: "Unit Studies",
    format: "Digital PDF & Field Cards",
    gradeLevel: "Grades 1-8",
    gradeCategory: "elementary",
    subject: "Natural Sciences",
    author: "Elena Rodriguez & Dr. Sarah Chen",
    rating: 4.96,
    reviewsCount: 51,
    borrowable: false,
    downloadable: true,
    fileSize: "36.4 MB",
    pageCount: "86 Pages",
    image: "assets/images/resources/unit-study.jpg",
    featured: false,
    description: "An immersive 6-week Charlotte-Mason style unit study designed for nature-loving homeschoolers. Features original botanical watercolor flashcards, animal tracking keys, anatomy cross-sections, poetry selections, and weekly hands-on outdoor field activities.",
    specs: {
      unitDuration: "6 Weeks (Flexible Pacing)",
      format: "PDF (Printable Full Color & Ink-Friendly BW)",
      includes: ["32 Printable Field Flashcards", "Observation Notebook Pages"]
    },
    contents: [
      "Week 1: Deciduous & Coniferous Forest Canopies",
      "Week 2: Forest Floor Micro-Ecosystems & Fungi",
      "Week 3: Mammals of North America & Tracking Methods",
      "Week 4: Songbirds, Raptors & Avian Adaptations",
      "Week 5: Freshwater Streams & Riparian Ecology",
      "Week 6: Conservation, Stewardship & Capstone Field Project"
    ]
  },
  {
    id: "audio-bundle",
    title: "Historic Speeches & Classical Music Audio Library",
    slug: "historic-speeches-classical-music-audio",
    category: "Audio & Media",
    format: "Digital Audio Bundle (MP3 & Lossless)",
    gradeLevel: "All Grades (K-12)",
    gradeCategory: "all",
    subject: "Humanities & Fine Arts",
    author: "LearnSpace Archive Collection",
    rating: 4.91,
    reviewsCount: 34,
    borrowable: false,
    downloadable: true,
    fileSize: "480 MB",
    pageCount: "64 Audio Tracks",
    image: "assets/images/resources/audio-bundle.jpg",
    featured: false,
    description: "A curated digital audio archive featuring master recordings of famous historical speeches, dramatic classical literature readings, and orchestral masterpieces organized by historical era (Baroque, Classical, Romantic, and Modern).",
    specs: {
      trackCount: "64 High-Fidelity Audio Tracks",
      format: "320kbps MP3 + Accompanying Transcript PDF",
      duration: "8 Hours 40 Minutes Total Audio"
    },
    contents: [
      "Part 1: The Words that Shaped History (Pericles to Winston Churchill)",
      "Part 2: Shakespearean Monologues & Classical Poetry Performances",
      "Part 3: Composer Spotlight: Bach, Mozart, Beethoven & Dvořák",
      "Accompanying 48-Page Printable Listening & History Analysis Companion"
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = RESOURCES_DATA;
}
