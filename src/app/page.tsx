"use client";

import { useState } from "react";
import siteContent from "../content/siteContent";

export default function Home() {
  const { identity, paths, socials, music, engineeringProjects } = siteContent;
  const [brandOpen, setBrandOpen] = useState(false);
  const [activePath, setActivePath] = useState("product");
  const active = paths.find((path) => path.id === activePath) ?? paths[0];

  return (
    <main className="shell">
      <header className="topbar">
        <button className={`brand ${brandOpen ? "isOpen" : ""}`} type="button" aria-expanded={brandOpen} aria-label="Reveal the HaddadaddaH wordmark" onClick={() => setBrandOpen((open) => !open)}>
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
        <div className="markStage" aria-label="JP monogram, the J and P combine to form an H">
          <img className="mark" src="/haddadaddah-logo.svg" alt="JP monogram forming an H" />
          <span className="markHint">JP → H</span>
        </div>
      </section>

      <section className="explorer" aria-labelledby="explore-title">
        <div className="explorerIntro">
          <p className="sectionLabel" id="explore-title">Choose a path</p>
          <p>{identity.story}</p>
        </div>

        <div className="pathTabs" role="tablist" aria-label="Explore John Paul's work">
          {paths.map((path, index) => (
            <button key={path.id} type="button" role="tab" aria-selected={activePath === path.id} className={`pathTab ${activePath === path.id ? "isActive" : ""}`} onClick={() => setActivePath(path.id)}>
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

          {active.id === "building" && <div className="projectRail">
            {engineeringProjects.map((project) => <a href={project.url} target="_blank" rel="noreferrer" key={project.name}><span>{project.stack.join(" · ")}</span><strong>{project.name}</strong><b aria-hidden="true">↗</b></a>)}
          </div>}

          {active.id === "music" && <div className="musicRail">
            {music.map((project) => {
              const media = project.media.find((item) => "url" in item && Boolean(item.url));
              return media && "url" in media ? <a href={media.url} target="_blank" rel="noreferrer" key={project.name}><span>{project.relationship}</span><strong>{project.name}</strong><b>Listen ↗</b></a> : <div key={project.name}><span>{project.relationship}</span><strong>{project.name}</strong></div>;
            })}
          </div>}

          {active.id === "story" && <div className="storyLine" aria-label="Career path">
            <span>Claims</span><i>→</i><span>Entrepreneurship</span><i>→</i><span>Software</span><i>→</i><span>Product</span><i>↗</i><span>Music</span>
          </div>}
        </div>
      </section>

      <footer><span>HaddadaddaH</span><span>John Paul Haddad</span></footer>
    </main>
  );
}
