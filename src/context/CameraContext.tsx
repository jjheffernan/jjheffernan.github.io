import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/** Radians per pan click — self-yaw + lateral peek step */
const PAN_STEP = 0.28
const PAN_MIN = -0.85
const PAN_MAX = 0.85

type CameraContextValue = {
  panAngle: number
  panLeft: () => void
  panRight: () => void
  resetPan: () => void
}

const CameraContext = createContext<CameraContextValue | null>(null)

export function CameraProvider({ children }: { children: ReactNode }) {
  const [panAngle, setPanAngle] = useState(0)

  const panLeft = useCallback(
    () => setPanAngle((a) => Math.max(PAN_MIN, a - PAN_STEP)),
    [],
  )
  const panRight = useCallback(
    () => setPanAngle((a) => Math.min(PAN_MAX, a + PAN_STEP)),
    [],
  )
  const resetPan = useCallback(() => setPanAngle(0), [])

  const value = useMemo(
    () => ({ panAngle, panLeft, panRight, resetPan }),
    [panAngle, panLeft, panRight, resetPan],
  )

  return <CameraContext.Provider value={value}>{children}</CameraContext.Provider>
}

export function useCamera() {
  const ctx = useContext(CameraContext)
  if (!ctx) {
    throw new Error('useCamera must be used within CameraProvider')
  }
  return ctx
}
