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
        <svg className="botanicalField" viewBox="0 0 1200 1800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <g id="digitalLeaf">
              <path className="botanicalStem" d="M0 92 C34 78 54 48 72 0" />
              <path className="botanicalOuter" d="M18 76 C24 28 72 6 112 24 C146 40 148 82 118 108 C86 136 40 120 18 76 Z" />
              <path className="botanicalInner" d="M38 76 C45 45 76 29 101 39 C121 48 123 72 106 88 C86 106 57 101 38 76 Z" />
              <path className="botanicalTrace" d="M39 76 H63 Q71 76 71 68 V51 M71 76 H94 Q103 76 103 67 V51" />
              <circle cx="71" cy="51" r="2.8" /><circle cx="103" cy="51" r="2.8" />
            </g>
            <g id="digitalCurl">
              <path className="botanicalStem" d="M0 112 C34 100 49 72 54 44 C60 12 96 2 119 21 C142 40 130 73 104 77 C85 80 73 67 78 54 C82 43 95 40 103 47" />
              <path className="botanicalTrace" d="M17 103 H39 M54 44 V25 M119 21 H140" />
              <circle cx="39" cy="103" r="2.6" /><circle cx="54" cy="25" r="2.6" /><circle cx="140" cy="21" r="2.6" />
            </g>
            <pattern id="botanicalPattern" width="360" height="360" patternUnits="userSpaceOnUse">
              <g transform="translate(18 20) rotate(-12)"><use href="#digitalLeaf"/></g>
              <g transform="translate(198 42) rotate(28) scale(.78)"><use href="#digitalCurl"/></g>
              <g transform="translate(255 205) rotate(164) scale(.9)"><use href="#digitalLeaf"/></g>
              <g transform="translate(68 245) rotate(205) scale(.65)"><use href="#digitalCurl"/></g>
              <path className="botanicalConnector" d="M128 118 C174 138 187 186 221 207 C249 225 286 219 314 196" />
              <path className="botanicalConnector" d="M10 284 C53 271 89 282 116 314" />
              <circle className="botanicalNode" cx="221" cy="207" r="3"/><circle className="botanicalNode" cx="116" cy="314" r="3"/>
            </pattern>
          </defs>
          <rect className="botanicalLayer botanicalBase botanicalGrowth1" width="1200" height="620" fill="url(#botanicalPattern)" />
          <rect className="botanicalLayer botanicalBase botanicalGrowth2" y="430" width="1200" height="720" fill="url(#botanicalPattern)" />
          <rect className="botanicalLayer botanicalBase botanicalGrowth3" y="950" width="1200" height="850" fill="url(#botanicalPattern)" />
          <g className="botanicalLayer botanicalBranches">
            <path className="branch bA" pathLength="1" d="M0 360 C180 315 236 410 350 468 C470 528 545 464 612 382" />
            <path className="branch bB" pathLength="1" d="M1200 670 C1038 620 952 706 864 790 C778 872 705 842 642 776" />
            <path className="branch bC" pathLength="1" d="M0 1120 C154 1068 254 1118 334 1200 C421 1288 514 1260 575 1182" />
            <path className="branch bD" pathLength="1" d="M1200 1435 C1068 1390 970 1432 892 1510 C814 1588 735 1580 670 1524" />
          </g>
          <g className="digitalBlooms">
            <g className="bloom f1" transform="translate(1035 300)"><circle r="4"/><path d="M0-4 C-15-25-30-8-10 2 C-28 12-13 28 1 9 C14 28 30 12 10 2 C29-9 14-25 0-4Z"/></g>
            <g className="bloom f2" transform="translate(730 520)"><circle r="3"/><path d="M0-3 C-12-20-25-7-8 2 C-23 10-11 23 1 7 C12 23 25 10 8 2 C24-7 12-20 0-3Z"/></g>
            <g className="bloom f3" transform="translate(1080 900)"><circle r="4"/><path d="M0-4 C-15-25-30-8-10 2 C-28 12-13 28 1 9 C14 28 30 12 10 2 C29-9 14-25 0-4Z"/></g>
            <g className="bloom f4" transform="translate(150 980)"><circle r="3"/><path d="M0-3 C-12-20-25-7-8 2 C-23 10-11 23 1 7 C12 23 25 10 8 2 C24-7 12-20 0-3Z"/></g>
            <g className="bloom f5" transform="translate(950 1320)"><circle r="4"/><path d="M0-4 C-15-25-30-8-10 2 C-28 12-13 28 1 9 C14 28 30 12 10 2 C29-9 14-25 0-4Z"/></g>
            <g className="bloom f6" transform="translate(260 1510)"><circle r="3"/><path d="M0-3 C-12-20-25-7-8 2 C-23 10-11 23 1 7 C12 23 25 10 8 2 C24-7 12-20 0-3Z"/></g>
          </g>
        </svg>
        <span className="wakeSpore s1" /><span className="wakeSpore s2" /><span className="wakeSpore s3" /><span className="wakeSpore s4" /><span className="wakeSpore s5" />
      </div>
    </main>
  );
}
