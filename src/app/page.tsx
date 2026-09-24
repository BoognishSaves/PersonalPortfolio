"use client";

import { useState } from "react";
import siteContent from "../content/siteContent";

export default function Home() {
  const { identity, paths, socials } = siteContent;
  const [brandOpen, setBrandOpen] = useState(false);

  return (
    <main className="shell">
      <header className="topbar">
        <button
          className={`brand ${brandOpen ? "isOpen" : ""}`}
          type="button"
          aria-expanded={brandOpen}
          aria-label="Reveal the HaddadaddaH wordmark"
          onClick={() => setBrandOpen((open) => !open)}
        >
          <span className="brandForward">Haddad</span>
          <span className="brandAxis" aria-hidden="true" />
          <span className="brandReverse">daddaH</span>
        </button>
        <a className="quietLink" href="#connect">Connect</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">{identity.eyebrow}</p>
          <h1>{identity.name}</h1>
          <p className="lead">{identity.intro}</p>

          <div className="actions" id="connect" aria-label="Primary links">
            {socials.map((social) => (
              <a key={social.label} href={social.url} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>

        <div className="markStage" aria-label="JP monogram, the J and P combine to form an H">
          <img className="mark" src="/haddadaddah-logo.svg" alt="JP monogram forming an H" />
          <span className="markHint">JP → H</span>
        </div>
      </section>

      <nav className="pathGrid" aria-label="Explore John Paul's work">
        {paths.map((path, index) => (
          <a className="pathCard" href={`#${path.id}`} key={path.id}>
            <span className="pathNumber">0{index + 1}</span>
            <span className="pathLabel">{path.label}</span>
            <span className="pathArrow" aria-hidden="true">↘</span>
          </a>
        ))}
      </nav>

      <section className="storyIntro">
        <p>{identity.story}</p>
      </section>

      <div className="pathDetails">
        {paths.map((path) => (
          <section className="pathDetail" id={path.id} key={path.id}>
            <p className="sectionLabel">{path.label}</p>
            <h2>{path.title}</h2>
            <p>{path.summary}</p>
          </section>
        ))}
      </div>

      <footer>
        <span>HaddadaddaH</span>
        <span>John Paul Haddad</span>
      </footer>
    </main>
  );
}
