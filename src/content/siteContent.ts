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
      "My path runs through insurance, entrepreneurship, software engineering, and product leadership. I learned to build software because I wanted to understand the thing I was asking people to build.",
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
      title: "The path was not particularly linear.",
      summary:
        "Adjusting, entrepreneurship, engineering, product leadership, music, and a mountain property all belong to the same story.",
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

  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/john-paul-haddad/" },
    { label: "Instagram", url: "https://www.instagram.com/haddadaddah/" },
    { label: "GitHub", url: "https://github.com/BoognishSaves" },
    { label: "SoundCloud", url: "https://on.soundcloud.com/Gbl73Wmov5x7HDF15h", context: "The High Desert Band" },
  ],
};

export default siteContent;
