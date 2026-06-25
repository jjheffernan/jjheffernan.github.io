import { Html } from '@react-three/drei'
import { useInteraction } from '../../context/InteractionContext'
import { Interactable } from '../Interactable'
import { KenneyProp } from './KenneyProp'
import { DEV_STATION_POS } from './workbenchLayout'

/** Kenney furniture kit nodes carry an internal ~0.44 scale — bump props for bench readability. */
const HUB = {
  laptop: 2.65,
  monitor: 2.6,
  keyboard: 2.45,
  mouse: 2.55,
  speakerSmall: 1.45,
  lamp: 1.45,
} as const

/**
 * Hub layout (camera at +Z, wall at −Z):
 *
 *   [spk]    [laptop]     [monitor]    [spk]
 *            [keyboard]  [mouse]
 *   [lamp]
 */
export function DevStation() {
  const { hoveredId, selectedId } = useInteraction()
  const active = hoveredId === 'core' || selectedId === 'core'

  return (
    <group position={DEV_STATION_POS}>
      <Interactable id="core" hoverScale={1.02} ringRadius={1.18}>
        <KenneyProp model="speakerSmall" position={[-0.75, 0, -0.08]} scale={HUB.speakerSmall} />
        <KenneyProp model="laptop" position={[-0.34, 0, -0.16]} scale={HUB.laptop} />
        <KenneyProp model="computerScreen" position={[0.68, 0, -0.12]} rotation={[0, Math.PI / 18, 0]} scale={HUB.monitor} />
        <KenneyProp model="speakerSmall" position={[1.85, 0, -0.08]} scale={HUB.speakerSmall} />

        <KenneyProp model="computerKeyboard" position={[-0.12, 0.02, 0.55]} scale={HUB.keyboard} />
        <KenneyProp model="computerMouse" position={[0.56, 0.02, 0.74]} scale={HUB.mouse} />

        {active && (
          <Html position={[0, 0.62, 0.24]} center distanceFactor={5} style={{ pointerEvents: 'none' }}>
            <span className="scene-label scene-label-garage">Workbench Hub</span>
          </Html>
        )}
      </Interactable>

      <group position={[-1.12, 0, 0.58]}>
        <KenneyProp model="lampRoundTable" scale={HUB.lamp} />
        <pointLight position={[0, 0.32, 0.05]} intensity={4} color="#ffb86c" distance={3} />
      </group>
    </group>
  )
}
