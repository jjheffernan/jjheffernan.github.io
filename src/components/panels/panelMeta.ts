import type { PanelId } from '../../context/PanelContext'

export type WallPanelMeta = {
  id: PanelId
  label: string
  seg: string
  accent: string
  position: [number, number, number]
  rotation: [number, number, number]
  width: number
  height: number
}

type BasePanel = WallPanelMeta

const BASE_PANELS: BasePanel[] = [
  {
    id: 'hero',
    label: 'Home',
    seg: 'BOOT',
    accent: '#ffaa00',
    position: [-2.65, 1.68, -3.41],
    rotation: [0.06, 0, -0.06],
    width: 1.05,
    height: 0.7,
  },
  {
    id: 'about',
    label: 'About',
    seg: '01',
    accent: '#8b7cf8',
    position: [-0.82, 1.55, -3.41],
    rotation: [0.06, 0, 0.05],
    width: 0.98,
    height: 0.64,
  },
  {
    id: 'work',
    label: 'Work',
    seg: '02',
    accent: '#33ff66',
    position: [0.88, 1.62, -3.41],
    rotation: [0.06, 0, -0.04],
    width: 1.02,
    height: 0.66,
  },
  {
    id: 'links',
    label: 'Links',
    seg: '03',
    accent: '#f472b6',
    position: [2.72, 1.52, -3.41],
    rotation: [0.06, 0, 0.07],
    width: 0.96,
    height: 0.63,
  },
]

function seededRandom(seed: string) {
  let state = 0
  for (let i = 0; i < seed.length; i += 1) {
    state = (state << 5) - state + seed.charCodeAt(i)
    state |= 0
  }
  return () => {
    state = (state * 1664525 + 1013904223) | 0
    return (state >>> 0) / 0xffffffff
  }
}

function jitterPanel(panel: BasePanel): WallPanelMeta {
  const rand = seededRandom(panel.id)
  const xJitter = (rand() - 0.5) * 0.38
  const yJitter = (rand() - 0.5) * 0.22
  const zJitter = (rand() - 0.5) * 0.04
  const tiltJitter = (rand() - 0.5) * 0.14
  const sizeScale = 0.9 + rand() * 0.22

  return {
    ...panel,
    position: [
      panel.position[0] + xJitter,
      panel.position[1] + yJitter,
      panel.position[2] + zJitter,
    ],
    rotation: [
      panel.rotation[0] + (rand() - 0.5) * 0.05,
      panel.rotation[1],
      panel.rotation[2] + tiltJitter,
    ],
    width: panel.width * sizeScale,
    height: panel.height * (0.92 + rand() * 0.18),
  }
}

export const WALL_PANELS: WallPanelMeta[] = BASE_PANELS.map(jitterPanel)
