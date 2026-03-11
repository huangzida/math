import type { FormulaDefinition, MathBeautyProps } from '../types'

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

type ChaosSystemId = 'lorenz' | 'rossler' | 'aizawa'

const CHAOS_DRAW_POINTS = 9000
const CHAOS_BURN_IN = 1200
const chaosPathCache = new Map<string, { x: number, y: number }[]>()
const FRACTAL_DRAW_POINTS = 9000
const fractalPathCache = new Map<string, { x: number, y: number }[]>()
const PHYSICS_DRAW_POINTS = 9000
const physicsPathCache = new Map<string, { x: number, y: number }[]>()

const integrateLorenz = (x: number, y: number, z: number, dt: number) => {
  const sigma = 10
  const rho = 28
  const beta = 8 / 3
  const dx = sigma * (y - x)
  const dy = x * (rho - z) - y
  const dz = x * y - beta * z
  return { x: x + dx * dt, y: y + dy * dt, z: z + dz * dt }
}

const integrateRossler = (x: number, y: number, z: number, dt: number) => {
  const a = 0.2
  const b = 0.2
  const c = 5.7
  const dx = -y - z
  const dy = x + a * y
  const dz = b + z * (x - c)
  return { x: x + dx * dt, y: y + dy * dt, z: z + dz * dt }
}

const integrateAizawa = (x: number, y: number, z: number, dt: number) => {
  const a = 0.95
  const b = 0.7
  const c = 0.6
  const d = 3.5
  const e = 0.25
  const f = 0.1
  const dx = (z - b) * x - d * y
  const dy = d * x + (z - b) * y
  const dz = c + a * z - (z ** 3) / 3 - (x ** 2 + y ** 2) * (1 + e * z) + f * z * (x ** 3)
  return { x: x + dx * dt, y: y + dy * dt, z: z + dz * dt }
}

const getChaosSystem = (effectId: string, config?: MathBeautyProps): ChaosSystemId => {
  if (effectId === 'rossler-attractor') return 'rossler'
  if (effectId === 'aizawa-attractor') return 'aizawa'
  if (effectId === 'lorenz-attractor') return 'lorenz'
  const requested = config?.chaosSystem
  if (requested === 'lorenz' || requested === 'rossler' || requested === 'aizawa') {
    return requested
  }
  return 'lorenz'
}

const getChaosPath = (effectId: string, config?: MathBeautyProps) => {
  const system = getChaosSystem(effectId, config)
  const steps = clamp(Math.floor(config?.chaosSteps ?? CHAOS_DRAW_POINTS), 2200, 18000)
  const dt = clamp(config?.chaosDt ?? 0.008, 0.001, 0.03)
  const scaleFactor = clamp(config?.chaosScale ?? 1, 0.35, 2.4)
  const key = `${system}_${steps}_${dt.toFixed(5)}_${scaleFactor.toFixed(3)}`
  const cached = chaosPathCache.get(key)
  if (cached) return cached
  let x = system === 'lorenz' ? 0.1 : 0.2
  let y = system === 'lorenz' ? 0 : 0.1
  let z = system === 'aizawa' ? 0.1 : 0
  const source: { x: number, y: number }[] = []
  for (let i = 0; i < steps + CHAOS_BURN_IN; i += 1) {
    const next = system === 'lorenz'
      ? integrateLorenz(x, y, z, dt)
      : system === 'rossler'
        ? integrateRossler(x, y, z, dt)
        : integrateAizawa(x, y, z, dt)
    x = next.x
    y = next.y
    z = next.z
    if (i >= CHAOS_BURN_IN) {
      source.push({ x, y })
    }
  }
  let minX = Number.POSITIVE_INFINITY
  let maxX = Number.NEGATIVE_INFINITY
  let minY = Number.POSITIVE_INFINITY
  let maxY = Number.NEGATIVE_INFINITY
  for (let i = 0; i < source.length; i += 1) {
    const point = source[i]
    if (point.x < minX) minX = point.x
    if (point.x > maxX) maxX = point.x
    if (point.y < minY) minY = point.y
    if (point.y > maxY) maxY = point.y
  }
  const centerX = (minX + maxX) * 0.5
  const centerY = (minY + maxY) * 0.5
  const extent = Math.max(maxX - minX, maxY - minY, 1e-6)
  const radius = 13 * scaleFactor
  const path: { x: number, y: number }[] = []
  for (let i = 0; i < CHAOS_DRAW_POINTS; i += 1) {
    const ratio = CHAOS_DRAW_POINTS <= 1 ? 0 : i / (CHAOS_DRAW_POINTS - 1)
    const srcIndex = Math.min(source.length - 1, Math.floor(ratio * (source.length - 1)))
    const point = source[srcIndex]
    path.push({
      x: ((point.x - centerX) / extent) * radius,
      y: ((point.y - centerY) / extent) * radius,
    })
  }
  chaosPathCache.set(key, path)
  return path
}

const createSeededRandom = (seed: number) => {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

const resamplePath = (path: { x: number, y: number }[], targetCount: number) => {
  if (!path.length) {
    return Array.from({ length: targetCount }, () => ({ x: Number.NaN, y: Number.NaN }))
  }
  const sampled: { x: number, y: number }[] = []
  for (let i = 0; i < targetCount; i += 1) {
    const ratio = targetCount <= 1 ? 0 : i / (targetCount - 1)
    const idx = Math.min(path.length - 1, Math.floor(ratio * (path.length - 1)))
    const point = path[idx]
    sampled.push({ x: point.x, y: point.y })
  }
  return sampled
}

const createJuliaPath = (config?: MathBeautyProps) => {
  const seedCount = 280
  const iterations = 52
  const cRe = clamp(config?.juliaCRe ?? -0.745, -1.2, 0.4)
  const cIm = clamp(config?.juliaCIm ?? 0.186, -0.8, 0.8)
  const points: { x: number, y: number }[] = []
  for (let s = 0; s < seedCount; s += 1) {
    const angle = (Math.PI * 2 * s) / seedCount
    const radialMix = 0.58 + 0.5 * Math.sin(11 * angle)
    const radius = 0.42 + 1.18 * radialMix
    let x = radius * Math.cos(angle)
    let y = radius * Math.sin(angle)
    for (let i = 0; i < iterations; i += 1) {
      const nextX = x * x - y * y + cRe
      const nextY = 2 * x * y + cIm
      x = nextX
      y = nextY
      if (!Number.isFinite(x) || !Number.isFinite(y)) break
      if (x * x + y * y > 18) break
      if (i > 3) {
        points.push({ x: x * 7.2, y: y * 7.2 })
      }
    }
    points.push({ x: Number.NaN, y: Number.NaN })
  }
  return points
}

const createMandelbrotOrbitPath = (config?: MathBeautyProps) => {
  const seedCount = 420
  const iterations = 72
  const bandWidth = clamp(config?.mandelbrotBandWidth ?? 0.16, 0.04, 0.42)
  const points: { x: number, y: number }[] = []
  for (let s = 0; s < seedCount; s += 1) {
    const angle = (Math.PI * 2 * s) / seedCount
    const wobble = bandWidth * (1 + 0.5 * Math.sin(5 * angle))
    const cRe = -0.745 + wobble * Math.cos(angle)
    const cIm = 0.112 + wobble * Math.sin(angle)
    let zRe = 0
    let zIm = 0
    for (let i = 0; i < iterations; i += 1) {
      const nextRe = zRe * zRe - zIm * zIm + cRe
      const nextIm = 2 * zRe * zIm + cIm
      zRe = nextRe
      zIm = nextIm
      if (zRe * zRe + zIm * zIm > 36) break
      if (i > 2) {
        points.push({
          x: (zRe + 0.72) * 8.4,
          y: (zIm - 0.1) * 8.4,
        })
      }
    }
    points.push({ x: Number.NaN, y: Number.NaN })
  }
  return points
}

const createBarnsleyFernPath = (config?: MathBeautyProps) => {
  const random = createSeededRandom(20260312)
  const iterations = 14000
  const burnIn = 120
  const jitter = clamp(config?.barnsleyProbabilityJitter ?? 0, 0, 0.35)
  const baseWeights = [0.01, 0.85, 0.07, 0.07]
  const jitterWeights = [
    baseWeights[0] * (1 + jitter * Math.sin(2.1)),
    baseWeights[1] * (1 + jitter * Math.sin(4.7)),
    baseWeights[2] * (1 + jitter * Math.sin(7.9)),
    baseWeights[3] * (1 + jitter * Math.sin(10.3)),
  ]
  const weightSum = jitterWeights[0] + jitterWeights[1] + jitterWeights[2] + jitterWeights[3]
  const normalized = jitterWeights.map(weight => weight / weightSum)
  const p0 = normalized[0]
  const p1 = p0 + normalized[1]
  const p2 = p1 + normalized[2]
  const points: { x: number, y: number }[] = []
  let x = 0
  let y = 0
  for (let i = 0; i < iterations; i += 1) {
    const r = random()
    if (r < p0) {
      const nextX = 0
      const nextY = 0.16 * y
      x = nextX
      y = nextY
    }
    else if (r < p1) {
      const nextX = 0.85 * x + 0.04 * y
      const nextY = -0.04 * x + 0.85 * y + 1.6
      x = nextX
      y = nextY
    }
    else if (r < p2) {
      const nextX = 0.2 * x - 0.26 * y
      const nextY = 0.23 * x + 0.22 * y + 1.6
      x = nextX
      y = nextY
    }
    else {
      const nextX = -0.15 * x + 0.28 * y
      const nextY = 0.26 * x + 0.24 * y + 0.44
      x = nextX
      y = nextY
    }
    if (i >= burnIn) {
      points.push({
        x: x * 2.7,
        y: y * 2.7 - 14,
      })
    }
  }
  return points
}

const getFractalPath = (effectId: string, config?: MathBeautyProps) => {
  const juliaCRe = clamp(config?.juliaCRe ?? -0.745, -1.2, 0.4)
  const juliaCIm = clamp(config?.juliaCIm ?? 0.186, -0.8, 0.8)
  const mandelbrotBandWidth = clamp(config?.mandelbrotBandWidth ?? 0.16, 0.04, 0.42)
  const barnsleyProbabilityJitter = clamp(config?.barnsleyProbabilityJitter ?? 0, 0, 0.35)
  const key = `${effectId}_${juliaCRe.toFixed(4)}_${juliaCIm.toFixed(4)}_${mandelbrotBandWidth.toFixed(4)}_${barnsleyProbabilityJitter.toFixed(4)}`
  const cached = fractalPathCache.get(key)
  if (cached) return cached
  const path = effectId === 'julia-fractal'
    ? createJuliaPath(config)
    : effectId === 'mandelbrot-orbit'
      ? createMandelbrotOrbitPath(config)
      : createBarnsleyFernPath(config)
  const sampledPath = resamplePath(path, FRACTAL_DRAW_POINTS)
  fractalPathCache.set(key, sampledPath)
  return sampledPath
}

const createVectorFieldStreamlinesPath = () => {
  const points: { x: number, y: number }[] = []
  const seedX = 12
  const seedY = 10
  const min = -12
  const max = 12
  const iterations = 180
  const stepSize = 0.19
  for (let gy = 0; gy < seedY; gy += 1) {
    for (let gx = 0; gx < seedX; gx += 1) {
      let x = min + ((max - min) * gx) / (seedX - 1)
      let y = min + ((max - min) * gy) / (seedY - 1)
      for (let i = 0; i < iterations; i += 1) {
        const vx = Math.sin(y * 0.62) + 0.58 * Math.cos(x * 1.31) + 0.21 * Math.sin((x + y) * 0.48)
        const vy = Math.cos(x * 0.57) - 0.52 * Math.sin(y * 1.17) + 0.21 * Math.cos((x - y) * 0.44)
        const speed = Math.hypot(vx, vy) + 1e-6
        x += (vx / speed) * stepSize
        y += (vy / speed) * stepSize
        if (Math.abs(x) > 15.5 || Math.abs(y) > 15.5) break
        points.push({ x, y })
      }
      points.push({ x: Number.NaN, y: Number.NaN })
    }
  }
  return points
}

const createGravityWellPath = () => {
  const points: { x: number, y: number }[] = []
  const orbitCount = 20
  const iterations = 280
  const dt = 0.042
  const mu = 48
  const softening = 0.8
  for (let i = 0; i < orbitCount; i += 1) {
    const angle = (Math.PI * 2 * i) / orbitCount
    const radius = 3.8 + i * 0.48
    let x = radius * Math.cos(angle)
    let y = radius * Math.sin(angle)
    const tangent = Math.sqrt(mu / Math.max(radius, 0.9))
    let vx = -Math.sin(angle) * tangent * (0.66 + i / (orbitCount * 2.2))
    let vy = Math.cos(angle) * tangent * (0.66 + i / (orbitCount * 2.2))
    for (let step = 0; step < iterations; step += 1) {
      const r2 = x * x + y * y + softening * softening
      const invR3 = 1 / (r2 * Math.sqrt(r2))
      const ax = -mu * x * invR3
      const ay = -mu * y * invR3
      vx = (vx + ax * dt) * 0.997
      vy = (vy + ay * dt) * 0.997
      x += vx * dt
      y += vy * dt
      if (x * x + y * y < 0.22) break
      if (Math.abs(x) > 24 || Math.abs(y) > 24) break
      points.push({ x, y })
    }
    points.push({ x: Number.NaN, y: Number.NaN })
  }
  return points
}

const createVortexFieldPath = () => {
  const points: { x: number, y: number }[] = []
  const seeds = 36
  const iterations = 230
  const dt = 0.056
  const vortices = [
    { x: -4.8, y: 0, strength: 17.5 },
    { x: 4.8, y: 0, strength: -17.5 },
  ]
  for (let i = 0; i < seeds; i += 1) {
    const angle = (Math.PI * 2 * i) / seeds
    let x = 10.8 * Math.cos(angle)
    let y = 7.4 * Math.sin(angle)
    for (let step = 0; step < iterations; step += 1) {
      let vx = 0
      let vy = 0
      for (let j = 0; j < vortices.length; j += 1) {
        const v = vortices[j]
        const dx = x - v.x
        const dy = y - v.y
        const r2 = dx * dx + dy * dy + 0.35
        vx += (-v.strength * dy) / r2
        vy += (v.strength * dx) / r2
      }
      vx += 0.42 * Math.sin(y * 0.25) - x * 0.055
      vy += 0.35 * Math.cos(x * 0.24) - y * 0.055
      const speed = Math.hypot(vx, vy) + 1e-6
      x += (vx / speed) * dt * 8
      y += (vy / speed) * dt * 8
      if (Math.abs(x) > 16.5 || Math.abs(y) > 16.5) break
      points.push({ x, y })
    }
    points.push({ x: Number.NaN, y: Number.NaN })
  }
  return points
}

const getPhysicsPath = (effectId: string) => {
  const cached = physicsPathCache.get(effectId)
  if (cached) return cached
  const path = effectId === 'vector-field-streamlines'
    ? createVectorFieldStreamlinesPath()
    : effectId === 'gravity-well'
      ? createGravityWellPath()
      : createVortexFieldPath()
  const sampledPath = resamplePath(path, PHYSICS_DRAW_POINTS)
  physicsPathCache.set(effectId, sampledPath)
  return sampledPath
}

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
    id: 'logarithmic-spiral',
    name: {
      en: 'Logarithmic Spiral',
      'zh-CN': '对数螺线',
    },
    formulaText: {
      en: 'r = a·exp(b·t),  x = rcos(ωt),  y = rsin(ωt)',
      'zh-CN': 'r = a·exp(b·t),  x = rcos(ωt),  y = rsin(ωt)',
    },
    tMin: 0,
    tMax: Math.PI * 8,
    step: 0.006,
    scale: 1,
    stroke: '#60a5fa',
    sampler: (t, config) => {
      const growth = clamp(config?.logSpiralGrowth ?? 0.12, 0.02, 0.35)
      const frequency = clamp(config?.logSpiralFrequency ?? 2.4, 0.6, 8)
      const scale = clamp(config?.logSpiralScale ?? 0.45, 0.12, 1.2)
      const r = scale * Math.exp(growth * t * 0.8)
      return {
        x: r * Math.cos(frequency * t),
        y: r * Math.sin(frequency * t),
      }
    },
  },
  {
    id: 'fermat-spiral-weave',
    name: {
      en: 'Fermat Spiral Weave',
      'zh-CN': '费马螺线编织',
    },
    formulaText: {
      en: 'r = a√|t|,  θ = kt,  x = sgn(t)·r·cos(θ),  y = r·sin(θ)',
      'zh-CN': 'r = a√|t|,  θ = kt,  x = sgn(t)·r·cos(θ),  y = r·sin(θ)',
    },
    tMin: -Math.PI * 16,
    tMax: Math.PI * 16,
    step: 0.01,
    scale: 0.64,
    stroke: '#22d3ee',
    sampler: (t, config) => {
      const a = clamp(config?.fermatSpiralScale ?? 11, 4, 18)
      const twist = clamp(config?.fermatSpiralTwist ?? 1.6, 0.6, 4)
      const radius = a * Math.sqrt(Math.abs(t) / (Math.PI * 2))
      const theta = twist * t
      const direction = t >= 0 ? 1 : -1
      return {
        x: direction * radius * Math.cos(theta),
        y: radius * Math.sin(theta),
      }
    },
  },
  {
    id: 'cardioid-deluxe',
    name: {
      en: 'Cardioid Deluxe',
      'zh-CN': '参数心形线',
    },
    formulaText: {
      en: 'x = 16w·sin³(t),  y = d·(13cos(t)-5cos(2t)-2cos(3t)-cos(4t))',
      'zh-CN': 'x = 16w·sin³(t),  y = d·(13cos(t)-5cos(2t)-2cos(3t)-cos(4t))',
    },
    tMin: 0,
    tMax: Math.PI * 2,
    step: 0.0026,
    scale: 0.78,
    stroke: '#f43f5e',
    sampler: (t, config) => {
      const depth = clamp(config?.heartDepth ?? 1, 0.5, 1.9)
      const width = clamp(config?.heartWidth ?? 1, 0.55, 1.8)
      return {
        x: 16 * width * Math.sin(t) ** 3,
        y: depth * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)),
      }
    },
  },
  {
    id: 'double-heart',
    name: {
      en: 'Double Heart Orbit',
      'zh-CN': '双心轨道',
    },
    formulaText: {
      en: 'H(t) = (1-b)·Heart(t) + b·Heart(t+π),  with horizontal offset',
      'zh-CN': 'H(t) = (1-b)·Heart(t) + b·Heart(t+π)，并加入水平偏移',
    },
    tMin: 0,
    tMax: Math.PI * 2,
    step: 0.0026,
    scale: 0.72,
    stroke: '#fb7185',
    sampler: (t, config) => {
      const depth = clamp(config?.heartDepth ?? 1, 0.5, 1.9)
      const width = clamp(config?.heartWidth ?? 1, 0.55, 1.8)
      const offset = clamp(config?.doubleHeartOffset ?? 3.2, 0.2, 8)
      const blend = clamp(config?.doubleHeartBlend ?? 0.5, 0, 1)
      const heartX = (angle: number) => 16 * width * Math.sin(angle) ** 3
      const heartY = (angle: number) => depth * (13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle))
      const leftX = heartX(t) - offset
      const leftY = heartY(t)
      const rightX = heartX(t + Math.PI) + offset
      const rightY = heartY(t + Math.PI)
      const weave = blend * (1 - blend) * 6 * Math.sin(2 * t)
      return {
        x: (1 - blend) * leftX + blend * rightX,
        y: (1 - blend) * leftY + blend * rightY + weave,
      }
    },
  },
  {
    id: 'epitrochoid-bloom',
    name: {
      en: 'Epitrochoid Bloom',
      'zh-CN': '外旋轮花盘',
    },
    formulaText: {
      en: 'x = (R+r)cos(t)-dcos((R+r)t/r+φ),  y = (R+r)sin(t)-dsin((R+r)t/r+φ)',
      'zh-CN': 'x = (R+r)cos(t)-dcos((R+r)t/r+φ),  y = (R+r)sin(t)-dsin((R+r)t/r+φ)',
    },
    tMin: 0,
    tMax: Math.PI * 18,
    step: 0.01,
    scale: 0.58,
    stroke: '#a78bfa',
    sampler: (t, config) => {
      const ratio = clamp(config?.trochoidRatio ?? 3.2, 1.2, 8)
      const offset = clamp(config?.trochoidOffset ?? 5.2, 0.2, 8)
      const phase = clamp(config?.trochoidPhase ?? 0, 0, Math.PI * 2)
      const r = 2.2
      const R = ratio * r
      const frequency = ((R + r) * t) / r + phase
      return {
        x: (R + r) * Math.cos(t) - offset * Math.cos(frequency),
        y: (R + r) * Math.sin(t) - offset * Math.sin(frequency),
      }
    },
  },
  {
    id: 'hypotrochoid-weave',
    name: {
      en: 'Hypotrochoid Weave',
      'zh-CN': '内旋轮织纹',
    },
    formulaText: {
      en: 'x = (R-r)cos(t)+dcos((R-r)t/r+φ),  y = (R-r)sin(t)-dsin((R-r)t/r+φ)',
      'zh-CN': 'x = (R-r)cos(t)+dcos((R-r)t/r+φ),  y = (R-r)sin(t)-dsin((R-r)t/r+φ)',
    },
    tMin: 0,
    tMax: Math.PI * 24,
    step: 0.01,
    scale: 0.72,
    stroke: '#818cf8',
    sampler: (t, config) => {
      const ratio = clamp(config?.trochoidRatio ?? 3.2, 1.2, 8)
      const offset = clamp(config?.trochoidOffset ?? 5.2, 0.2, 8)
      const phase = clamp(config?.trochoidPhase ?? 0, 0, Math.PI * 2)
      const r = 2.2
      const R = ratio * r
      const frequency = ((R - r) * t) / r + phase
      return {
        x: (R - r) * Math.cos(t) + offset * Math.cos(frequency),
        y: (R - r) * Math.sin(t) - offset * Math.sin(frequency),
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
    id: 'julia-fractal',
    name: {
      en: 'Julia Fractal',
      'zh-CN': 'Julia 分形轨迹',
    },
    formulaText: {
      en: 'z(n+1) = z(n)² + c,  c = cre + cim·i',
      'zh-CN': 'z(n+1) = z(n)² + c，c = cre + cim·i',
    },
    tMin: 0,
    tMax: FRACTAL_DRAW_POINTS - 1,
    step: 1,
    scale: 1,
    stroke: '#a78bfa',
    sampler: (t, config) => {
      const path = getFractalPath('julia-fractal', config)
      const idx = clamp(Math.floor(t), 0, path.length - 1)
      return path[idx]
    },
  },
  {
    id: 'mandelbrot-orbit',
    name: {
      en: 'Mandelbrot Orbit Trails',
      'zh-CN': 'Mandelbrot 轨迹',
    },
    formulaText: {
      en: 'z(n+1) = z(n)² + c,  c sampled on boundary band',
      'zh-CN': 'z(n+1) = z(n)² + c，c 采样于边界带宽区域',
    },
    tMin: 0,
    tMax: FRACTAL_DRAW_POINTS - 1,
    step: 1,
    scale: 1,
    stroke: '#22d3ee',
    sampler: (t, config) => {
      const path = getFractalPath('mandelbrot-orbit', config)
      const idx = clamp(Math.floor(t), 0, path.length - 1)
      return path[idx]
    },
  },
  {
    id: 'barnsley-fern',
    name: {
      en: 'Barnsley Fern',
      'zh-CN': 'Barnsley 蕨',
    },
    formulaText: {
      en: 'IFS affine maps with probability jitter on (0.01, 0.85, 0.07, 0.07)',
      'zh-CN': '在概率 (0.01, 0.85, 0.07, 0.07) 上加入扰动的 IFS 仿射变换',
    },
    tMin: 0,
    tMax: FRACTAL_DRAW_POINTS - 1,
    step: 1,
    scale: 1,
    stroke: '#34d399',
    sampler: (t, config) => {
      const path = getFractalPath('barnsley-fern', config)
      const idx = clamp(Math.floor(t), 0, path.length - 1)
      return path[idx]
    },
  },
  {
    id: 'vector-field-streamlines',
    name: {
      en: 'Vector Field Streamlines',
      'zh-CN': '向量场流线',
    },
    formulaText: {
      en: 'dX/ds = F(X),  F(x,y) = [sin(0.62y)+0.58cos(1.31x), cos(0.57x)-0.52sin(1.17y)]',
      'zh-CN': 'dX/ds = F(X)，F(x,y) = [sin(0.62y)+0.58cos(1.31x), cos(0.57x)-0.52sin(1.17y)]',
    },
    tMin: 0,
    tMax: PHYSICS_DRAW_POINTS - 1,
    step: 1,
    scale: 1,
    stroke: '#38bdf8',
    sampler: t => {
      const path = getPhysicsPath('vector-field-streamlines')
      const idx = clamp(Math.floor(t), 0, path.length - 1)
      return path[idx]
    },
  },
  {
    id: 'gravity-well',
    name: {
      en: 'Gravity Well',
      'zh-CN': '引力井',
    },
    formulaText: {
      en: 'r¨ = -μr/|r|³  with softening and damping',
      'zh-CN': 'r¨ = -μr/|r|³，并加入软化与阻尼',
    },
    tMin: 0,
    tMax: PHYSICS_DRAW_POINTS - 1,
    step: 1,
    scale: 1,
    stroke: '#f59e0b',
    sampler: t => {
      const path = getPhysicsPath('gravity-well')
      const idx = clamp(Math.floor(t), 0, path.length - 1)
      return path[idx]
    },
  },
  {
    id: 'vortex-field',
    name: {
      en: 'Vortex Field',
      'zh-CN': '涡旋场',
    },
    formulaText: {
      en: 'u = Σ Γk × (x-ck)/|x-ck|² + drift',
      'zh-CN': 'u = Σ Γk × (x-ck)/|x-ck|² + 漂移项',
    },
    tMin: 0,
    tMax: PHYSICS_DRAW_POINTS - 1,
    step: 1,
    scale: 1,
    stroke: '#2dd4bf',
    sampler: t => {
      const path = getPhysicsPath('vortex-field')
      const idx = clamp(Math.floor(t), 0, path.length - 1)
      return path[idx]
    },
  },
  {
    id: 'lorenz-attractor',
    name: {
      en: 'Lorenz Attractor',
      'zh-CN': '洛伦兹吸引子',
    },
    formulaText: {
      en: 'dx/dt=σ(y-x), dy/dt=x(ρ-z)-y, dz/dt=xy-βz',
      'zh-CN': 'dx/dt=σ(y-x), dy/dt=x(ρ-z)-y, dz/dt=xy-βz',
    },
    tMin: 0,
    tMax: CHAOS_DRAW_POINTS - 1,
    step: 1,
    scale: 1,
    stroke: '#22d3ee',
    sampler: (t, config) => {
      const path = getChaosPath('lorenz-attractor', config)
      const idx = clamp(Math.floor(t), 0, path.length - 1)
      return path[idx]
    },
  },
  {
    id: 'rossler-attractor',
    name: {
      en: 'Rössler Attractor',
      'zh-CN': '罗丝勒吸引子',
    },
    formulaText: {
      en: 'dx/dt=-y-z, dy/dt=x+ay, dz/dt=b+z(x-c)',
      'zh-CN': 'dx/dt=-y-z, dy/dt=x+ay, dz/dt=b+z(x-c)',
    },
    tMin: 0,
    tMax: CHAOS_DRAW_POINTS - 1,
    step: 1,
    scale: 1,
    stroke: '#f59e0b',
    sampler: (t, config) => {
      const path = getChaosPath('rossler-attractor', config)
      const idx = clamp(Math.floor(t), 0, path.length - 1)
      return path[idx]
    },
  },
  {
    id: 'aizawa-attractor',
    name: {
      en: 'Aizawa Attractor',
      'zh-CN': '相泽吸引子',
    },
    formulaText: {
      en: 'dx/dt=(z-b)x-dy, dy/dt=dx+(z-b)y, dz/dt=c+az-z³/3-r²(1+ez)+fzx³',
      'zh-CN': 'dx/dt=(z-b)x-dy, dy/dt=dx+(z-b)y, dz/dt=c+az-z³/3-r²(1+ez)+fzx³',
    },
    tMin: 0,
    tMax: CHAOS_DRAW_POINTS - 1,
    step: 1,
    scale: 1,
    stroke: '#34d399',
    sampler: (t, config) => {
      const path = getChaosPath('aizawa-attractor', config)
      const idx = clamp(Math.floor(t), 0, path.length - 1)
      return path[idx]
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
