import { profile, skillCategories, projects, publicSites } from '../../data/profile'
import { organizations } from '../../data/organizations'
import { SegmentDisplay } from '../SegmentDisplay'
import type { PanelId } from '../../context/PanelContext'

const featuredOrgs = organizations.filter((org) => org.repos.length > 0).slice(0, 3)

export function HeroPanelContent() {
  return (
    <>
      <div className="hero-seg-row">
        <SegmentDisplay glow="amber" size="md">
          BOOT OK
        </SegmentDisplay>
        <span className="hero-status">
          SYS<span className="blink">_</span>READY
        </span>
      </div>
      <p className="eyebrow">{profile.tagline}</p>
      <h1 className="hero-title">
        <span>JJ</span>
        <span className="accent">Heffernan</span>
      </h1>
      <p className="lead">{profile.headline}</p>
      <div className="btn-row">
        <a className="btn btn-primary" href={profile.portfolio.site} target="_blank" rel="noreferrer">
          Portfolio
        </a>
        <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
      <p className="hero-note">
        &gt; click workbench objects to unlock hidden lore · portfolio at{' '}
        <a href={profile.portfolio.site} target="_blank" rel="noreferrer">
          {profile.portfolio.label}
        </a>
      </p>
    </>
  )
}

export function AboutPanelContent() {
  return (
    <>
      <SegmentDisplay className="section-seg" glow="purple" size="sm">
        01 ABOUT
      </SegmentDisplay>
      <p className="eyebrow">About</p>
      <h2 className="section-title">Engineer across the stack</h2>
      <p className="section-copy">{profile.bio}</p>
      <ul className="highlight-list compact">
        {profile.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <div className="skill-pills skill-pills-wrap">
        {skillCategories.flatMap((c) => c.skills).map((skill) => (
          <span key={skill} className="pill">
            {skill}
          </span>
        ))}
      </div>
    </>
  )
}

export function WorkPanelContent() {
  return (
    <>
      <SegmentDisplay className="section-seg" glow="purple" size="sm">
        02 WORK
      </SegmentDisplay>
      <p className="eyebrow">Work</p>
      <h2 className="section-title">Projects &amp; orgs</h2>
      <div className="project-grid">
        {projects.map((project) => (
          <a
            key={project.title}
            className="project-card glass featured"
            href={project.url}
            target="_blank"
            rel="noreferrer"
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <span className="project-link">GitHub →</span>
          </a>
        ))}
      </div>
      <div className="org-compact-list">
        {featuredOrgs.map((org) => (
          <a key={org.slug} className="org-compact glass" href={org.url} target="_blank" rel="noreferrer">
            <span className="org-compact-name" style={{ color: org.color }}>
              {org.name}
            </span>
            <span className="org-compact-meta">{org.repos.length} repos</span>
          </a>
        ))}
        <a className="org-compact glass" href={profile.github} target="_blank" rel="noreferrer">
          <span className="org-compact-name">All orgs</span>
          <span className="org-compact-meta">on GitHub →</span>
        </a>
      </div>
    </>
  )
}

export function LinksPanelContent({ year }: { year: string }) {
  return (
    <>
      <SegmentDisplay className="section-seg" glow="purple" size="sm">
        03 LINKS
      </SegmentDisplay>
      <p className="eyebrow">Links</p>
      <h2 className="section-title">Sites &amp; contact</h2>
      <div className="site-grid">
        {publicSites.map((site) => (
          <a key={site.url} className="site-card glass" href={site.url} target="_blank" rel="noreferrer">
            <h3>{site.title}</h3>
            <span className="site-domain">{site.domain}</span>
          </a>
        ))}
      </div>
      <div className="contact-panel glass">
        <div className="contact-links">
          <a className="btn btn-primary" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
      <footer className="footer footer-in-panel">
        <SegmentDisplay glow="green" size="sm">
          {`©${year} JJH`}
        </SegmentDisplay>
        {' · '}dev hub ·{' '}
        <a href={profile.portfolio.site} target="_blank" rel="noreferrer">
          {profile.portfolio.label}
        </a>
      </footer>
    </>
  )
}

export function PanelContent({ id, year }: { id: PanelId; year: string }) {
  switch (id) {
    case 'hero':
      return <HeroPanelContent />
    case 'about':
      return <AboutPanelContent />
    case 'work':
      return <WorkPanelContent />
    case 'links':
      return <LinksPanelContent year={year} />
  }
}

export const PANEL_TITLES: Record<PanelId, string> = {
  hero: 'Home',
  about: 'About',
  work: 'Work',
  links: 'Links',
}
