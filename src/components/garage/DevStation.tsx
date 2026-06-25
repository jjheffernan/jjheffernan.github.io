import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useInteraction } from '../../context/InteractionContext'
import { Interactable } from '../Interactable'
import { KenneyProp } from './KenneyProp'
import type { Mesh, MeshStandardMaterial } from 'three'

export function DevStation() {
  const laptopScreen = useRef<Mesh>(null)
  const monitorScreen = useRef<Mesh>(null)
  const { hoveredId, selectedId } = useInteraction()
  const active = hoveredId === 'core' || selectedId === 'core'

  useFrame((state) => {
    const pulse = active
      ? 0.9 + Math.sin(state.clock.elapsedTime * 3) * 0.15
      : 0.45 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08
    const monitorPulse = active ? 0.75 : 0.35

    if (laptopScreen.current) {
      ;(laptopScreen.current.material as MeshStandardMaterial).emissiveIntensity = pulse
    }
    if (monitorScreen.current) {
      ;(monitorScreen.current.material as MeshStandardMaterial).emissiveIntensity = monitorPulse
    }
  })

  return (
    <group position={[0, 0.02, -1.05]}>
      <Interactable id="core" hoverScale={1.03} ringRadius={0.82}>
        <group>
          <KenneyProp model="laptop" position={[0, 0, -0.04]} rotation={[0, Math.PI, 0]} scale={2.7} />
          <mesh ref={laptopScreen} position={[0, 0.28, 0.14]} rotation={[-0.32, 0, 0]}>
            <planeGeometry args={[0.54, 0.32]} />
            <meshStandardMaterial color="#33ff66" emissive="#134e2a" emissiveIntensity={0.45} roughness={0.3} flatShading />
          </mesh>

          <KenneyProp model="computerScreen" position={[0.58, 0, 0.04]} rotation={[0, -0.22, 0]} scale={2.1} />
          <mesh ref={monitorScreen} position={[0.7, 0.26, 0.1]} rotation={[0, -0.22, 0]}>
            <planeGeometry args={[0.38, 0.26]} />
            <meshStandardMaterial color="#8b7cf8" emissive="#4a3f8c" emissiveIntensity={0.35} flatShading />
          </mesh>

          <KenneyProp model="computerKeyboard" position={[0, 0.02, 0.38]} rotation={[0, 0.02, 0]} scale={2.3} />
          <KenneyProp model="computerMouse" position={[0.3, 0.02, 0.44]} rotation={[0, -0.12, 0]} scale={2.4} />

          <KenneyProp model="speakerSmall" position={[-0.44, 0.02, 0.12]} rotation={[0, 0.3, 0]} scale={1.9} />
          <KenneyProp model="speaker" position={[0.88, 0.02, 0.06]} rotation={[0, -0.35, 0]} scale={1.7} />

          {active && (
            <Html position={[0, 0.72, 0.2]} center distanceFactor={5} style={{ pointerEvents: 'none' }}>
              <span className="scene-label scene-label-garage">Workbench Hub</span>
            </Html>
          )}
        </group>
      </Interactable>

      <group position={[-0.68, 0, 0.34]}>
        <KenneyProp model="lampRoundTable" scale={1.85} />
        <pointLight position={[0, 0.42, 0.06]} intensity={4} color="#ffb86c" distance={3} />
      </group>
    </group>
  )
}
