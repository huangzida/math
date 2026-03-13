import type { FormulaDefinition } from '../../../types'
import { FRACTAL_DRAW_POINTS, getFractalPath } from '../runtime'

export const juliaFractalFormula: FormulaDefinition = {
  id: 'julia-fractal',
  name: {
    en: 'Julia Set Orbit',
    'zh-CN': 'Julia 轨道云',
  },
  formulaText: {
    en: 'zₙ₊₁ = zₙ² + c, sampled orbit cloud',
    'zh-CN': 'zₙ₊₁ = zₙ² + c，采样轨道云',
  },
  tMin: 0,
  tMax: FRACTAL_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#a78bfa',
  sampler: (t, config) => {
    const path = getFractalPath('julia-fractal', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const mandelbrotOrbitFormula: FormulaDefinition = {
  id: 'mandelbrot-orbit',
  name: {
    en: 'Mandelbrot Orbit Lace',
    'zh-CN': 'Mandelbrot 轨道花边',
  },
  formulaText: {
    en: 'zₙ₊₁ = zₙ² + c, boundary orbit sampling',
    'zh-CN': 'zₙ₊₁ = zₙ² + c，边界轨道采样',
  },
  tMin: 0,
  tMax: FRACTAL_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#f472b6',
  sampler: (t, config) => {
    const path = getFractalPath('mandelbrot-orbit', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const barnsleyFernFormula: FormulaDefinition = {
  id: 'barnsley-fern',
  name: {
    en: 'Barnsley Fern',
    'zh-CN': 'Barnsley 蕨叶',
  },
  formulaText: {
    en: 'Iterated affine system (IFS)',
    'zh-CN': '迭代仿射系统（IFS）',
  },
  tMin: 0,
  tMax: FRACTAL_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#34d399',
  sampler: (t, config) => {
    const path = getFractalPath('barnsley-fern', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const fractalFormulas: FormulaDefinition[] = [
  juliaFractalFormula,
  mandelbrotOrbitFormula,
  barnsleyFernFormula,
]
