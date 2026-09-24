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
        "Engineering is part of how I became a stronger product leader. These projects mark the transition from insurance into technology.",
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
      relationship: "member · childhood band being resurrected",
      description: "A childhood band finding its way back to the stage. More to come.",
      media: [],
    },
    {
      name: "The High Desert",
      relationship: "member",
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
      relationship: "trumpet · slide guitar · mandolin",
      description:
        "Gothic Americana built around a low-register lead vocal, three-part harmonies, banjo, bass, a small drum kit, and a deliberately dark visual world.",
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
      relationship: "former member",
      media: [{ type: "audio-file", platform: "archive" }],
    },
    {
      name: "Gentleman Deluxe",
      relationship: "band member for Aaron Howell's solo project",
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
    { name: "Garden Buddy", stack: ["React", "Express", "MongoDB", "Node"], url: "https://github.com/BoognishSaves/gb-frontend" },
    { name: "Healthy Homemade", stack: ["React", "Express", "MongoDB", "Node"], url: "https://github.com/tjphillips08/co-healthy-homemade-frontend" },
    { name: "Guitar Collector", stack: ["Python", "Django"], url: "https://github.com/BoognishSaves/guitar_collector" },
    { name: "Mario Matcher", stack: ["HTML", "CSS", "JavaScript"], url: "https://github.com/BoognishSaves/Mario-Matcher" },
    { name: "Ranter", stack: ["Node", "Express", "MongoDB"], url: "https://github.com/BoognishSaves/Ranter" },
    { name: "Three JS Portfolio", stack: ["JavaScript", "Three.js"], url: "https://github.com/BoognishSaves/threejsportfolio" },
  ],

  socials: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/john-paul-haddad/" },
    { label: "Instagram", url: "https://www.instagram.com/haddadaddah/" },
    { label: "GitHub", url: "https://github.com/BoognishSaves" },
    { label: "SoundCloud", url: "https://on.soundcloud.com/Gbl73Wmov5x7HDF15h", context: "The High Desert Band" },
  ],
};

export default siteContent;
