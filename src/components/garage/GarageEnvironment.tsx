import { garage } from './materials'

function PegboardTool({
  position,
  rotation = [0, 0, 0] as [number, number, number],
  color = garage.metal,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  color?: string
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.08, 0.5, 0.08]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.32, 0]}>
        <boxGeometry args={[0.14, 0.06, 0.06]} />
        <meshStandardMaterial color={garage.metalDark} metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  )
}

export function GarageEnvironment() {
  return (
    <group>
      {/* concrete floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.12, 0]} receiveShadow>
        <planeGeometry args={[28, 22]} />
        <meshStandardMaterial color={garage.concrete} roughness={0.95} metalness={0.05} />
      </mesh>

      {/* oil stain */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4, -1.1, 2.5]}>
        <circleGeometry args={[1.1, 32]} />
        <meshStandardMaterial color="#1f1a16" transparent opacity={0.55} roughness={1} />
      </mesh>

      {/* back + side walls */}
      <mesh position={[0, 2.2, -3.6]} receiveShadow>
        <boxGeometry args={[16, 5.5, 0.2]} />
        <meshStandardMaterial color={garage.wall} roughness={0.92} />
      </mesh>
      <mesh position={[-7.5, 2.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[8, 5.5, 0.2]} />
        <meshStandardMaterial color={garage.wall} roughness={0.92} />
      </mesh>
      <mesh position={[7.5, 2.2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[8, 5.5, 0.2]} />
        <meshStandardMaterial color="#322c28" roughness={0.92} />
      </mesh>

      {/* pegboard */}
      <mesh position={[0, 2.5, -3.48]}>
        <boxGeometry args={[11, 3.2, 0.06]} />
        <meshStandardMaterial color={garage.pegboard} roughness={0.98} />
      </mesh>
      {[-4, -2.5, -1, 0.5, 2, 3.5].map((x, i) => (
        <PegboardTool
          key={x}
          position={[x, 1.6 + (i % 2) * 0.9, -3.38]}
          rotation={[0, 0, (i - 2) * 0.15]}
          color={i % 2 === 0 ? garage.metal : '#8b3a2a'}
        />
      ))}

      {/* overhead shelf */}
      <group position={[-5.5, 3.6, -2.8]}>
        <mesh>
          <boxGeometry args={[3.5, 0.1, 0.8]} />
          <meshStandardMaterial color={garage.woodDark} roughness={0.85} />
        </mesh>
        {[-1.2, 0, 1.2].map((x, i) => (
          <mesh key={x} position={[x, 0.35, 0]}>
            <boxGeometry args={[0.9, 0.55, 0.65]} />
            <meshStandardMaterial color={['#4a5568', '#744210', '#2d4a3e'][i]} roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* fluorescent fixtures */}
      {[-3.5, 1.5].map((x) => (
        <group key={x} position={[x, 4.3, -1.2]}>
          <mesh>
            <boxGeometry args={[2.8, 0.12, 0.55]} />
            <meshStandardMaterial color="#e8f4ff" emissive="#a8c8e8" emissiveIntensity={1.8} />
          </mesh>
          <pointLight position={[0, -0.3, 0.8]} intensity={28} color={garage.lamp} distance={14} decay={2} />
        </group>
      ))}

      {/* workbench frame */}
      <group position={[0, -0.52, 0]}>
        <mesh position={[0, 0.58, 0]} castShadow receiveShadow>
          <boxGeometry args={[13.5, 0.14, 3.4]} />
          <meshStandardMaterial
            color={garage.wood}
            emissive="#3d2b1f"
            emissiveIntensity={0.15}
            roughness={0.82}
            metalness={0.02}
          />
        </mesh>
        {/* worn edge */}
        <mesh position={[0, 0.66, 1.62]}>
          <boxGeometry args={[13.2, 0.04, 0.08]} />
          <meshStandardMaterial color={garage.woodDark} roughness={0.9} />
        </mesh>
        {[
          [-6.2, -3.5],
          [6.2, -3.5],
          [-6.2, 3.5],
          [6.2, 3.5],
        ].map(([x, z]) => (
          <mesh key={`${x}-${z}`} position={[x, 0.15, z]} castShadow>
            <boxGeometry args={[0.14, 0.86, 0.14]} />
            <meshStandardMaterial color={garage.metalDark} metalness={0.6} roughness={0.45} />
          </mesh>
        ))}
        {/* lower shelf */}
        <mesh position={[0, -0.05, 0]}>
          <boxGeometry args={[12, 0.08, 2.8]} />
          <meshStandardMaterial color={garage.woodDark} roughness={0.9} />
        </mesh>
      </group>

      {/* rolling stool */}
      <group position={[5.5, -0.75, 1.8]}>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.08, 20]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.7} />
        </mesh>
        <mesh>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 8]} />
          <meshStandardMaterial color={garage.metal} metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* garage door hint */}
      <mesh position={[0, 2.8, 4.5]}>
        <boxGeometry args={[12, 5, 0.12]} />
        <meshStandardMaterial color="#4a4540" roughness={0.85} metalness={0.15} />
      </mesh>
      {[-4, -2, 0, 2, 4].map((x) => (
        <mesh key={x} position={[x, 2.8, 4.58]}>
          <boxGeometry args={[0.06, 4.5, 0.04]} />
          <meshStandardMaterial color={garage.metalDark} metalness={0.7} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}
