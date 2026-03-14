import type { FormulaDefinition } from '../../../types'
import { clamp } from '../shared'

export const spiralSpirographFormula: FormulaDefinition = {
  id: 'spiral-spirograph',
  name: {
    en: 'Spiral Spirograph',
    'zh-CN': '螺旋旋轮线',
  },
  formulaText: {
    en: 'x=(R-r)cos(t)+dcos((R-r)t/r),  y=(R-r)sin(t)-dsin((R-r)t/r)',
    'zh-CN': 'x=(R-r)cos(t)+dcos((R-r)t/r),  y=(R-r)sin(t)-dsin((R-r)t/r)',
  },
  tMin: 0,
  tMax: Math.PI * 40,
  step: 0.004,
  scale: 0.85,
  stroke: '#06b6d4',
  sampler: (t, config) => {
    const R = clamp(config?.spirographR ?? 10, 6, 14)
    const r = clamp(config?.spirographr ?? 4, 1.2, 8)
    const d = clamp(config?.spirographd ?? 5, 0.6, 10)
    const k = (R - r) / r
    return {
      x: (R - r) * Math.cos(t) + d * Math.cos(k * t),
      y: (R - r) * Math.sin(t) - d * Math.sin(k * t),
    }
  },
}

export const hypotrochoidFormula: FormulaDefinition = {
  id: 'hypotrochoid',
  name: {
    en: 'Hypotrochoid',
    'zh-CN': '内旋轮线',
  },
  formulaText: {
    en: 'x = (R-r)cos(t) + dcos((R-r)t/r), y = (R-r)sin(t) - dsin((R-r)t/r)',
    'zh-CN': 'x = (R-r)cos(t) + dcos((R-r)t/r), y = (R-r)sin(t) - dsin((R-r)t/r)',
  },
  tMin: 0,
  tMax: Math.PI * 24,
  step: 0.003,
  scale: 0.95,
  stroke: '#22d3ee',
  sampler: (t, config) => {
    const R = clamp(config?.hypotrochoidR ?? 9, 5, 14)
    const r = clamp(config?.hypotrochoidr ?? 4, 1.2, 9)
    const d = clamp(config?.hypotrochoidd ?? 5, 0.6, 10)
    const k = (R - r) / r
    return {
      x: (R - r) * Math.cos(t) + d * Math.cos(k * t),
      y: (R - r) * Math.sin(t) - d * Math.sin(k * t),
    }
  },
}

export const epicycloidFormula: FormulaDefinition = {
  id: 'epicycloid',
  name: {
    en: 'Epicycloid',
    'zh-CN': '外摆线',
  },
  formulaText: {
    en: 'x = (R+r)cos(t) - rcos((R+r)t/r), y = (R+r)sin(t) - rsin((R+r)t/r)',
    'zh-CN': 'x = (R+r)cos(t) - rcos((R+r)t/r), y = (R+r)sin(t) - rsin((R+r)t/r)',
  },
  tMin: 0,
  tMax: Math.PI * 16,
  step: 0.0035,
  scale: 0.9,
  stroke: '#f97316',
  sampler: (t, config) => {
    const R = clamp(config?.epicycloidR ?? 5, 2, 10)
    const r = clamp(config?.epicycloidr ?? 2, 0.6, 4)
    const k = (R + r) / r
    return {
      x: (R + r) * Math.cos(t) - r * Math.cos(k * t),
      y: (R + r) * Math.sin(t) - r * Math.sin(k * t),
    }
  },
}

export const nephroidFormula: FormulaDefinition = {
  id: 'nephroid',
  name: {
    en: 'Nephroid',
    'zh-CN': '肾形线',
  },
  formulaText: {
    en: 'x = 6(3cos(t)-cos(3t)),  y = 6(3sin(t)-sin(3t))',
    'zh-CN': 'x = 6(3cos(t)-cos(3t)),  y = 6(3sin(t)-sin(3t))',
  },
  tMin: 0,
  tMax: Math.PI * 2,
  step: 0.002,
  scale: 0.3,
  stroke: '#38bdf8',
  sampler: (t, config) => {
    const scale = clamp(config?.nephroidScale ?? 6, 2.5, 11)
    return {
      x: scale * (3 * Math.cos(t) - Math.cos(3 * t)),
      y: scale * (3 * Math.sin(t) - Math.sin(3 * t)),
    }
  },
}

export const epitrochoidBloomFormula: FormulaDefinition = {
  id: 'epitrochoid-bloom',
  name: {
    en: 'Epitrochoid Bloom',
    'zh-CN': '外旋轮花',
  },
  formulaText: {
    en: 'x=(R+r)cos(t)-dcos((R+r)t/r+φ), y=(R+r)sin(t)-dsin((R+r)t/r+φ)',
    'zh-CN': 'x=(R+r)cos(t)-dcos((R+r)t/r+φ), y=(R+r)sin(t)-dsin((R+r)t/r+φ)',
  },
  tMin: 0,
  tMax: Math.PI * 20,
  step: 0.004,
  scale: 0.9,
  stroke: '#f59e0b',
  sampler: (t, config) => {
    const ratio = clamp(config?.trochoidRatio ?? 2.6, 1.2, 6)
    const offset = clamp(config?.trochoidOffset ?? 3.2, 0.2, 8)
    const phase = clamp(config?.trochoidPhase ?? 0, -Math.PI, Math.PI)
    const R = 6.2
    const r = R / ratio
    const omega = (R + r) / r
    const d = offset
    return {
      x: (R + r) * Math.cos(t) - d * Math.cos(omega * t + phase),
      y: (R + r) * Math.sin(t) - d * Math.sin(omega * t + phase),
    }
  },
}

export const hypotrochoidWeaveFormula: FormulaDefinition = {
  id: 'hypotrochoid-weave',
  name: {
    en: 'Hypotrochoid Weave',
    'zh-CN': '内旋轮编织',
  },
  formulaText: {
    en: 'x=(R-r)cos(t)+dcos((R-r)t/r+φ), y=(R-r)sin(t)-dsin((R-r)t/r+φ)',
    'zh-CN': 'x=(R-r)cos(t)+dcos((R-r)t/r+φ), y=(R-r)sin(t)-dsin((R-r)t/r+φ)',
  },
  tMin: 0,
  tMax: Math.PI * 28,
  step: 0.004,
  scale: 0.9,
  stroke: '#14b8a6',
  sampler: (t, config) => {
    const ratio = clamp(config?.trochoidRatio ?? 2.8, 1.15, 6)
    const offset = clamp(config?.trochoidOffset ?? 2.4, 0.2, 8)
    const phase = clamp(config?.trochoidPhase ?? 0, -Math.PI, Math.PI)
    const R = 8.2
    const r = R / ratio
    const omega = (R - r) / r
    const d = offset
    return {
      x: (R - r) * Math.cos(t) + d * Math.cos(omega * t + phase),
      y: (R - r) * Math.sin(t) - d * Math.sin(omega * t + phase),
    }
  },
}

export const trochoidFormulas: FormulaDefinition[] = [
  spiralSpirographFormula,
  hypotrochoidFormula,
  epicycloidFormula,
  nephroidFormula,
  epitrochoidBloomFormula,
  hypotrochoidWeaveFormula,
]
