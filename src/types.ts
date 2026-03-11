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
  modularPointCount?: number
  modularMultiplier?: number
  modularRadius?: number
}
