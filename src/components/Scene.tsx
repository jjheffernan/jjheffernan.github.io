import { ContactShadows } from '@react-three/drei'
import { GarageEnvironment } from './garage/GarageEnvironment'
import { WorkbenchClutter } from './garage/WorkbenchClutter'
import { DevStation } from './garage/DevStation'
import { PartsBins } from './garage/PartsBins'
import { ProjectArtifacts } from './garage/ProjectArtifacts'
import { DustMotes } from './garage/DustMotes'
import { RetroProps } from './garage/RetroProps'
import { KenneyFloorClutter } from './garage/KenneyFloorClutter'
import { WallPanels } from './panels/WallPanels'
import { CameraRig } from './CameraRig'
import { BENCH_Y } from './garage/constants'

export function Scene() {
  return (
    <>
      <CameraRig />

      <ambientLight intensity={0.5} color="#c4b8ff" />
      <directionalLight position={[3, 6, 4]} intensity={1.15} color="#fff0e0" castShadow />
      <directionalLight position={[-4, 3, 2]} intensity={0.4} color="#8b7cf8" />
      <pointLight position={[0, 2.5, 1]} intensity={14} color="#ffb86c" distance={10} decay={2} />
      <hemisphereLight args={['#9d8cff', '#2a1838', 0.55]} />

      <GarageEnvironment />
      <KenneyFloorClutter />
      <WallPanels />

      <group position={[0, BENCH_Y, 0]}>
        <WorkbenchClutter />
        <RetroProps />
        <DevStation />
        <PartsBins />
        <ProjectArtifacts />
      </group>

      <ContactShadows position={[0, BENCH_Y + 0.01, 0]} opacity={0.5} scale={12} blur={2.5} far={2.5} />
      <DustMotes />
    </>
  )
}
