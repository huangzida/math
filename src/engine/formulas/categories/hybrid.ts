import type { FormulaDefinition } from '../../../types'
import { IMPLICIT_DRAW_POINTS, getImplicitPath } from '../runtime'

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const sampleImplicitPath = (effectId: string, t: number, config?: Parameters<typeof getImplicitPath>[1]) => {
  const path = getImplicitPath(effectId, config)
  const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
  return path[idx]
}

export const sineSquareLatticeFormula: FormulaDefinition = {
  id: 'sine-square-lattice',
  name: {
    en: 'Sin Square Lattice',
    'zh-CN': '正弦平方晶格',
  },
  formulaText: {
    en: 'sin(x²) = sin(y⁴)',
    'zh-CN': 'sin(x²) = sin(y⁴)',
  },
  tMin: 0,
  tMax: IMPLICIT_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#38bdf8',
  sampler: (t, config) => sampleImplicitPath('sine-square-lattice', t, config),
}

export const resonantImplicitWaveFormula: FormulaDefinition = {
  id: 'resonant-implicit-wave',
  name: {
    en: 'Resonant Implicit Wave',
    'zh-CN': '谐振隐式波',
  },
  formulaText: {
    en: 'y = x·sin(x²+y²)',
    'zh-CN': 'y = x·sin(x²+y²)',
  },
  tMin: 0,
  tMax: IMPLICIT_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#f43f5e',
  sampler: (t, config) => sampleImplicitPath('resonant-implicit-wave', t, config),
}

export const tanCotImplicitMazeFormula: FormulaDefinition = {
  id: 'tan-cot-implicit-maze',
  name: {
    en: 'Tan Cot Implicit Maze',
    'zh-CN': '正切余切迷宫',
  },
  formulaText: {
    en: 'tan(x²)tan(y²) = cot(xy)',
    'zh-CN': 'tan(x²)tan(y²) = cot(xy)',
  },
  tMin: 0,
  tMax: IMPLICIT_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#f59e0b',
  sampler: (t, config) => sampleImplicitPath('tan-cot-implicit-maze', t, config),
}

export const symmetricSineCrossFormula: FormulaDefinition = {
  id: 'symmetric-sine-cross',
  name: {
    en: 'Symmetric Sine Cross',
    'zh-CN': '对称正弦交叉',
  },
  formulaText: {
    en: 'y·sin(x²) = x·sin(y²)',
    'zh-CN': 'y·sin(x²) = x·sin(y²)',
  },
  tMin: 0,
  tMax: IMPLICIT_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#22d3ee',
  sampler: (t, config) => sampleImplicitPath('symmetric-sine-cross', t, config),
}

export const expTrigBalanceFormula: FormulaDefinition = {
  id: 'exp-trig-balance',
  name: {
    en: 'Exp Trig Balance',
    'zh-CN': '指数三角平衡',
  },
  formulaText: {
    en: '2sin(x)+cos(y) = exp(sin(xy))',
    'zh-CN': '2sin(x)+cos(y) = exp(sin(xy))',
  },
  tMin: 0,
  tMax: IMPLICIT_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#a78bfa',
  sampler: (t, config) => sampleImplicitPath('exp-trig-balance', t, config),
}

export const sinTanNexusFormula: FormulaDefinition = {
  id: 'sin-tan-nexus',
  name: {
    en: 'Sin Tan Nexus',
    'zh-CN': '正弦正切联结',
  },
  formulaText: {
    en: 'sin(x²+y²) = tan(sin(x+y))',
    'zh-CN': 'sin(x²+y²) = tan(sin(x+y))',
  },
  tMin: 0,
  tMax: IMPLICIT_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#fb7185',
  sampler: (t, config) => sampleImplicitPath('sin-tan-nexus', t, config),
}

export const nestedSineShearFormula: FormulaDefinition = {
  id: 'nested-sine-shear',
  name: {
    en: 'Nested Sine Shear',
    'zh-CN': '嵌套正弦剪切',
  },
  formulaText: {
    en: 'y = x·sin(sin(x)/sin(y))',
    'zh-CN': 'y = x·sin(sin(x)/sin(y))',
  },
  tMin: 0,
  tMax: IMPLICIT_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#f472b6',
  sampler: (t, config) => sampleImplicitPath('nested-sine-shear', t, config),
}

export const gcdCosInterferenceFormula: FormulaDefinition = {
  id: 'gcd-cos-interference',
  name: {
    en: 'GCD Cos Interference',
    'zh-CN': 'gcd 余弦干涉',
  },
  formulaText: {
    en: 'sin(gcd(x,y)) = cos(xy)',
    'zh-CN': 'sin(gcd(x,y)) = cos(xy)',
  },
  tMin: 0,
  tMax: IMPLICIT_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#8b5cf6',
  sampler: (t, config) => sampleImplicitPath('gcd-cos-interference', t, config),
}

export const sineSquareBiasBandsFormula: FormulaDefinition = {
  id: 'sine-square-bias-bands',
  name: {
    en: 'Sine Square Bias Bands',
    'zh-CN': '正弦平方偏置带',
  },
  formulaText: {
    en: 'sin(x²)+sin(y²)=0.8',
    'zh-CN': 'sin(x²)+sin(y²)=0.8',
  },
  tMin: 0,
  tMax: IMPLICIT_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#10b981',
  sampler: (t, config) => sampleImplicitPath('sine-square-bias-bands', t, config),
}

export const parabolaSineBalanceFormula: FormulaDefinition = {
  id: 'parabola-sine-balance',
  name: {
    en: 'Parabola Sine Balance',
    'zh-CN': '抛物正弦平衡',
  },
  formulaText: {
    en: 'y²/2 + sin(x) = 1',
    'zh-CN': 'y²/2 + sin(x) = 1',
  },
  tMin: 0,
  tMax: IMPLICIT_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#fb923c',
  sampler: (t, config) => sampleImplicitPath('parabola-sine-balance', t, config),
}

export const trigFourierFusionFormula: FormulaDefinition = {
  id: 'trig-fourier-fusion',
  name: {
    en: 'Trig Fourier Fusion',
    'zh-CN': '三角傅立叶融合',
  },
  formulaText: {
    en: 'sin/cos base + tan/cot spike + finite Fourier harmonics',
    'zh-CN': '正弦余弦基底 + 正切余切尖峰 + 有限项傅立叶谐波',
  },
  tMin: 0,
  tMax: Math.PI * 12,
  step: 0.003,
  scale: 1.1,
  stroke: '#a78bfa',
  sampler: (t, config) => {
    const sinAmp = clamp(config?.fusionSinAmp ?? 8, 3, 14)
    const sinFreqX = clamp(config?.fusionSinFreqX ?? 3, 1, 9)
    const sinFreqY = clamp(config?.fusionSinFreqY ?? 4, 1, 9)
    const tanMix = clamp(config?.fusionTanMix ?? 0.45, 0, 1.4)
    const tanFreq = clamp(config?.fusionTanFreq ?? 2.8, 0.8, 8)
    const tanClamp = clamp(config?.fusionTanClamp ?? 1.8, 0.4, 4)
    const fourierMix = clamp(config?.fusionFourierMix ?? 1, 0, 2.5)
    const harmonics = Math.round(clamp(config?.fusionFourierHarmonics ?? 4, 1, 9))
    const decay = clamp(config?.fusionFourierDecay ?? 1.2, 0.4, 2.6)

    const baseX = sinAmp * Math.cos(sinFreqX * t)
    const baseY = sinAmp * Math.sin(sinFreqY * t)
    const safeSin = Math.sin(tanFreq * t)
    const safeCos = Math.cos(tanFreq * t)
    const cot = safeSin === 0 ? 0 : safeCos / safeSin
    const tanCotTerm = Math.tanh((Math.tan(tanFreq * t) + cot) / tanClamp)

    let fourierX = 0
    let fourierY = 0
    for (let n = 1; n <= harmonics; n += 1) {
      const weight = 1 / (n ** decay)
      fourierX += weight * Math.sin((n + 1) * t)
      fourierY += weight * Math.cos((n + 2) * t)
    }

    return {
      x: baseX + tanMix * sinAmp * tanCotTerm + fourierMix * fourierX,
      y: baseY - tanMix * sinAmp * tanCotTerm + fourierMix * fourierY,
    }
  },
}

export const cubicXYBalanceFormula: FormulaDefinition = {
  id: 'cubic-xy-balance',
  name: {
    en: 'Cubic XY Balance',
    'zh-CN': '三次 xy 平衡',
  },
  formulaText: {
    en: 'x³ + y³ = 5xy',
    'zh-CN': 'x³ + y³ = 5xy',
  },
  tMin: 0,
  tMax: IMPLICIT_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#67e8f9',
  sampler: (t, config) => sampleImplicitPath('cubic-xy-balance', t, config),
}

export const sineYCrossBandsFormula: FormulaDefinition = {
  id: 'sine-y-cross-bands',
  name: {
    en: 'Sine Y Cross Bands',
    'zh-CN': '正弦 y 交错带',
  },
  formulaText: {
    en: 'sin(2y) - 2sin(x) - y = y * -1.0',
    'zh-CN': 'sin(2y) - 2sin(x) - y = y * -1.0',
  },
  tMin: 0,
  tMax: IMPLICIT_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#7dd3fc',
  sampler: (t, config) => sampleImplicitPath('sine-y-cross-bands', t, config),
}

export const tanSinMirrorFieldFormula: FormulaDefinition = {
  id: 'tan-sin-mirror-field',
  name: {
    en: 'Tan Sin Mirror Field',
    'zh-CN': '正切正弦镜像场',
  },
  formulaText: {
    en: 'tan(x²·sin(y²)) = tan(y²·sin(x²))',
    'zh-CN': 'tan(x²·sin(y²)) = tan(y²·sin(x²))',
  },
  tMin: 0,
  tMax: IMPLICIT_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#ec4899',
  sampler: (t, config) => sampleImplicitPath('tan-sin-mirror-field', t, config),
}

export const hybridFormulas: FormulaDefinition[] = [
  sineSquareLatticeFormula,
  resonantImplicitWaveFormula,
  tanCotImplicitMazeFormula,
  symmetricSineCrossFormula,
  expTrigBalanceFormula,
  sinTanNexusFormula,
  nestedSineShearFormula,
  gcdCosInterferenceFormula,
  sineSquareBiasBandsFormula,
  parabolaSineBalanceFormula,
  trigFourierFusionFormula,
  cubicXYBalanceFormula,
  sineYCrossBandsFormula,
  tanSinMirrorFieldFormula,
]
