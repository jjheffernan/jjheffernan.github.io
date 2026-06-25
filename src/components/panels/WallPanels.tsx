import { useRef, type CSSProperties } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useCursor } from '@react-three/drei'
import { usePanel, type PanelId } from '../../context/PanelContext'
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

  const onPointer = (panelId: PanelId) => ({
    onPointerOver: (e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      setHoveredPanel(panelId)
    },
    onPointerOut: (e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      setHoveredPanel(null)
    },
    onClick: (e: { stopPropagation: () => void }) => {
      e.stopPropagation()
      openPanel(panelId)
    },
  })

  return (
    <group ref={group} position={position} rotation={rotation}>
      {/* peg hook */}
      <mesh position={[0, height / 2 + 0.1, 0.02]}>
        <torusGeometry args={[0.055, 0.012, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#8a8a95" metalness={0.85} roughness={0.25} />
      </mesh>
      <mesh position={[0, height / 2 + 0.02, 0.02]}>
        <boxGeometry args={[0.025, 0.14, 0.025]} />
        <meshStandardMaterial color="#6a6a75" metalness={0.8} roughness={0.3} />
      </mesh>

      <group {...onPointer(id)}>
        {/* panel frame */}
        <mesh castShadow>
          <boxGeometry args={[width, height, 0.05]} />
          <meshPhysicalMaterial
            color="#1a1030"
            transparent
            opacity={isActive ? 0.35 : 0.88}
            roughness={0.25}
            metalness={0.15}
            emissive={accent}
            emissiveIntensity={isHovered ? 0.35 : isActive ? 0.08 : 0.12}
          />
        </mesh>
        {/* glass face */}
        <mesh position={[0, 0, 0.028]}>
          <planeGeometry args={[width - 0.1, height - 0.1]} />
          <meshPhysicalMaterial
            color="#6b5ce7"
            transparent
            opacity={isActive ? 0.15 : 0.45}
            roughness={0.1}
            metalness={0.05}
            emissive={accent}
            emissiveIntensity={isHovered ? 0.25 : 0.08}
          />
        </mesh>
        {/* bezel */}
        <mesh position={[0, 0, 0.032]}>
          <boxGeometry args={[width - 0.04, height - 0.04, 0.008]} />
          <meshBasicMaterial color={accent} transparent opacity={isHovered ? 0.5 : 0.28} wireframe />
        </mesh>

        {(isHovered || isActive) && (
          <pointLight color={accent} intensity={isActive ? 0.4 : 0.9} distance={2.5} position={[0, 0, 0.2]} />
        )}
      </group>

      <Html
        position={[0, 0, 0.06]}
        transform
        occlude
        distanceFactor={5.5}
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
