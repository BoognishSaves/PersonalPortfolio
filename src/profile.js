// Change website animations
const animation = {
  // make it false to switch off fade-up animation
  animate: true,
  // animation playing duration
  duration: 750,
  // if true, animation plays only once when element comes on screen
  once: false,
};
// Change your display name on tha landing display
const header = {
  name: "John Paul Haddad",
};
const background = {
  // Options: Snow or Particle
  type: "Snow",
};
// Write a para about yourself here
// To update your image, go to './styles/images.css'
const section2title = "About Me";
const about = {
  paragraph:
    "A team-oriented product manager with a background in insurance, construction, and software engineering. Developing launch plans and market strategies for small businesses has elevated my appreciation for the big picture regardless of the task. My positive attitude and strong communication skills help empower those I work with to achieve goals beyond their expectations. My software engineering knowledge aids in finding the voice of  the customer and conveying it to team members during the development life cycle.",
};
// Edit your skill and the percentage you know about it
// To Add a skill, copy any one below and paste it after the last comma
const skillsBar = [
  {
    name: "HTML5",
    // To add a custom svg instead of font-awesome icons, add svg path below otherwise just comment it out
    svg: "M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z",
    faClass: "fab fa-html5",
  },
  {
    name: "CSS3",
    // svg: '',
    faClass: "fab fa-css3",
  },
  {
    name: "Javascript",
    // svg: '',
    faClass: "fab fa-js",
  },
  {
    name: "React",
    // svg: '',
    faClass: "fab fa-react",
  },
  {
    name: "Node",
    // svg: '',
    faClass: "fab fa-node",
  },
  {
    name: "Python",
    // svg: '',
    faClass: "fab fa-python",
  },
  {
    name: "MongoDB",
    // svg: '',
    faClass: "fa fa-leaf",
  },
  {
    name: "Django",
    // svg: '',
    faClass: "fa fa-diamond",
  },
  {
    name: "Database",
    // svg: '',
    faClass: "fas fa-database",
  },
  {
    name: "AWS",
    // svg: '',
    faClass: "fab fa-aws",
  },
];
// Edit your projects, its name, your skills used to make it, and the url.
// You can omit freely anything if you dont have it
// To Add a Project, copy any one below and paste it after the last comma and increment the id's project number
const section3Title = "Past Projects";
const projects = [
  {
    // Add image in './styles/images.css' in #project1
    id: "project1",
    name: "Garden Buddy",
    skills: ["React, Express, MongoDB, Node, CSS, JS"],
    url: "https://github.com/BoognishSaves/gb-frontend",
  },
  {
    // Add image in './styles/images.css' in #project2
    id: "project2",
    name: "Healthy Homemade",
    skills: ["React, Express, MongoDB, Node, CSS, JS"],
    url: "https://github.com/tjphillips08/co-healthy-homemade-frontend",
  },
  {
    // Add image in './styles/images.css' in #project3
    id: "project3",
    name: "Guitar Collector",
    skills: ["Python, Django, Bulma"],
    url: "https://github.com/BoognishSaves/guitar_collector",
  },
  {
    // Add image in './styles/images.css' in #project4
    id: "project4",
    name: "Mario Matcher",
    skills: ["HTML, CSS, JS"],
    url: "https://github.com/BoognishSaves/Mario-Matcher",
  },
  {
    // Add image in './styles/images.css' in #project5
    id: "project5",
    name: "Project 5",
    skills: ["HTML, CSS, JS"],
    url: "https://github.com/kaustubhai",
  },
  {
    // Add image in './styles/images.css' in #project6
    id: "project6",
    name: "Project 6",
    skills: ["HTML, CSS, JS"],
    url: "https://github.com/kaustubhai",
  },
];
// Edit your Miscellaneous Activities, its name and the url.
// You can omit freely anything if you dont have it
// To Add a Activity, copy any one below and paste it after the last comma and increment the id's Miscellaneous number
const section4Title = "Miscellaneous";
const miscellaneous = [
  {
    // Add image in './styles/images.css' in #misc1
    id: "misc1",
    name: "Miscellaneous 1",
    url: "https://github.com/kaustubhai",
  },
  {
    // Add image in './styles/images.css' in #misc2
    id: "misc2",
    name: "Miscellaneous 2",
    url: "https://github.com/kaustubhai",
  },
  {
    // Add image in './styles/images.css' in #misc3
    id: "misc3",
    name: "Miscellaneous 3",
    url: "https://github.com/kaustubhai",
  },
];
// Contact form text, and Formspree link(to send a submit contact through their API as in contact.js)
// To get your own jotform link, go to https://formspree.io/
// If you hacve the link already, paste it in the contactUrl below
const section5Title = "Get in Touch";
const contact = {
  pitch:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris nunc congue nisi vitae.",
  copyright: "John Paul Haddad",
  contactUrl: "https://formspree.io/f/xkneqgqb",
};
// Paste your respective social media links. You can omit any if you dont have it
// Upload your resume in your drive, get the shaareable link and paste it in the resume section
const social = {
  github: "https://github.com/BoognishSaves",
  facebook: "https://www.facebook.com/john.p.haddad",
  // twitter: "https://twitter.com",
  instagram: "https://www.instagram.com/haddadaddah/?hl=en",
  linkedin: "https://www.linkedin.com/in/john-paul-haddad/",
  resume: "https://docs.google.com/document/d/1d9cG8bo4wlM_uGPV_aLxo1zLDSWDHdxyV2_fNMGkSns/edit?usp=sharing",
};
// Dont change anything here
export {
  animation,
  header,
  background,
  about,
  skillsBar,
  projects,
  miscellaneous,
  contact,
  social,
  section2title,
  section3Title,
  section4Title,
  section5Title,
};
