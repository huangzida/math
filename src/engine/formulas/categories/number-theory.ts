import type { FormulaDefinition } from '../../../types'
import { getCoprimePath, getGcdLayerPath, getQuadraticResiduePath, getTimesTablePath } from '../runtime'

const gcdLayerPath = getGcdLayerPath()
const quadraticResiduePath = getQuadraticResiduePath()
const coprimePath = getCoprimePath()

export const modularTimesTableFormula: FormulaDefinition = {
  id: 'modular-times-table',
  name: {
    en: 'Modular Times Table',
    'zh-CN': '模乘圆连线',
  },
  formulaText: {
    en: 'P(i) → P((ki mod N)),  |P| = r',
    'zh-CN': '圆上点 P(i) 连到 P(ki mod N)，半径为 r',
  },
  tMin: 0,
  tMax: 960 * 3 - 1,
  step: 1,
  scale: 1,
  stroke: '#22d3ee',
  sampler: (t, config) => {
    const count = config?.modularPointCount ?? 360
    const multiplier = config?.modularMultiplier ?? 71
    const radius = config?.modularRadius ?? 12
    const path = getTimesTablePath(count, multiplier, radius)
    const idx = Math.floor(t)
    if (idx < 0 || idx >= path.length) {
      return { x: Number.NaN, y: Number.NaN }
    }
    return path[idx]
  },
}

export const gcdLayerFormula: FormulaDefinition = {
  id: 'gcd-layer',
  name: {
    en: 'GCD Layer',
    'zh-CN': 'gcd 等值层',
  },
  formulaText: {
    en: 'gcd(x, y) = 3',
    'zh-CN': 'gcd(x, y) = 3',
  },
  tMin: 0,
  tMax: gcdLayerPath.length - 1,
  step: 1,
  scale: 1,
  stroke: '#f97316',
  sampler: t => {
    const idx = Math.max(0, Math.min(gcdLayerPath.length - 1, Math.floor(t)))
    return gcdLayerPath[idx]
  },
}

export const quadraticResidueGridFormula: FormulaDefinition = {
  id: 'quadratic-residue-grid',
  name: {
    en: 'Quadratic Residue Grid',
    'zh-CN': '二次剩余格',
  },
  formulaText: {
    en: '(x² + y²) mod 29 ∈ QR(29)',
    'zh-CN': '(x² + y²) mod 29 ∈ QR(29)',
  },
  tMin: 0,
  tMax: quadraticResiduePath.length - 1,
  step: 1,
  scale: 1,
  stroke: '#2dd4bf',
  sampler: t => {
    const idx = Math.max(0, Math.min(quadraticResiduePath.length - 1, Math.floor(t)))
    return quadraticResiduePath[idx]
  },
}

export const gcdLatticeFormula: FormulaDefinition = {
  id: 'gcd-lattice',
  name: {
    en: 'Coprime Lattice',
    'zh-CN': '互质晶格',
  },
  formulaText: {
    en: 'gcd(x, y) = 1',
    'zh-CN': 'gcd(x, y) = 1',
  },
  tMin: 0,
  tMax: coprimePath.length - 1,
  step: 1,
  scale: 1,
  stroke: '#ef4444',
  sampler: t => {
    const idx = Math.max(0, Math.min(coprimePath.length - 1, Math.floor(t)))
    return coprimePath[idx]
  },
}

export const numberTheoryFormulas: FormulaDefinition[] = [
  modularTimesTableFormula,
  gcdLayerFormula,
  quadraticResidueGridFormula,
  gcdLatticeFormula,
]
