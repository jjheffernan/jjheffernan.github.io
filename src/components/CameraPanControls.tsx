import { usePanel } from '../context/PanelContext'
import { useCamera } from '../context/CameraContext'

export function CameraPanControls() {
  const { activePanel } = usePanel()
  const { panLeft, panRight, panAngle, resetPan } = useCamera()

  if (activePanel) return null

  const atMin = panAngle <= -0.84
  const atMax = panAngle >= 0.84
  const atRest = Math.abs(panAngle) < 0.01

  return (
    <>
      <div className="camera-pan-controls" aria-label="Pan workbench view">
        <button
          type="button"
          className="camera-pan-btn glass"
          onClick={panLeft}
          disabled={atMin}
          aria-label="Peek left"
        >
          ◀
        </button>
        <button
          type="button"
          className="camera-pan-btn glass"
          onClick={panRight}
          disabled={atMax}
          aria-label="Peek right"
        >
          ▶
        </button>
      </div>
      <div className="camera-reset-control">
        <button
          type="button"
          className="camera-pan-btn camera-reset-btn glass"
          onClick={resetPan}
          disabled={atRest}
          aria-label="Zoom out and reset view"
          title="Reset camera"
        >
          ↙
        </button>
      </div>
    </>
  )
}
