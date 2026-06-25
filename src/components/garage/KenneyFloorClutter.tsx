import { KenneyProp } from './KenneyProp'

/** Garage-floor props from Kenney Retro Urban Kit (CC0). */
export function KenneyFloorClutter() {
  return (
    <group>
      <KenneyProp model="pallet" position={[-5.4, 0, 2.1]} rotation={[0, 0.55, 0]} scale={1.15} />
      <KenneyProp model="planks" position={[5.8, 0, 1.6]} rotation={[0, -0.35, 0]} scale={1.1} />
      <KenneyProp model="detail-cables-type-a" position={[-4.2, 0.02, -1.8]} rotation={[0, 1.1, 0]} scale={1.4} />
      <KenneyProp model="detail-cables-type-a" position={[3.6, 0.02, 2.4]} rotation={[0, -0.7, 0]} scale={1.2} />
    </group>
  )
}
