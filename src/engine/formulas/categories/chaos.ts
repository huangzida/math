import type { FormulaDefinition } from '../../../types'
import { CHAOS_DRAW_POINTS, getChaosPath } from '../runtime'

export const lorenzAttractorFormula: FormulaDefinition = {
  id: 'lorenz-attractor',
  name: {
    en: 'Lorenz Attractor',
    'zh-CN': 'Lorenz 吸引子',
  },
  formulaText: {
    en: 'ẋ = σ(y-x),  ẏ = x(ρ-z)-y,  ż = xy-βz',
    'zh-CN': 'ẋ = σ(y-x),  ẏ = x(ρ-z)-y,  ż = xy-βz',
  },
  tMin: 0,
  tMax: CHAOS_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#818cf8',
  sampler: (t, config) => {
    const path = getChaosPath('lorenz-attractor', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const rosslerAttractorFormula: FormulaDefinition = {
  id: 'rossler-attractor',
  name: {
    en: 'Rössler Attractor',
    'zh-CN': 'Rössler 吸引子',
  },
  formulaText: {
    en: 'ẋ = -y-z,  ẏ = x+ay,  ż = b+z(x-c)',
    'zh-CN': 'ẋ = -y-z,  ẏ = x+ay,  ż = b+z(x-c)',
  },
  tMin: 0,
  tMax: CHAOS_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#38bdf8',
  sampler: (t, config) => {
    const path = getChaosPath('rossler-attractor', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const aizawaAttractorFormula: FormulaDefinition = {
  id: 'aizawa-attractor',
  name: {
    en: 'Aizawa Attractor',
    'zh-CN': 'Aizawa 吸引子',
  },
  formulaText: {
    en: 'ẋ=(z-b)x-dy,  ẏ=dx+(z-b)y,  ż=... nonlinear',
    'zh-CN': 'ẋ=(z-b)x-dy,  ẏ=dx+(z-b)y,  ż=... 非线性',
  },
  tMin: 0,
  tMax: CHAOS_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#14b8a6',
  sampler: (t, config) => {
    const path = getChaosPath('aizawa-attractor', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const chaosFormulas: FormulaDefinition[] = [
  lorenzAttractorFormula,
  rosslerAttractorFormula,
  aizawaAttractorFormula,
]
