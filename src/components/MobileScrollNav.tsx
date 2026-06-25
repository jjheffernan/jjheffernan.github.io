import { useEffect, useState } from 'react'
import { usePanel, type PanelId } from '../context/PanelContext'

const ITEMS: { id: PanelId | 'scene'; label: string }[] = [
  { id: 'scene', label: '3D' },
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'links', label: 'Links' },
]

export function MobileScrollNav() {
  const { activePanel, openPanel, closePanel } = usePanel()
  const [visible, setVisible] = useState(() => window.innerWidth <= 720)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 720px)')
    const onResize = () => setVisible(mq.matches)
    onResize()
    mq.addEventListener('change', onResize)
    return () => mq.removeEventListener('change', onResize)
  }, [])

  if (!visible) return null

  const activeId = activePanel ?? 'scene'

  return (
    <nav className="mobile-scroll-nav glass glass-nav" aria-label="Section navigation">
      {ITEMS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={`mobile-scroll-nav-btn${activeId === id ? ' is-active' : ''}`}
          aria-current={activeId === id ? 'true' : undefined}
          onClick={() => (id === 'scene' ? closePanel() : openPanel(id))}
        >
          {label}
        </button>
      ))}
    </nav>
  )
}
