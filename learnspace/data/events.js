/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Events Data
 */

const EVENTS_DATA = [
  {
    id: "annual-stem-expo",
    title: "Annual Homeschool STEM & Science Expo 2026",
    slug: "annual-homeschool-stem-expo-2026",
    date: "October 24, 2026",
    isoDate: "2026-10-24",
    time: "10:00 AM - 3:00 PM",
    category: "Academic & Showcase",
    location: "LearnSpace Main Campus Great Hall & Quad",
    address: "742 Innovation Way, Oakwood Campus",
    organizer: "Dr. Sarah Chen & Marcus Vance",
    capacity: 250,
    rsvpCount: 194,
    admission: "Free for Co-Op Members • $10 for Guest Families",
    image: "assets/images/events/annual-stem-expo.jpg",
    isFeatured: true,
    shortDescription: "Our signature annual showcase featuring 60+ student research posters, live robotics obstacle runs, interactive science demonstrations, and guest engineering mentors.",
    description: "The Annual LearnSpace STEM Expo is the highlight of the homeschool autumn academic calendar. Over 60 student exhibitors across elementary through high school will showcase experimental hypothesis boards, robotic prototypes, and environmental testing results. Features hands-on maker stations, a liquid nitrogen ice cream demonstration at noon, and an awards ceremony.",
    agenda: [
      { time: "10:00 AM", item: "Doors Open & Student Project Setup Inspection" },
      { time: "10:30 AM", item: "Keynote Address: 'Curiosity as an Engine of Discovery' by Dr. Sarah Chen" },
      { time: "11:15 AM", item: "Robotics Arena Heats: FIRST LEGO League & Python Rover Maze Trials" },
      { time: "12:15 PM", item: "Co-Op Community Lunch & Liquid Nitrogen Physics Demonstration" },
      { time: "1:30 PM", item: "Senior High School Capstone Science Presentations & Judge Q&A" },
      { time: "2:30 PM", item: "Ribbon Ceremony, Innovation Awards & Closing Celebration" }
    ],
    requirements: "Exhibitors must register their projects by October 15. All visiting families are welcome!"
  },
  {
    id: "autumn-park-day",
    title: "Autumn Community Park & Field Games Day",
    slug: "autumn-community-park-day",
    date: "November 5, 2026",
    isoDate: "2026-11-05",
    time: "11:00 AM - 2:30 PM",
    category: "Community & Outdoor",
    location: "Oakwood Regional Nature Park Pavilion #3",
    address: "1200 Lakeview Drive, Oakwood Valley",
    organizer: "LearnSpace Parent Co-op Social Committee",
    capacity: 180,
    rsvpCount: 142,
    admission: "Free for All Families",
    image: "assets/images/events/autumn-park-day.jpg",
    isFeatured: true,
    shortDescription: "Join fellow homeschool families for a crisp autumn afternoon of cooperative games, tug-of-war, sack races, nature scavenger hunts, and a potluck cider bar.",
    description: "Park Days are the cornerstone of homeschool community friendship. Pack a family lunch and a picnic blanket for an afternoon of relaxed socialization for parents and energetic group games for children of all ages. Includes our beloved four-way capture the flag, parachute play for toddlers, and a hot spiced apple cider station provided by the co-op.",
    agenda: [
      { time: "11:00 AM", item: "Welcome Circle & Toddler Parachute Play" },
      { time: "11:45 AM", item: "Elementary Nature Scavenger Hunt & Tree Leaf Bingo" },
      { time: "12:30 PM", item: "Family Picnic Lunch & Warm Spiced Apple Cider Station" },
      { time: "1:15 PM", item: "All-Ages Cooperative Relay Games & Ultimate Frisbee" },
      { time: "2:15 PM", item: "Clean Up & Parent Co-Op Informal Social Circle" }
    ],
    requirements: "Bring a family lunch, picnic blanket, and refillable water bottles."
  },
  {
    id: "shakespeare-festival",
    title: "Youth Shakespeare Festival & Fall Drama",
    slug: "youth-shakespeare-festival-fall-drama",
    date: "November 18, 2026",
    isoDate: "2026-11-18",
    time: "6:30 PM - 9:00 PM",
    category: "Fine Arts & Theatre",
    location: "Community Amphitheater Mainstage",
    address: "742 Innovation Way, Oakwood Campus",
    organizer: "Robert Jenkins & Drama Faculty",
    capacity: 220,
    rsvpCount: 168,
    admission: "Free Admission (Donations Welcome for Wardrobe)",
    image: "assets/images/events/shakespeare-festival.jpg",
    isFeatured: false,
    shortDescription: "An enchanting evening of classical drama featuring abridged scenes from 'A Midsummer Night's Dream' and 'Julius Caesar' performed by our co-op students.",
    description: "Witness the timeless words of William Shakespeare brought to vibrant life by our talented middle and high school players. Complete with period costuming, live acoustic lute music, and student-designed lighting, this festival celebrates classical literature and oratorical mastery in a warm community setting.",
    agenda: [
      { time: "6:30 PM", item: "Pre-Show Renaissance Lute & Choral Ensemble Prelude" },
      { time: "7:00 PM", item: "Act I: 'A Midsummer Night's Dream' (The Mechanicals & Fairies)" },
      { time: "7:45 PM", item: "Intermission & Thespian Bake Sale Fundraiser" },
      { time: "8:05 PM", item: "Act II: 'Julius Caesar' (Forum Speeches & Dramatic Climax)" },
      { time: "8:45 PM", item: "Director's Remarks & Cast Ovation" }
    ],
    requirements: "Open to the general public. Doors open at 6:00 PM."
  },
  {
    id: "nature-trail-hike",
    title: "Pine Ridge Family Nature Trail & Geocaching Hike",
    slug: "pine-ridge-nature-trail-geocaching-hike",
    date: "December 2, 2026",
    isoDate: "2026-12-02",
    time: "9:30 AM - 12:30 PM",
    category: "Community & Outdoor",
    location: "Pine Ridge Conservation Trailhead",
    address: "County Road 44, Trailhead Parking Lot B",
    organizer: "Nature Study Club & Dr. Sarah Chen",
    capacity: 60,
    rsvpCount: 52,
    admission: "Free Event",
    image: "assets/images/events/nature-trail-hike.jpg",
    isFeatured: false,
    shortDescription: "A guided 2.5-mile educational hike focusing on winter forest ecology, animal tracks, and a fun GPS geocaching treasure hunt for kids.",
    description: "Explore the gentle slopes and evergreen canopies of Pine Ridge Reserve. Dr. Sarah Chen will point out animal winter shelters, lichens, and geological formations. Children will use handheld GPS units and compasses to locate three hidden educational geocaches along the trail.",
    agenda: [
      { time: "9:30 AM", item: "Trailhead Safety Briefing & GPS Compass Calibration" },
      { time: "10:00 AM", item: "Hike Begins: Canopy Ecology & Animal Track Identification" },
      { time: "11:00 AM", item: "Geocache Finding & Wildlife Journaling Break at Scenic Ridge" },
      { time: "12:00 PM", item: "Descent & Return to Trailhead for Hot Cocoa" }
    ],
    requirements: "Wear sturdy walking shoes and bring water and warm weather layers."
  },
  {
    id: "maker-faire",
    title: "Holiday Maker Faire & Student Craft Bazaar",
    slug: "holiday-maker-faire-craft-bazaar",
    date: "December 12, 2026",
    isoDate: "2026-12-12",
    time: "1:00 PM - 5:00 PM",
    category: "Academic & Showcase",
    location: "LearnSpace Maker Lab & Center Court",
    address: "742 Innovation Way, Oakwood Campus",
    organizer: "Marcus Vance & Elena Rodriguez",
    capacity: 300,
    rsvpCount: 210,
    admission: "Free Admission",
    image: "assets/images/events/maker-faire.jpg",
    isFeatured: false,
    shortDescription: "Support young homeschool entrepreneurs! Students sell handcrafted goods, baked treats, 3D printed gadgets, and custom artwork while demonstrating maker skills.",
    description: "An entrepreneurial marketplace where homeschool students manage their own booths, handle transactions, practice marketing, and display incredible handmade creations. Live woodworking, 3D printing, and pottery throwing demonstrations will take place throughout the afternoon.",
    agenda: [
      { time: "1:00 PM", item: "Marketplace Ribbon Cutting & Booths Open" },
      { time: "2:00 PM", item: "Live 3D Printer Speed Benchmark Challenge" },
      { time: "3:30 PM", item: "Student Young Entrepreneur Pitch Showcase" },
      { time: "4:30 PM", item: "Raffle Drawings & People's Choice Maker Award" }
    ],
    requirements: "Cash and card accepted at student vendor stalls."
  },
  {
    id: "family-game-night",
    title: "Family Board Game & Math Quest Night",
    slug: "family-board-game-math-quest-night",
    date: "January 8, 2027",
    isoDate: "2027-01-08",
    time: "6:00 PM - 8:30 PM",
    category: "Community & Outdoor",
    location: "LearnSpace Community Commons & Lounge",
    address: "742 Innovation Way, Oakwood Campus",
    organizer: "David Park & The Math Club",
    capacity: 100,
    rsvpCount: 78,
    admission: "Free for Members",
    image: "assets/images/events/family-game-night.jpg",
    isFeatured: false,
    shortDescription: "A cozy evening of strategy board games, chess tournaments, cooperative logic quests, and fresh popcorn for all homeschool ages.",
    description: "Bring your favorite tabletop game or dive into our extensive co-op library of strategy games (Settlers of Catan, Ticket to Ride, Prime Climb, Blokus, Chess, and Wingspan). Perfect for fostering camaraderie, mathematical thinking, and family bonding during the winter months.",
    agenda: [
      { time: "6:00 PM", item: "Game Library Browsing & Table Matching" },
      { time: "6:30 PM", item: "Rapid Chess Blitz Tournament Kicks Off" },
      { time: "7:15 PM", item: "Popcorn & Healthy Snacks Served" },
      { time: "8:15 PM", item: "Champion Puzzle Trophy Presentation & Wrap-up" }
    ],
    requirements: "Families can bring board games to share. All ages welcome."
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EVENTS_DATA;
}
