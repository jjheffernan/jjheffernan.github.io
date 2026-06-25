import { useInteraction } from '../context/InteractionContext'
import { usePanel } from '../context/PanelContext'
import { SegmentDisplay } from './SegmentDisplay'

export function InteractionLayer() {
  const { discovery, clear, discovered, totalDiscoveries, hoveredId } = useInteraction()
  const { activePanel } = usePanel()

  const countLabel = `${String(discovered.size).padStart(2, '0')}/${String(totalDiscoveries).padStart(2, '0')}`

  return (
    <>
      {!activePanel && (
      <div className="interaction-hint glass glass-subtle" aria-live="polite">
        <span className="hint-pulse" aria-hidden="true" />
        {hoveredId ? (
          <span>Click to reveal hidden lore</span>
        ) : (
          <span>Tap bench objects · pegboard panels for info</span>
        )}
        <span className="hint-count">
          <SegmentDisplay glow="green" size="sm">
            {countLabel}
          </SegmentDisplay>
        </span>
      </div>
      )}

      {discovery && (
        <aside className="discovery-panel glass" role="dialog" aria-label="Discovered content">
          <button className="discovery-close" onClick={clear} aria-label="Close discovery panel">
            ×
          </button>
          <SegmentDisplay className="discovery-seg" glow="amber" size="sm">
            LORE UNLOCK
          </SegmentDisplay>
          <p className="eyebrow">{discovery.subtitle}</p>
          <h2 className="discovery-title">{discovery.title}</h2>
          <p className="discovery-body">{discovery.body}</p>
          {discovery.tags && discovery.tags.length > 0 && (
            <div className="skill-pills">
              {discovery.tags.map((tag) => (
                <span key={tag} className="pill">
                  {tag}
                </span>
              ))}
            </div>
          )}
          {discovery.links && discovery.links.length > 0 && (
            <div className="discovery-links">
              {discovery.links.map((link) => (
                <a
                  key={link.url}
                  className="btn btn-primary"
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </aside>
      )}
    </>
  )
}
