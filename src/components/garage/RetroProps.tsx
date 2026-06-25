import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { KenneyProp } from './KenneyProp'
import { retro, toonProps } from './retroMaterials'
import type { Mesh, MeshStandardMaterial } from 'three'

function ArcadeGlow() {
  const screen = useRef<Mesh>(null)

  useFrame((state) => {
    if (!screen.current) return
    const mat = screen.current.material as MeshStandardMaterial
    mat.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2.2) * 0.12
  })

  return (
    <mesh ref={screen} position={[0, 0.58, 0.2]} rotation={[0, 0, 0]}>
      <planeGeometry args={[0.2, 0.16]} />
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
      <group position={[-2.85, 0, 1.05]} rotation={[0, 0.32, 0]}>
        <KenneyProp model="arcade-machine" scale={0.88} />
        <ArcadeGlow />
      </group>
      <KenneyProp model="pinball" position={[-4.65, 0, 0.5]} rotation={[0, 0.55, 0]} scale={0.48} />
      <KenneyProp model="air-hockey" position={[-1.35, 0, 1.28]} rotation={[0, -0.18, 0]} scale={0.62} />
      <Cartridge position={[0.38, 0.04, 1.12]} color={retro.gcPink} />
      <Cartridge position={[0.58, 0.04, 0.98]} color={retro.gcMint} />
    </group>
  )
}
