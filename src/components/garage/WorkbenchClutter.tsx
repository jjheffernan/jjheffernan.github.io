import { garage } from './materials'

type ClutterItem = {
  position: [number, number, number]
  rotation?: [number, number, number]
  type: 'mug' | 'cable' | 'wrench' | 'filament' | 'multimeter' | 'part' | 'spray' | 'helmet' | 'solder' | 'pliers'
  scale?: number
}

const clutter: ClutterItem[] = [
  { position: [-5.8, 0.08, 0.9], type: 'mug' },
  { position: [-4.6, 0.06, -0.8], type: 'cable', rotation: [0, 0.8, 0] },
  { position: [-3.8, 0.05, 1.2], type: 'wrench', rotation: [0, -0.4, Math.PI / 2] },
  { position: [3.2, 0.1, 1.1], type: 'filament' },
  { position: [4.8, 0.08, -0.5], type: 'multimeter', rotation: [0, -0.6, 0] },
  { position: [5.6, 0.06, 0.7], type: 'spray' },
  { position: [-2.8, 0.07, -1.3], type: 'part', rotation: [0.2, 0.5, 0] },
  { position: [2.5, 0.05, -1.4], type: 'cable', rotation: [0, -1.2, 0] },
  { position: [0.8, 0.06, 1.35], type: 'solder' },
  { position: [-1.2, 0.05, 0.95], type: 'pliers', rotation: [0, 0.3, 0] },
  { position: [6.2, 0.55, -2.2], type: 'helmet', rotation: [0, -0.5, 0] },
  { position: [-6.5, 0.06, -1.1], type: 'part', rotation: [0, 1.1, 0.1] },
  { position: [4.2, 0.07, 0.2], type: 'wrench', rotation: [Math.PI, 0.2, Math.PI / 2] },
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
      {item.type === 'helmet' && (
        <mesh>
          <sphereGeometry args={[0.38, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.8]} />
          <meshStandardMaterial color="#f6e05e" roughness={0.55} metalness={0.1} />
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
      {/* scattered screws */}
      {Array.from({ length: 18 }, (_, i) => (
        <mesh
          key={`screw-${i}`}
          position={[
            -6 + Math.sin(i * 2.1) * 5.5,
            0.01,
            -1.2 + Math.cos(i * 1.7) * 2.2,
          ]}
          rotation={[Math.PI / 2, i * 0.7, 0]}
        >
          <cylinderGeometry args={[0.012, 0.012, 0.025, 6]} />
          <meshStandardMaterial color={garage.metal} metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  )
}
