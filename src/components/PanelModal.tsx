import { useEffect } from 'react'
import { usePanel } from '../context/PanelContext'
import { PanelContent, PANEL_TITLES } from './panels/PanelContents'

export function PanelModal() {
  const { activePanel, closePanel } = usePanel()
  const year = new Date().getFullYear().toString().slice(-2)
  const open = activePanel !== null

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePanel()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, closePanel])

  return (
    <>
      <div
        className={`panel-backdrop${open ? ' is-open' : ''}`}
        onClick={closePanel}
        aria-hidden={!open}
      />
      <div
        className={`panel-modal-shell${open ? ' is-open' : ''}`}
        aria-hidden={!open}
      >
        <div
          className={`panel-modal glass glass-panel${open ? ' is-open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label={activePanel ? PANEL_TITLES[activePanel] : undefined}
        >
          {activePanel && (
            <>
              <button className="panel-modal-close" onClick={closePanel} aria-label="Close panel">
                ×
              </button>
              <div className="panel-modal-body">
                <PanelContent id={activePanel} year={year} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
