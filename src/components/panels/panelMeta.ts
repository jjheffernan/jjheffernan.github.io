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

/** Pegboard face ~z -3.48; panels hang on lower rows so camera sees them above the bench */
export const WALL_PANELS: WallPanelMeta[] = [
  {
    id: 'hero',
    label: 'Home',
    seg: 'BOOT',
    accent: '#ffaa00',
    position: [-2.65, 1.72, -3.4],
    rotation: [0, 0, -0.06],
    width: 1.05,
    height: 0.68,
  },
  {
    id: 'about',
    label: 'About',
    seg: '01',
    accent: '#8b7cf8',
    position: [-0.85, 1.58, -3.4],
    rotation: [0, 0, 0.04],
    width: 0.95,
    height: 0.62,
  },
  {
    id: 'work',
    label: 'Work',
    seg: '02',
    accent: '#33ff66',
    position: [0.9, 1.65, -3.4],
    rotation: [0, 0, -0.03],
    width: 1.0,
    height: 0.65,
  },
  {
    id: 'links',
    label: 'Links',
    seg: '03',
    accent: '#f472b6',
    position: [2.7, 1.55, -3.4],
    rotation: [0, 0, 0.07],
    width: 0.95,
    height: 0.62,
  },
]
