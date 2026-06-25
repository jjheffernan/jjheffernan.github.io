import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { usePanel } from '../context/PanelContext'
import { useCamera } from '../context/CameraContext'

/** Rest pose — camera faces the desk from the front of the bench */
const baseCam = new THREE.Vector3(0, 1.2, 3.23)
const baseLook = new THREE.Vector3(0, 1.15, -0.92)
/** Lateral half-step per pan (world units at sin(angle) = 1) */
const PEEK_STEP = 0.48

const wallPivot = new THREE.Vector3(0, 1.45, -3.35)
const baseWallCamOffset = new THREE.Vector3(0, -0.1, 2.1)
const baseWallTargetOffset = new THREE.Vector3(0, 0.1, 0)

const baseLookDir = new THREE.Vector3().subVectors(baseLook, baseCam)

function rotateYDir(dir: THREE.Vector3, angle: number, out: THREE.Vector3) {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  out.set(dir.x * cos + dir.z * sin, dir.y, -dir.x * sin + dir.z * cos)
  return out
}

function rotateYOffset(offset: THREE.Vector3, angle: number, out: THREE.Vector3) {
  const cos = Math.cos(angle)
  const sin = Math.sin(angle)
  out.set(
    offset.x * cos + offset.z * sin,
    offset.y,
    -offset.x * sin + offset.z * cos,
  )
  return out
}

export function CameraRig() {
  const { camera } = useThree()
  const { activePanel } = usePanel()
  const { panAngle } = useCamera()
  const currentPos = useRef(new THREE.Vector3())
  const currentTarget = useRef(new THREE.Vector3())
  const goalPos = useRef(new THREE.Vector3())
  const goalTarget = useRef(new THREE.Vector3())
  const rotatedDir = useRef(new THREE.Vector3())
  const rotatedOffset = useRef(new THREE.Vector3())
  const initialized = useRef(false)

  useFrame((state, delta) => {
    const focused = activePanel !== null
    const angle = focused ? 0 : panAngle

    if (focused) {
      rotateYOffset(baseWallCamOffset, 0, rotatedOffset.current)
      goalPos.current.copy(wallPivot).add(rotatedOffset.current)
      rotateYOffset(baseWallTargetOffset, 0, rotatedOffset.current)
      goalTarget.current.copy(wallPivot).add(rotatedOffset.current)
    } else {
      const sin = Math.sin(angle)

      // Half-step sideways in the turn direction, then yaw about camera position
      goalPos.current.set(baseCam.x + sin * PEEK_STEP, baseCam.y, baseCam.z)
      goalPos.current.x += Math.sin(state.clock.elapsedTime * 0.2) * 0.03

      rotateYDir(baseLookDir, angle, rotatedDir.current)
      goalTarget.current.copy(goalPos.current).add(rotatedDir.current)
    }

    if (!initialized.current) {
      currentPos.current.copy(goalPos.current)
      currentTarget.current.copy(goalTarget.current)
      initialized.current = true
    }

    const lerp = 1 - Math.exp(-4.5 * delta)
    currentPos.current.lerp(goalPos.current, lerp)
    currentTarget.current.lerp(goalTarget.current, lerp)

    camera.position.copy(currentPos.current)
    camera.lookAt(currentTarget.current)
  })

  return null
}
