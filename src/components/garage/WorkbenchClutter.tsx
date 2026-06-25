import { garage } from './materials'

type ClutterItem = {
  position: [number, number, number]
  rotation?: [number, number, number]
  type: 'mug' | 'cable' | 'wrench' | 'filament' | 'multimeter' | 'part' | 'spray' | 'solder' | 'pliers'
  scale?: number
}

/** Perimeter clutter — pushed to outer bench bounds; labeled interactables stay inward */
const clutter: ClutterItem[] = [
  { position: [-6.25, 0.08, 0.82], type: 'mug' },
  { position: [-6.05, 0.06, -0.88], type: 'cable', rotation: [0, 0.8, 0] },
  { position: [-5.35, 0.05, 1.18], type: 'pliers', rotation: [0, 0.3, 0] },
  { position: [6.05, 0.1, 0.78], type: 'filament' },
  { position: [6.25, 0.08, -0.62], type: 'multimeter', rotation: [0, -0.6, 0] },
  { position: [5.55, 0.06, 1.18], type: 'spray' },
  { position: [-6.4, 0.07, -0.18], type: 'part', rotation: [0, 1.1, 0.1] },
  { position: [5.85, 0.05, -1.02], type: 'cable', rotation: [0, -1.2, 0] },
  { position: [2.05, 0.06, 1.42], type: 'solder' },
  { position: [6.15, 0.07, 0.18], type: 'wrench', rotation: [Math.PI, 0.2, Math.PI / 2] },
]

function ClutterMesh({ item }: { item: ClutterItem }) {
  const s = item.scale ?? 1
  const rot = item.rotation ?? [0, 0, 0]

  return (
    <group position={item.position} rotation={rot} scale={s}>
      {item.type === 'mug' && (
        <group>
          <mesh>
            <cylinderGeometry args={[0.14, 0.12, 0.28, 16]} />
            <meshStandardMaterial color="#2d3748" roughness={0.6} />
          </mesh>
          <mesh position={[0.14, 0.02, 0]}>
            <torusGeometry args={[0.08, 0.02, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#2d3748" />
          </mesh>
        </group>
      )}
      {item.type === 'cable' && (
        <mesh>
          <torusGeometry args={[0.22, 0.035, 8, 24, Math.PI * 1.4]} />
          <meshStandardMaterial color={garage.wire} roughness={0.8} />
        </mesh>
      )}
      {item.type === 'wrench' && (
        <mesh>
          <boxGeometry args={[0.55, 0.06, 0.12]} />
          <meshStandardMaterial color={garage.metal} metalness={0.85} roughness={0.25} />
        </mesh>
      )}
      {item.type === 'filament' && (
        <mesh>
          <cylinderGeometry args={[0.2, 0.2, 0.22, 20]} />
          <meshStandardMaterial color="#e53e3e" roughness={0.7} />
        </mesh>
      )}
      {item.type === 'multimeter' && (
        <group>
          <mesh>
            <boxGeometry args={[0.35, 0.12, 0.55]} />
            <meshStandardMaterial color="#c53030" roughness={0.55} />
          </mesh>
          <mesh position={[0, 0.07, 0.05]}>
            <boxGeometry args={[0.22, 0.02, 0.28]} />
            <meshStandardMaterial color="#1a202c" emissive="#2d3748" emissiveIntensity={0.3} />
          </mesh>
        </group>
      )}
      {item.type === 'spray' && (
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 0.32, 12]} />
          <meshStandardMaterial color="#ecc94b" metalness={0.4} roughness={0.5} />
        </mesh>
      )}
      {item.type === 'part' && (
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.1, 6]} />
          <meshStandardMaterial color={garage.metal} metalness={0.9} roughness={0.2} />
        </mesh>
      )}
      {item.type === 'solder' && (
        <group>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
            <meshStandardMaterial color={garage.solder} metalness={0.5} roughness={0.5} />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[0.08, 0.04, 0.12]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        </group>
      )}
      {item.type === 'pliers' && (
        <mesh>
          <boxGeometry args={[0.08, 0.04, 0.38]} />
          <meshStandardMaterial color="#c05621" metalness={0.6} roughness={0.35} />
        </mesh>
      )}
    </group>
  )
}

export function WorkbenchClutter() {
  return (
    <group>
      {clutter.map((item, i) => (
        <ClutterMesh key={i} item={item} />
      ))}
      {/* screws — far front-right corner */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh
          key={`screw-${i}`}
          position={[5.35 + (i % 5) * 0.22, 0.01, 1.18 + Math.floor(i / 5) * 0.18]}
          rotation={[Math.PI / 2, i * 0.7, 0]}
        >
          <cylinderGeometry args={[0.012, 0.012, 0.025, 6]} />
          <meshStandardMaterial color={garage.metal} metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}
