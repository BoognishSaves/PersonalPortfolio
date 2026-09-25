"use client";

import { useEffect, useRef, useState } from "react";
import siteContent from "../content/siteContent";

export default function Home() {
  const { identity, paths, socials, music, engineeringProjects, storyChapters } = siteContent;
  const [brandOpen, setBrandOpen] = useState(false);
  const [activePath, setActivePath] = useState("product");
  const [activeMusic, setActiveMusic] = useState("Gentleman Deluxe");
  const [wake, setWake] = useState(0);
  const [secretOpen, setSecretOpen] = useState(false);
  const discoveries = useRef(new Set<string>());
  const musicFeatureRef = useRef<HTMLElement | null>(null);

  const awaken = (key: string, amount = 1) => {
    if (discoveries.current.has(key)) return;
    discoveries.current.add(key);
    setWake((level) => Math.min(5, level + amount));
  };

  useEffect(() => {
    const milestones = [15000, 45000, 90000, 150000, 240000];
    const timers = milestones.map((delay, index) =>
      window.setTimeout(() => awaken(`time-${index + 1}`, 1), delay)
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const fidget = () => {
    awaken("mark");
  };

  const chooseMusic = (name: string) => {
    setActiveMusic(name);
    awaken(`music-${name}`);
    window.requestAnimationFrame(() => {
      musicFeatureRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const active = paths.find((path) => path.id === activePath) ?? paths[0];

  return (
    <main className={`shell wake wake-${wake}`}>
      <header className="topbar">
        <button className={`brand ${brandOpen ? "isOpen" : ""}`} type="button" aria-expanded={brandOpen} aria-label="Reveal the HaddadaddaH wordmark" onClick={() => { setBrandOpen((open) => !open); awaken("brand"); }}>
          <span className="brandForward">Haddad</span><span className="brandAxis" aria-hidden="true" /><span className="brandReverse">addaH</span>
        </button>
        <a className="quietLink" href="#connect">Connect</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">{identity.eyebrow}</p>
          <h1>{identity.name}</h1>
          <p className="lead">{identity.intro}</p>
          <div className="actions" id="connect" aria-label="Primary links">
            {socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer">{social.label}</a>)}
          </div>
        </div>
        <button className="markStage" type="button" aria-label="JP monogram, the J and P combine to form an H" onClick={fidget}>
          <img className="mark" src="/haddadaddah-micro.svg" alt="JP monogram forming an H" />
        </button>
      </section>

      <section className="explorer" aria-labelledby="explore-title">
        <div className="explorerIntro">
          <p className="sectionLabel" id="explore-title">Choose a path</p>
          <p>{identity.story}</p>
        </div>

        <div className="pathTabs" role="tablist" aria-label="Explore John Paul's work">
          {paths.map((path, index) => (
            <button key={path.id} type="button" role="tab" aria-selected={activePath === path.id} className={`pathTab ${activePath === path.id ? "isActive" : ""}`} onClick={() => { setActivePath(path.id); awaken(`path-${path.id}`); }}>
              <span>0{index + 1}</span><strong>{path.label}</strong>
            </button>
          ))}
        </div>

        <div className="pathPanel" role="tabpanel" key={active.id}>
          <div className="pathStatement">
            <p className="sectionLabel">{active.label}</p>
            <h2>{active.title}</h2>
            <p>{active.summary}</p>
          </div>

          {active.id === "product" && <div className="evidenceGrid">
            <article><span>Domain</span><strong>Insurance</strong><p>Years inside the workflows and problems the products are meant to solve.</p></article>
            <article><span>Practice</span><strong>Discovery → strategy</strong><p>Start with evidence, understand the system, then decide what deserves to be built.</p></article>
            <article><span>Lens</span><strong>Platform thinking</strong><p>Connect people, data, workflows, and products instead of treating every screen as an island.</p></article>
          </div>}

          {active.id === "building" && <div className="buildArchive">
            <div className="buildArchiveIntro">
              <span>Learning archive</span>
              <p>The code is still here on purpose.</p>
            </div>
            <div className="buildGrid">
              {engineeringProjects.map((project) => (
                <a className="buildCard" href={project.url} target="_blank" rel="noreferrer" key={project.name}>
                  <div className="buildCardTop">
                    <span className="buildChapter">{project.chapter}</span>
                    <b aria-hidden="true">↗</b>
                  </div>
                  <strong>{project.name}</strong>
                  <p>{project.description}</p>
                  <span className="buildStack">{project.stack.join(" · ")}</span>
                </a>
              ))}
            </div>
          </div>}

          {active.id === "music" && <div className="musicExperience">
            <div className="musicSwitcher" aria-label="Choose a music project">
              {music.map((project) => (
                <button type="button" key={project.name} className={project.name === activeMusic ? "isActive" : ""} onClick={() => chooseMusic(project.name)}>
                  {project.name}
                </button>
              ))}
            </div>
            {music.filter((project) => project.name === activeMusic).map((project) => (
              <article ref={musicFeatureRef} className={`musicFeature ${project.name === "The High Desert" ? "isHighDesert" : project.name === "Them Mules" ? "isThemMules" : project.name === "The Barefoot Boys" ? "isBarefootBoys" : project.name === "JoJa of the Hill People" ? "isJoJa" : ""}`} key={project.name}>
                <div className="musicPoster">
                  {project.artwork ? <img src={project.artwork} alt={`${project.name} artwork`} /> : <span className="musicPlaceholder">More to come.</span>}
                </div>
                <div className="musicFeatureCopy">
                  <p className="musicKicker">{project.name === "Gentleman Deluxe" ? "Currently playing with" : project.name === "The High Desert" ? "The High Desert" : project.name === "Them Mules" ? "From the old stories" : project.name === "The Barefoot Boys" ? "Seagrass" : project.name === "JoJa of the Hill People" ? "Joe + John · since school" : "Part of the story"}</p>
                  <h3>{project.name}</h3>
                  <p className="musicRole"><span>Role:</span> {project.relationship}</p>
                  {project.description && <p className="musicDescription">{project.description}</p>}
                  {project.releases?.[0] && (
                    <p className="musicRelease"><span>Latest release</span><strong>{project.releases[0].title}</strong><em>{project.releases[0].year}{project.releases[0].tracks ? ` · ${project.releases[0].tracks} tracks` : ""}</em></p>
                  )}
                  <div className="musicActions">
                    {project.media.map((item) => item.url ? (
                      <a key={item.platform} href={item.url} target="_blank" rel="noreferrer">{item.platform} ↗</a>
                    ) : null)}
                  </div>
                </div>
              </article>
            ))}
            <div className="musicArchive">
              <p className="sectionLabel">The music story</p>
              {music.filter((project) => project.name !== activeMusic).map((project) => (
                <button type="button" key={project.name} onClick={() => chooseMusic(project.name)}>
                  <span>{project.relationship}</span><strong>{project.name}</strong><b aria-hidden="true">↗</b>
                </button>
              ))}
            </div>
          </div>}

          {active.id === "story" && <div className="storyExperience">
            <div className="storyThesis">
              <span>The through line</span>
              <p>Not reinvention. Accumulation.</p>
            </div>
            <div className="storyChapters">
              {storyChapters.map((chapter, index) => (
                <article className="storyChapter" key={chapter.title}>
                  <div className="storyMarker" aria-hidden="true">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="storyChapterMeta">
                    <span>{chapter.era}</span>
                    <strong>{chapter.thread}</strong>
                  </div>
                  <div className="storyChapterCopy">
                    <h3>{chapter.title}</h3>
                    <p>{chapter.description}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="storyClose">
              <span>Looking backward, the line is easier to see.</span>
              <strong>Each chapter taught me something the next one needed.</strong>
            </div>
          </div>}
        </div>
      </section>

      <footer>
        <button className="secretSeed" type="button" aria-expanded={secretOpen} onClick={() => { setSecretOpen((open) => !open); awaken("secret", 2); }}>
          <span>HaddadaddaH</span>
          <i aria-hidden="true">·</i>
        </button>
        <span>John Paul Haddad</span>
      </footer>
      {secretOpen && (
        <aside className="secretNote" aria-live="polite">
          <span>There is another way through.</span>
          <strong>Reverse it. Spin it. Walk all four paths.</strong>
          <button type="button" onClick={() => { discoveries.current.add("shortcut"); setWake(5); }}>Wake it now</button>
        </aside>
      )}
      <div className="contentVines" aria-hidden="true">
        <i className="vine v1" /><i className="vine v2" /><i className="vine v3" /><i className="vine v4" />
      </div>
      <div className="rootNetwork" aria-hidden="true">
        <svg className="circuitField" viewBox="0 0 1200 1800" preserveAspectRatio="none">
          <g className="circuit circuitA">
            <path d="M-40 170 H180 Q240 170 240 230 V330 Q240 390 300 390 H470 Q530 390 530 450 V520" />
            <path d="M70 520 H180 Q230 520 230 570 V680 Q230 735 285 735 H410" />
            <path d="M240 330 C350 270 390 190 330 115 C285 58 190 92 205 160 C218 220 320 215 355 165" />
            <circle cx="530" cy="520" r="7" /><circle cx="410" cy="735" r="7" />
          </g>
          <g className="circuit circuitB">
            <path d="M1240 470 H1040 Q980 470 980 530 V640 Q980 700 920 700 H760 Q700 700 700 760 V850" />
            <path d="M1130 850 H1010 Q955 850 955 905 V1010 Q955 1065 900 1065 H790" />
            <path d="M980 640 C870 580 825 500 875 425 C920 355 1025 390 1008 460 C994 520 900 520 862 470" />
            <circle cx="700" cy="850" r="7" /><circle cx="790" cy="1065" r="7" />
          </g>
          <g className="circuit circuitC">
            <path d="M-30 1110 H150 Q210 1110 210 1170 V1280 Q210 1340 270 1340 H445 Q505 1340 505 1400 V1500" />
            <path d="M1230 1370 H1080 Q1020 1370 1020 1430 V1530 Q1020 1590 960 1590 H815" />
            <path d="M505 1400 C600 1335 630 1240 570 1185 C515 1135 430 1170 445 1235 C460 1295 555 1295 590 1240" />
            <circle cx="505" cy="1500" r="7" /><circle cx="815" cy="1590" r="7" />
          </g>
          <g className="circuit circuitD">
            <path d="M120 80 V145 Q120 195 170 195 H310 Q365 195 365 250 V300" />
            <path d="M1080 250 V315 Q1080 365 1030 365 H900 Q845 365 845 420 V470" />
            <path d="M90 930 H145 Q195 930 195 880 V825 Q195 775 245 775 H330" />
            <path d="M1110 1190 H1050 Q1000 1190 1000 1240 V1300 Q1000 1350 950 1350 H865" />
            <circle cx="120" cy="80" r="5" /><circle cx="365" cy="300" r="5" /><circle cx="845" cy="470" r="5" /><circle cx="330" cy="775" r="5" />
          </g>
          <g className="circuit circuitPulse">
            <path pathLength="1" d="M25 610 C180 610 170 470 330 470 S480 610 610 610 S790 480 930 520 S1050 650 1180 650" />
            <path pathLength="1" d="M80 1640 C230 1540 350 1690 505 1590 S770 1510 910 1610 S1080 1690 1190 1570" />
          </g>
          <g className="circuit circuitCanopy">
            <path d="M20 260 C90 210 120 285 170 240 S250 175 305 235 S385 300 430 245" />
            <path d="M1180 315 C1115 255 1070 330 1025 275 S945 210 900 270 S820 335 775 285" />
            <path d="M30 875 C95 815 135 895 185 845 S270 785 320 850 S400 905 455 850" />
            <path d="M1170 970 C1100 915 1060 985 1010 935 S930 875 880 940 S800 1000 745 945" />
            <path d="M15 1460 C90 1395 130 1480 185 1425 S280 1360 335 1430 S420 1490 475 1435" />
            <path d="M1185 1515 C1110 1450 1070 1535 1015 1480 S920 1415 865 1485 S780 1545 725 1490" />
          </g>
          <g className="circuit circuitTwigs">
            <path d="M150 240 l-42 -55 m42 55 l58 -35 m-23 640 l-55 -42 m55 42 l48 -61 m-18 640 l-62 -35 m62 35 l43 -67" />
            <path d="M1035 275 l45 -58 m-45 58 l-62 -30 m37 690 l58 -45 m-58 45 l-45 -63 m50 608 l62 -36 m-62 36 l-40 -66" />
          </g>
        </svg>
        <i className="growth g1" /><i className="growth g2" /><i className="growth g3" /><i className="growth g4" />
        <div className="thicket thicketLeft"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="thicket thicketRight"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="digitalLife" aria-hidden="true">
          <i className="bug b1"/><i className="bug b2"/><i className="bug b3"/><i className="bug b4"/>
          <i className="worm w1"/><i className="worm w2"/><i className="worm w3"/>
        </div>
        <svg className="cellularField" viewBox="0 0 1200 1800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="cellularPattern" width="190" height="170" patternUnits="userSpaceOnUse">
              <path className="cellWall" d="M-18 34 C12 4 53 3 78 26 C101 47 95 77 68 94 C41 111 4 103-13 78" />
              <path className="cellWall" d="M72 27 C103 1 145 7 164 35 C181 61 169 89 141 101 C112 113 84 96 68 76" />
              <path className="cellWall" d="M-8 118 C17 91 54 91 77 112 C99 132 94 158 72 176" />
              <path className="cellWall" d="M78 112 C106 86 145 91 169 116 C188 136 185 160 165 179" />
              <path className="cellTrace" d="M18 53 C34 43 49 45 61 56 M118 45 C132 36 146 40 153 52 M24 137 C38 126 52 128 63 139 M119 133 C133 123 147 127 156 140" />
              <circle className="cellNode" cx="61" cy="56" r="2.2"/><circle className="cellNode" cx="153" cy="52" r="2.2"/><circle className="cellNode" cx="63" cy="139" r="2.2"/><circle className="cellNode" cx="156" cy="140" r="2.2"/>
            </pattern>
            <mask id="growthMask">
              <rect className="growthReveal r1" width="1200" height="1800" fill="white"/>
              <rect className="growthReveal r2" width="1200" height="1800" fill="white"/>
              <rect className="growthReveal r3" width="1200" height="1800" fill="white"/>
            </mask>
          </defs>
          <g mask="url(#growthMask)">
            <rect className="cellularTexture" width="1200" height="1800" fill="url(#cellularPattern)"/>
            <path className="cellSpine spine1" pathLength="1" d="M-40 210 C150 120 260 300 390 240 S610 80 745 205 S945 365 1240 225"/>
            <path className="cellSpine spine2" pathLength="1" d="M1240 720 C1020 590 890 820 735 735 S475 565 330 720 S125 865-40 790"/>
            <path className="cellSpine spine3" pathLength="1" d="M-40 1260 C170 1110 315 1340 485 1230 S765 1085 905 1240 S1080 1430 1240 1340"/>
          </g>
          <g className="cellBlooms">
            <g className="cellBloom cb1" transform="translate(1035 330)"><circle r="3"/><path d="M0-3 C-12-18-25-6-8 2 C-22 10-10 22 1 7 C12 22 24 9 8 2 C23-7 11-18 0-3Z"/></g>
            <g className="cellBloom cb2" transform="translate(770 875)"><circle r="3"/><path d="M0-3 C-12-18-25-6-8 2 C-22 10-10 22 1 7 C12 22 24 9 8 2 C23-7 11-18 0-3Z"/></g>
            <g className="cellBloom cb3" transform="translate(190 1450)"><circle r="3"/><path d="M0-3 C-12-18-25-6-8 2 C-22 10-10 22 1 7 C12 22 24 9 8 2 C23-7 11-18 0-3Z"/></g>
          </g>
        </svg>
        <span className="wakeSpore s1" /><span className="wakeSpore s2" /><span className="wakeSpore s3" /><span className="wakeSpore s4" /><span className="wakeSpore s5" />
      </div>
    </main>
  );
}
