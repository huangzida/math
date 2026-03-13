import { generateRandomPalette, rand } from '@bg-effects/shared'
import type { EffectMeta } from '@bg-effects/core'
import type { MathBeautyProps } from './types'
import { formulaLibrary } from './engine/formula-library'

export const meta: EffectMeta<MathBeautyProps> = {
  id: 'math-beauty',
  name: {
    en: 'Math Beauty',
    'zh-CN': '数学之美',
  },
  category: 'creative',
  version: '1.0.0',
  defaultConfig: {
    debug: false,
    lang: 'zh-CN',
    effectIndex: 0,
    animationSpeed: 0.2,
    lineWidth: 2.0,
    lineColor: '#c8287d',
    axisRange: 18,
    gridDensity: 18,
    showGrid: true,
    showAxis: true,
    showTrail: true,
    trailAlpha: 0.3,
    modularPointCount: 360,
    modularMultiplier: 71,
    modularRadius: 12,
    fermatR2Turns: 26,
    fermatR2Scale: 1.1,
    implicitRange: 9.4,
    implicitStep: 0.22,
    implicitWaveMix: 1,
    implicitSingularityGuard: 0.08,
    logSpiralGrowth: 0.12,
    logSpiralFrequency: 2.4,
    logSpiralScale: 0.45,
    fermatSpiralScale: 11,
    fermatSpiralTwist: 1.6,
    heartDepth: 1,
    heartWidth: 1,
    doubleHeartOffset: 3.2,
    doubleHeartBlend: 0.5,
    trochoidRatio: 3.2,
    trochoidOffset: 5.2,
    trochoidPhase: 0,
    juliaCRe: -0.745,
    juliaCIm: 0.186,
    mandelbrotBandWidth: 0.16,
    barnsleyProbabilityJitter: 0,
    chaosMode: 'trace',
    chaosSystem: 'lorenz',
    chaosSteps: 9000,
    chaosDt: 0.008,
    chaosScale: 1,
    chaosParticleCount: 180,
    chaosPhaseSpread: 0.22,
  },
  randomize: (current, tab) => {
    const result = { ...current }
    const colors = generateRandomPalette(4)
    const randomBasic = () => {
      result.effectIndex = Math.floor(rand(0, formulaLibrary.length - 0.01))
      result.animationSpeed = rand(0.08, 0.45)
      result.lineWidth = rand(1.8, 4.8)
      result.lineColor = colors[1]
      result.modularPointCount = Math.floor(rand(180, 640))
      result.modularMultiplier = Math.floor(rand(11, 160))
      result.modularRadius = rand(8, 18)
      result.fermatR2Turns = rand(12, 44)
      result.fermatR2Scale = rand(0.6, 1.9)
      result.implicitRange = rand(6, 13.5)
      result.implicitStep = rand(0.12, 0.35)
      result.implicitWaveMix = rand(0.5, 1.8)
      result.implicitSingularityGuard = rand(0.03, 0.16)
      result.logSpiralGrowth = rand(0.05, 0.24)
      result.logSpiralFrequency = rand(1.2, 4.8)
      result.logSpiralScale = rand(0.2, 0.8)
      result.fermatSpiralScale = rand(7, 16)
      result.fermatSpiralTwist = rand(0.9, 3.2)
      result.heartDepth = rand(0.7, 1.45)
      result.heartWidth = rand(0.75, 1.45)
      result.doubleHeartOffset = rand(1.4, 5.8)
      result.doubleHeartBlend = rand(0.18, 0.82)
      result.trochoidRatio = rand(1.8, 6.5)
      result.trochoidOffset = rand(1.2, 7.2)
      result.trochoidPhase = rand(0, Math.PI * 2)
      result.juliaCRe = rand(-0.95, -0.35)
      result.juliaCIm = rand(-0.3, 0.3)
      result.mandelbrotBandWidth = rand(0.08, 0.28)
      result.barnsleyProbabilityJitter = rand(0, 0.22)
      result.chaosMode = Math.random() > 0.45 ? 'trace' : 'particles'
      result.chaosSystem = ['lorenz', 'rossler', 'aizawa'][Math.floor(rand(0, 2.99))] as MathBeautyProps['chaosSystem']
      result.chaosSteps = Math.floor(rand(5000, 14000))
      result.chaosDt = rand(0.004, 0.02)
      result.chaosScale = rand(0.65, 1.35)
      result.chaosParticleCount = Math.floor(rand(80, 360))
      result.chaosPhaseSpread = rand(0.06, 0.45)
    }
    const randomDisplay = () => {
      result.axisRange = rand(14, 26)
      result.gridDensity = Math.floor(rand(10, 26))
      result.showGrid = Math.random() > 0.1
      result.showAxis = true
      result.showTrail = Math.random() > 0.4
      result.trailAlpha = rand(0.06, 0.22)
    }
    if (!tab) {
      randomBasic()
      randomDisplay()
      return result
    }
    if (tab === 'basic') {
      randomBasic()
      return result
    }
    if (tab === 'display') {
      randomDisplay()
      return result
    }
    return result
  },
  presets: [
    {
      id: 'math_beauty_classic',
      name: {
        en: 'Classic Whiteboard',
        'zh-CN': '经典白板',
      },
      config: {
        effectIndex: 0,
        animationSpeed: 0.2,
        lineWidth: 2.8,
        lineColor: '#f9fafb',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: false,
      },
    },
    {
      id: 'math_beauty_neon',
      name: {
        en: 'Neon Geometry',
        'zh-CN': '霓虹几何',
      },
      config: {
        effectIndex: 2,
        animationSpeed: 0.32,
        lineWidth: 3.2,
        lineColor: '#22d3ee',
        axisRange: 20,
        gridDensity: 20,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_soft',
      name: {
        en: 'Soft Trails',
        'zh-CN': '柔和轨迹',
      },
      config: {
        effectIndex: 5,
        animationSpeed: 0.16,
        lineWidth: 2.2,
        lineColor: '#f472b6',
        axisRange: 22,
        gridDensity: 16,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.18,
      },
    },
  ],
}
