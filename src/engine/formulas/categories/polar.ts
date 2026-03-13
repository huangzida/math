import type { FormulaDefinition } from '../../../types'
import { clamp } from '../shared'

export const cardioidFormula: FormulaDefinition = {
  id: 'cardioid',
  name: {
    en: 'Cardioid',
    'zh-CN': '心形线',
  },
  formulaText: {
    en: 'r = 8s(1 - cos(t)) + d·sin(3t),  x = rcos(t),  y = rsin(t)',
    'zh-CN': 'r = 8s(1 - cos(t)) + d·sin(3t),  x = rcos(t),  y = rsin(t)',
  },
  tMin: 0,
  tMax: Math.PI * 2,
  step: 0.1,
  scale: 1.05,
  stroke: '#fb7185',
  sampler: (t, config) => {
    const scale = clamp(config?.cardioidScale ?? 1, 0.55, 1.9)
    const distortion = clamp(config?.cardioidDistortion ?? 0, 0, 3.2)
    const r = 8 * scale * (1 - Math.cos(t)) + distortion * Math.sin(3 * t)
    return {
      x: r * Math.cos(t),
      y: r * Math.sin(t),
    }
  },
}

export const limaconFormula: FormulaDefinition = {
  id: 'limacon',
  name: {
    en: 'Limaçon',
    'zh-CN': '帕斯卡蜗线',
  },
  formulaText: {
    en: 'r = (6 + o) + 9ℓcos(t),  x = rcos(t),  y = rsin(t)',
    'zh-CN': 'r = (6 + o) + 9ℓcos(t),  x = rcos(t),  y = rsin(t)',
  },
  tMin: 0,
  tMax: Math.PI * 2,
  step: 0.003,
  scale: 1.05,
  stroke: '#c084fc',
  sampler: (t, config) => {
    const loopScale = clamp(config?.limaconLoopScale ?? 1, 0.35, 2.4)
    const offset = clamp(config?.limaconOffset ?? 0, -5, 5)
    const r = 6 + offset + 9 * loopScale * Math.cos(t)
    return {
      x: r * Math.cos(t),
      y: r * Math.sin(t),
    }
  },
}

export const dualFrequencyBloomFormula: FormulaDefinition = {
  id: 'dual-frequency-bloom',
  name: {
    en: 'Dual-Frequency Bloom',
    'zh-CN': '双频花盘',
  },
  formulaText: {
    en: 'r = 5sin(f₁t) + 3sin(f₂t),  x = rcos(t),  y = rsin(t)',
    'zh-CN': 'r = 5sin(f₁t) + 3sin(f₂t),  x = rcos(t),  y = rsin(t)',
  },
  tMin: 0,
  tMax: Math.PI * 16,
  step: 0.004,
  scale: 1.65,
  stroke: '#34d399',
  sampler: (t, config) => {
    const frequency1 = clamp(config?.bloomFrequency1 ?? 7, 2, 14)
    const frequency2 = clamp(config?.bloomFrequency2 ?? 13, 6, 22)
    const r = 5 * Math.sin(frequency1 * t) + 3 * Math.sin(frequency2 * t)
    return {
      x: r * Math.cos(t),
      y: r * Math.sin(t),
    }
  },
}

export const starRoseFormula: FormulaDefinition = {
  id: 'star-rose',
  name: {
    en: 'Star Rose',
    'zh-CN': '星芒玫瑰',
  },
  formulaText: {
    en: 'r = a·cos(kt),  x = rcos(t),  y = rsin(t)',
    'zh-CN': 'r = a·cos(kt),  x = rcos(t),  y = rsin(t)',
  },
  tMin: 0,
  tMax: Math.PI * 2,
  step: 0.002,
  scale: 1.2,
  stroke: '#f43f5e',
  sampler: (t, config) => {
    const petalCount = clamp(config?.starRosePetalCount ?? 7, 4, 12)
    const radius = clamp(config?.starRoseRadius ?? 9, 5, 15)
    const r = radius * Math.cos(petalCount * t)
    return {
      x: r * Math.cos(t),
      y: r * Math.sin(t),
    }
  },
}

export const butterflyVariationFormula: FormulaDefinition = {
  id: 'butterfly-variation',
  name: {
    en: 'Butterfly Variation',
    'zh-CN': '蝶形变奏',
  },
  formulaText: {
    en: 'r = e^(sin(t)) - 2cos(4t) + sinᵖ((2t-π)/24) + w·sin(9t)',
    'zh-CN': 'r = e^(sin(t)) - 2cos(4t) + sinᵖ((2t-π)/24) + w·sin(9t)',
  },
  tMin: 0,
  tMax: Math.PI * 24,
  step: 0.01,
  scale: 3,
  stroke: '#f472b6',
  sampler: (t, config) => {
    const wingWave = clamp(config?.butterflyVariationWave ?? 0.35, 0, 1)
    const exponent = clamp(config?.butterflyVariationExponent ?? 5, 2, 8)
    const r = Math.exp(Math.sin(t)) - 2 * Math.cos(4 * t) + Math.sin((2 * t - Math.PI) / 24) ** exponent + wingWave * Math.sin(9 * t)
    return {
      x: r * Math.cos(t),
      y: r * Math.sin(t),
    }
  },
}

export const ribbonOrbitFormula: FormulaDefinition = {
  id: 'ribbon-orbit',
  name: {
    en: 'Ribbon Orbit',
    'zh-CN': '丝带环',
  },
  formulaText: {
    en: 'r = A·sin(24t/25) + B,  x = rcos(t),  y = rsin(t)',
    'zh-CN': 'r = A·sin(24t/25) + B,  x = rcos(t),  y = rsin(t)',
  },
  tMin: 0,
  tMax: Math.PI * 50,
  step: 0.01,
  scale: 1,
  stroke: '#d946ef',
  sampler: (t, config) => {
    const amplitude = clamp(config?.ribbonOrbitAmplitude ?? 4, 1.5, 7)
    const baseRadius = clamp(config?.ribbonOrbitBaseRadius ?? 10, 5, 16)
    const r = amplitude * Math.sin((24 * t) / 25) + baseRadius
    return {
      x: r * Math.cos(t),
      y: r * Math.sin(t),
    }
  },
}

export const flowerWebFormula: FormulaDefinition = {
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
  sampler: (t, config) => {
    const amplitude = clamp(config?.flowerWebAmplitude ?? 3, 1.5, 6.5)
    const frequency = clamp(config?.flowerWebFrequency ?? 0.96, 0.5, 1.5)
    const r = amplitude * Math.sin(frequency * t)
    return {
      x: r * Math.cos(t),
      y: r * Math.sin(t),
    }
  },
}

export const petalChainFormula: FormulaDefinition = {
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
  sampler: (t, config) => {
    const amplitude = clamp(config?.petalChainAmplitude ?? 3, 1.5, 6.5)
    const frequency = clamp(config?.petalChainFrequency ?? 0.75, 0.25, 1.5)
    const r = amplitude * Math.sin(frequency * t)
    return {
      x: r * Math.cos(t),
      y: r * Math.sin(t),
    }
  },
}

export const tanCotBurstFormula: FormulaDefinition = {
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
  sampler: (t, config) => {
    const burstScale = clamp(config?.tanCotBurstScale ?? 20, 10, 30)
    const burstFrequency = clamp(config?.tanCotBurstFrequency ?? 17, 10, 25)
    const holeRadius = clamp(config?.tanCotBurstHole ?? 0, 0, 6)
    const crossFrequency = clamp(config?.tanCotBurstCross ?? 0, 0, 60)
    const radiusClamp = clamp(config?.tanCotBurstClamp ?? 0, 0, 240)
    const a = burstFrequency * t
    const tanValue = Math.tan(a)
    const cotValue = 1 / tanValue
    const base = burstScale * (tanValue + cotValue)
    const clampedBase = radiusClamp > 0 ? Math.sign(base) * Math.min(Math.abs(base), radiusClamp) : base
    const radialMagnitude = holeRadius > 0 ? Math.abs(clampedBase) + holeRadius : Math.abs(clampedBase)
    const radialSign = crossFrequency > 0
      ? Math.sign(Math.sin(crossFrequency * t)) || 1
      : Math.sign(clampedBase) || 1
    const r = radialSign * radialMagnitude
    return {
      x: r * Math.cos(t),
      y: r * Math.sin(t),
    }
  },
}

export const archimedeanSpiralFormula: FormulaDefinition = {
  id: 'archimedean-spiral',
  name: {
    en: 'Archimedean Spiral',
    'zh-CN': '阿基米德螺线',
  },
  formulaText: {
    en: 'r = a·t,  θ = ωt,  x = rcos(θ),  y = rsin(θ)',
    'zh-CN': 'r = a·t,  θ = ωt,  x = rcos(θ),  y = rsin(θ)',
  },
  tMin: 0,
  tMax: Math.PI * 20,
  step: 0.01,
  scale: 1,
  stroke: '#38bdf8',
  sampler: (t, config) => {
    const pitch = clamp(config?.archimedeanPitch ?? 0.26, 0.08, 0.6)
    const twist = clamp(config?.archimedeanTwist ?? 1, 0.4, 2.8)
    const r = pitch * t
    const angle = twist * t
    return {
      x: r * Math.cos(angle),
      y: r * Math.sin(angle),
    }
  },
}

export const fermatR2SpiralFormula: FormulaDefinition = {
  id: 'fermat-r2-spiral',
  name: {
    en: 'Fermat Spiral r²=t',
    'zh-CN': '费马螺线 r²=t',
  },
  formulaText: {
    en: 'r² = s·t,  θ = k·t,  x = rcos(θ),  y = rsin(θ)',
    'zh-CN': 'r² = s·t,  θ = k·t,  x = rcos(θ),  y = rsin(θ)',
  },
  tMin: 0,
  tMax: Math.PI * 52,
  step: 0.01,
  scale: 1,
  stroke: '#eab308',
  sampler: (t, config) => {
    const turns = clamp(config?.fermatR2Turns ?? 26, 8, 52)
    const radialScale = clamp(config?.fermatR2Scale ?? 1.1, 0.4, 2.4)
    const angularScale = clamp(config?.fermatR2AngularScale ?? 1, 0.5, 2.4)
    const mappedT = t * (turns / 52)
    const r = radialScale * Math.sqrt(Math.max(mappedT, 0))
    const theta = angularScale * mappedT
    return {
      x: r * Math.cos(theta),
      y: r * Math.sin(theta),
    }
  },
}

export const logarithmicSpiralFormula: FormulaDefinition = {
  id: 'logarithmic-spiral',
  name: {
    en: 'Logarithmic Spiral',
    'zh-CN': '对数螺线',
  },
  formulaText: {
    en: 'r = a·exp(b·w·t),  θ = ωt,  x = rcos(θ),  y = rsin(θ)',
    'zh-CN': 'r = a·exp(b·w·t),  θ = ωt,  x = rcos(θ),  y = rsin(θ)',
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
    const radialWarp = clamp(config?.logSpiralRadialWarp ?? 0.8, 0.3, 1.8)
    const r = scale * Math.exp(growth * t * radialWarp)
    return {
      x: r * Math.cos(frequency * t),
      y: r * Math.sin(frequency * t),
    }
  },
}

export const fermatSpiralWeaveFormula: FormulaDefinition = {
  id: 'fermat-spiral-weave',
  name: {
    en: 'Fermat Spiral Weave',
    'zh-CN': '费马螺线编织',
  },
  formulaText: {
    en: 'r = a√|t|,  θ = kt,  x = q(t,m)·r·cos(θ),  y = r·sin(θ)',
    'zh-CN': 'r = a√|t|,  θ = kt,  x = q(t,m)·r·cos(θ),  y = r·sin(θ)',
  },
  tMin: -Math.PI * 16,
  tMax: Math.PI * 16,
  step: 0.01,
  scale: 0.64,
  stroke: '#22d3ee',
  sampler: (t, config) => {
    const a = clamp(config?.fermatSpiralScale ?? 11, 4, 18)
    const twist = clamp(config?.fermatSpiralTwist ?? 1.6, 0.6, 4)
    const mirror = clamp(config?.fermatSpiralMirror ?? 1, 0, 1.8)
    const radius = a * Math.sqrt(Math.abs(t) / (Math.PI * 2))
    const theta = twist * t
    const direction = t >= 0 ? 1 : -mirror
    return {
      x: direction * radius * Math.cos(theta),
      y: radius * Math.sin(theta),
    }
  },
}

export const polarFormulas: FormulaDefinition[] = [
  cardioidFormula,
  limaconFormula,
  dualFrequencyBloomFormula,
  starRoseFormula,
  butterflyVariationFormula,
  ribbonOrbitFormula,
  flowerWebFormula,
  petalChainFormula,
  tanCotBurstFormula,
  archimedeanSpiralFormula,
  fermatR2SpiralFormula,
  logarithmicSpiralFormula,
  fermatSpiralWeaveFormula,
]
