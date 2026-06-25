import { useRef, type CSSProperties } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useCursor } from '@react-three/drei'
import { usePanel } from '../../context/PanelContext'
import { WALL_PANELS } from './panelMeta'
import type { Group } from 'three'

function WallPanel3D({
  id,
  label,
  seg,
  accent,
  position,
  rotation,
  width,
  height,
}: (typeof WALL_PANELS)[number]) {
  const group = useRef<Group>(null)
  const { activePanel, hoveredPanel, openPanel, setHoveredPanel } = usePanel()
  const isActive = activePanel === id
  const isHovered = hoveredPanel === id

  useCursor(isHovered && !isActive)

  useFrame((_, delta) => {
    if (!group.current) return
    const targetScale = isActive ? 0.82 : isHovered ? 1.06 : 1
    const current = group.current.scale.x
    const next = current + (targetScale - current) * (1 - Math.exp(-10 * delta))
    group.current.scale.setScalar(next)
  })

  const pointerHandlers = {
    onPointerOver: (e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      setHoveredPanel(id)
    },
    onPointerOut: (e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      setHoveredPanel(null)
    },
    onClick: (e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      openPanel(id)
    },
  }

  const fillOpacity = isActive ? 0.42 : isHovered ? 0.78 : 0.65
  const sheenOpacity = isActive ? 0.2 : isHovered ? 0.38 : 0.28

  return (
    <group position={position} rotation={rotation}>
      <group ref={group}>
        {/* peg hook */}
        <mesh position={[0, height / 2 + 0.05, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.04, 0.01, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#8a8a95" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, height / 2 + 0.01, 0.02]}>
          <boxGeometry args={[0.02, 0.08, 0.02]} />
          <meshStandardMaterial color="#6a6a75" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* panel frame backing */}
        <mesh castShadow>
          <boxGeometry args={[width, height, 0.05]} />
          <meshStandardMaterial
            color="#120a22"
            roughness={0.35}
            metalness={0.12}
            emissive={accent}
            emissiveIntensity={isHovered ? 0.22 : isActive ? 0.06 : 0.1}
          />
        </mesh>

        {/* solid filled face — visible + clickable */}
        <mesh position={[0, 0, 0.028]} {...pointerHandlers}>
          <planeGeometry args={[width - 0.08, height - 0.08]} />
          <meshPhysicalMaterial
            color="#1a1030"
            transparent
            opacity={fillOpacity}
            roughness={0.18}
            metalness={0.08}
            emissive={accent}
            emissiveIntensity={isHovered ? 0.28 : isActive ? 0.1 : 0.14}
            depthWrite={false}
          />
        </mesh>

        {/* glass sheen layer */}
        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[width - 0.14, height - 0.14]} />
          <meshPhysicalMaterial
            color="#8b7cf8"
            transparent
            opacity={sheenOpacity}
            roughness={0.08}
            metalness={0.05}
            emissive="#6b5ce7"
            emissiveIntensity={isHovered ? 0.15 : 0.06}
            depthWrite={false}
          />
        </mesh>

        {/* solid accent border */}
        <mesh position={[0, 0, 0.034]}>
          <planeGeometry args={[width - 0.04, height - 0.04]} />
          <meshBasicMaterial color={accent} transparent opacity={isHovered ? 0.45 : 0.3} />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[width - 0.12, height - 0.12]} />
          <meshBasicMaterial color="#0a0612" transparent opacity={0.55} />
        </mesh>

        {(isHovered || isActive) && (
          <pointLight color={accent} intensity={isActive ? 0.4 : 0.9} distance={2.5} position={[0, 0, 0.2]} />
        )}
      </group>

      <Html
        position={[0, 0, 0.08]}
        center
        distanceFactor={4.8}
        zIndexRange={[40, 0]}
        style={{ pointerEvents: 'none', userSelect: 'none' }}
      >
        <div
          className={`wall-panel-tag${isHovered ? ' is-hovered' : ''}${isActive ? ' is-active' : ''}`}
          style={{ '--panel-accent': accent } as CSSProperties}
        >
          <span className="wall-panel-seg">{seg}</span>
          <span className="wall-panel-label">{label}</span>
        </div>
      </Html>
    </group>
  )
}

export function WallPanels() {
  return (
    <group>
      {WALL_PANELS.map((panel) => (
        <WallPanel3D key={panel.id} {...panel} />
      ))}
    </group>
  )
}
