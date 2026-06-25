import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { KenneyProp } from './KenneyProp'
import { retro, toonProps } from './retroMaterials'
import {
  CARTRIDGE_POSITIONS,
  RETRO_AIR_HOCKEY_POS,
  RETRO_ARCADE_POS,
  RETRO_PINBALL_POS,
} from './workbenchLayout'
import type { Mesh, MeshStandardMaterial } from 'three'

function ArcadeGlow() {
  const screen = useRef<Mesh>(null)

  useFrame((state) => {
    if (!screen.current) return
    const mat = screen.current.material as MeshStandardMaterial
    mat.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2.2) * 0.12
  })

  return (
    <mesh ref={screen} position={[0, 0.52, 0.18]} rotation={[0, 0, 0]}>
      <planeGeometry args={[0.18, 0.14]} />
      <meshStandardMaterial color="#33ff66" emissive="#134e2a" emissiveIntensity={0.5} flatShading />
    </mesh>
  )
}

function Cartridge({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position} rotation={[0.1, 0.2, 0.05]}>
      <mesh castShadow>
        <boxGeometry args={[0.22, 0.3, 0.06]} />
        <meshToonMaterial color={color} {...toonProps} />
      </mesh>
      <mesh position={[0, 0.02, 0.032]}>
        <boxGeometry args={[0.16, 0.14, 0.01]} />
        <meshToonMaterial color="#1a1a22" {...toonProps} />
      </mesh>
      <mesh position={[0, -0.08, 0.032]}>
        <boxGeometry args={[0.14, 0.04, 0.01]} />
        <meshStandardMaterial color={retro.crtAmber} emissive="#78350f" emissiveIntensity={0.4} flatShading />
      </mesh>
    </group>
  )
}

export function RetroProps() {
  return (
    <group>
      <group position={RETRO_ARCADE_POS} rotation={[0, 0.25, 0]}>
        <KenneyProp model="arcade-machine" scale={0.72} />
        <ArcadeGlow />
      </group>
      <KenneyProp model="pinball" position={RETRO_PINBALL_POS} rotation={[0, 0.4, 0]} scale={0.4} />
      <KenneyProp model="air-hockey" position={RETRO_AIR_HOCKEY_POS} rotation={[0, -0.12, 0]} scale={0.52} />
      <Cartridge position={CARTRIDGE_POSITIONS[0]} color={retro.gcPink} />
      <Cartridge position={CARTRIDGE_POSITIONS[1]} color={retro.gcMint} />
    </group>
  )
}
