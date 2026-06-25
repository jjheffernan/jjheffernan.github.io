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

/** Furniture kit ships flat vertex colors — boost PBR so props read as metal/plastic, not greybox. */
const FURNITURE_MATERIALS: Record<string, { color: string; metalness: number; roughness: number }> = {
  metalDark: { color: '#3a5050', metalness: 0.52, roughness: 0.42 },
  metal: { color: '#d0e4ec', metalness: 0.72, roughness: 0.28 },
  metalMedium: { color: '#4d6565', metalness: 0.58, roughness: 0.36 },
  wood: { color: '#9a7048', metalness: 0.05, roughness: 0.78 },
  lamp: { color: '#ffe8b0', metalness: 0.08, roughness: 0.45 },
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
    const next = materials.map((material) => {
      const cloned = material.clone()
      const atlasIndex = ATLAS_BY_MATERIAL[cloned.name]

      if (atlasIndex !== undefined) {
        cloned.map = atlases[atlasIndex]
      } else if ('map' in cloned && cloned.map instanceof THREE.Texture) {
        cloned.map.colorSpace = THREE.SRGBColorSpace
      } else {
        const furniture = FURNITURE_MATERIALS[cloned.name]
        if (furniture) {
          cloned.color.set(furniture.color)
          cloned.metalness = furniture.metalness
          cloned.roughness = furniture.roughness
        }
      }

      cloned.needsUpdate = true
      return cloned
    })

    child.material = next.length === 1 ? next[0] : next
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
