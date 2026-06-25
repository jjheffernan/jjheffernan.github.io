import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type PanelId = 'hero' | 'about' | 'work' | 'links'

type PanelContextValue = {
  activePanel: PanelId | null
  hoveredPanel: PanelId | null
  openPanel: (id: PanelId) => void
  closePanel: () => void
  togglePanel: (id: PanelId) => void
  setHoveredPanel: (id: PanelId | null) => void
}

const PanelContext = createContext<PanelContextValue | null>(null)

export function PanelProvider({ children }: { children: ReactNode }) {
  const [activePanel, setActivePanel] = useState<PanelId | null>(null)
  const [hoveredPanel, setHoveredPanel] = useState<PanelId | null>(null)

  const openPanel = useCallback((id: PanelId) => setActivePanel(id), [])
  const closePanel = useCallback(() => setActivePanel(null), [])
  const togglePanel = useCallback(
    (id: PanelId) => setActivePanel((current) => (current === id ? null : id)),
    [],
  )

  const value = useMemo(
    () => ({
      activePanel,
      hoveredPanel,
      openPanel,
      closePanel,
      togglePanel,
      setHoveredPanel,
    }),
    [activePanel, hoveredPanel, openPanel, closePanel, togglePanel],
  )

  return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>
}

export function usePanel() {
  const ctx = useContext(PanelContext)
  if (!ctx) {
    throw new Error('usePanel must be used within PanelProvider')
  }
  return ctx
}
