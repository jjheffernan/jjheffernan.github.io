import { useMemo } from 'react'
import { Html } from '@react-three/drei'
import { projects } from '../../data/profile'
import { useInteraction } from '../../context/InteractionContext'
import { Interactable } from '../Interactable'
import { garage } from './materials'
import { PROJECT_POSITIONS } from './workbenchLayout'

type ArtifactProps = {
  id: string
  title: string
  position: [number, number, number]
  rotation?: [number, number, number]
  variant: 'django' | 'camera' | 'rustpi' | 'arduino'
}

function ProjectArtifact({ id, title, position, rotation = [0, 0, 0], variant }: ArtifactProps) {
  const { hoveredId, selectedId, discovered } = useInteraction()
  const active = hoveredId === id || selectedId === id

  return (
    <Interactable id={id} position={position} hoverScale={1.08} ringRadius={0.42}>
      <group rotation={rotation}>
        {variant === 'django' && (
          <group>
            <mesh castShadow>
              <boxGeometry args={[0.55, 0.08, 0.72]} />
              <meshStandardMaterial color="#0c4a3e" roughness={0.8} />
            </mesh>
            <mesh position={[0, 0.06, 0]}>
              <boxGeometry args={[0.48, 0.02, 0.62]} />
              <meshStandardMaterial color="#f0fff4" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.1, 0]}>
              <boxGeometry args={[0.35, 0.06, 0.45]} />
              <meshStandardMaterial color="#276749" roughness={0.7} />
            </mesh>
          </group>
        )}
        {variant === 'camera' && (
          <group position={[0, 0.14, 0]}>
            <mesh castShadow>
              <boxGeometry args={[0.4, 0.26, 0.2]} />
              <meshStandardMaterial color="#2d3748" roughness={0.55} metalness={0.25} />
            </mesh>
            <mesh position={[0, 0.16, -0.02]} castShadow>
              <boxGeometry args={[0.16, 0.09, 0.12]} />
              <meshStandardMaterial color="#1a202c" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.03, 0.14]} rotation={[Math.PI / 2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.09, 0.11, 0.16, 16]} />
              <meshStandardMaterial color="#111" metalness={0.65} roughness={0.35} />
            </mesh>
            <mesh position={[0, 0.03, 0.23]} rotation={[0, 0, 0]}>
              <circleGeometry args={[0.07, 20]} />
              <meshStandardMaterial
                color="#2c5282"
                emissive="#1a365d"
                emissiveIntensity={active ? 0.55 : 0.25}
                metalness={0.4}
                roughness={0.2}
              />
            </mesh>
            <mesh position={[0.14, 0.04, 0.06]}>
              <boxGeometry args={[0.05, 0.03, 0.03]} />
              <meshStandardMaterial color={garage.metal} metalness={0.85} roughness={0.25} />
            </mesh>
            <mesh position={[-0.12, 0.1, 0.02]} rotation={[0, 0, 0.3]}>
              <boxGeometry args={[0.04, 0.02, 0.06]} />
              <meshStandardMaterial color="#c53030" roughness={0.6} />
            </mesh>
          </group>
        )}
        {variant === 'rustpi' && (
          <group>
            <mesh castShadow>
              <boxGeometry args={[0.7, 0.04, 0.5]} />
              <meshStandardMaterial color="#1a4731" roughness={0.7} />
            </mesh>
            {[-0.2, 0, 0.2].map((x) => (
              <mesh key={x} position={[x, 0.06, -0.12]}>
                <boxGeometry args={[0.1, 0.08, 0.08]} />
                <meshStandardMaterial color="#111" metalness={0.3} roughness={0.6} />
              </mesh>
            ))}
            <mesh position={[0.22, 0.05, 0.15]}>
              <boxGeometry args={[0.14, 0.05, 0.14]} />
              <meshStandardMaterial color="#c53030" metalness={0.2} roughness={0.5} />
            </mesh>
          </group>
        )}
        {variant === 'arduino' && (
          <group>
            <mesh castShadow>
              <boxGeometry args={[0.75, 0.035, 0.55]} />
              <meshStandardMaterial color="#1e3a5f" roughness={0.65} />
            </mesh>
            {Array.from({ length: 6 }, (_, i) => (
              <mesh key={i} position={[-0.28 + i * 0.11, 0.05, 0.22]}>
                <boxGeometry args={[0.03, 0.06, 0.03]} />
                <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
              </mesh>
            ))}
          </group>
        )}
        <mesh position={[0, 0.02, 0]} visible={false}>
          <boxGeometry args={[0.8, 0.5, 0.8]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        {(active || discovered.has(id)) && (
          <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.38, 0.44, 24]} />
            <meshBasicMaterial
              color={active ? '#fbbf24' : '#b7791f'}
              transparent
              opacity={active ? 0.6 : 0.3}
            />
          </mesh>
        )}
        {active && (
          <Html position={[0, 0.55, 0]} center distanceFactor={4.5} style={{ pointerEvents: 'none' }}>
            <span className="scene-label scene-label-garage">{title}</span>
          </Html>
        )}
      </group>
    </Interactable>
  )
}

const VARIANT_BY_TITLE: Record<string, ArtifactProps['variant']> = {
  'Django Auto Forum': 'django',
  'jheff.media-site': 'camera',
  'RustPi Monorepo': 'rustpi',
  'Arduino Projects': 'arduino',
}

export function ProjectArtifacts() {
  const artifacts = useMemo(
    () =>
      projects.map((project, i) => {
        const [x, y, z, ry] = PROJECT_POSITIONS[i] ?? [4, 0.02, 0, 0]
        return {
          id: `project-${i}`,
          title: project.title,
          position: [x, y, z] as [number, number, number],
          rotation: [0, ry, 0] as [number, number, number],
          variant: VARIANT_BY_TITLE[project.title] ?? 'arduino',
        }
      }),
    [],
  )

  return (
    <group>
      {artifacts.map((a) => (
        <ProjectArtifact key={a.id} {...a} />
      ))}
    </group>
  )
}
