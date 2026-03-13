import type { FormulaDefinition } from '../../../types'
import { IMPLICIT_DRAW_POINTS, getImplicitPath } from '../runtime'

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
  sampler: (t, config) => {
    const path = getImplicitPath('sine-square-lattice', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
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
  sampler: (t, config) => {
    const path = getImplicitPath('resonant-implicit-wave', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
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
  sampler: (t, config) => {
    const path = getImplicitPath('tan-cot-implicit-maze', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const hybridFormulas: FormulaDefinition[] = [
  sineSquareLatticeFormula,
  resonantImplicitWaveFormula,
  tanCotImplicitMazeFormula,
]
