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
  sampler: (t, config) => {
    const a = clamp(config?.superellipseA ?? 10, 4, 14)
    const b = clamp(config?.superellipseB ?? 8, 3, 12)
    const n = clamp(config?.superellipseN ?? 3, 1.2, 8)
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
    en: 'x = A cos(t) + B cos(2t/3),  y = A sin(t) - B sin(2t/3)',
    'zh-CN': 'x = A cos(t) + B cos(2t/3),  y = A sin(t) - B sin(2t/3)',
  },
  tMin: 0,
  tMax: Math.PI * 6,
  step: 0.004,
  scale: 1,
  stroke: '#a855f7',
  sampler: (t, config) => {
    const baseAmplitude = clamp(config?.pentagramBaseAmplitude ?? 2, 0.5, 12)
    const waveAmplitude = clamp(config?.pentagramWaveAmplitude ?? 5, 0, 12)
    const waveFreqX = 2 / 3
    const waveFreqY = 2 / 3
    return {
      x: baseAmplitude * Math.cos(t) + waveAmplitude * Math.cos(waveFreqX * t),
      y: baseAmplitude * Math.sin(t) - waveAmplitude * Math.sin(waveFreqY * t),
    }
  },
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
  sampler: (t, config) => {
    const amplitude = clamp(config?.petalOrbitAmplitude ?? 6, 2, 12)
    const freqX = clamp(config?.petalOrbitFreqX ?? 4, 1, 9)
    const freqY = clamp(config?.petalOrbitFreqY ?? 3, 1, 9)
    const phase = clamp(config?.petalOrbitPhase ?? Math.PI / 2, -Math.PI, Math.PI)
    return {
      x: amplitude * Math.sin(freqX * t),
      y: amplitude * Math.sin(freqY * t + phase),
    }
  },
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
  sampler: (t, config) => {
    const scale = clamp(config?.lemniscateScale ?? 10, 4, 16)
    const warp = clamp(config?.lemniscateWarp ?? 1, 0.2, 2.4)
    const sinT = Math.sin(t)
    const cosT = Math.cos(t)
    const denom = 1 + warp * sinT ** 2
    return {
      x: (scale * cosT) / denom,
      y: (scale * sinT * cosT) / denom,
    }
  },
}

export const oscilloscopeHarmonicFormula: FormulaDefinition = {
  id: 'oscilloscope-harmonic',
  name: {
    en: 'Oscilloscope Harmonic Stack',
    'zh-CN': '示波器谐波叠加',
  },
  formulaText: {
    en: 'x = t,  y = A·Σ[(sin(kωt+φk)+0.5cos((k+1)ωt-φk))/kᵈ]',
    'zh-CN': 'x = t,  y = A·Σ[(sin(kωt+φk)+0.5cos((k+1)ωt-φk))/kᵈ]',
  },
  tMin: -Math.PI * 8,
  tMax: Math.PI * 8,
  step: 0.01,
  scale: 1,
  stroke: '#38bdf8',
  sampler: (t, config) => {
    const baseFreq = clamp(config?.oscBaseFreq ?? 1.4, 0.3, 8)
    const amplitude = clamp(config?.oscAmplitude ?? 3.8, 0.2, 10)
    const harmonics = Math.floor(clamp(config?.oscHarmonics ?? 6, 1, 14))
    const decay = clamp(config?.oscDecay ?? 1.2, 0.4, 3)
    const phaseDrift = clamp(config?.oscPhaseDrift ?? 0.35, -Math.PI, Math.PI)
    const scanSpan = clamp(config?.oscScanSpan ?? Math.PI * 8, Math.PI * 2, Math.PI * 16)
    const mappedT = t * (scanSpan / (Math.PI * 8))
    let normalizedSum = 0
    let normalizer = 0
    for (let k = 1; k <= harmonics; k++) {
      const weight = 1 / (k ** decay)
      const phase = phaseDrift * (k - 1)
      const harmonic = Math.sin(k * baseFreq * mappedT + phase) + 0.5 * Math.cos((k + 1) * baseFreq * mappedT - phase)
      normalizedSum += weight * harmonic
      normalizer += weight
    }
    return {
      x: t,
      y: amplitude * (normalizedSum / Math.max(normalizer, 1e-6)),
    }
  },
}

export const oscilloscopeSincosFormula: FormulaDefinition = {
  id: 'oscilloscope-sincos',
  name: {
    en: 'Oscilloscope Sin-Cos',
    'zh-CN': '示波器正余弦',
  },
  formulaText: {
    en: 'x = t,  y = Asin·sin(ωt+φ) + Acos·cos(ωt+Δφ) + b',
    'zh-CN': 'x = t,  y = Asin·sin(ωt+φ) + Acos·cos(ωt+Δφ) + b',
  },
  tMin: -Math.PI * 8,
  tMax: Math.PI * 8,
  step: 0.01,
  scale: 1,
  stroke: '#22d3ee',
  sampler: (t, config) => {
    const sinAmp = clamp(config?.oscSinAmp ?? 6, 0, 14)
    const cosAmp = clamp(config?.oscCosAmp ?? 4, 0, 14)
    const freq = clamp(config?.oscFreq ?? 1.8, 0.2, 8)
    const phase = clamp(config?.oscPhase ?? 0, -Math.PI, Math.PI)
    const phaseShift = clamp(config?.oscPhaseShift ?? Math.PI / 2, -Math.PI, Math.PI)
    const offset = clamp(config?.oscOffset ?? 0, -8, 8)
    return {
      x: t,
      y: sinAmp * Math.sin(freq * t + phase) + cosAmp * Math.cos(freq * t + phaseShift) + offset,
    }
  },
}

export const cardioidDeluxeFormula: FormulaDefinition = {
  id: 'cardioid-deluxe',
  name: {
    en: 'Cardioid',
    'zh-CN': '心形线',
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
  sampler: (t, config) => {
    const scale = clamp(config?.astroidScale ?? 8, 3, 14)
    return {
      x: scale * Math.cos(t) ** 3,
      y: scale * Math.sin(t) ** 3,
    }
  },
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
  sampler: (t, config) => {
    const ampX = clamp(config?.lissajousAmpX ?? 9, 3, 14)
    const ampY = clamp(config?.lissajousAmpY ?? 9, 3, 14)
    const freqX = clamp(config?.lissajousFreqX ?? 3, 1, 8)
    const freqY = clamp(config?.lissajousFreqY ?? 4, 1, 8)
    const phase = clamp(config?.lissajousPhase ?? Math.PI / 2, -Math.PI, Math.PI)
    return {
      x: ampX * Math.sin(freqX * t + phase),
      y: ampY * Math.sin(freqY * t),
    }
  },
}

export const parametricFormulas: FormulaDefinition[] = [
  superellipseFormula,
  pentagramWaveFormula,
  petalOrbitFormula,
  lemniscateFormula,
  oscilloscopeHarmonicFormula,
  oscilloscopeSincosFormula,
  cardioidDeluxeFormula,
  astroidFormula,
  lissajousFormula,
]
