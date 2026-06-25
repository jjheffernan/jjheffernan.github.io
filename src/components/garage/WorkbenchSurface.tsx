import { garage } from './materials'

type MatProps = {
  position: [number, number, number]
  size: [number, number]
  rotationY?: number
  color?: string
}

function CuttingMat({ position, size, rotationY = 0, color = '#1a3d32' }: MatProps) {
  const [w, d] = size
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]} receiveShadow>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial color={color} roughness={0.92} metalness={0.02} />
      </mesh>
      {/* grid lines */}
      {Array.from({ length: Math.floor(w / 0.2) + 1 }, (_, i) => {
        const x = -w / 2 + i * 0.2
        return (
          <mesh key={`gx-${i}`} position={[x, 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.008, d]} />
            <meshBasicMaterial color="#2d5a48" transparent opacity={0.35} />
          </mesh>
        )
      })}
      {Array.from({ length: Math.floor(d / 0.2) + 1 }, (_, i) => {
        const z = -d / 2 + i * 0.2
        return (
          <mesh key={`gz-${i}`} position={[0, 0.004, z]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[w, 0.008]} />
            <meshBasicMaterial color="#2d5a48" transparent opacity={0.35} />
          </mesh>
        )
      })}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <planeGeometry args={[w + 0.04, d + 0.04]} />
        <meshBasicMaterial color="#0f2922" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

type PaperProps = {
  position: [number, number, number]
  size: [number, number]
  rotation?: [number, number, number]
  color?: string
}

function PaperSheet({ position, size, rotation = [0, 0, 0], color = '#f0ebe0' }: PaperProps) {
  const [w, d] = size
  return (
    <mesh position={position} rotation={rotation} receiveShadow>
      <boxGeometry args={[w, 0.004, d]} />
      <meshStandardMaterial color={color} roughness={0.95} metalness={0} />
    </mesh>
  )
}

/** Cutting mats, papers, and bench-surface dressing for visual texture */
export function WorkbenchSurface() {
  return (
    <group>
      <CuttingMat position={[-1.2, 0.025, 0.35]} size={[1.35, 0.95]} rotationY={0.06} />
      <CuttingMat position={[2.6, 0.025, 0.05]} size={[1.15, 0.8]} rotationY={-0.12} color="#1e4538" />
      <CuttingMat position={[-3.2, 0.025, 0.85]} size={[0.9, 0.65]} rotationY={0.22} color="#224a3c" />

      <PaperSheet position={[-2.1, 0.028, 0.72]} size={[0.32, 0.42]} rotation={[-0.02, 0.35, 0.04]} />
      <PaperSheet position={[-2.35, 0.031, 0.58]} size={[0.28, 0.36]} rotation={[-0.01, 0.5, -0.06]} color="#e8e2d6" />
      <PaperSheet position={[1.35, 0.028, 0.88]} size={[0.38, 0.5]} rotation={[0, -0.25, 0.03]} />
      <PaperSheet position={[3.8, 0.028, -0.05]} size={[0.3, 0.4]} rotation={[0.02, 0.15, -0.05]} color="#f5f0e8" />
      <PaperSheet position={[4.2, 0.032, 0.22]} size={[0.25, 0.32]} rotation={[0.01, -0.4, 0.08]} color="#ebe5d9" />

      {/* folded blueprint stack */}
      <group position={[0.95, 0.026, 0.92]} rotation={[0, -0.18, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[0.42, 0.012, 0.55]} />
          <meshStandardMaterial color="#2c5282" roughness={0.88} />
        </mesh>
        <mesh position={[0.02, 0.008, 0.03]} receiveShadow>
          <boxGeometry args={[0.38, 0.008, 0.48]} />
          <meshStandardMaterial color="#f7f4ed" roughness={0.94} />
        </mesh>
        <mesh position={[-0.01, 0.014, -0.02]} receiveShadow>
          <boxGeometry args={[0.4, 0.006, 0.5]} />
          <meshStandardMaterial color="#e8edf5" roughness={0.92} />
        </mesh>
      </group>

      {/* stained wear patch on bare wood */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.5, 0.002, -0.35]} receiveShadow>
        <circleGeometry args={[0.45, 24]} />
        <meshStandardMaterial color={garage.woodDark} roughness={0.96} transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.5, 0.002, 0.55]} receiveShadow>
        <circleGeometry args={[0.35, 24]} />
        <meshStandardMaterial color="#5c422f" roughness={0.97} transparent opacity={0.18} />
      </mesh>
    </group>
  )
}
