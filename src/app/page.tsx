"use client";

import { useEffect, useRef, useState } from "react";
import LivingCanvas from "./LivingCanvas";
import siteContent from "../content/siteContent";

export default function Home() {
  const { identity, paths, socials, music, engineeringProjects, storyChapters } = siteContent;
  const [brandOpen, setBrandOpen] = useState(false);
  const [activePath, setActivePath] = useState("product");
  const [activeMusic, setActiveMusic] = useState("Gentleman Deluxe");
  const [secretOpen, setSecretOpen] = useState(false);
  const [maturity, setMaturity] = useState(0);
  const [puzzlePaths, setPuzzlePaths] = useState<string[]>([]);
  const [puzzlePrimed, setPuzzlePrimed] = useState(false);
  const seen = useRef(new Set<string>());
  const musicFeatureRef = useRef<HTMLElement | null>(null);

  const grow = (key: string, amount = 7) => {
    if (seen.current.has(key)) return;
    seen.current.add(key);
    setMaturity((value) => Math.min(100, value + amount));
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
      <div className="livingContent">
      <header className="topbar">
        <button className={`brand ${brandOpen ? "isOpen" : ""}`} type="button" aria-expanded={brandOpen} aria-label="Reveal the HaddadaddaH wordmark" onClick={() => { setBrandOpen((open) => !open); grow("brand", 4); }}>
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
        <button className={`markStage ${puzzlePrimed ? "puzzlePrimed" : ""}`} type="button" aria-label="JP monogram, the J and P combine to form an H" onClick={() => {
          grow("mark-spin", 5);
          if (puzzlePrimed) {
            window.dispatchEvent(new CustomEvent("haddad-puzzle-unlock", { detail: { paths: puzzlePaths } }));
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
        <button className="secretSeed" type="button" aria-expanded={secretOpen} onClick={() => { setSecretOpen((open) => !open); grow("secret", 8); }}>
          <span>HaddadaddaH</span>
          <i aria-hidden="true">·</i>
        </button>
        <span>John Paul Haddad</span>
      </footer>
      {secretOpen && (
        <aside className="secretNote" aria-live="polite">
          <span>There is another way through.</span>
          <strong>Reverse it. Spin it. Walk all four paths.</strong>
        </aside>
      )}
      </div>\n    </main>
  );
}
