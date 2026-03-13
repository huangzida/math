import type { FormulaDefinition } from '../../../types'
import { clamp } from '../shared'

export const superellipseFormula: FormulaDefinition = {
  id: 'superellipse',
  name: {
    en: 'Superellipse',
    'zh-CN': '超椭圆',
  },
  formulaText: {
    en: 'x = a·sgn(cos t)|cos t|^(2/n),  y = b·sgn(sin t)|sin t|^(2/n)',
    'zh-CN': 'x = a·sgn(cos t)|cos t|^(2/n),  y = b·sgn(sin t)|sin t|^(2/n)',
  },
  tMin: -Math.PI,
  tMax: Math.PI,
  step: 0.0025,
  scale: 1,
  stroke: '#f59e0b',
  sampler: t => {
    const a = 10
    const b = 8
    const n = 3
    const cosT = Math.cos(t)
    const sinT = Math.sin(t)
    return {
      x: a * Math.sign(cosT) * Math.abs(cosT) ** (2 / n),
      y: b * Math.sign(sinT) * Math.abs(sinT) ** (2 / n),
    }
  },
}

export const pentagramWaveFormula: FormulaDefinition = {
  id: 'pentagram-wave',
  name: {
    en: 'Pentagram Wave',
    'zh-CN': '五角星波纹',
  },
  formulaText: {
    en: 'x = 8sin(3t) + 2sin(8t),  y = 8cos(2t) - 2cos(9t)',
    'zh-CN': 'x = 8sin(3t) + 2sin(8t),  y = 8cos(2t) - 2cos(9t)',
  },
  tMin: 0,
  tMax: Math.PI * 20,
  step: 0.004,
  scale: 1,
  stroke: '#a855f7',
  sampler: t => ({
    x: 8 * Math.sin(3 * t) + 2 * Math.sin(8 * t),
    y: 8 * Math.cos(2 * t) - 2 * Math.cos(9 * t),
  }),
}

export const petalOrbitFormula: FormulaDefinition = {
  id: 'petal-orbit',
  name: {
    en: 'Petal Orbit',
    'zh-CN': '花瓣轨道',
  },
  formulaText: {
    en: 'x = 6sin(4t),  y = 6sin(3t + π/2)',
    'zh-CN': 'x = 6sin(4t),  y = 6sin(3t + π/2)',
  },
  tMin: 0,
  tMax: Math.PI * 2,
  step: 0.003,
  scale: 1.4,
  stroke: '#4ade80',
  sampler: t => ({
    x: 6 * Math.sin(4 * t),
    y: 6 * Math.sin(3 * t + Math.PI / 2),
  }),
}

export const lemniscateFormula: FormulaDefinition = {
  id: 'lemniscate',
  name: {
    en: 'Lemniscate',
    'zh-CN': '双纽线',
  },
  formulaText: {
    en: 'x = 10cos(t)/(1 + sin²(t)),  y = 10sin(t)cos(t)/(1 + sin²(t))',
    'zh-CN': 'x = 10cos(t)/(1 + sin²(t)),  y = 10sin(t)cos(t)/(1 + sin²(t))',
  },
  tMin: 0,
  tMax: Math.PI * 2,
  step: 0.0025,
  scale: 1.15,
  stroke: '#22d3ee',
  sampler: t => {
    const denom = 1 + Math.sin(t) ** 2
    return {
      x: (10 * Math.cos(t)) / denom,
      y: (10 * Math.sin(t) * Math.cos(t)) / denom,
    }
  },
}

export const cardioidDeluxeFormula: FormulaDefinition = {
  id: 'cardioid-deluxe',
  name: {
    en: 'Parametric Cardioid',
    'zh-CN': '参数心形线',
  },
  formulaText: {
    en: 'x = w·(2cos t − cos 2t),  y = d·(2sin t − sin 2t)',
    'zh-CN': 'x = w·(2cos t − cos 2t),  y = d·(2sin t − sin 2t)',
  },
  tMin: 0,
  tMax: Math.PI * 2,
  step: 0.004,
  scale: 1.25,
  stroke: '#f472b6',
  sampler: (t, config) => {
    const depth = clamp(config?.heartDepth ?? 1, 0.5, 1.8)
    const width = clamp(config?.heartWidth ?? 1, 0.5, 1.8)
    return {
      x: width * (2 * Math.cos(t) - Math.cos(2 * t)),
      y: depth * (2 * Math.sin(t) - Math.sin(2 * t)),
    }
  },
}

export const doubleHeartFormula: FormulaDefinition = {
  id: 'double-heart',
  name: {
    en: 'Double Heart Blend',
    'zh-CN': '双心混合线',
  },
  formulaText: {
    en: 'mix of left/right cardioid with offset δ and blend β',
    'zh-CN': '左右心形按偏移 δ 与权重 β 混合',
  },
  tMin: 0,
  tMax: Math.PI * 2,
  step: 0.004,
  scale: 0.8,
  stroke: '#fb7185',
  sampler: (t, config) => {
    const depth = clamp(config?.heartDepth ?? 1, 0.5, 1.8)
    const width = clamp(config?.heartWidth ?? 1, 0.5, 1.8)
    const offset = clamp(config?.doubleHeartOffset ?? 2.4, 0.6, 4.5)
    const blend = clamp(config?.doubleHeartBlend ?? 0.5, 0, 1)
    const baseX = 2 * Math.cos(t) - Math.cos(2 * t)
    const baseY = 2 * Math.sin(t) - Math.sin(2 * t)
    const leftX = width * baseX - offset
    const rightX = width * baseX + offset
    return {
      x: leftX * (1 - blend) + rightX * blend,
      y: depth * baseY,
    }
  },
}

export const astroidFormula: FormulaDefinition = {
  id: 'astroid',
  name: {
    en: 'Astroid',
    'zh-CN': '内摆线星形',
  },
  formulaText: {
    en: 'x = 8cos³(t),  y = 8sin³(t)',
    'zh-CN': 'x = 8cos³(t),  y = 8sin³(t)',
  },
  tMin: 0,
  tMax: Math.PI * 2,
  step: 0.003,
  scale: 1.2,
  stroke: '#fde68a',
  sampler: t => ({
    x: 8 * Math.cos(t) ** 3,
    y: 8 * Math.sin(t) ** 3,
  }),
}

export const lissajousFormula: FormulaDefinition = {
  id: 'lissajous',
  name: {
    en: 'Lissajous Figure',
    'zh-CN': '李萨如图形',
  },
  formulaText: {
    en: 'x = 9sin(3t + π/2),  y = 9sin(4t)',
    'zh-CN': 'x = 9sin(3t + π/2),  y = 9sin(4t)',
  },
  tMin: 0,
  tMax: Math.PI * 2,
  step: 0.003,
  scale: 1.2,
  stroke: '#f97316',
  sampler: t => ({
    x: 9 * Math.sin(3 * t + Math.PI / 2),
    y: 9 * Math.sin(4 * t),
  }),
}

export const parametricFormulas: FormulaDefinition[] = [
  superellipseFormula,
  pentagramWaveFormula,
  petalOrbitFormula,
  lemniscateFormula,
  cardioidDeluxeFormula,
  doubleHeartFormula,
  astroidFormula,
  lissajousFormula,
]
