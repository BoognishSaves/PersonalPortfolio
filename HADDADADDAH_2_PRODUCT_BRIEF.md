# HaddadAddah 2.0

## Product brief

HaddadAddah is John Paul Haddad's living digital identity, not a resume and not a developer portfolio.

The primary experience starts when someone meets JP, receives a guitar-pick business card, scans its QR code, and wants to understand who he is and how to stay connected.

The site should quickly communicate a multidimensional identity: product leader, builder, entrepreneur, and musician. Engineering remains important as part of the story and as evidence of technical fluency, but the site is not positioning JP for engineering roles.

## Product principles

### 1. Mobile first, because the pick is the front door
The first mobile viewport should establish identity and provide useful actions without requiring a long scroll.

### 2. High information density without clutter
Whitespace must improve comprehension, not inflate the page. Avoid giant hero sections, sparse AI-template layouts, and unnecessary scrolling.

### 3. Clear user flow before visual spectacle
Information architecture comes before decoration. Visitors should be able to quickly choose the part of JP's story relevant to them.

### 4. Restraint in layout, personality in interaction
The site should contain memorable animation, microinteractions, humor, and occasional surprises. Every effect should feel intentional. The target reaction is "How did he do that?", not "Why did he do that?"

### 5. Progressive disclosure
Give visitors the essential story immediately, then let them explore product leadership, engineering/building, music/media, entrepreneurship, and other work without forcing them through unrelated content.

### 6. Engineering is demonstrated, not advertised
Technical credibility should come through the quality of the site, selected historical projects, and JP's ability to bridge product and engineering. Avoid skill-percentage bars and recruiter-oriented technology walls.

### 7. A living public record
Content must be easy to update. Bands, performances, public product work, projects, ventures, appearances, links, and social accounts should be structured data rather than hardcoded presentation.

### 8. Built to change
JoJa of the Hill People, The High Desert Band, Them Mules, Gentleman Deluxe, and future music projects should fit the same content model. The architecture should assume that JP's work will continue to evolve.

### 9. Public by design
Only public-safe professional material belongs here. Internal or confidential Verisk information should never be required to make the professional story compelling.

### 10. Fast, accessible, and technically excellent
Performance, responsive behavior, semantic markup, keyboard navigation, reduced-motion support, metadata, social previews, and maintainability are product features.

## Initial content model

Content should be separated from UI components and organized around reusable records for:

- identity and primary actions
- professional/product work
- engineering projects
- music projects and bands
- performances and media
- ventures and other things built
- social/contact links
- optional easter eggs and interactive moments

Facebook is not a current social destination. SoundCloud should be supported alongside LinkedIn, Instagram, GitHub, and other relevant destinations.

## Development guardrails

- Preserve `master` and the original site's history.
- Build 2.0 on a separate branch until launch is explicitly approved.
- Do not change the live domain during development.
- Prefer a modern, maintainable React-based architecture.
- Preview and test before DNS/deployment cutover.
- Keep content editing simple enough that routine updates do not require React knowledge.
