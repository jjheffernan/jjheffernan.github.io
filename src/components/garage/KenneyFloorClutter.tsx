import { KenneyProp } from './KenneyProp'

/** Garage-floor props — outer bounds only; labeled bench items stay inward */
export function KenneyFloorClutter() {
  return (
    <group>
      <KenneyProp model="pallet" position={[-6.1, 0, 2.25]} rotation={[0, 0.55, 0]} scale={1.15} />
      <KenneyProp model="planks" position={[6.45, 0, 1.72]} rotation={[0, -0.35, 0]} scale={1.1} />
      <KenneyProp model="detail-cables-type-a" position={[-5.15, 0.02, -1.92]} rotation={[0, 1.1, 0]} scale={1.4} />
      <KenneyProp model="detail-cables-type-a" position={[4.35, 0.02, 2.55]} rotation={[0, -0.7, 0]} scale={1.2} />
    </group>
  )
}
