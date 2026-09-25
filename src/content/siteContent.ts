export type MediaItem = {
  type: "audio" | "video" | "social" | "audio-file";
  platform: string;
  url?: string;
};

export type MusicRelease = {
  title: string;
  type: "album" | "single" | "ep";
  year: number;
  tracks?: number;
};

export type MusicProject = {
  name: string;
  relationship: string;
  description?: string;
  artwork?: string;
  releases?: MusicRelease[];
  media: MediaItem[];
};

type SiteContent = {
  identity: {
    name: string;
    brand: string;
    logoConcept: string;
    eyebrow: string;
    intro: string;
    story: string;
  };
  paths: Array<{
    id: "product" | "building" | "music" | "story";
    label: string;
    title: string;
    summary: string;
  }>;
  music: MusicProject[];
  engineeringProjects: Array<{
    name: string;
    stack: string[];
    url: string;
    chapter: string;
    description: string;
  }>;
  storyChapters: Array<{
    era: string;
    title: string;
    thread: string;
    description: string;
  }>;
  socials: Array<{
    label: string;
    url: string;
    context?: string;
  }>;
};

export const siteContent: SiteContent = {
  identity: {
    name: "John Paul Haddad",
    brand: "HaddadaddaH",
    logoConcept: "JP letterforms combine to form an H",
    eyebrow: "Product leader · Builder · Musician · Entrepreneur",
    intro: "I build products, businesses, teams, and occasionally songs.",
    story:
      "My path runs through insurance, entrepreneurship, software engineering, and product leadership. I learned to build software because technology was changing an industry I knew deeply, and I wanted to understand how to be part of what came next.",
  },

  paths: [
    {
      id: "product",
      label: "Product",
      title: "I build products around real problems.",
      summary:
        "Insurance domain experience, product strategy, discovery, platform thinking, and the work of turning complicated systems into useful experiences.",
    },
    {
      id: "building",
      label: "Building",
      title: "I learned to build the software, too.",
      summary:
        "After nearly two decades building expertise in insurance, I committed to learning something new. These are the projects from that leap — not polished portfolio pieces, but the actual code from where I started. On the other side, I found the two worlds were more connected than I expected.",
    },
    {
      id: "music",
      label: "Music",
      title: "The other thing I keep building.",
      summary:
        "Bands, performances, recordings, and whatever musical project comes next.",
    },
    {
      id: "story",
      label: "Story",
      title: "It only looks linear in reverse.",
      summary:
        "I didn't set out to build a career in product. I kept collecting skills, taking risks, and following the next problem. Eventually, the things that looked unrelated started connecting.",
    },
  ],

  music: [
    {
      name: "JoJa of the Hill People",
      relationship: "vocals · guitar · lifelong collaborator",
      artwork: "/Joja%20Logo.jpg",
      description:
        "A musical friendship that started in school and never really stopped. Joe and John became JoJa for an art-festival busking gig, took it on the road from Tampa to D.C. in 2006, and have continued finding reasons to make music together ever since.",
      media: [],
    },
    {
      name: "The High Desert",
      relationship: "vocals · guitar · mandolin",
      artwork: "/HD%20Logo.JPEG",
      media: [
        {
          type: "audio",
          platform: "SoundCloud",
          url: "https://on.soundcloud.com/QrMHGO9zTQWISH3Oy7",
        },
        {
          type: "social",
          platform: "Instagram",
          url: "https://www.instagram.com/thehighdesertband",
        },
      ],
    },
    {
      name: "Them Mules",
      relationship: "vocals · guitar · mandolin · trumpet · slide guitar",
      description:
        "Dark American roots music built around old stories, old fears, and the things people invent to give them shape. Low-register lead vocals and three-part harmonies carried songs that looked backward without trying to live there.",
      artwork: "/TMLogo.PNG",
      media: [
        {
          type: "social",
          platform: "Instagram",
          url: "https://www.instagram.com/themmules",
        },
      ],
    },
    {
      name: "The Barefoot Boys",
      relationship: "vocals · guitar · harmonica · mandolin",
      artwork: "/Barefoot%20Boys%20Logo.png",
      description:
        "A bluegrass band with one foot at the beach — traditional acoustic instrumentation alongside bluegrass takes on the country and coastal songs we loved at the time.",
      media: [],
    },
    {
      name: "Gentleman Deluxe",
      relationship: "vocals · guitar · mandolin",
      description:
        "Aaron Howell's solo-acoustic project, blending satirical and sentimental songwriting across country, folk, power pop, yacht rock, and more.",
      artwork: "/IMG_7949.JPG",
      releases: [{ title: "Way High", type: "album", year: 2025, tracks: 12 }],
      media: [
        {
          type: "audio",
          platform: "Spotify",
          url: "https://open.spotify.com/artist/6SXjmInzwvXQ8Hjc9dhlgg",
        },
        {
          type: "video",
          platform: "YouTube",
          url: "https://youtu.be/sJzNyScgotM",
        },
        {
          type: "social",
          platform: "Instagram",
          url: "https://www.instagram.com/gentlemandeluxemusic",
        },
      ],
    },
  ],

  engineeringProjects: [
    {
      name: "Mario Matcher",
      stack: ["HTML", "CSS", "JavaScript"],
      url: "https://github.com/BoognishSaves/Mario-Matcher",
      chapter: "01 · First build",
      description: "A solo flip-card game and the first thing I ever built. Simple, rough, and the point where software stopped being something other people made.",
    },
    {
      name: "Guitar Collector",
      stack: ["Python", "Django"],
      url: "https://github.com/BoognishSaves/guitar_collector",
      chapter: "02 · New language",
      description: "A solo database exercise and my only Python/Django build — practice in learning a different stack and thinking about data.",
    },
    {
      name: "Ranter",
      stack: ["Node", "Express", "MongoDB"],
      url: "https://github.com/BoognishSaves/Ranter",
      chapter: "03 · Leading the build",
      description: "My first group build, where I led two developers in creating an anonymous Twitter-style app within the span of a week.",
    },
    {
      name: "Healthy Homemade",
      stack: ["React", "Express", "MongoDB", "Node"],
      url: "https://github.com/tjphillips08/co-healthy-homemade-frontend",
      chapter: "04 · Real business",
      description: "A school team project built around my wife's personal-chef business. It never became the tool she needed — which was its own useful lesson about building versus solving.",
    },
    {
      name: "Garden Buddy",
      stack: ["React", "Express", "MongoDB", "Node"],
      url: "https://github.com/BoognishSaves/gb-frontend",
      chapter: "05 · Domain → software",
      description: "A digital take on integrated pest management, designed to work at scale. The tool guides a novice to capture useful field observations so a professional can assess garden health across a larger operation.",
    },
    {
      name: "Three JS Portfolio",
      stack: ["JavaScript", "Three.js"],
      url: "https://github.com/BoognishSaves/threejsportfolio",
      chapter: "06 · Follow along",
      description: "A deliberate YouTube follow-along rather than an original product — a way to learn unfamiliar 3D tools by rebuilding someone else's work.",
    },
  ],


  storyChapters: [
    {
      era: "01 · The first leap",
      title: "Art school → entrepreneurship",
      thread: "Risk",
      description: "I wasn't a great student, and art school never quite fit. An early mentor saw something in me that I didn't yet know how to use and brought me into a business serving the hotel industry through lead generation, training, secret shopping, and other services. I dropped out of college to help build it. The experience taught me how to sell an idea, operate in business circles, and accept that risk carries both reward and consequence.",
    },
    {
      era: "02 · Building businesses",
      title: "Hotels → restaurants",
      thread: "Entrepreneurship",
      description: "The hotel business grew beyond lead generation into training, secret shopping, consulting, and other services. That work eventually led us into launching a restaurant, which we helped open and staff in less than 90 days. Growth came fast, then capital disappeared faster. It was an early education in execution, scale, and what happens when a business gets stretched too thin.",
    },
    {
      era: "03 · Behind the bar",
      title: "Wisconsin → bartending",
      thread: "Craft → opportunity",
      description: "I started bartending at 17 at a place where my mom worked in Wisconsin. What began as a teenage job became a craft I returned to throughout my life. Years later, it landed me on Hot Mixology. The show's lead bartender and I turned that exposure into a business of our own, providing professional bartenders and tailor-made cocktail menus for private events. It was another early lesson in recognizing an opportunity and building something around it.",
    },
    {
      era: "04 · A guitar changes the path",
      title: "Music → catastrophe adjusting",
      thread: "Adaptability",
      description: "After a short and unhappy stop in software sales, music pulled me somewhere unexpected. A musician I met through an open mic paid me to leave that job, become an insurance adjuster, and play in his bluegrass band. Hurricane work followed. I spent 12 years adjusting catastrophes and playing music between storms.",
    },
    {
      era: "05 · Systems in the real world",
      title: "Growing → automation",
      thread: "Systems",
      description: "Along the way, my brother and I moved into controlled-environment agriculture with a belief that more food could be grown closer to where it was consumed. We worked across soil and soilless growing systems, integrated pest management, environmental controls, and automation, while also consulting on agricultural systems. My focus was cultivation and farm design; my brother developed much of the technical automation expertise. It was an early lesson in designing interconnected systems around efficiency, scale, and a real-world constraint.",
    },
    {
      era: "06 · The domain",
      title: "Catastrophe → field staff",
      thread: "Expertise",
      description: "After 12 years in catastrophe work, I spent another four as a field-staff adjuster. Insurance became more than a job; it became deep subject-matter expertise in the people, workflows, constraints, and problems I would eventually come back to solve.",
    },
    {
      era: "07 · Building with technology",
      title: "Insurance → Drone Note Media",
      thread: "Experimentation",
      description:
        "Near the end of my time as a field adjuster, I was sent to drone flight school and earned my FAA Part 107 certification. I came home and started Drone Note Media, initially using aerial technology for property inspections, commercial work, and real estate. When COVID changed how insurance inspections could be performed, the business adapted to meet that need. It has continued evolving with me ever since, becoming a home for occasional technology, media, and engineering projects.",
    },
    {
      era: "08 · Another leap",
      title: "Roofing → software engineering",
      thread: "Learning",
      description: "After years in insurance, I stepped outside the industry and into roofing and construction. That distance gave me room to think differently about where I wanted to go next. I eventually made another uncomfortable bet on myself, leaving work for General Assembly's full-stack engineering program. Twelve intense weeks later, they hired me to help teach software engineering.",
    },
    {
      era: "09 · Finding the name for it",
      title: "Engineering → product",
      thread: "Recognition",
      description: "Learning to code showed me that engineering wasn't the destination. It gave me another language. I went to General Assembly believing I was becoming a software engineer. A career coach saw something different. Looking across the businesses I'd built, the industries I'd worked in, and the problems I'd learned to solve, she pointed out that I'd already been practicing product management for years. Engineering wasn't another identity to adopt; it gave me the technical fluency to add to everything I already knew.",
    },
    {
      era: "10 · The threads reconnect",
      title: "Product → insurance technology",
      thread: "Connection",
      description: "Then an opportunity brought me back to insurance technology. The industry I had spent years inside collided with the technical and product skills I had built after leaving it. What had looked like a collection of career detours became the exact combination I needed. Today, I lead product in the space I once worked in from the field.",
    },
  ],

  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/john-paul-haddad/" },
    { label: "Instagram", url: "https://www.instagram.com/haddadaddah/" },
    { label: "GitHub", url: "https://github.com/BoognishSaves" },
    { label: "SoundCloud", url: "https://on.soundcloud.com/Gbl73Wmov5x7HDF15h", context: "The High Desert Band" },
  ],
};

export default siteContent;
