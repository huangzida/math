import type { MathBeautyProps } from '../../types'
import { clamp, createSeededRandom, gcd, pushCell, resamplePath, type Point } from './shared'

type ChaosSystemId = 'lorenz' | 'rossler' | 'aizawa'

export const CHAOS_DRAW_POINTS = 9000
const CHAOS_BURN_IN = 1200
export const FRACTAL_DRAW_POINTS = 9000
export const PHYSICS_DRAW_POINTS = 9000
export const IMPLICIT_DRAW_POINTS = 9000

const createCoprimePath = (limit: number) => {
  const points: Point[] = []
  for (let y = -limit; y < limit; y += 1) {
    for (let x = -limit; x < limit; x += 1) {
      if (x === 0 && y === 0) continue
      if (gcd(x, y) !== 1) continue
      pushCell(points, x, y)
    }
  }
  return points
}

const createGcdLayerPath = (limit: number, target: number) => {
  const points: Point[] = []
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
  const points: Point[] = []
  for (let y = -limit; y < limit; y += 1) {
    for (let x = -limit; x < limit; x += 1) {
      const value = ((x * x + y * y) % prime + prime) % prime
      if (!residues.has(value)) continue
      pushCell(points, x, y)
    }
  }
  return points
}

const coprimePath = createCoprimePath(16)
const gcdLayerPath = createGcdLayerPath(16, 3)
const quadraticResiduePath = createQuadraticResiduePath(16, 29)

export const getCoprimePath = () => coprimePath
export const getGcdLayerPath = () => gcdLayerPath
export const getQuadraticResiduePath = () => quadraticResiduePath

const createTimesTablePath = (count: number, multiplier: number, radius: number) => {
  const points: Point[] = []
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

const timesTablePathCache = new Map<string, Point[]>()

export const getTimesTablePath = (count: number, multiplier: number, radius: number) => {
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

const chaosPathCache = new Map<string, Point[]>()

export const getChaosPath = (effectId: string, config?: MathBeautyProps) => {
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
  const source: Point[] = []
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
  const path: Point[] = []
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

const createJuliaPath = (config?: MathBeautyProps) => {
  const seedCount = 280
  const iterations = 52
  const cRe = clamp(config?.juliaCRe ?? -0.745, -1.2, 0.4)
  const cIm = clamp(config?.juliaCIm ?? 0.186, -0.8, 0.8)
  const points: Point[] = []
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
  const points: Point[] = []
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
  const points: Point[] = []
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

const fractalPathCache = new Map<string, Point[]>()

export const getFractalPath = (effectId: string, config?: MathBeautyProps) => {
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
  const points: Point[] = []
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
  const points: Point[] = []
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
  const points: Point[] = []
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

const createLissajousRibbonPath = (config?: MathBeautyProps) => {
  const amp = clamp(config?.lissajousRibbonAmp ?? 9.5, 4, 14)
  const freqX = clamp(config?.lissajousRibbonFreqX ?? 3.2, 1, 8)
  const freqY = clamp(config?.lissajousRibbonFreqY ?? 4.1, 1, 8)
  const phase = clamp(config?.lissajousRibbonPhase ?? Math.PI / 3, -Math.PI, Math.PI)
  const twist = clamp(config?.lissajousRibbonTwist ?? 1.1, 0, 2.4)
  const stripCount = Math.floor(clamp(4 + twist * 2.6, 4, 10))
  const points: Point[] = []
  const samplesPerStrip = 1200
  for (let strip = 0; strip < stripCount; strip += 1) {
    const ratio = stripCount <= 1 ? 0 : strip / (stripCount - 1)
    const offset = (ratio - 0.5) * twist
    for (let i = 0; i <= samplesPerStrip; i += 1) {
      const t = (Math.PI * 2 * i) / samplesPerStrip
      const x = amp * Math.sin(freqX * t + phase + offset)
      const y = amp * Math.sin(freqY * t - offset)
      const warp = amp * 0.14 * Math.sin((freqX + freqY) * t + offset * 3)
      points.push({
        x: x + warp * Math.cos(t),
        y: y + warp * Math.sin(t),
      })
    }
    points.push({ x: Number.NaN, y: Number.NaN })
  }
  return points
}

const createStrangeAttractorInkPath = (config?: MathBeautyProps) => {
  const a = clamp(config?.strangeInkA ?? 1.65, -3.2, 3.2)
  const b = clamp(config?.strangeInkB ?? -2.05, -3.2, 3.2)
  const c = clamp(config?.strangeInkC ?? 1.55, -3.2, 3.2)
  const d = clamp(config?.strangeInkD ?? 0.82, -3.2, 3.2)
  const scale = clamp(config?.strangeInkScale ?? 1.05, 0.45, 2.2)
  const source: Point[] = []
  let x = 0.1
  let y = 0
  const total = 28000
  const burnIn = 900
  for (let i = 0; i < total; i += 1) {
    const nextX = Math.sin(a * y) - Math.cos(b * x)
    const nextY = Math.sin(c * x) - Math.cos(d * y)
    x = nextX
    y = nextY
    if (i >= burnIn && Number.isFinite(x) && Number.isFinite(y)) {
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
  const radius = 13 * scale
  return source.map(point => ({
    x: ((point.x - centerX) / extent) * radius,
    y: ((point.y - centerY) / extent) * radius,
  }))
}

const createVortexSpiralPath = (config?: MathBeautyProps) => {
  const turns = clamp(config?.vortexSpiralTurns ?? 8.2, 2, 18)
  const curl = clamp(config?.vortexSpiralCurl ?? 1.3, 0.2, 4.5)
  const drift = clamp(config?.vortexSpiralDrift ?? 0.09, 0.01, 0.25)
  const wave = clamp(config?.vortexSpiralWave ?? 1.2, 0, 4)
  const scale = clamp(config?.vortexSpiralScale ?? 6.6, 2.4, 12)
  const points: Point[] = []
  const armCount = Math.floor(clamp(2 + curl * 2.4, 2, 12))
  const samplesPerArm = 1600
  const radialPitch = 1.25 + drift * 3.2
  const waveAmp = wave * 0.16 * scale
  const layerCount = 3
  for (let layer = 0; layer < layerCount; layer += 1) {
    const layerPhaseOffset = (layer - 1) * 0.095 * (1 + 0.35 * curl)
    const layerScaleOffset = 1 + (layer - 1) * 0.035
    for (let arm = 0; arm < armCount; arm += 1) {
      const armPhase = (Math.PI * 2 * arm) / armCount
      for (let i = 0; i <= samplesPerArm; i += 1) {
        const u = i / samplesPerArm
        const theta = u * Math.PI * 2 * turns + armPhase + layerPhaseOffset
        const radius = (0.75 + u * scale * radialPitch) * layerScaleOffset
        const ripple = waveAmp * Math.sin((8 + curl * 2.2) * u * Math.PI + armPhase * 1.8 + layerPhaseOffset * 3)
        points.push({
          x: (radius + ripple) * Math.cos(theta),
          y: (radius + ripple) * Math.sin(theta),
        })
      }
      points.push({ x: Number.NaN, y: Number.NaN })
    }
  }
  return points
}

const createParticleFlowWeavePath = (config?: MathBeautyProps) => {
  const density = Math.floor(clamp(config?.particleFlowDensity ?? 36, 12, 72))
  const step = clamp(config?.particleFlowStep ?? 0.16, 0.06, 0.38)
  const twist = clamp(config?.particleFlowTwist ?? 1.1, 0.2, 3.2)
  const bias = clamp(config?.particleFlowBias ?? 0.62, -1.2, 1.2)
  const scale = clamp(config?.particleFlowScale ?? 1, 0.45, 2.2)
  const seed = Math.floor((density * 97 + twist * 131 + bias * 163 + scale * 191) * 1000)
  const random = createSeededRandom(seed)
  const points: Point[] = []
  const seedCount = Math.floor(density * 1.8)
  const iterations = 240
  const dashPeriod = Math.floor(clamp(8 + twist * 2.2, 8, 18))
  const drawSpan = Math.floor(clamp(dashPeriod * 0.38, 2, 7))
  for (let i = 0; i < seedCount; i += 1) {
    const angle = (Math.PI * 2 * i) / density
    const startRadius = 7.2 + random() * 7.8
    let x = startRadius * Math.cos(angle) + (random() - 0.5) * 1.4
    let y = startRadius * Math.sin(angle) + (random() - 0.5) * 1.4
    const dashPhase = Math.floor(random() * dashPeriod)
    let isGap = false
    for (let n = 0; n < iterations; n += 1) {
      const r = Math.hypot(x, y) + 1e-6
      const centerPull = 0.28 + 0.2 * twist
      const swirl = 2.1 + twist * 1.9
      const attractX = -centerPull * x / (1 + 0.03 * r * r)
      const attractY = -centerPull * y / (1 + 0.03 * r * r)
      const swirlX = (-y / r) * swirl
      const swirlY = (x / r) * swirl
      const harmonicX = 0.65 * Math.sin((y + bias * 2.2) * (0.7 + 0.3 * twist)) + 0.35 * Math.cos(x * 0.42)
      const harmonicY = 0.65 * Math.cos((x - bias * 2.2) * (0.7 + 0.3 * twist)) + 0.35 * Math.sin(y * 0.42)
      const vx = attractX + swirlX + harmonicX
      const vy = attractY + swirlY + harmonicY
      const speed = Math.hypot(vx, vy) + 1e-6
      x += (vx / speed) * step * 4.8
      y += (vy / speed) * step * 4.8
      if (Math.abs(x) > 16.8 || Math.abs(y) > 16.8) break
      const draw = ((n + dashPhase) % dashPeriod) < drawSpan
      if (draw) {
        isGap = false
        points.push({
          x: x * scale,
          y: y * scale,
        })
      }
      else if (!isGap) {
        isGap = true
        points.push({ x: Number.NaN, y: Number.NaN })
      }
    }
    points.push({ x: Number.NaN, y: Number.NaN })
  }
  return points
}

const createFlourishCurveBloomPath = (config?: MathBeautyProps) => {
  const petals = Math.floor(clamp(config?.flourishPetals ?? 6, 3, 16))
  const bloom = clamp(config?.flourishBloom ?? 0.75, 0.1, 2)
  const twist = clamp(config?.flourishTwist ?? 1.6, 0.2, 5)
  const phase = clamp(config?.flourishPhase ?? 0.5, -Math.PI, Math.PI)
  const scale = clamp(config?.flourishScale ?? 8.5, 3.5, 14)
  const points: Point[] = []
  const loops = 3
  const samples = 4200
  const maxT = Math.PI * 2 * loops
  for (let i = 0; i <= samples; i += 1) {
    const t = (maxT * i) / samples
    points.push({
      x: scale * (Math.sin(petals * t) + bloom * Math.sin((petals + twist) * t + phase)),
      y: scale * (Math.cos(petals * t) - bloom * Math.cos((petals - twist) * t - phase)),
    })
  }
  return points
}

const createInterferenceFieldPath = (config?: MathBeautyProps) => {
  const freqX = clamp(config?.interferenceFreqX ?? 3.4, 0.8, 9)
  const freqY = clamp(config?.interferenceFreqY ?? 4.7, 0.8, 9)
  const phase = clamp(config?.interferencePhase ?? 0.7, -Math.PI, Math.PI)
  const drift = clamp(config?.interferenceDrift ?? 1, 0, 3)
  const scale = clamp(config?.interferenceScale ?? 8.5, 3.5, 14)
  const points: Point[] = []
  const lines = 10
  const samples = 780
  for (let line = 0; line < lines; line += 1) {
    const linePhase = (line / lines) * Math.PI * 2
    for (let i = 0; i <= samples; i += 1) {
      const t = (Math.PI * 2 * i) / samples
      points.push({
        x: scale * Math.sin(freqX * t + drift * Math.sin(0.5 * t + linePhase)),
        y: scale * Math.sin(freqY * t + phase + linePhase) + scale * 0.35 * Math.sin((freqX - freqY) * t - linePhase),
      })
    }
    points.push({ x: Number.NaN, y: Number.NaN })
  }
  return points
}

const createWavefrontInterferencePath = (config?: MathBeautyProps) => {
  const k1 = clamp(config?.wavefrontK1 ?? 2.6, 0.8, 8)
  const k2 = clamp(config?.wavefrontK2 ?? 3.8, 0.8, 8)
  const distance = clamp(config?.wavefrontDistance ?? 3.6, 0.6, 8)
  const phase = clamp(config?.wavefrontPhase ?? 0.55, -Math.PI, Math.PI)
  const scale = clamp(config?.wavefrontScale ?? 4.2, 1.2, 10)
  const points: Point[] = []
  const rows = 22
  const samples = 520
  const span = 14
  for (let row = 0; row < rows; row += 1) {
    const yOffset = -7 + (14 * row) / Math.max(1, rows - 1)
    for (let i = 0; i <= samples; i += 1) {
      const x = -span + (span * 2 * i) / samples
      const r1 = Math.hypot(x + distance, yOffset + 1.2)
      const r2 = Math.hypot(x - distance, yOffset - 1.2)
      const wave = Math.sin(k1 * r1 + phase) + Math.sin(k2 * r2 - phase)
      points.push({
        x,
        y: yOffset + wave * scale * 0.26,
      })
    }
    points.push({ x: Number.NaN, y: Number.NaN })
  }
  return points
}

const physicsPathCache = new Map<string, Point[]>()

export const getPhysicsPath = (effectId: string, config?: MathBeautyProps) => {
  const lissajousRibbonAmp = clamp(config?.lissajousRibbonAmp ?? 9.5, 4, 14)
  const lissajousRibbonFreqX = clamp(config?.lissajousRibbonFreqX ?? 3.2, 1, 8)
  const lissajousRibbonFreqY = clamp(config?.lissajousRibbonFreqY ?? 4.1, 1, 8)
  const lissajousRibbonPhase = clamp(config?.lissajousRibbonPhase ?? Math.PI / 3, -Math.PI, Math.PI)
  const lissajousRibbonTwist = clamp(config?.lissajousRibbonTwist ?? 1.1, 0, 2.4)
  const strangeInkA = clamp(config?.strangeInkA ?? 1.65, -3.2, 3.2)
  const strangeInkB = clamp(config?.strangeInkB ?? -2.05, -3.2, 3.2)
  const strangeInkC = clamp(config?.strangeInkC ?? 1.55, -3.2, 3.2)
  const strangeInkD = clamp(config?.strangeInkD ?? 0.82, -3.2, 3.2)
  const strangeInkScale = clamp(config?.strangeInkScale ?? 1.05, 0.45, 2.2)
  const vortexSpiralTurns = clamp(config?.vortexSpiralTurns ?? 8.2, 2, 18)
  const vortexSpiralCurl = clamp(config?.vortexSpiralCurl ?? 1.3, 0.2, 4.5)
  const vortexSpiralDrift = clamp(config?.vortexSpiralDrift ?? 0.09, 0.01, 0.25)
  const vortexSpiralWave = clamp(config?.vortexSpiralWave ?? 1.2, 0, 4)
  const vortexSpiralScale = clamp(config?.vortexSpiralScale ?? 6.6, 2.4, 12)
  const particleFlowDensity = Math.floor(clamp(config?.particleFlowDensity ?? 36, 12, 72))
  const particleFlowStep = clamp(config?.particleFlowStep ?? 0.16, 0.06, 0.38)
  const particleFlowTwist = clamp(config?.particleFlowTwist ?? 1.1, 0.2, 3.2)
  const particleFlowBias = clamp(config?.particleFlowBias ?? 0.62, -1.2, 1.2)
  const particleFlowScale = clamp(config?.particleFlowScale ?? 1, 0.45, 2.2)
  const flourishPetals = Math.floor(clamp(config?.flourishPetals ?? 6, 3, 16))
  const flourishBloom = clamp(config?.flourishBloom ?? 0.75, 0.1, 2)
  const flourishTwist = clamp(config?.flourishTwist ?? 1.6, 0.2, 5)
  const flourishPhase = clamp(config?.flourishPhase ?? 0.5, -Math.PI, Math.PI)
  const flourishScale = clamp(config?.flourishScale ?? 8.5, 3.5, 14)
  const interferenceFreqX = clamp(config?.interferenceFreqX ?? 3.4, 0.8, 9)
  const interferenceFreqY = clamp(config?.interferenceFreqY ?? 4.7, 0.8, 9)
  const interferencePhase = clamp(config?.interferencePhase ?? 0.7, -Math.PI, Math.PI)
  const interferenceDrift = clamp(config?.interferenceDrift ?? 1, 0, 3)
  const interferenceScale = clamp(config?.interferenceScale ?? 8.5, 3.5, 14)
  const wavefrontK1 = clamp(config?.wavefrontK1 ?? 2.6, 0.8, 8)
  const wavefrontK2 = clamp(config?.wavefrontK2 ?? 3.8, 0.8, 8)
  const wavefrontDistance = clamp(config?.wavefrontDistance ?? 3.6, 0.6, 8)
  const wavefrontPhase = clamp(config?.wavefrontPhase ?? 0.55, -Math.PI, Math.PI)
  const wavefrontScale = clamp(config?.wavefrontScale ?? 4.2, 1.2, 10)
  const key = `${effectId}_${lissajousRibbonAmp.toFixed(3)}_${lissajousRibbonFreqX.toFixed(3)}_${lissajousRibbonFreqY.toFixed(3)}_${lissajousRibbonPhase.toFixed(3)}_${lissajousRibbonTwist.toFixed(3)}_${strangeInkA.toFixed(3)}_${strangeInkB.toFixed(3)}_${strangeInkC.toFixed(3)}_${strangeInkD.toFixed(3)}_${strangeInkScale.toFixed(3)}_${vortexSpiralTurns.toFixed(3)}_${vortexSpiralCurl.toFixed(3)}_${vortexSpiralDrift.toFixed(3)}_${vortexSpiralWave.toFixed(3)}_${vortexSpiralScale.toFixed(3)}_${particleFlowDensity}_${particleFlowStep.toFixed(3)}_${particleFlowTwist.toFixed(3)}_${particleFlowBias.toFixed(3)}_${particleFlowScale.toFixed(3)}_${flourishPetals}_${flourishBloom.toFixed(3)}_${flourishTwist.toFixed(3)}_${flourishPhase.toFixed(3)}_${flourishScale.toFixed(3)}_${interferenceFreqX.toFixed(3)}_${interferenceFreqY.toFixed(3)}_${interferencePhase.toFixed(3)}_${interferenceDrift.toFixed(3)}_${interferenceScale.toFixed(3)}_${wavefrontK1.toFixed(3)}_${wavefrontK2.toFixed(3)}_${wavefrontDistance.toFixed(3)}_${wavefrontPhase.toFixed(3)}_${wavefrontScale.toFixed(3)}`
  const cached = physicsPathCache.get(key)
  if (cached) return cached
  const path = effectId === 'vector-field-streamlines'
    ? createVectorFieldStreamlinesPath()
    : effectId === 'gravity-well'
      ? createGravityWellPath()
      : effectId === 'vortex-field'
        ? createVortexFieldPath()
        : effectId === 'lissajous-ribbon'
          ? createLissajousRibbonPath(config)
          : effectId === 'strange-attractor-ink'
            ? createStrangeAttractorInkPath(config)
            : effectId === 'vortex-spiral'
              ? createVortexSpiralPath(config)
              : effectId === 'particle-flow-weave'
                ? createParticleFlowWeavePath(config)
                : effectId === 'flourish-curve-bloom'
                  ? createFlourishCurveBloomPath(config)
                  : effectId === 'interference-field'
                    ? createInterferenceFieldPath(config)
                    : createWavefrontInterferencePath(config)
  const sampledPath = resamplePath(path, PHYSICS_DRAW_POINTS)
  physicsPathCache.set(key, sampledPath)
  return sampledPath
}

const createImplicitContourPath = (
  field: (x: number, y: number) => number,
  range: number,
  step: number,
) => {
  const points: Point[] = []
  const addSegment = (a: Point, b: Point) => {
    points.push(a, b, { x: Number.NaN, y: Number.NaN })
  }
  const lerp = (
    ax: number,
    ay: number,
    av: number,
    bx: number,
    by: number,
    bv: number,
  ) => {
    const denom = av - bv
    if (!Number.isFinite(denom) || Math.abs(denom) < 1e-10) {
      return { x: (ax + bx) * 0.5, y: (ay + by) * 0.5 }
    }
    const t = clamp(av / denom, 0, 1)
    return {
      x: ax + (bx - ax) * t,
      y: ay + (by - ay) * t,
    }
  }
  for (let y = -range; y < range; y += step) {
    for (let x = -range; x < range; x += step) {
      const x0 = x
      const y0 = y
      const x1 = x + step
      const y1 = y + step
      const f00 = field(x0, y0)
      const f10 = field(x1, y0)
      const f11 = field(x1, y1)
      const f01 = field(x0, y1)
      if (!Number.isFinite(f00) || !Number.isFinite(f10) || !Number.isFinite(f11) || !Number.isFinite(f01)) {
        continue
      }
      let mask = 0
      if (f00 > 0) mask |= 1
      if (f10 > 0) mask |= 2
      if (f11 > 0) mask |= 4
      if (f01 > 0) mask |= 8
      if (mask === 0 || mask === 15) continue
      const e0 = lerp(x0, y0, f00, x1, y0, f10)
      const e1 = lerp(x1, y0, f10, x1, y1, f11)
      const e2 = lerp(x1, y1, f11, x0, y1, f01)
      const e3 = lerp(x0, y1, f01, x0, y0, f00)
      switch (mask) {
        case 1:
        case 14:
          addSegment(e3, e0)
          break
        case 2:
        case 13:
          addSegment(e0, e1)
          break
        case 3:
        case 12:
          addSegment(e3, e1)
          break
        case 4:
        case 11:
          addSegment(e1, e2)
          break
        case 5:
          addSegment(e3, e2)
          addSegment(e0, e1)
          break
        case 6:
        case 9:
          addSegment(e0, e2)
          break
        case 7:
        case 8:
          addSegment(e3, e2)
          break
        case 10:
          addSegment(e3, e0)
          addSegment(e1, e2)
          break
      }
    }
  }
  return points
}

const safeTan = (value: number, guard: number) => {
  const cosValue = Math.cos(value)
  if (Math.abs(cosValue) < guard) return Number.NaN
  return Math.tan(value)
}

const safeCot = (value: number, guard: number) => {
  const sinValue = Math.sin(value)
  if (Math.abs(sinValue) < guard) return Number.NaN
  return Math.cos(value) / sinValue
}

const implicitPathCache = new Map<string, Point[]>()

export const getImplicitPath = (effectId: string, config?: MathBeautyProps) => {
  const range = clamp(config?.implicitRange ?? 9.4, 4, 16)
  const step = clamp(config?.implicitStep ?? 0.22, 0.08, 0.5)
  const waveMix = clamp(config?.implicitWaveMix ?? 1, 0.2, 2.4)
  const guard = clamp(config?.implicitSingularityGuard ?? 0.08, 0.01, 0.2)
  const crossMix = clamp(config?.implicitCrossMix ?? 1, 0.2, 2.4)
  const expMix = clamp(config?.implicitExpMix ?? 1, 0.4, 2.2)
  const nestedMix = clamp(config?.implicitNestedMix ?? 1, 0.25, 3)
  const gcdScale = clamp(config?.implicitGcdScale ?? 6, 1, 24)
  const bias = clamp(config?.implicitBias ?? 0.8, -1.8, 1.8)
  const parabolaTarget = clamp(config?.implicitParabolaTarget ?? 1, 0.2, 2.4)
  const key = `${effectId}_${range.toFixed(3)}_${step.toFixed(3)}_${waveMix.toFixed(3)}_${guard.toFixed(3)}_${crossMix.toFixed(3)}_${expMix.toFixed(3)}_${nestedMix.toFixed(3)}_${gcdScale.toFixed(3)}_${bias.toFixed(3)}_${parabolaTarget.toFixed(3)}`
  const cached = implicitPathCache.get(key)
  if (cached) return cached
  const path = effectId === 'sine-square-lattice'
    ? createImplicitContourPath((x, y) => Math.sin(x * x) - Math.sin(y ** 4), range, step)
    : effectId === 'resonant-implicit-wave'
      ? createImplicitContourPath((x, y) => y - x * Math.sin((x * x + y * y) * waveMix), range, step)
      : effectId === 'tan-cot-implicit-maze'
        ? createImplicitContourPath(
            (x, y) => {
              const left = safeTan(x * x, guard) * safeTan(y * y, guard)
              const right = safeCot(x * y, guard)
              if (!Number.isFinite(left) || !Number.isFinite(right)) return Number.NaN
              return left - right
            },
            range,
            step,
          )
        : effectId === 'symmetric-sine-cross'
          ? createImplicitContourPath(
              (x, y) => y * Math.sin(x * x * crossMix) - x * Math.sin(y * y * crossMix),
              range,
              step,
            )
          : effectId === 'exp-trig-balance'
            ? createImplicitContourPath(
                (x, y) => 2 * Math.sin(x * waveMix) + Math.cos(y * waveMix) - Math.exp(Math.sin(x * y * expMix)),
                range,
                step,
              )
            : effectId === 'sin-tan-nexus'
              ? createImplicitContourPath(
                  (x, y) => Math.sin((x * x + y * y) * waveMix) - Math.tan(Math.sin((x + y) * crossMix)),
                  range,
                  step,
                )
              : effectId === 'nested-sine-shear'
                ? createImplicitContourPath(
                    (x, y) => {
                      const denominator = Math.sin(y * nestedMix)
                      if (Math.abs(denominator) < guard) return Number.NaN
                      const inner = Math.sin(x * nestedMix) / denominator
                      return y - x * Math.sin(inner * waveMix)
                    },
                    range,
                    step,
                  )
                : effectId === 'gcd-cos-interference'
                  ? createImplicitContourPath(
                      (x, y) => {
                        const ix = Math.max(1, Math.round(Math.abs(x) * gcdScale))
                        const iy = Math.max(1, Math.round(Math.abs(y) * gcdScale))
                        const g = gcd(ix, iy) / gcdScale
                        return Math.sin(g * waveMix) - Math.cos(x * y * crossMix)
                      },
                      range,
                      step,
                    )
                  : effectId === 'sine-square-bias-bands'
                    ? createImplicitContourPath(
                        (x, y) => Math.sin(x * x * waveMix) + Math.sin(y * y * crossMix) - bias,
                        range,
                        step,
                      )
                    : effectId === 'cubic-xy-balance'
                      ? createImplicitContourPath(
                          (x, y) => x ** 3 + y ** 3 - 5 * x * y,
                          range,
                          step,
                        )
                      : effectId === 'sine-y-cross-bands'
                        ? createImplicitContourPath(
                            (x, y) => Math.sin(2 * y) - 2 * Math.sin(x),
                            range,
                            step,
                          )
                        : effectId === 'tan-sin-mirror-field'
                          ? createImplicitContourPath(
                              (x, y) => {
                                const left = safeTan(x * x * Math.sin(y * y), guard)
                                const right = safeTan(y * y * Math.sin(x * x), guard)
                                if (!Number.isFinite(left) || !Number.isFinite(right)) return Number.NaN
                                return left - right
                              },
                              range,
                              step,
                            )
                          : createImplicitContourPath(
                              (x, y) => (y * y * nestedMix) / 2 + Math.sin(x * waveMix) - parabolaTarget,
                              range,
                              step,
                            )
  const sampledPath = resamplePath(path, IMPLICIT_DRAW_POINTS)
  implicitPathCache.set(key, sampledPath)
  return sampledPath
}
