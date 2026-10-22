/**
 * LearnSpace - Homeschool Co-Op & Resource Center
 * Faculty & Instructors Data
 */

const INSTRUCTORS_DATA = [
  {
    id: "dr-sarah-chen",
    name: "Dr. Sarah Chen, Ph.D.",
    shortName: "Dr. Chen",
    title: "Lead STEM & Physics Educator",
    role: "STEM Specialist & Homeschool Parent",
    avatar: "assets/images/instructors/dr-sarah-chen.jpg",
    desk: "Science Lab Room 102",
    phone: "(555) 382-9102",
    email: "sarah.chen@learnspace.org",
    officeHours: "Tuesdays & Thursdays, 1:00 PM – 3:00 PM",
    experience: "14+ Years",
    rating: 4.98,
    reviewCount: 64,
    subjects: ["Experimental Physics", "General Chemistry", "Microscopy & Cell Biology", "Observational Astronomy", "Forensic Investigation"],
    shortBio: "Doctorate in Applied Physics from Stanford. Homeschool mother of two. Believes every child is a natural experimental scientist.",
    bio: [
      "Dr. Sarah Chen holds a doctorate in Applied Physics from Stanford University, with postdoctoral research in laser optics and fluid thermodynamics. When her eldest child reached kindergarten age, she made the conscious decision to homeschool, creating inquiry-based laboratory experiments at home that quickly grew into a neighborhood cooperative science club.",
      "As the Lead STEM Educator at LearnSpace for the past seven years, Dr. Chen oversees the co-op wet lab, compound microscopes, and observational astronomy program. She trains students to think empirically, wear lab safety goggles with pride, keep meticulous student journals, and celebrate experimental failure as a vital milestone of the scientific method.",
      "Dr. Chen frequently hosts weekend community stargazing nights and mentors co-op middle and high school students preparing research projects for regional and state science fairs."
    ],
    credentials: [
      "Ph.D. Applied Physics, Stanford University",
      "B.S. Physics & Applied Mathematics, UC Berkeley (Summa Cum Laude)",
      "Author of 'Inquiry Science at the Kitchen Table: 100 Safe Home Experiments'",
      "Former Stanford Teaching Fellow & NSF Graduate Research Fellow",
      "Lead Coach for 5 National Science Olympiad Medalists",
      "First Aid, Wilderness Emergency & Pediatric CPR Certified"
    ],
    philosophy: "Children are natural scientists with an innate urge to test, question, and wonder. Our role as educators is simply to equip them with proper tools, rigorous questions, and safety protocols to explore the universe.",
    classesTaught: [
      "science-lab",
      "nature-botany",
      "astronomy-space",
      "marine-ecology",
      "culinary-science",
      "forensic-science"
    ],
    testimonials: [
      {
        quote: "Dr. Chen's hands-on physics lab completely transformed my daughter's relationship with science. She went from dreading formulas to eagerly calculating fluid density at dinner!",
        parent: "Marianne Campbell",
        child: "Mother of 7th Grader, Maya"
      },
      {
        quote: "Her telescope astronomy nights on the campus green are legendary among our co-op families. The depth of her academic knowledge paired with maternal patience is unmatched.",
        parent: "Gregory Thomas",
        child: "Father of 5th & 8th Graders"
      }
    ]
  },
  {
    id: "marcus-vance",
    name: "Marcus Vance, B.S.",
    shortName: "Mr. Vance",
    title: "Robotics & Maker Space Director",
    role: "Robotics Engineer & Maker Mentor",
    avatar: "assets/images/instructors/marcus-vance.jpg",
    desk: "Maker Lab & Prototyping Room 108",
    phone: "(555) 382-9104",
    email: "marcus.vance@learnspace.org",
    officeHours: "Mondays & Wednesdays, 2:30 PM – 4:30 PM",
    experience: "10+ Years",
    rating: 4.95,
    reviewCount: 52,
    subjects: ["Robotics Engineering", "Python Programming", "Arduino Microcontrollers", "3D CAD & Prototyping", "Woodworking & Joinery"],
    shortBio: "Former firmware engineer turned homeschool coach. Teaches Python, Arduino, and directs our FIRST LEGO League champions.",
    bio: [
      "Marcus Vance spent seven years in automotive firmware engineering and rapid hardware prototyping before transitioning full-time into youth engineering education. An active maker community advocate, Marcus founded the LearnSpace Maker Lab in 2020 to give homeschoolers access to industrial-grade 3D printers, laser cutters, soldering stations, and woodworking hand tools.",
      "Marcus coaches our championship-winning FIRST LEGO League (FLL) and FIRST Tech Challenge (FTC) robotics teams. His project-based curriculum treats coding not as abstract syntax, but as a dynamic superpower that breathes movement, light, and autonomous logic into physical hardware.",
      "Under his guidance, homeschool students develop complete engineering design notebooks, practice iterative rapid prototyping, and learn traditional hand-tool craftsmanship side-by-side with modern Python game development."
    ],
    credentials: [
      "B.S. Mechatronics & Embedded Systems Engineering, Purdue University",
      "FIRST Robotics Regional Coach Mentor of the Year (2022, 2024)",
      "Certified Arduino Education Specialist & Python Institute Certified Associate",
      "OSHA-10 General Industry & Makerspace Safety Instructor",
      "Author of 'Kids Who Build: Hands-On Microcontrollers for Young Makers'",
      "Co-op Maker Lab Safety & Tool Clearance Coordinator"
    ],
    philosophy: "Failure is just iteration in disguise. Watching a young learner troubleshoot broken code, resolder a loose sensor, and celebrate the moment an autonomous rover rolls forward builds resilience that lasts a lifetime.",
    classesTaught: [
      "robotics-stem",
      "coding-python",
      "woodworking-crafts"
    ],
    testimonials: [
      {
        quote: "Marcus gives kids real agency with real tools. My 12-year-old son coded a custom arcade game in Python and built the wooden cabinet himself in Marcus's workshop!",
        parent: "David & Rachel Miller",
        child: "Parents of 6th Grader, Eli"
      },
      {
        quote: "Under Marcus's coaching, our robotics team learned true collaborative problem-solving. He teaches kids how to think through hardware bugs calmly and logically.",
        parent: "Susan Henderson",
        child: "Mother of 8th Grader, Lucas"
      }
    ]
  },
  {
    id: "elena-rodriguez",
    name: "Elena Rodriguez, M.F.A.",
    shortName: "Ms. Rodriguez",
    title: "Visual Arts & Studio Faculty",
    role: "Fine Artist & Classical Art Mentor",
    avatar: "assets/images/instructors/elena-rodriguez.jpg",
    desk: "Fine Arts Studio Room 204",
    phone: "(555) 382-9106",
    email: "elena.rodriguez@learnspace.org",
    officeHours: "Wednesdays & Fridays, 11:00 AM – 1:00 PM",
    experience: "15+ Years",
    rating: 4.97,
    reviewCount: 48,
    subjects: ["Classical Drawing", "Watercolor Masterclass", "Ceramics & Sculpture", "Botanical Illustration", "Choral Vocal Harmony", "Theatrical Set Design"],
    shortBio: "Exhibiting watercolorist and botanical illustrator. Teaches classical drawing, tonal values, and nature journaling.",
    bio: [
      "Elena Rodriguez is an acclaimed botanical watercolorist whose botanical illustrations have appeared in regional natural history exhibits, botanical gardens, and educational publications. She holds a Master of Fine Arts from the prestigious Rhode Island School of Design (RISD) and has dedicated the past twelve years to mentoring young homeschool artists.",
      "Elena integrates classical atelier drawing traditions with the Charlotte Mason philosophy of observational nature journaling. In her studio classes, students work from life—drawing plaster casts, flora specimens, and live still-life setups—while developing deep mastery of values, perspective, and color harmony.",
      "Elena also coordinates the co-op's annual Student Spring Art Exhibition and directs the LearnSpace Youth Chamber Choir, uniting visual aesthetics and vocal harmony into a cohesive fine arts experience."
    ],
    credentials: [
      "M.F.A. Fine Arts & Studio Painting, Rhode Island School of Design (RISD)",
      "B.A. Art History & Studio Practice, Oberlin College",
      "Exhibiting Artist in Contemporary Watercolor & Botanical Societies",
      "Charlotte Mason Nature Study Guild Master Instructor",
      "Lead Curator for Annual LearnSpace Youth Fine Arts Showcase",
      "Certified in Classical Atelier Sight-Size Drawing Methodology"
    ],
    philosophy: "Every child possesses an authentic visual voice. We teach classical technique not to constrain creativity, but to give wings to their personal observational powers and express the beauty of the natural world.",
    classesTaught: [
      "studio-art",
      "music-theory",
      "ceramics-sculpture",
      "choral-ensemble",
      "botanical-illustration",
      "theater-production"
    ],
    testimonials: [
      {
        quote: "Ms. Rodriguez has an extraordinary gift for taking children seriously as artists. Her botanical watercolor class taught my daughter how to truly observe nature with patience and reverence.",
        parent: "Claire Davenport",
        child: "Mother of 6th & 9th Graders"
      },
      {
        quote: "The clay sculpture and studio art portfolio my son built with Elena helped him earn a high school visual arts scholarship. She is pure inspiration in the studio.",
        parent: "Anthony Morales",
        child: "Father of 10th Grader, Mateo"
      }
    ]
  },
  {
    id: "david-park",
    name: "David Park, M.Ed.",
    shortName: "Mr. Park",
    title: "Mathematics & Logic Specialist",
    role: "Math Olympiad Coach & Educator",
    avatar: "assets/images/instructors/david-park.jpg",
    desk: "Mathematics Seminar Room 201",
    phone: "(555) 382-9108",
    email: "david.park@learnspace.org",
    officeHours: "Tuesdays & Fridays, 9:00 AM – 11:00 AM",
    experience: "12+ Years",
    rating: 4.94,
    reviewCount: 57,
    subjects: ["Competition Mathematics", "Pre-Algebra & Algebra", "Origami Geometry", "Formal Deductive Logic", "Discrete Mathematics"],
    shortBio: "Math Olympiad coach specializing in AMC 8 competitions, combinatorics, and making non-routine problem solving joyful.",
    bio: [
      "David Park earned his Master of Education in Secondary Mathematics from Johns Hopkins University and has spent over a decade teaching advanced mathematics and coaching competition teams. A homeschool dad himself, David discovered early on that conventional drill-and-kill worksheets stifle mathematical intuition.",
      "At LearnSpace, David champions a 'Living Math' approach where mathematical concepts are discovered through hands-on geometric constructions, origami polyhedra, Martin Gardner logic puzzles, and Socratic problem-solving circles. His students explore the beauty of Fibonacci sequences, graph theory, and prime factorizations with genuine joy.",
      "David coaches our AMC 8 and Math Kangaroo competition squads, which have consistently placed in the top 5% nationally, while ensuring that students of all confidence levels develop a deep, fearless affection for mathematics."
    ],
    credentials: [
      "M.Ed. Secondary Mathematics Education, Johns Hopkins University",
      "B.S. Mathematics & Computer Science, University of Michigan",
      "Head Coach of 3 State Champion Math Olympiad Squads (2021, 2023, 2025)",
      "American Mathematics Competitions (AMC 8/10) Regional Coordinator",
      "Former AP Calculus & Linear Algebra Instructor",
      "Founder of the Homeschool Socratic Math Circle"
    ],
    philosophy: "Mathematics is not an assembly line of algorithms; it is an imaginative art of pattern, proof, and playful reasoning. When students encounter math through discovery and debate, anxiety dissolves into curiosity.",
    classesTaught: [
      "math-olympiad",
      "elementary-geometry"
    ],
    testimonials: [
      {
        quote: "My son used to cry over math worksheets. After two months in Mr. Park's Math Olympiad and Origami Geometry classes, he now does logic puzzles for fun before breakfast!",
        parent: "Emily Thorne",
        child: "Mother of 5th Grader, Oliver"
      },
      {
        quote: "David's enthusiasm is infectious. He breaks down competition-level problem solving into engaging visual puzzles that keep kids on the edge of their seats.",
        parent: "Dr. Kenneth Walsh",
        child: "Father of 7th Grader, Ethan"
      }
    ]
  },
  {
    id: "aisha-patel",
    name: "Aisha Patel, M.A.",
    shortName: "Ms. Patel",
    title: "Literature & Creative Writing Lead",
    role: "Published Author & Writing Workshop Mentor",
    avatar: "assets/images/instructors/aisha-patel.jpg",
    desk: "Literary Library & Writing Salon Room 208",
    phone: "(555) 382-9110",
    email: "aisha.patel@learnspace.org",
    officeHours: "Thursdays, 10:00 AM – 1:00 PM",
    experience: "11+ Years",
    rating: 4.96,
    reviewCount: 43,
    subjects: ["Creative Writing", "Socratic Literary Seminars", "Poetry & Expressive Arts", "Expository Essay Writing", "Young Adult Literature"],
    shortBio: "Published YA novelist and workshop mentor. Guides young writers to discover their true authorial voices in collaborative circles.",
    bio: [
      "Aisha Patel is a published young-adult author, essayist, and Pushcart Prize nominee with a Master of Arts in Creative Writing and English Literature from Columbia University. She has conducted youth writing workshops, poetry masterclasses, and author residencies in community centers and libraries nationwide.",
      "A homeschool parent of three, Aisha established the LearnSpace Creative Writing Salon to nurture young voices in an encouraging, craft-focused workshop environment modeled after university writing seminars. Students critique peer work constructively, master the mechanics of world-building and character motivation, and compile personal chapbooks of prose and poetry.",
      "Aisha also serves as our National Novel Writing Month (NaNoWriMo) Youth Liaison and curates the co-op's annual literary anthology, 'Curious Ink', featuring original student stories and poems."
    ],
    credentials: [
      "M.A. Creative Writing & English Literature, Columbia University",
      "B.A. English & Comparative Literature, New York University (Magna Cum Laude)",
      "Published Author with Top Literary Presses & Pushcart Prize Nominee",
      "National Novel Writing Month (NaNoWriMo) Regional Youth Ambassador",
      "Editor-in-Chief of 'Curious Ink' Annual Co-Op Literary Journal",
      "Certified Socratic Seminar Master Facilitator"
    ],
    philosophy: "Writing is thinking made visible. When young people discover that their words hold emotional weight and narrative power, they develop an unshakable intellectual courage that illuminates every other discipline.",
    classesTaught: [
      "creative-writing",
      "socratic-literature"
    ],
    testimonials: [
      {
        quote: "Aisha unlocked my daughter's love for storytelling. Under her gentle editorial feedback, my 13-year-old wrote and published a complete 60-page fantasy novella in the co-op library!",
        parent: "Rebecca Thornton",
        child: "Mother of 8th Grader, Chloe"
      },
      {
        quote: "Her Socratic Great Books discussions are the highlight of my son's week. She treats homeschoolers with profound intellectual respect and teaches them how to substantiate their arguments.",
        parent: "Jonathan Sterling",
        child: "Father of 11th Grader, Noah"
      }
    ]
  },
  {
    id: "robert-jenkins",
    name: "Robert Jenkins, M.A.",
    shortName: "Mr. Jenkins",
    title: "Classical History & Humanities Chair",
    role: "Historian & Living History Coordinator",
    avatar: "assets/images/instructors/robert-jenkins.jpg",
    desk: "Humanities & History Hall Room 105",
    phone: "(555) 382-9112",
    email: "robert.jenkins@learnspace.org",
    officeHours: "Mondays & Thursdays, 1:00 PM – 3:30 PM",
    experience: "18+ Years",
    rating: 4.99,
    reviewCount: 71,
    subjects: ["Ancient Civilizations", "Living History Reenactment", "Constitutional Law", "Speech & Debate", "Classical Latin", "Experimental Archaeology"],
    shortBio: "Oxford graduate and father of 4 homeschooled collegiate scholars. Leads Socratic mock trials and ancient history reenactments.",
    bio: [
      "Robert Jenkins holds an M.A. in European History and Classical Studies from Oxford University and has devoted over eighteen years to classical humanities education. Having homeschooled all four of his own children from kindergarten through high school graduation (each now collegiate scholars in engineering, law, and classics), Robert embodies the veteran homeschool spirit.",
      "Robert chairs the Humanities department at LearnSpace, bringing ancient history to life through primary-source analysis, living history reenactments, Greek agora debates, and full-scale mock trials in Constitutional law. His students do not simply read about history; they reconstruct ancient siege engines, decipher Latin inscriptions, and argue landmark Supreme Court precedents in simulated appellate hearings.",
      "He also leads the annual co-op Museum of Natural History & Antiquities field expedition and coaches the LearnSpace High School Mock Trial and Speech & Debate team."
    ],
    credentials: [
      "M.A. European History & Classical Studies, Oxford University",
      "B.A. Classical Civilization & Philosophy, University of Virginia",
      "Homeschool Educator of 4 National Merit Scholars & Collegiate Graduates",
      "Head Coach of 4 State Mock Trial Championship Teams",
      "Consulting Historian for Living History Museums & Antiquities Seminars",
      "Classical Latin Language Certification, Society for Classical Studies"
    ],
    philosophy: "History is not a lifeless ledger of dates and kings; it is a great, unending conversation across millennia that invites our participation. To understand who we are, we must stand in the sandals of those who walked before us.",
    classesTaught: [
      "world-history",
      "drama-speech",
      "constitutional-civics",
      "latin-roots",
      "archaeology-origins"
    ],
    testimonials: [
      {
        quote: "Mr. Jenkins is a homeschool legend. His living history reenactments and Constitutional mock trials made my children passionate about civic duty and classical philosophy.",
        parent: "Elizabeth Montgomery",
        child: "Mother of 9th & 12th Graders"
      },
      {
        quote: "The depth of historical scholarship Robert brings to the classroom is university-grade, yet delivered with warmth, humor, and infectious grandfatherly wisdom.",
        parent: "Marcus Washington",
        child: "Father of 7th Grader, Caleb"
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = INSTRUCTORS_DATA;
}
