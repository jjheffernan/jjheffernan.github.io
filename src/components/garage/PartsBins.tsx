import { useMemo } from 'react'
import { Html } from '@react-three/drei'
import { skillCategories } from '../../data/profile'
import { useInteraction } from '../../context/InteractionContext'
import { Interactable } from '../Interactable'
import { garage } from './materials'

type BinProps = {
  id: string
  title: string
  position: [number, number, number]
  color: string
}

function PartsBin({ id, title, position, color }: BinProps) {
  const { hoveredId, selectedId, discovered } = useInteraction()
  const active = hoveredId === id || selectedId === id

  return (
    <Interactable id={id} position={position} hoverScale={1.06} ringRadius={0.38}>
      <group>
        <mesh castShadow>
          <boxGeometry args={[0.72, 0.38, 0.52]} />
          <meshStandardMaterial color="#2d3748" roughness={0.75} metalness={0.15} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <boxGeometry args={[0.64, 0.22, 0.44]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={active ? 0.55 : discovered.has(id) ? 0.3 : 0.12}
            roughness={0.65}
            metalness={0.1}
          />
        </mesh>
        {/* label strip */}
        <mesh position={[0, 0.22, 0.27]}>
          <boxGeometry args={[0.5, 0.08, 0.02]} />
          <meshStandardMaterial color={garage.woodDark} roughness={0.9} />
        </mesh>
        {/* dividers / parts inside */}
        {[-0.15, 0.15].map((x) => (
          <mesh key={x} position={[x, 0.08, 0]}>
            <boxGeometry args={[0.08, 0.14, 0.35]} />
            <meshStandardMaterial color={garage.metal} metalness={0.7} roughness={0.35} />
          </mesh>
        ))}
        {active && (
          <Html position={[0, 0.55, 0]} center distanceFactor={5} style={{ pointerEvents: 'none' }}>
            <span className="scene-label scene-label-garage">{title}</span>
          </Html>
        )}
      </group>
    </Interactable>
  )
}

export function PartsBins() {
  const bins = useMemo(() => {
    const startX = -5.1
    const gap = 1.28
    return skillCategories.map((category, i) => ({
      ...category,
      position: [startX + i * gap, 0.02, -0.28] as [number, number, number],
    }))
  }, [])

  return (
    <group>
      {bins.map((bin) => (
        <PartsBin key={bin.id} id={bin.id} title={bin.title} position={bin.position} color={bin.color} />
      ))}
    </group>
  )
}
