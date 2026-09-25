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
  const [overdrive, setOverdrive] = useState(false);
  const discoveries = useRef(new Set<string>());
  const fidgetHits = useRef<number[]>([]);
  const overdriveTimer = useRef<number | null>(null);

  const awaken = (key: string, amount = 1) => {
    if (discoveries.current.has(key)) return;
    discoveries.current.add(key);
    setWake((level) => Math.min(5, level + amount));
  };

  useEffect(() => {
    const timers = [1, 2, 3, 4, 5].map((minute) =>
      window.setTimeout(() => awaken(`time-${minute}`, 1), minute * 60000)
    );
    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  const fidget = () => {
    const now = Date.now();
    fidgetHits.current = [...fidgetHits.current.filter((hit) => now - hit < 2200), now];
    awaken("mark");
    if (fidgetHits.current.length >= 5) {
      setWake((level) => Math.max(level, 4));
      setOverdrive(true);
      if (overdriveTimer.current) window.clearTimeout(overdriveTimer.current);
      overdriveTimer.current = window.setTimeout(() => setOverdrive(false), 4200);
    }
  };

  useEffect(() => () => {
    if (overdriveTimer.current) window.clearTimeout(overdriveTimer.current);
  }, []);

  const active = paths.find((path) => path.id === activePath) ?? paths[0];

  return (
    <main className={`shell wake wake-${wake} ${overdrive ? "isOverdrive" : ""}`}>
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
            {music.filter((project) => project.name === activeMusic).map((project) => (
              <article className={`musicFeature ${project.name === "The High Desert" ? "isHighDesert" : project.name === "Them Mules" ? "isThemMules" : project.name === "The Barefoot Boys" ? "isBarefootBoys" : project.name === "JoJa of the Hill People" ? "isJoJa" : ""}`} key={project.name}>
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
                <button type="button" key={project.name} onClick={() => { setActiveMusic(project.name); awaken(`music-${project.name}`); }}>
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
        </svg>
        <i className="growth g1" /><i className="growth g2" /><i className="growth g3" /><i className="growth g4" />
        <span className="wakeSpore s1" /><span className="wakeSpore s2" /><span className="wakeSpore s3" /><span className="wakeSpore s4" /><span className="wakeSpore s5" />
      </div>
    </main>
  );
}
