/** Bench surface spans roughly x ±6.75, z −1.7 (wall) to +1.7 (camera). */

/** Center-back: laptop + monitor desk row */
export const DEV_STATION_POS: [number, number, number] = [0, 0.02, -1.12]

/**
 * Parts bins — L formation on camera-left periphery (away from bench center).
 * Short leg: Front End + Back End doubled up (widthwise).
 * Long leg: Data, Mechanical, Tools (depthwise).
 */
export const PARTS_BIN_BY_ID: Record<string, [number, number, number]> = {
  frontend: [-5.85, 0.02, -1.05],
  backend: [-4.88, 0.02, -1.05],
  data: [-5.85, 0.02, -0.22],
  mechanical: [-5.85, 0.02, 0.52],
  tools: [-5.85, 0.02, 1.26],
}

/** @deprecated use PARTS_BIN_BY_ID — kept for index fallback */
export const PARTS_BIN_POSITIONS: [number, number, number][] = Object.values(PARTS_BIN_BY_ID)

/** 2×2 project artifacts — right-rear, wider spacing on camera-right (+X) */
export const PROJECT_POSITIONS: Array<[number, number, number, number]> = [
  [2.15, 0.02, -0.42, 0.2],
  [3.45, 0.02, -0.42, -0.15],
  [1.95, 0.02, 0.18, 0.35],
  [3.45, 0.02, 0.28, -0.25],
]

/** Retro arcade cluster — front-left periphery (no hover labels) */
export const RETRO_ARCADE_POS: [number, number, number] = [-2.45, 0, 1.35]
export const RETRO_PINBALL_POS: [number, number, number] = [-3.65, 0, 0.78]
export const RETRO_AIR_HOCKEY_POS: [number, number, number] = [-1.05, 0, 1.48]

/** Cartridges — front-right periphery */
export const CARTRIDGE_POSITIONS: [number, number, number][] = [
  [1.85, 0.04, 1.28],
  [2.02, 0.04, 1.12],
]
