import type { FormulaDefinition } from '../types'

const gcd = (a: number, b: number): number => {
  let x = Math.abs(Math.trunc(a))
  let y = Math.abs(Math.trunc(b))
  while (y !== 0) {
    const rest = x % y
    x = y
    y = rest
  }
  return x
}

const createCoprimePath = (limit: number) => {
  const points: { x: number, y: number }[] = []
  for (let y = -limit; y < limit; y += 1) {
    for (let x = -limit; x < limit; x += 1) {
      if (x === 0 && y === 0) continue
      if (gcd(x, y) !== 1) continue
      points.push(
        { x, y },
        { x: x + 1, y },
        { x: x + 1, y: y + 1 },
        { x, y: y + 1 },
        { x, y },
        { x: Number.NaN, y: Number.NaN },
      )
    }
  }
  return points
}

const coprimePath = createCoprimePath(16)

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const createTimesTablePath = (count: number, multiplier: number, radius: number) => {
  const points: { x: number, y: number }[] = []
  for (let i = 0; i < count; i += 1) {
    const fromAngle = (Math.PI * 2 * i) / count
    const toIndex = (i * multiplier) % count
    const toAngle = (Math.PI * 2 * toIndex) / count
    points.push(
      { x: radius * Math.cos(fromAngle), y: radius * Math.sin(fromAngle) },
      { x: radius * Math.cos(toAngle), y: radius * Math.sin(toAngle) },
      { x: Number.NaN, y: Number.NaN },
    )
  }
  return points
}

const timesTablePathCache = new Map<string, { x: number, y: number }[]>()

const getTimesTablePath = (count: number, multiplier: number, radius: number) => {
  const normalizedCount = clamp(Math.floor(count), 60, 960)
  const normalizedMultiplier = clamp(Math.floor(multiplier), 2, 480)
  const normalizedRadius = clamp(radius, 4, 24)
  const key = `${normalizedCount}_${normalizedMultiplier}_${normalizedRadius.toFixed(3)}`
  const cached = timesTablePathCache.get(key)
  if (cached) return cached
  const path = createTimesTablePath(normalizedCount, normalizedMultiplier, normalizedRadius)
  timesTablePathCache.set(key, path)
  return path
}

const pushCell = (points: { x: number, y: number }[], x: number, y: number) => {
  points.push(
    { x, y },
    { x: x + 1, y },
    { x: x + 1, y: y + 1 },
    { x, y: y + 1 },
    { x, y },
    { x: Number.NaN, y: Number.NaN },
  )
}

const createGcdLayerPath = (limit: number, target: number) => {
  const points: { x: number, y: number }[] = []
  for (let y = -limit; y < limit; y += 1) {
    for (let x = -limit; x < limit; x += 1) {
      if (x === 0 && y === 0) continue
      if (gcd(x, y) !== target) continue
      pushCell(points, x, y)
    }
  }
  return points
}

const createQuadraticResiduePath = (limit: number, prime: number) => {
  const residues = new Set<number>()
  for (let i = 0; i < prime; i += 1) {
    residues.add((i * i) % prime)
  }
  const points: { x: number, y: number }[] = []
  for (let y = -limit; y < limit; y += 1) {
    for (let x = -limit; x < limit; x += 1) {
      const value = ((x * x + y * y) % prime + prime) % prime
      if (!residues.has(value)) continue
      pushCell(points, x, y)
    }
  }
  return points
}

const gcdLayerPath = createGcdLayerPath(16, 3)
const quadraticResiduePath = createQuadraticResiduePath(16, 29)

export const formulaLibrary: FormulaDefinition[] = [
  {
    id: 'cardioid',
    name: {
      en: 'Cardioid',
      'zh-CN': '心形线',
    },
    formulaText: {
      en: 'r = 8(1 - cos(t)),  x = rcos(t),  y = rsin(t)',
      'zh-CN': 'r = 8(1 - cos(t)),  x = rcos(t),  y = rsin(t)',
    },
    tMin: 0,
    tMax: Math.PI * 2,
    step: 0.003,
    scale: 1.05,
    stroke: '#fb7185',
    sampler: t => {
      const r = 8 * (1 - Math.cos(t))
      return {
        x: r * Math.cos(t),
        y: r * Math.sin(t),
      }
    },
  },
  {
    id: 'limacon',
    name: {
      en: 'Limaçon',
      'zh-CN': '帕斯卡蜗线',
    },
    formulaText: {
      en: 'r = 6 + 9cos(t),  x = rcos(t),  y = rsin(t)',
      'zh-CN': 'r = 6 + 9cos(t),  x = rcos(t),  y = rsin(t)',
    },
    tMin: 0,
    tMax: Math.PI * 2,
    step: 0.003,
    scale: 1.05,
    stroke: '#c084fc',
    sampler: t => {
      const r = 6 + 9 * Math.cos(t)
      return {
        x: r * Math.cos(t),
        y: r * Math.sin(t),
      }
    },
  },
  {
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
  },
  {
    id: 'dual-frequency-bloom',
    name: {
      en: 'Dual-Frequency Bloom',
      'zh-CN': '双频花盘',
    },
    formulaText: {
      en: 'r = 5sin(7t) + 3sin(13t),  x = rcos(t),  y = rsin(t)',
      'zh-CN': 'r = 5sin(7t) + 3sin(13t),  x = rcos(t),  y = rsin(t)',
    },
    tMin: 0,
    tMax: Math.PI * 16,
    step: 0.004,
    scale: 1.65,
    stroke: '#34d399',
    sampler: t => {
      const r = 5 * Math.sin(7 * t) + 3 * Math.sin(13 * t)
      return {
        x: r * Math.cos(t),
        y: r * Math.sin(t),
      }
    },
  },
  {
    id: 'superellipse',
    name: {
      en: 'Superellipse',
      'zh-CN': '超椭圆',
    },
    formulaText: {
      en: '|x/10|^(2.6) + |y/10|^(2.6) = 1',
      'zh-CN': '|x/10|^(2.6) + |y/10|^(2.6) = 1',
    },
    tMin: 0,
    tMax: Math.PI * 2,
    step: 0.0025,
    scale: 1,
    stroke: '#f59e0b',
    sampler: t => {
      const a = 10
      const b = 10
      const n = 2.6
      const cosT = Math.cos(t)
      const sinT = Math.sin(t)
      return {
        x: a * Math.sign(cosT) * Math.abs(cosT) ** (2 / n),
        y: b * Math.sign(sinT) * Math.abs(sinT) ** (2 / n),
      }
    },
  },
  {
    id: 'star-rose',
    name: {
      en: 'Star Rose',
      'zh-CN': '星芒玫瑰',
    },
    formulaText: {
      en: 'r = 9cos(7t),  x = rcos(t),  y = rsin(t)',
      'zh-CN': 'r = 9cos(7t),  x = rcos(t),  y = rsin(t)',
    },
    tMin: 0,
    tMax: Math.PI * 2,
    step: 0.002,
    scale: 1.2,
    stroke: '#f43f5e',
    sampler: t => {
      const r = 9 * Math.cos(7 * t)
      return {
        x: r * Math.cos(t),
        y: r * Math.sin(t),
      }
    },
  },
  {
    id: 'spiral-spirograph',
    name: {
      en: 'Spiral Spirograph',
      'zh-CN': '螺旋旋轮',
    },
    formulaText: {
      en: 'x = (7+0.05t)cos(t)+3cos(9t),  y = (7+0.05t)sin(t)+3sin(9t)',
      'zh-CN': 'x = (7+0.05t)cos(t)+3cos(9t),  y = (7+0.05t)sin(t)+3sin(9t)',
    },
    tMin: 0,
    tMax: Math.PI * 24,
    step: 0.008,
    scale: 1,
    stroke: '#38bdf8',
    sampler: t => {
      const radial = 7 + 0.05 * t
      return {
        x: radial * Math.cos(t) + 3 * Math.cos(9 * t),
        y: radial * Math.sin(t) + 3 * Math.sin(9 * t),
      }
    },
  },
  {
    id: 'butterfly-variation',
    name: {
      en: 'Butterfly Variation',
      'zh-CN': '蝶形变奏',
    },
    formulaText: {
      en: 'r = e^(sin(t)) - 2cos(4t) + sin⁵((2t-π)/24) + 0.35sin(9t)',
      'zh-CN': 'r = e^(sin(t)) - 2cos(4t) + sin⁵((2t-π)/24) + 0.35sin(9t)',
    },
    tMin: 0,
    tMax: Math.PI * 24,
    step: 0.01,
    scale: 3,
    stroke: '#f472b6',
    sampler: t => {
      const r = Math.exp(Math.sin(t)) - 2 * Math.cos(4 * t) + Math.sin((2 * t - Math.PI) / 24) ** 5 + 0.35 * Math.sin(9 * t)
      return {
        x: r * Math.cos(t),
        y: r * Math.sin(t),
      }
    },
  },
  {
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
  },
  {
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
  },
  {
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
  },
  {
    id: 'pentagram-wave',
    name: {
      en: 'Pentagram Wave',
      'zh-CN': '五角星波',
    },
    formulaText: {
      en: 'x = 2cos(t) + 5cos(2t/3),  y = 2sin(t) - 5sin(2t/3)',
      'zh-CN': 'x = 2cos(t) + 5cos(2t/3),  y = 2sin(t) - 5sin(2t/3)',
    },
    tMin: 0,
    tMax: Math.PI * 24,
    step: 0.003,
    scale: 1.45,
    stroke: '#67e8f9',
    sampler: t => ({
      x: 2 * Math.cos(t) + 5 * Math.cos((2 * t) / 3),
      y: 2 * Math.sin(t) - 5 * Math.sin((2 * t) / 3),
    }),
  },
  {
    id: 'ribbon-orbit',
    name: {
      en: 'Ribbon Orbit',
      'zh-CN': '丝带环',
    },
    formulaText: {
      en: 'r = 4sin(24t/25) + 10,  x = rcos(t),  y = rsin(t)',
      'zh-CN': 'r = 4sin(24t/25) + 10,  x = rcos(t),  y = rsin(t)',
    },
    tMin: 0,
    tMax: Math.PI * 50,
    step: 0.01,
    scale: 1,
    stroke: '#d946ef',
    sampler: t => {
      const r = 4 * Math.sin((24 * t) / 25) + 10
      return {
        x: r * Math.cos(t),
        y: r * Math.sin(t),
      }
    },
  },
  {
    id: 'flower-web',
    name: {
      en: 'Flower Web',
      'zh-CN': '花心网',
    },
    formulaText: {
      en: 'r = 3sin(24t/25),  x = rcos(t),  y = rsin(t)',
      'zh-CN': 'r = 3sin(24t/25),  x = rcos(t),  y = rsin(t)',
    },
    tMin: 0,
    tMax: Math.PI * 80,
    step: 0.008,
    scale: 2.4,
    stroke: '#ec4899',
    sampler: t => {
      const r = 3 * Math.sin((24 * t) / 25)
      return {
        x: r * Math.cos(t),
        y: r * Math.sin(t),
      }
    },
  },
  {
    id: 'petal-chain',
    name: {
      en: 'Petal Chain',
      'zh-CN': '花瓣链',
    },
    formulaText: {
      en: 'r = 3sin(0.75t),  x = rcos(t),  y = rsin(t)',
      'zh-CN': 'r = 3sin(0.75t),  x = rcos(t),  y = rsin(t)',
    },
    tMin: 0,
    tMax: Math.PI * 32,
    step: 0.01,
    scale: 1.9,
    stroke: '#ef4444',
    sampler: t => {
      const r = 3 * Math.sin(0.75 * t)
      return {
        x: r * Math.cos(t),
        y: r * Math.sin(t),
      }
    },
  },
  {
    id: 'petal-orbit',
    name: {
      en: 'Petal Orbit',
      'zh-CN': '花瓣轨道',
    },
    formulaText: {
      en: 'x = 8cos(t) - 6cos(8t/3),  y = 8sin(t) - 6sin(8t/3)',
      'zh-CN': 'x = 8cos(t) - 6cos(8t/3),  y = 8sin(t) - 6sin(8t/3)',
    },
    tMin: 0,
    tMax: Math.PI * 12,
    step: 0.02,
    scale: 1.05,
    stroke: '#f472b6',
    sampler: t => ({
      x: 8 * Math.cos(t) - 6 * Math.cos((8 * t) / 3),
      y: 8 * Math.sin(t) - 6 * Math.sin((8 * t) / 3),
    }),
  },
  {
    id: 'rose-curve',
    name: {
      en: 'Rose Curve',
      'zh-CN': '玫瑰线',
    },
    formulaText: {
      en: 'r = 10cos(5t),  x = rcos(t),  y = rsin(t)',
      'zh-CN': 'r = 10cos(5t),  x = rcos(t),  y = rsin(t)',
    },
    tMin: 0,
    tMax: Math.PI * 2,
    step: 0.0025,
    scale: 1.2,
    stroke: '#facc15',
    sampler: t => {
      const r = 10 * Math.cos(5 * t)
      return {
        x: r * Math.cos(t),
        y: r * Math.sin(t),
      }
    },
  },
  {
    id: 'hypotrochoid',
    name: {
      en: 'Hypotrochoid',
      'zh-CN': '内旋轮线',
    },
    formulaText: {
      en: 'x = (R-r)cos(t)+dcos((R-r)t/r), y = (R-r)sin(t)-dsin((R-r)t/r)',
      'zh-CN': 'x = (R-r)cos(t)+dcos((R-r)t/r), y = (R-r)sin(t)-dsin((R-r)t/r)',
    },
    tMin: 0,
    tMax: Math.PI * 24,
    step: 0.01,
    scale: 0.72,
    stroke: '#60a5fa',
    sampler: t => {
      const R = 12
      const r = 5
      const d = 7
      return {
        x: (R - r) * Math.cos(t) + d * Math.cos(((R - r) * t) / r),
        y: (R - r) * Math.sin(t) - d * Math.sin(((R - r) * t) / r),
      }
    },
  },
  {
    id: 'epicycloid',
    name: {
      en: 'Epicycloid',
      'zh-CN': '外摆线',
    },
    formulaText: {
      en: 'x = (R+r)cos(t)-rcos((R+r)t/r), y = (R+r)sin(t)-rsin((R+r)t/r)',
      'zh-CN': 'x = (R+r)cos(t)-rcos((R+r)t/r), y = (R+r)sin(t)-rsin((R+r)t/r)',
    },
    tMin: 0,
    tMax: Math.PI * 10,
    step: 0.01,
    scale: 0.7,
    stroke: '#c084fc',
    sampler: t => {
      const R = 6
      const r = 2
      return {
        x: (R + r) * Math.cos(t) - r * Math.cos(((R + r) * t) / r),
        y: (R + r) * Math.sin(t) - r * Math.sin(((R + r) * t) / r),
      }
    },
  },
  {
    id: 'lemniscate',
    name: {
      en: 'Lemniscate',
      'zh-CN': '双纽线',
    },
    formulaText: {
      en: 'x = a cos(t) / (1 + sin²(t)),  y = a sin(t)cos(t)/(1 + sin²(t))',
      'zh-CN': 'x = a cos(t) / (1 + sin²(t)),  y = a sin(t)cos(t)/(1 + sin²(t))',
    },
    tMin: -Math.PI,
    tMax: Math.PI,
    step: 0.002,
    scale: 2.2,
    stroke: '#22d3ee',
    sampler: t => {
      const a = 12
      const d = 1 + Math.sin(t) ** 2
      return {
        x: (a * Math.cos(t)) / d,
        y: (a * Math.sin(t) * Math.cos(t)) / d,
      }
    },
  },
  {
    id: 'butterfly',
    name: {
      en: 'Butterfly Curve',
      'zh-CN': '蝴蝶曲线',
    },
    formulaText: {
      en: 'r = e^(sin(t)) - 2cos(4t) + sin⁵((2t-π)/24), x = rcos(t), y = rsin(t)',
      'zh-CN': 'r = e^(sin(t)) - 2cos(4t) + sin⁵((2t-π)/24), x = rcos(t), y = rsin(t)',
    },
    tMin: 0,
    tMax: Math.PI * 24,
    step: 0.01,
    scale: 3.2,
    stroke: '#fb7185',
    sampler: t => {
      const r = Math.exp(Math.sin(t)) - 2 * Math.cos(4 * t) + Math.sin((2 * t - Math.PI) / 24) ** 5
      return {
        x: r * Math.cos(t),
        y: r * Math.sin(t),
      }
    },
  },
  {
    id: 'tan-cot-burst',
    name: {
      en: 'Tan Cot Burst',
      'zh-CN': '正切余切爆裂线',
    },
    formulaText: {
      en: 'r = 20 × (tan(17t) + cot(17t)),  x = rcos(t),  y = rsin(t)',
      'zh-CN': 'r = 20 × (tan(17t) + cot(17t)),  x = rcos(t),  y = rsin(t)',
    },
    tMin: 0.001,
    tMax: Math.PI * 2 - 0.001,
    step: 0.0009,
    scale: 0.08,
    stroke: '#fda4af',
    sampler: t => {
      const a = 17 * t
      const tanValue = Math.tan(a)
      const cotValue = 1 / tanValue
      const r = 20 * (tanValue + cotValue)
      return {
        x: r * Math.cos(t),
        y: r * Math.sin(t),
      }
    },
  },
  {
    id: 'nephroid',
    name: {
      en: 'Nephroid',
      'zh-CN': '肾形线',
    },
    formulaText: {
      en: 'x = a(3cos(t)-cos(3t)),  y = a(3sin(t)-sin(3t))',
      'zh-CN': 'x = a(3cos(t)-cos(3t)),  y = a(3sin(t)-sin(3t))',
    },
    tMin: 0,
    tMax: Math.PI * 2,
    step: 0.0025,
    scale: 0.95,
    stroke: '#f59e0b',
    sampler: t => {
      const a = 2.6
      return {
        x: a * (3 * Math.cos(t) - Math.cos(3 * t)),
        y: a * (3 * Math.sin(t) - Math.sin(3 * t)),
      }
    },
  },
  {
    id: 'archimedean-spiral',
    name: {
      en: 'Archimedean Spiral',
      'zh-CN': '阿基米德螺线',
    },
    formulaText: {
      en: 'r = 0.26t,  x = rcos(t),  y = rsin(t)',
      'zh-CN': 'r = 0.26t,  x = rcos(t),  y = rsin(t)',
    },
    tMin: 0,
    tMax: Math.PI * 20,
    step: 0.01,
    scale: 1,
    stroke: '#38bdf8',
    sampler: t => {
      const r = 0.26 * t
      return {
        x: r * Math.cos(t),
        y: r * Math.sin(t),
      }
    },
  },
  {
    id: 'astroid',
    name: {
      en: 'Astroid',
      'zh-CN': '星芒内摆线',
    },
    formulaText: {
      en: 'x = a cos³(t),  y = a sin³(t)',
      'zh-CN': 'x = a cos³(t),  y = a sin³(t)',
    },
    tMin: 0,
    tMax: Math.PI * 2,
    step: 0.0025,
    scale: 1,
    stroke: '#a78bfa',
    sampler: t => {
      const a = 11
      return {
        x: a * Math.cos(t) ** 3,
        y: a * Math.sin(t) ** 3,
      }
    },
  },
  {
    id: 'lissajous',
    name: {
      en: 'Lissajous Figure',
      'zh-CN': '李萨如图形',
    },
    formulaText: {
      en: 'x = 11sin(3t + π/2),  y = 9sin(4t)',
      'zh-CN': 'x = 11sin(3t + π/2),  y = 9sin(4t)',
    },
    tMin: 0,
    tMax: Math.PI * 2,
    step: 0.0025,
    scale: 1,
    stroke: '#34d399',
    sampler: t => ({
      x: 11 * Math.sin(3 * t + Math.PI / 2),
      y: 9 * Math.sin(4 * t),
    }),
  },
]

export const getFormulaByIndex = (index: number) => {
  const total = formulaLibrary.length
  const safeIndex = ((index % total) + total) % total
  return formulaLibrary[safeIndex]
}
