import { profile } from '../data/profile'
import { SegmentDisplay } from './SegmentDisplay'
import { usePanel, type PanelId } from '../context/PanelContext'

export function Overlay() {
  const { openPanel, activePanel } = usePanel()
  const year = new Date().getFullYear().toString().slice(-2)

  const onNav = (e: React.MouseEvent, panel: PanelId) => {
    e.preventDefault()
    openPanel(panel)
  }

  return (
    <div className="overlay-root">
      <nav className="nav glass glass-nav">
        <div className="nav-brand">JJ HEFF</div>
        <SegmentDisplay className="nav-seg" glow="green" size="sm">
          {`DEV.${year}`}
        </SegmentDisplay>
        <div className="nav-links">
          <a href="#hero" onClick={(e) => onNav(e, 'hero')}>
            Home
          </a>
          <a href="#about" onClick={(e) => onNav(e, 'about')}>
            About
          </a>
          <a href="#work" onClick={(e) => onNav(e, 'work')}>
            Work
          </a>
          <a href="#links" onClick={(e) => onNav(e, 'links')}>
            Links
          </a>
          <a href={profile.portfolio.site} target="_blank" rel="noreferrer">
            Portfolio ↗
          </a>
        </div>
      </nav>

      {!activePanel && (
        <div className="scene-hint-bar glass glass-subtle" aria-live="polite">
          <SegmentDisplay glow="green" size="sm">
            WALL
          </SegmentDisplay>
          <span className="scene-hint-copy">Click pegboard panels · tap bench for lore</span>
        </div>
      )}
    </div>
  )
}
