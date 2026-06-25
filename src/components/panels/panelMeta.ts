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

/** Fixed pegboard layout — uniform size and rotation for consistent labels */
export const WALL_PANELS: WallPanelMeta[] = [
  {
    id: 'hero',
    label: 'Home',
    seg: 'BOOT',
    accent: '#ffaa00',
    position: [-2.7, 1.62, -3.41],
    rotation: [0, 0, 0],
    width: 1.0,
    height: 0.65,
  },
  {
    id: 'about',
    label: 'About',
    seg: '01',
    accent: '#8b7cf8',
    position: [-0.9, 1.62, -3.41],
    rotation: [0, 0, 0],
    width: 1.0,
    height: 0.65,
  },
  {
    id: 'work',
    label: 'Work',
    seg: '02',
    accent: '#33ff66',
    position: [0.9, 1.62, -3.41],
    rotation: [0, 0, 0],
    width: 1.0,
    height: 0.65,
  },
  {
    id: 'links',
    label: 'Links',
    seg: '03',
    accent: '#f472b6',
    position: [2.7, 1.62, -3.41],
    rotation: [0, 0, 0],
    width: 1.0,
    height: 0.65,
  },
]
