import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { usePanel } from '../context/PanelContext'

const benchTarget = new THREE.Vector3(0, 0.95, -1.8)
const wallTarget = new THREE.Vector3(0, 1.62, -3.38)
const benchPos = new THREE.Vector3(0, 1.45, 3.35)
const wallPos = new THREE.Vector3(0, 1.55, 2.15)

export function CameraRig() {
  const { camera } = useThree()
  const { activePanel } = usePanel()
  const currentPos = useRef(new THREE.Vector3().copy(benchPos))
  const currentTarget = useRef(new THREE.Vector3().copy(benchTarget))

  useFrame((state, delta) => {
    const focused = activePanel !== null
    const goalPos = focused ? wallPos.clone() : benchPos.clone()
    const goalTarget = focused ? wallTarget.clone() : benchTarget.clone()

    if (!focused) {
      const sway = Math.sin(state.clock.elapsedTime * 0.2) * 0.08
      goalPos.x += sway
    }

    const lerp = 1 - Math.exp(-4.5 * delta)
    currentPos.current.lerp(goalPos, lerp)
    currentTarget.current.lerp(goalTarget, lerp)

    camera.position.copy(currentPos.current)
    camera.lookAt(currentTarget.current)
  })

  return null
}
