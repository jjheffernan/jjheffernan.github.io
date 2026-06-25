import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { useInteraction } from '../../context/InteractionContext'
import { Interactable } from '../Interactable'
import { garage } from './materials'
import type { Mesh, MeshStandardMaterial } from 'three'

export function DevStation() {
  const screen = useRef<Mesh>(null)
  const { hoveredId, selectedId } = useInteraction()
  const active = hoveredId === 'core' || selectedId === 'core'

  useFrame((state) => {
    if (!screen.current) return
    const mat = screen.current.material as MeshStandardMaterial
    mat.emissiveIntensity = active
      ? 0.9 + Math.sin(state.clock.elapsedTime * 3) * 0.15
      : 0.45 + Math.sin(state.clock.elapsedTime * 1.5) * 0.08
  })

  return (
    <group position={[0.2, 0.02, -0.5]}>
      <Interactable id="core" hoverScale={1.03} ringRadius={0.95}>
        <group>
          {/* laptop base */}
          <mesh position={[0, 0.04, 0]} castShadow>
            <boxGeometry args={[1.1, 0.06, 0.75]} />
            <meshStandardMaterial color="#2d3748" roughness={0.6} metalness={0.2} />
          </mesh>
          {/* screen */}
          <mesh position={[0, 0.42, -0.28]} rotation={[-0.35, 0, 0]} castShadow>
            <boxGeometry args={[1.05, 0.65, 0.04]} />
            <meshStandardMaterial color="#1a202c" roughness={0.5} />
          </mesh>
          <mesh ref={screen} position={[0, 0.42, -0.26]} rotation={[-0.35, 0, 0]}>
            <planeGeometry args={[0.92, 0.52]} />
            <meshStandardMaterial
              color="#33ff66"
              emissive="#134e2a"
              emissiveIntensity={0.45}
              roughness={0.3}
              flatShading
            />
          </mesh>
          {/* side monitor */}
          <mesh position={[0.85, 0.38, 0.05]} castShadow>
            <boxGeometry args={[0.06, 0.55, 0.7]} />
            <meshStandardMaterial color="#1a202c" />
          </mesh>
          <mesh position={[0.88, 0.38, 0.05]}>
            <planeGeometry args={[0.55, 0.38]} />
            <meshStandardMaterial color="#8b7cf8" emissive="#4a3f8c" emissiveIntensity={active ? 0.7 : 0.35} flatShading />
          </mesh>
          {/* keyboard */}
          <mesh position={[0, 0.09, 0.22]}>
            <boxGeometry args={[0.75, 0.03, 0.28]} />
            <meshStandardMaterial color="#111" roughness={0.8} />
          </mesh>
          {active && (
            <Html position={[0, 0.95, 0]} center distanceFactor={5} style={{ pointerEvents: 'none' }}>
              <span className="scene-label scene-label-garage">Workbench Hub</span>
            </Html>
          )}
        </group>
      </Interactable>
      {/* desk lamp */}
      <group position={[-0.95, 0.05, 0.35]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.14, 0.03, 16]} />
          <meshStandardMaterial color={garage.metalDark} metalness={0.7} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.28, 0]} rotation={[0, 0, 0.25]}>
          <cylinderGeometry args={[0.02, 0.02, 0.55, 8]} />
          <meshStandardMaterial color={garage.metal} metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.12, 0.52, 0.05]} rotation={[0.6, 0, 0]}>
          <coneGeometry args={[0.14, 0.18, 12, 1, true]} />
          <meshStandardMaterial color={garage.warm} emissive="#b45309" emissiveIntensity={0.6} side={2} />
        </mesh>
        <pointLight position={[0.15, 0.45, 0.1]} intensity={4} color={garage.warm} distance={3} />
      </group>
    </group>
  )
}
