import type { FormulaDefinition } from '../../../types'
import { IMPLICIT_DRAW_POINTS, getImplicitPath } from '../runtime'

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

export const hybridFormulas: FormulaDefinition[] = [
  sineSquareLatticeFormula,
  resonantImplicitWaveFormula,
  tanCotImplicitMazeFormula,
  symmetricSineCrossFormula,
  expTrigBalanceFormula,
  sinTanNexusFormula,
  nestedSineShearFormula,
]
