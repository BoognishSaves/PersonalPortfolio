"use client";

import { useEffect, useRef, useState } from "react";
import LivingCanvas from "./LivingCanvas";
import PartyCanvas from "./PartyCanvas";
import siteContent from "../content/siteContent";

export default function Home() {
  const { identity, paths, socials, music, engineeringProjects, storyChapters } = siteContent;
  const [brandOpen, setBrandOpen] = useState(false);
  const [brandDrag, setBrandDrag] = useState(0);
  const [brandDragging, setBrandDragging] = useState(false);
  const brandStartX = useRef(0);
  const brandTargetRef = useRef<HTMLSpanElement | null>(null);
  const [activePath, setActivePath] = useState("product");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [activeMusic, setActiveMusic] = useState("Gentleman Deluxe");
  const [secretOpen, setSecretOpen] = useState(false);
  const [connectOpen, setConnectOpen] = useState(false);
  const [maturity, setMaturity] = useState(0);
  const [puzzlePaths, setPuzzlePaths] = useState<string[]>([]);
  const [puzzlePrimed, setPuzzlePrimed] = useState(false);
  const [puzzlePulse, setPuzzlePulse] = useState(0);
  const [partyMode, setPartyMode] = useState(false);
  const [puzzlePing, setPuzzlePing] = useState(0);
  const seen = useRef(new Set<string>());
  const musicFeatureRef = useRef<HTMLElement | null>(null);
  const partyAudioRef = useRef<HTMLAudioElement | null>(null);

  const grow = (key: string, amount = 7) => {
    if (seen.current.has(key)) return;
    seen.current.add(key);
    setMaturity((value) => Math.min(100, value + amount));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("haddad-theme");
    const preferred = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const nextTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : preferred;
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("haddad-theme", next);
    grow(`theme-${next}`, 2);
  };

  useEffect(() => {
    const saved = Number(sessionStorage.getItem("haddad-growth") || 0);
    if (Number.isFinite(saved)) setMaturity(Math.min(100, saved));
    const timer = window.setInterval(() => setMaturity((value) => Math.min(100, value + 2)), 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => { sessionStorage.setItem("haddad-growth", String(maturity)); }, [maturity]);

  const chooseMusic = (name: string) => {
    grow(`music-${name}`, 5);
    setActiveMusic(name);
    window.requestAnimationFrame(() => {
      musicFeatureRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const visitPuzzlePath = (id: string) => {
    setPuzzlePaths((current) => {
      if (current.includes(id)) return current;
      const next = [...current, id];
      setPuzzlePulse(next.length);
      setPuzzlePing((value) => value + 1);
      sessionStorage.setItem("haddad-puzzle-paths", JSON.stringify(next));
      if (next.length === paths.length) setPuzzlePrimed(true);
      return next;
    });
  };

  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem("haddad-puzzle-paths") || "[]");
      if (Array.isArray(saved)) {
        setPuzzlePaths(saved);
        if (saved.length === paths.length) setPuzzlePrimed(true);
      }
    } catch {}
  }, [paths.length]);

  const active = paths.find((path) => path.id === activePath) ?? paths[0];

  return (
    <main className="shell livingShell">
      <LivingCanvas maturity={maturity} />
      {partyMode && <PartyCanvas />}
      <div key={`puzzle-${puzzlePing}`} className={`livingContent puzzleStep-${puzzlePulse} ${puzzlePrimed ? "puzzleReady" : ""} ${partyMode ? "partyMode" : ""}`}>
      {partyMode && <div className="partySignal" aria-live="polite"><span>SYSTEM WIDE OPEN</span><i>HaddadaddaH</i></div>}
      <header className="topbar">
        <button className={`brand ${brandOpen ? "isOpen" : ""} ${brandDragging ? "isDragging" : ""}`} type="button" aria-expanded={brandOpen} aria-label={brandOpen ? "Reset Haddad wordmark" : "Fold the wordmark from its final H"} onClick={() => {
          if (brandOpen) { setBrandOpen(false); setBrandDrag(0); grow("brand-reset", 2); }
        }}>
          <span className="brandLeft" ref={brandTargetRef}><span className="brandTargetH">H</span>adda</span>
          <span className="brandLeaf" style={{ "--fold-progress": brandDrag } as React.CSSProperties}
            onPointerDown={(event) => {
              if (brandOpen) return;
              event.preventDefault(); event.stopPropagation();
              event.currentTarget.setPointerCapture(event.pointerId);
              brandStartX.current = event.clientX; setBrandDragging(true);
            }}
            onPointerMove={(event) => {
              if (!brandDragging || brandOpen) return;
              const width = Math.max(1, event.currentTarget.getBoundingClientRect().width);
              setBrandDrag(Math.max(0, Math.min(1, (brandStartX.current - event.clientX) / width)));
            }}
            onPointerUp={(event) => {
              if (!brandDragging || brandOpen) return;
              event.stopPropagation(); event.currentTarget.releasePointerCapture(event.pointerId); setBrandDragging(false);
              const target = brandTargetRef.current?.querySelector(".brandTargetH")?.getBoundingClientRect();
              const moving = event.currentTarget.querySelector(".brandMovingH")?.getBoundingClientRect();
              const centerDistance = target && moving
                ? Math.abs((moving.left + moving.width / 2) - (target.left + target.width / 2))
                : Number.POSITIVE_INFINITY;
              const registered = !!target && !!moving && centerDistance <= Math.max(18, target.width * 1.25);
              if (registered || brandDrag >= .94) {
                setBrandDrag(1);
                requestAnimationFrame(() => setBrandOpen(true));
                grow("brand-fold", 4);
              } else setBrandDrag(0);
            }}
            onPointerCancel={() => { setBrandDragging(false); if (!brandOpen) setBrandDrag(0); }}>
            <span className="brandLeafFront">dadda<span className="brandMovingH">H</span></span><span className="brandLeafBack">Haddad</span>
          </span>
        </button>
        <div className="topbarActions"><button className="themeToggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}><span aria-hidden="true">{theme === "dark" ? "☀" : "◐"}</span></button><button className="connectButton" type="button" onClick={() => setConnectOpen(true)}>Connect</button></div>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">{identity.eyebrow}</p>
          <h1>{identity.name}</h1>
          <p className="lead">{identity.intro}</p>
          <div className="actions" aria-label="Primary links">
            {socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer">{social.label}</a>)}
          </div>
        </div>
        <button className={`markStage ${puzzlePrimed ? "puzzlePrimed" : ""}`} type="button" aria-label="JP monogram, the J and P combine to form an H" onClick={() => {
          grow("mark-spin", 5);
          if (puzzlePrimed) {
            window.dispatchEvent(new CustomEvent("haddad-puzzle-unlock", { detail: { paths: puzzlePaths } }));
            setPartyMode(true);
            const audio = new Audio("/If%20I%20had%20a%20boat.mp3");
            partyAudioRef.current?.pause();
            partyAudioRef.current = audio;
            audio.currentTime = 3;
            audio.volume = 0;
            audio.play().then(() => {
              const fadeIn = window.setInterval(() => {
                audio.volume = Math.min(1, audio.volume + 0.1);
                if (audio.volume >= 1) window.clearInterval(fadeIn);
              }, 50);
            }).catch(() => {});
            sessionStorage.setItem("haddad-party-unlocked", "1");
            window.setTimeout(() => {
              const fadeOut = window.setInterval(() => {
                audio.volume = Math.max(0, audio.volume - 0.1);
                if (audio.volume <= 0) {
                  window.clearInterval(fadeOut);
                  audio.pause();
                  partyAudioRef.current = null;
                }
              }, 50);
            }, 36500);
            window.setTimeout(() => setPartyMode(false), 37000);
            document.documentElement.classList.add("puzzleSolved");
            window.setTimeout(() => document.documentElement.classList.remove("puzzleSolved"), 2200);
            setPuzzlePrimed(false);
            sessionStorage.removeItem("haddad-puzzle-paths");
            setPuzzlePaths([]);
          }
        }}>
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
            <button key={path.id} type="button" role="tab" aria-selected={activePath === path.id} className={`pathTab ${activePath === path.id ? "isActive" : ""}`} onClick={() => { setActivePath(path.id); grow(`path-${path.id}`, 9); visitPuzzlePath(path.id); }}>
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
                    <p>{chapter.title === "Insurance → Drone Note Media" ? (
                      <>Near the end of my time as a field adjuster, I was sent to drone flight school and earned my FAA Part 107 certification. I came home and started <a href="https://www.dronenotemedia.com" target="_blank" rel="noreferrer">Drone Note Media</a>, initially using aerial technology for property inspections, commercial work, and real estate. When COVID changed how insurance inspections could be performed, the business adapted to meet that need. It has continued evolving with me ever since, becoming a home for occasional technology, media, and engineering projects.</>
                    ) : chapter.title === "Wisconsin → bartending" ? (
                      <>I started bartending at 17 at a place where my mom worked in Wisconsin. What began as a teenage job became a craft I returned to throughout my life. Years later, it landed me on <a href="https://youtube.com/playlist?list=PLqnTw__THC4MrlBxGZ0vGjXhclfNHU5YV&si=hHKBwVw7W--9BqXB" target="_blank" rel="noreferrer">Hot Mixology</a>. The show's lead bartender and I turned that exposure into a business of our own, providing professional bartenders and tailor-made cocktail menus for private events. It was another early lesson in recognizing an opportunity and building something around it.</>
                    ) : chapter.title === "Dream → Haddad Hollow" ? (
                      <>My wife and I spent years chasing a mountain-home dream, then changed our careers and finances to make it possible. Haddad Hollow became both our home and a business — another experiment in building something people can experience. See it on <a href="https://www.tiktok.com/@haddad.hollow?_r=1&_t=ZT-9A2Ff8tUlP4" target="_blank" rel="noreferrer">TikTok</a> or <a href="https://www.airbnb.com/rooms/1409631417764580109?unique_share_id=c0dbdbea-2a12-48ec-962d-d45c6d599083&viralityEntryPoint=1&s=76" target="_blank" rel="noreferrer">Airbnb</a>.</>
                    ) : chapter.description}</p>
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

      {connectOpen && (
        <div className="connectModal" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setConnectOpen(false);
        }}>
          <section className="connectDialog" role="dialog" aria-modal="true" aria-labelledby="connect-title">
            <button className="connectClose" type="button" aria-label="Close contact form" onClick={() => setConnectOpen(false)}>×</button>
            <div className="connectIntro">
              <p className="sectionLabel">Connect</p>
              <h2 id="connect-title">Say hello.</h2>
              <p>Employment, collaboration, a project, or just a good conversation — I’d love to hear from you.</p>
            </div>
            <form className="connectForm" action="https://formspree.io/f/xkneqgqb" method="POST">
              <label><span>Name</span><input type="text" name="firstname" autoComplete="name" required autoFocus /></label>
              <label><span>Email</span><input type="email" name="Email" autoComplete="email" required /></label>
              <label className="connectWide"><span>Subject</span><input type="text" name="Subject" required /></label>
              <label className="connectWide"><span>Message</span><textarea name="message" rows={5} required /></label>
              <div className="connectSubmit"><button type="submit">Send message <span aria-hidden="true">↗</span></button></div>
            </form>
          </section>
        </div>
      )}

      <footer>
        <button className="secretSeed" type="button" aria-expanded={secretOpen} onClick={() => { setSecretOpen((open) => !open); grow("secret", 8); }}>
          <span>HaddadaddaH</span>
          <i aria-hidden="true">·</i>
        </button>
        <span>John Paul Haddad</span>
      </footer>
      {secretOpen && (
        <aside className="secretNote" aria-live="polite">
          <span>There is another way through.</span>
          <strong>Walk all four paths. Then follow what wakes up.</strong>
        </aside>
      )}
      </div>
    </main>
  );
}
