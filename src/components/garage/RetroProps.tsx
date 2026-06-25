/**
 * Procedural low-poly retro props (GameCube / arcade era).
 * Kenney CC0 kits (mini-arcade, retro-urban) are a good drop-in upgrade path.
 */
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { retro, toonProps } from './retroMaterials'
import type { Mesh, MeshStandardMaterial } from 'three'

function ArcadeCabinet({ position }: { position: [number, number, number] }) {
  const screen = useRef<Mesh>(null)

  useFrame((state) => {
    if (!screen.current) return
    const mat = screen.current.material as MeshStandardMaterial
    mat.emissiveIntensity = 0.55 + Math.sin(state.clock.elapsedTime * 2.2) * 0.12
  })

  return (
    <group position={position} rotation={[0, 0.35, 0]}>
      <mesh castShadow position={[0, 0.42, 0]}>
        <boxGeometry args={[0.38, 0.84, 0.32]} />
        <meshToonMaterial color={retro.gcPurpleDark} {...toonProps} />
      </mesh>
      <mesh position={[0, 0.72, 0.17]}>
        <boxGeometry args={[0.34, 0.12, 0.04]} />
        <meshToonMaterial color={retro.gcOrange} emissive="#b45309" emissiveIntensity={0.35} {...toonProps} />
      </mesh>
      <mesh ref={screen} position={[0, 0.52, 0.165]}>
        <planeGeometry args={[0.28, 0.22]} />
        <meshStandardMaterial
          color={retro.crtGreen}
          emissive="#134e2a"
          emissiveIntensity={0.55}
          flatShading
        />
      </mesh>
      <mesh position={[0, 0.08, 0.14]} rotation={[0.45, 0, 0]}>
        <boxGeometry args={[0.3, 0.04, 0.14]} />
        <meshToonMaterial color="#1a1a22" {...toonProps} />
      </mesh>
    </group>
  )
}

function GameCubeUnit({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, -0.5, 0]}>
      <mesh castShadow>
        <boxGeometry args={[0.28, 0.28, 0.28]} />
        <meshToonMaterial color={retro.gcPurple} {...toonProps} />
      </mesh>
      <mesh position={[0, 0, 0.145]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 6]} />
        <meshToonMaterial color={retro.plastic} {...toonProps} />
      </mesh>
      <mesh position={[0.1, 0.1, 0.145]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.04, 0.04, 0.02]} />
        <meshToonMaterial color={retro.gcIndigo} emissive="#312e81" emissiveIntensity={0.25} {...toonProps} />
      </mesh>
    </group>
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
      <ArcadeCabinet position={[-2.1, 0.02, 0.85]} />
      <GameCubeUnit position={[-1.35, 0.16, 0.55]} />
      <Cartridge position={[-0.55, 0.04, 0.75]} color={retro.gcPink} />
      <Cartridge position={[-0.35, 0.04, 0.62]} color={retro.gcMint} />
    </group>
  )
}
