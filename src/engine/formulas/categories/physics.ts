import type { FormulaDefinition } from '../../../types'
import { PHYSICS_DRAW_POINTS, getPhysicsPath } from '../runtime'

export const vectorFieldStreamlinesFormula: FormulaDefinition = {
  id: 'vector-field-streamlines',
  name: {
    en: 'Vector Field Streamlines',
    'zh-CN': '向量场流线',
  },
  formulaText: {
    en: 'dx/ds = Fₓ(x,y),  dy/ds = Fᵧ(x,y)',
    'zh-CN': 'dx/ds = Fₓ(x,y),  dy/ds = Fᵧ(x,y)',
  },
  tMin: 0,
  tMax: PHYSICS_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#60a5fa',
  sampler: t => {
    const path = getPhysicsPath('vector-field-streamlines')
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const gravityWellFormula: FormulaDefinition = {
  id: 'gravity-well',
  name: {
    en: 'Gravity Well',
    'zh-CN': '引力势阱',
  },
  formulaText: {
    en: 'r¨ = -μr/|r|³',
    'zh-CN': 'r¨ = -μr/|r|³',
  },
  tMin: 0,
  tMax: PHYSICS_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#f59e0b',
  sampler: t => {
    const path = getPhysicsPath('gravity-well')
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const vortexFieldFormula: FormulaDefinition = {
  id: 'vortex-field',
  name: {
    en: 'Vortex Field',
    'zh-CN': '涡旋场',
  },
  formulaText: {
    en: 'v = Σ Γᵢ/(2πrᵢ²) · (-Δy, Δx)',
    'zh-CN': 'v = Σ Γᵢ/(2πrᵢ²) · (-Δy, Δx)',
  },
  tMin: 0,
  tMax: PHYSICS_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#22d3ee',
  sampler: t => {
    const path = getPhysicsPath('vortex-field')
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const physicsFormulas: FormulaDefinition[] = [
  vectorFieldStreamlinesFormula,
  gravityWellFormula,
  vortexFieldFormula,
]
