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
  sampler: (t, config) => {
    const path = getPhysicsPath('vortex-field', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const lissajousRibbonFormula: FormulaDefinition = {
  id: 'lissajous-ribbon',
  name: {
    en: 'Lissajous Ribbon',
    'zh-CN': '李萨如绶带',
  },
  formulaText: {
    en: 'x = sin(a·t + φ),  y = sin(b·t)',
    'zh-CN': 'x = sin(a·t + φ),  y = sin(b·t)',
  },
  tMin: 0,
  tMax: PHYSICS_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#fb7185',
  sampler: (t, config) => {
    const path = getPhysicsPath('lissajous-ribbon', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const strangeAttractorInkFormula: FormulaDefinition = {
  id: 'strange-attractor-ink',
  name: {
    en: 'Strange Attractor Ink',
    'zh-CN': '奇异吸引墨迹',
  },
  formulaText: {
    en: 'xₙ₊₁=sin(a·yₙ)-cos(b·xₙ),  yₙ₊₁=sin(c·xₙ)-cos(d·yₙ)',
    'zh-CN': 'xₙ₊₁=sin(a·yₙ)-cos(b·xₙ),  yₙ₊₁=sin(c·xₙ)-cos(d·yₙ)',
  },
  tMin: 0,
  tMax: PHYSICS_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#f59e0b',
  sampler: (t, config) => {
    const path = getPhysicsPath('strange-attractor-ink', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const vortexSpiralFormula: FormulaDefinition = {
  id: 'vortex-spiral',
  name: {
    en: 'Vortex Spiral',
    'zh-CN': '涡流螺旋',
  },
  formulaText: {
    en: 'r = s(1+δt),  θ = t + c ln(1+t),  (x,y)=r(cosθ,sinθ)',
    'zh-CN': 'r = s(1+δt),  θ = t + c ln(1+t),  (x,y)=r(cosθ,sinθ)',
  },
  tMin: 0,
  tMax: PHYSICS_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#22d3ee',
  sampler: (t, config) => {
    const path = getPhysicsPath('vortex-spiral', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const particleFlowWeaveFormula: FormulaDefinition = {
  id: 'particle-flow-weave',
  name: {
    en: 'Particle Flow Weave',
    'zh-CN': '粒子流编织',
  },
  formulaText: {
    en: 'd𝐱/ds = F(𝐱),  multi-seed stream weaving',
    'zh-CN': 'd𝐱/ds = F(𝐱),  多种子流线编织',
  },
  tMin: 0,
  tMax: PHYSICS_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#34d399',
  sampler: (t, config) => {
    const path = getPhysicsPath('particle-flow-weave', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const flourishCurveBloomFormula: FormulaDefinition = {
  id: 'flourish-curve-bloom',
  name: {
    en: 'Flourish Curve Bloom',
    'zh-CN': '繁华曲线绽放',
  },
  formulaText: {
    en: 'x = s[sin(pt)+βsin((p+τ)t+φ)],  y = s[cos(pt)-βcos((p-τ)t-φ)]',
    'zh-CN': 'x = s[sin(pt)+βsin((p+τ)t+φ)],  y = s[cos(pt)-βcos((p-τ)t-φ)]',
  },
  tMin: 0,
  tMax: PHYSICS_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#f472b6',
  sampler: (t, config) => {
    const path = getPhysicsPath('flourish-curve-bloom', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const interferenceFieldFormula: FormulaDefinition = {
  id: 'interference-field',
  name: {
    en: 'Interference Field',
    'zh-CN': '干涉场',
  },
  formulaText: {
    en: 'x = s·sin(kₓt + Δsin(0.5t)),  y = s·sin(kᵧt + φ) + 0.35s·sin((kₓ-kᵧ)t)',
    'zh-CN': 'x = s·sin(kₓt + Δsin(0.5t)),  y = s·sin(kᵧt + φ) + 0.35s·sin((kₓ-kᵧ)t)',
  },
  tMin: 0,
  tMax: PHYSICS_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#38bdf8',
  sampler: (t, config) => {
    const path = getPhysicsPath('interference-field', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const wavefrontInterferenceFormula: FormulaDefinition = {
  id: 'wavefront-interference',
  name: {
    en: 'Wavefront Interference',
    'zh-CN': '波面干涉',
  },
  formulaText: {
    en: 'y = s[sin(k₁r₁ + φ) + sin(k₂r₂ - φ)],  rᵢ = √((x±d)² + 1)',
    'zh-CN': 'y = s[sin(k₁r₁ + φ) + sin(k₂r₂ - φ)],  rᵢ = √((x±d)² + 1)',
  },
  tMin: 0,
  tMax: PHYSICS_DRAW_POINTS - 1,
  step: 1,
  scale: 1,
  stroke: '#a78bfa',
  sampler: (t, config) => {
    const path = getPhysicsPath('wavefront-interference', config)
    const idx = Math.max(0, Math.min(path.length - 1, Math.floor(t)))
    return path[idx]
  },
}

export const physicsFormulas: FormulaDefinition[] = [
  vectorFieldStreamlinesFormula,
  gravityWellFormula,
  vortexFieldFormula,
  lissajousRibbonFormula,
  strangeAttractorInkFormula,
  vortexSpiralFormula,
  particleFlowWeaveFormula,
  flourishCurveBloomFormula,
  interferenceFieldFormula,
  wavefrontInterferenceFormula,
]
