export const KENNEY_MODELS = {
  'arcade-machine': '/models/kenney/arcade-machine.glb',
  pinball: '/models/kenney/pinball.glb',
  'air-hockey': '/models/kenney/air-hockey.glb',
  laptop: '/models/kenney/laptop.glb',
  computerScreen: '/models/kenney/computerScreen.glb',
  computerKeyboard: '/models/kenney/computerKeyboard.glb',
  computerMouse: '/models/kenney/computerMouse.glb',
  lampRoundTable: '/models/kenney/lampRoundTable.glb',
  speaker: '/models/kenney/speaker.glb',
  speakerSmall: '/models/kenney/speakerSmall.glb',
  pallet: '/models/kenney/pallet.glb',
  planks: '/models/kenney/planks.glb',
  'detail-cables-type-a': '/models/kenney/detail-cables-type-a.glb',
} as const

export type KenneyModelId = keyof typeof KENNEY_MODELS
