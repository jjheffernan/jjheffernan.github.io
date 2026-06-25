import { useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { useCursor } from '@react-three/drei'
import { useInteraction } from '../context/InteractionContext'
import type { Group } from 'three'

type InteractableProps = {
  id: string
  children: ReactNode
  position?: [number, number, number]
  hoverScale?: number
  ringRadius?: number
}

export function Interactable({
  id,
  children,
  position,
  hoverScale = 1.12,
  ringRadius = 0.45,
}: InteractableProps) {
  const group = useRef<Group>(null)
  const { select, selectedId, hoveredId, setHovered, discovered } = useInteraction()
  const isSelected = selectedId === id
  const isHovered = hoveredId === id
  const isDiscovered = discovered.has(id)

  useCursor(isHovered)

  useFrame((_, delta) => {
    if (!group.current) return
    const target = isHovered || isSelected ? hoverScale : 1
    const current = group.current.scale.x
    const next = current + (target - current) * (1 - Math.exp(-8 * delta))
    group.current.scale.setScalar(next)
  })

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(id)
      }}
      onPointerOut={(e) => {
        e.stopPropagation()
        setHovered(null)
      }}
      onClick={(e) => {
        e.stopPropagation()
        select(id)
      }}
    >
      {children}
      {isDiscovered && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[ringRadius, ringRadius + 0.06, 32]} />
          <meshBasicMaterial color="#fbbf24" transparent opacity={0.5} />
        </mesh>
      )}
      {(isHovered || isSelected) && (
        <pointLight color="#ffffff" intensity={isSelected ? 1.2 : 0.6} distance={3} />
      )}
    </group>
  )
}
