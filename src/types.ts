export interface FormulaDefinition {
  id: string
  name: {
    en: string
    'zh-CN': string
  }
  formulaText: {
    en: string
    'zh-CN': string
  }
  tMin: number
  tMax: number
  step: number
  scale: number
  stroke?: string
  sampler: (t: number, config?: MathBeautyProps) => { x: number, y: number }
}

export interface MathBeautyProps {
  className?: string
  debug?: boolean
  lang?: 'zh-CN' | 'en'
  effectIndex?: number
  animationSpeed?: number
  lineWidth?: number
  lineColor?: string
  axisRange?: number
  gridDensity?: number
  showGrid?: boolean
  showAxis?: boolean
  showTrail?: boolean
  trailAlpha?: number
  presetLock?: boolean
  lockOnComplete?: boolean
  modularPointCount?: number
  modularMultiplier?: number
  modularRadius?: number
  fermatR2Turns?: number
  fermatR2Scale?: number
  implicitRange?: number
  implicitStep?: number
  implicitWaveMix?: number
  implicitSingularityGuard?: number
  implicitCrossMix?: number
  implicitExpMix?: number
  implicitNestedMix?: number
  implicitGcdScale?: number
  implicitBias?: number
  implicitParabolaTarget?: number
  logSpiralGrowth?: number
  logSpiralFrequency?: number
  logSpiralScale?: number
  fermatSpiralScale?: number
  fermatSpiralTwist?: number
  cardioidScale?: number
  cardioidDistortion?: number
  limaconLoopScale?: number
  limaconOffset?: number
  bloomFrequency1?: number
  bloomFrequency2?: number
  starRosePetalCount?: number
  starRoseRadius?: number
  butterflyVariationWave?: number
  butterflyVariationExponent?: number
  ribbonOrbitAmplitude?: number
  ribbonOrbitBaseRadius?: number
  flowerWebAmplitude?: number
  flowerWebFrequency?: number
  petalChainAmplitude?: number
  petalChainFrequency?: number
  tanCotBurstScale?: number
  tanCotBurstFrequency?: number
  tanCotBurstHole?: number
  tanCotBurstCross?: number
  tanCotBurstClamp?: number
  heartDepth?: number
  heartWidth?: number
  doubleHeartOffset?: number
  doubleHeartBlend?: number
  trochoidRatio?: number
  trochoidOffset?: number
  trochoidPhase?: number
  juliaCRe?: number
  juliaCIm?: number
  mandelbrotBandWidth?: number
  barnsleyProbabilityJitter?: number
  chaosMode?: 'trace' | 'particles'
  chaosSystem?: 'lorenz' | 'rossler' | 'aizawa'
  chaosSteps?: number
  chaosDt?: number
  chaosScale?: number
  chaosParticleCount?: number
  chaosPhaseSpread?: number
}
