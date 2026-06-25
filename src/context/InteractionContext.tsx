import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { discoveryIds, getDiscovery, type Discovery } from '../data/discoveries'

type InteractionContextValue = {
  selectedId: string | null
  hoveredId: string | null
  discovered: Set<string>
  discovery: Discovery | null
  totalDiscoveries: number
  select: (id: string) => void
  clear: () => void
  setHovered: (id: string | null) => void
}

const InteractionContext = createContext<InteractionContextValue | null>(null)

export function InteractionProvider({ children }: { children: ReactNode }) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [discovered, setDiscovered] = useState<Set<string>>(() => new Set())

  const select = useCallback((id: string) => {
    setSelectedId((current) => (current === id ? null : id))
    setDiscovered((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  const clear = useCallback(() => setSelectedId(null), [])

  const setHovered = useCallback((id: string | null) => setHoveredId(id), [])

  const discovery = selectedId ? getDiscovery(selectedId) ?? null : null

  const value = useMemo(
    () => ({
      selectedId,
      hoveredId,
      discovered,
      discovery,
      totalDiscoveries: discoveryIds.length,
      select,
      clear,
      setHovered,
    }),
    [selectedId, hoveredId, discovered, discovery, select, clear, setHovered],
  )

  return <InteractionContext.Provider value={value}>{children}</InteractionContext.Provider>
}

export function useInteraction() {
  const ctx = useContext(InteractionContext)
  if (!ctx) {
    throw new Error('useInteraction must be used within InteractionProvider')
  }
  return ctx
}
