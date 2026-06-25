import { Canvas } from '@react-three/fiber'
import { Scene } from './Scene'

export function Experience() {
  return (
    <div className="canvas-root">
      <Canvas
        camera={{ position: [0, 1.45, 3.35], fov: 52 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        shadows
      >
        <color attach="background" args={['#1a1030']} />
        <fog attach="fog" args={['#1a1030', 10, 28]} />
        <Scene />
      </Canvas>
    </div>
  )
}
