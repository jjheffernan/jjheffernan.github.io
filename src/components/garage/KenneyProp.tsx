import { useGLTF, useTexture } from '@react-three/drei'
import { useMemo } from 'react'
import * as THREE from 'three'
import { KENNEY_MODELS, type KenneyModelId } from './kenneyModels'

const ATLAS_URLS = [
  '/models/kenney/Textures/colormap.png',
  '/models/kenney/Textures/planks.png',
  '/models/kenney/Textures/signs.png',
]

const ATLAS_BY_MATERIAL: Record<string, number> = {
  colormap: 0,
  planks: 1,
  signs: 2,
}

function applyKenneyMaterials(root: THREE.Object3D, atlases: THREE.Texture[], castShadow: boolean) {
  for (const atlas of atlases) {
    atlas.colorSpace = THREE.SRGBColorSpace
    atlas.needsUpdate = true
  }

  root.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return

    if (castShadow) {
      child.castShadow = true
      child.receiveShadow = true
    }

    const materials = Array.isArray(child.material) ? child.material : [child.material]
    for (const material of materials) {
      const atlasIndex = ATLAS_BY_MATERIAL[material.name]
      if (atlasIndex !== undefined) {
        material.map = atlases[atlasIndex]
        material.needsUpdate = true
      } else if ('map' in material && material.map instanceof THREE.Texture) {
        material.map.colorSpace = THREE.SRGBColorSpace
        material.needsUpdate = true
      }
    }
  })
}

type KenneyPropProps = {
  model: KenneyModelId
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number | [number, number, number]
  castShadow?: boolean
}

export function KenneyProp({
  model,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  castShadow = true,
}: KenneyPropProps) {
  const url = KENNEY_MODELS[model]
  const { scene } = useGLTF(url)
  const atlases = useTexture(ATLAS_URLS) as THREE.Texture[]

  const clone = useMemo(() => {
    const next = scene.clone(true)
    applyKenneyMaterials(next, atlases, castShadow)
    return next
  }, [scene, atlases, castShadow])

  const s = Array.isArray(scale) ? scale : [scale, scale, scale]

  return <primitive object={clone} position={position} rotation={rotation} scale={s} />
}

for (const atlasUrl of ATLAS_URLS) {
  useTexture.preload(atlasUrl)
}

for (const url of Object.values(KENNEY_MODELS)) {
  useGLTF.preload(url)
}
