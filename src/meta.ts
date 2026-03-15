import { generateRandomPalette, rand } from '@bg-effects/shared'
import type { EffectMeta } from '@bg-effects/core'
import type { MathBeautyProps } from './types'
import { formulaLibrary } from './engine'

const effectIndexById = new Map<string, number>(
  formulaLibrary.map((formula, index): [string, number] => [formula.id, index]),
)
const resolveEffectIndex = (effectId: string) => effectIndexById.get(effectId) ?? 0

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
    effectIndex: resolveEffectIndex('cardioid-deluxe'),
    animationSpeed: 0.2,
    lineWidth: 2.0,
    lineColor: '#c8287d',
    axisRange: 18,
    gridDensity: 18,
    showGrid: true,
    showAxis: true,
    showTrail: true,
    trailAlpha: 0.3,
    presetLock: false,
    lockOnComplete: false,
    modularPointCount: 360,
    modularMultiplier: 71,
    modularRadius: 12,
    gcdLayerScale: 1,
    gcdLayerRotation: 0,
    quadraticResidueScale: 1,
    quadraticResidueShear: 0,
    gcdLatticeScale: 1,
    gcdLatticeJitter: 0,
    fermatR2Turns: 26,
    fermatR2Scale: 1.1,
    implicitRange: 9.4,
    implicitStep: 0.22,
    implicitWaveMix: 1,
    implicitSingularityGuard: 0.08,
    implicitCrossMix: 1,
    implicitExpMix: 1,
    implicitNestedMix: 1,
    implicitGcdScale: 6,
    implicitBias: 0.8,
    implicitParabolaTarget: 1,
    fusionSinAmp: 8,
    fusionSinFreqX: 3,
    fusionSinFreqY: 4,
    fusionTanMix: 0.45,
    fusionTanFreq: 2.8,
    fusionTanClamp: 1.8,
    fusionFourierMix: 1,
    fusionFourierHarmonics: 4,
    fusionFourierDecay: 1.2,
    oscBaseFreq: 1.4,
    oscAmplitude: 3.8,
    oscHarmonics: 6,
    oscDecay: 1.2,
    oscPhaseDrift: 0.35,
    oscScanSpan: Math.PI * 8,
    oscSinAmp: 6,
    oscCosAmp: 4,
    oscFreq: 1.8,
    oscPhase: 0,
    oscPhaseShift: Math.PI / 2,
    oscOffset: 0,
    archimedeanPitch: 0.26,
    archimedeanTwist: 1,
    fermatR2AngularScale: 1,
    logSpiralGrowth: 0.12,
    logSpiralFrequency: 2.4,
    logSpiralScale: 0.45,
    logSpiralRadialWarp: 0.8,
    moireBaseRadius: 9,
    moireRippleAmp: 2.4,
    moireFreqA: 9,
    moireFreqB: 10,
    moirePhaseDrift: 0.6,
    innerSpiralRadius: 11,
    innerSpiralTurns: 7,
    innerSpiralGrowth: 1.6,
    innerSpiralWave: 0.7,
    innerSpiralWaveFreq: 5,
    mandalaPetalCount: 8,
    mandalaInnerMix: 3.4,
    mandalaOuterMix: 2.2,
    mandalaPhase: 0.5,
    mandalaSharpness: 1.2,
    fermatSpiralScale: 11,
    fermatSpiralTwist: 1.6,
    fermatSpiralMirror: 1,
    cardioidScale: 1,
    cardioidDistortion: 0,
    limaconLoopScale: 1,
    limaconOffset: 0,
    bloomFrequency1: 7,
    bloomFrequency2: 13,
    starRosePetalCount: 7,
    starRoseRadius: 9,
    butterflyVariationWave: 0.35,
    butterflyVariationExponent: 5,
    ribbonOrbitAmplitude: 4,
    ribbonOrbitBaseRadius: 10,
    flowerWebAmplitude: 3,
    flowerWebFrequency: 0.96,
    petalChainAmplitude: 3,
    petalChainFrequency: 0.75,
    tanCotBurstScale: 20,
    tanCotBurstFrequency: 17,
    tanCotBurstHole: 0,
    tanCotBurstCross: 0,
    tanCotBurstClamp: 0,
    tanRadialWebFrequency: 0.4,
    tanRadialWebGuard: 0.006,
    tanRadialWebClamp: 12,
    superellipseA: 10,
    superellipseB: 8,
    superellipseN: 3,
    pentagramBaseAmplitude: 2,
    pentagramWaveAmplitude: 5,
    pentagramWaveFreqX: 2 / 3,
    pentagramWaveFreqY: 2 / 3,
    petalOrbitAmplitude: 6,
    petalOrbitFreqX: 4,
    petalOrbitFreqY: 3,
    petalOrbitPhase: Math.PI / 2,
    lemniscateScale: 10,
    lemniscateWarp: 1,
    astroidScale: 8,
    lissajousAmpX: 9,
    lissajousAmpY: 9,
    lissajousFreqX: 3,
    lissajousFreqY: 4,
    lissajousPhase: Math.PI / 2,
    ovalWeaveXSinAmp: 2,
    ovalWeaveXCosAmp: 0.6,
    ovalWeaveXCosFreq: 2.8,
    ovalWeaveYCosAmp: 2,
    heartDepth: 1,
    heartWidth: 1,
    spirographR: 10,
    spirographr: 4,
    spirographd: 5,
    hypotrochoidR: 9,
    hypotrochoidr: 4,
    hypotrochoidd: 5,
    epicycloidR: 5,
    epicycloidr: 2,
    nephroidScale: 6,
    trochoidRatio: 3.2,
    trochoidOffset: 5.2,
    trochoidPhase: 0,
    lissajousRibbonAmp: 9.5,
    lissajousRibbonFreqX: 3.2,
    lissajousRibbonFreqY: 4.1,
    lissajousRibbonPhase: Math.PI / 3,
    lissajousRibbonTwist: 1.1,
    strangeInkA: 1.65,
    strangeInkB: -2.05,
    strangeInkC: 1.55,
    strangeInkD: 0.82,
    strangeInkScale: 1.05,
    vortexSpiralTurns: 12.4,
    vortexSpiralCurl: 1.1,
    vortexSpiralDrift: 0.06,
    vortexSpiralWave: 0.85,
    vortexSpiralScale: 6.2,
    particleFlowDensity: 48,
    particleFlowStep: 0.14,
    particleFlowTwist: 1.45,
    particleFlowBias: 0.2,
    particleFlowScale: 1,
    flourishPetals: 6,
    flourishBloom: 0.75,
    flourishTwist: 1.6,
    flourishPhase: 0.5,
    flourishScale: 8.5,
    interferenceFreqX: 3.4,
    interferenceFreqY: 4.7,
    interferencePhase: 0.7,
    interferenceDrift: 1,
    interferenceScale: 8.5,
    wavefrontK1: 2.6,
    wavefrontK2: 3.8,
    wavefrontDistance: 3.6,
    wavefrontPhase: 0.55,
    wavefrontScale: 4.2,
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
      result.gcdLayerScale = rand(0.7, 2.1)
      result.gcdLayerRotation = rand(-Math.PI, Math.PI)
      result.quadraticResidueScale = rand(0.7, 2.2)
      result.quadraticResidueShear = rand(-0.9, 0.9)
      result.gcdLatticeScale = rand(0.7, 2.1)
      result.gcdLatticeJitter = rand(0, 0.35)
      result.archimedeanPitch = rand(0.12, 0.5)
      result.archimedeanTwist = rand(0.55, 2.4)
      result.fermatR2Turns = rand(12, 44)
      result.fermatR2Scale = rand(0.6, 1.9)
      result.fermatR2AngularScale = rand(0.65, 2.1)
      result.implicitRange = rand(6, 13.5)
      result.implicitStep = rand(0.12, 0.35)
      result.implicitWaveMix = rand(0.5, 1.8)
      result.implicitSingularityGuard = rand(0.03, 0.16)
      result.implicitCrossMix = rand(0.45, 1.95)
      result.implicitExpMix = rand(0.6, 1.8)
      result.implicitNestedMix = rand(0.5, 2.4)
      result.implicitGcdScale = rand(2, 16)
      result.implicitBias = rand(0.3, 1.35)
      result.implicitParabolaTarget = rand(0.6, 1.6)
      result.fusionSinAmp = rand(4, 12)
      result.fusionSinFreqX = Math.floor(rand(1, 9.99))
      result.fusionSinFreqY = Math.floor(rand(1, 9.99))
      result.fusionTanMix = rand(0.1, 1.1)
      result.fusionTanFreq = rand(1, 6.8)
      result.fusionTanClamp = rand(0.7, 3.2)
      result.fusionFourierMix = rand(0.2, 2.2)
      result.fusionFourierHarmonics = Math.floor(rand(1, 9.99))
      result.fusionFourierDecay = rand(0.7, 2.2)
      result.oscBaseFreq = rand(0.5, 4.8)
      result.oscAmplitude = rand(0.6, 8.2)
      result.oscHarmonics = Math.floor(rand(2, 12.99))
      result.oscDecay = rand(0.6, 2.4)
      result.oscPhaseDrift = rand(-Math.PI, Math.PI)
      result.oscScanSpan = rand(Math.PI * 4, Math.PI * 14)
      result.oscSinAmp = rand(1, 12)
      result.oscCosAmp = rand(1, 12)
      result.oscFreq = rand(0.5, 5.4)
      result.oscPhase = rand(-Math.PI, Math.PI)
      result.oscPhaseShift = rand(-Math.PI, Math.PI)
      result.oscOffset = rand(-4.5, 4.5)
      result.logSpiralGrowth = rand(0.05, 0.24)
      result.logSpiralFrequency = rand(1.2, 4.8)
      result.logSpiralScale = rand(0.2, 0.8)
      result.logSpiralRadialWarp = rand(0.45, 1.4)
      result.moireBaseRadius = rand(6, 14)
      result.moireRippleAmp = rand(0.8, 4.8)
      result.moireFreqA = Math.floor(rand(3, 18.99))
      result.moireFreqB = Math.floor(rand(3, 20.99))
      result.moirePhaseDrift = rand(-Math.PI, Math.PI)
      result.innerSpiralRadius = rand(7, 16)
      result.innerSpiralTurns = Math.floor(rand(3, 13.99))
      result.innerSpiralGrowth = rand(0.7, 3)
      result.innerSpiralWave = rand(0, 2.4)
      result.innerSpiralWaveFreq = Math.floor(rand(2, 12.99))
      result.mandalaPetalCount = Math.floor(rand(5, 18.99))
      result.mandalaInnerMix = rand(1.2, 7.2)
      result.mandalaOuterMix = rand(0.8, 5.4)
      result.mandalaPhase = rand(-Math.PI, Math.PI)
      result.mandalaSharpness = rand(0.6, 2.2)
      result.fermatSpiralScale = rand(7, 16)
      result.fermatSpiralTwist = rand(0.9, 3.2)
      result.fermatSpiralMirror = rand(0.35, 1.5)
      result.cardioidScale = rand(0.55, 1.9)
      result.cardioidDistortion = rand(0, 3.2)
      result.limaconLoopScale = rand(0.35, 2.4)
      result.limaconOffset = rand(-5, 5)
      result.bloomFrequency1 = rand(2, 14)
      result.bloomFrequency2 = rand(6, 22)
      result.starRosePetalCount = rand(4.5, 10.5)
      result.starRoseRadius = rand(6.5, 11.5)
      result.butterflyVariationWave = rand(0.08, 0.62)
      result.butterflyVariationExponent = rand(3.2, 6.8)
      result.ribbonOrbitAmplitude = rand(2.2, 5.8)
      result.ribbonOrbitBaseRadius = rand(7.5, 12.5)
      result.flowerWebAmplitude = rand(2, 5.5)
      result.flowerWebFrequency = rand(0.6, 1.3)
      result.petalChainAmplitude = rand(2, 5.5)
      result.petalChainFrequency = rand(0.35, 1.25)
      result.tanCotBurstScale = rand(12, 28)
      result.tanCotBurstFrequency = rand(12, 23)
      result.tanCotBurstHole = rand(0, 3.5)
      result.tanCotBurstCross = rand(0, 48)
      result.tanCotBurstClamp = rand(0, 180)
      result.tanRadialWebFrequency = rand(0.18, 0.8)
      result.tanRadialWebGuard = rand(0.002, 0.02)
      result.tanRadialWebClamp = rand(4, 20)
      result.superellipseA = rand(6, 13)
      result.superellipseB = rand(4, 11)
      result.superellipseN = rand(1.4, 7.5)
      result.pentagramBaseAmplitude = rand(0.8, 6)
      result.pentagramWaveAmplitude = rand(1.8, 9.2)
      result.pentagramWaveFreqX = 2 / 3
      result.pentagramWaveFreqY = 2 / 3
      result.petalOrbitAmplitude = rand(3, 11)
      result.petalOrbitFreqX = rand(1.2, 8)
      result.petalOrbitFreqY = rand(1.2, 8)
      result.petalOrbitPhase = rand(-Math.PI, Math.PI)
      result.lemniscateScale = rand(5, 14)
      result.lemniscateWarp = rand(0.35, 2.2)
      result.astroidScale = rand(4, 13)
      result.lissajousAmpX = rand(4, 13)
      result.lissajousAmpY = rand(4, 13)
      result.lissajousFreqX = rand(1.2, 7.5)
      result.lissajousFreqY = rand(1.2, 7.5)
      result.lissajousPhase = rand(-Math.PI, Math.PI)
      result.ovalWeaveXSinAmp = rand(1.2, 3.4)
      result.ovalWeaveXCosAmp = rand(0.2, 1.4)
      result.ovalWeaveXCosFreq = rand(1.2, 4.8)
      result.ovalWeaveYCosAmp = rand(1.2, 3.4)
      result.heartDepth = rand(0.7, 1.45)
      result.heartWidth = rand(0.75, 1.45)
      result.spirographR = rand(6, 14)
      result.spirographr = rand(1.2, 8)
      result.spirographd = rand(0.6, 10)
      result.hypotrochoidR = rand(5, 14)
      result.hypotrochoidr = rand(1.2, 9)
      result.hypotrochoidd = rand(0.6, 10)
      result.epicycloidR = rand(2, 10)
      result.epicycloidr = rand(0.6, 4)
      result.nephroidScale = rand(2.5, 11)
      result.trochoidRatio = rand(1.8, 6.5)
      result.trochoidOffset = rand(1.2, 7.2)
      result.trochoidPhase = rand(0, Math.PI * 2)
      result.lissajousRibbonAmp = rand(4, 14)
      result.lissajousRibbonFreqX = rand(1, 8)
      result.lissajousRibbonFreqY = rand(1, 8)
      result.lissajousRibbonPhase = rand(-Math.PI, Math.PI)
      result.lissajousRibbonTwist = rand(0, 2.4)
      result.strangeInkA = rand(-2.8, 2.8)
      result.strangeInkB = rand(-2.8, 2.8)
      result.strangeInkC = rand(-2.8, 2.8)
      result.strangeInkD = rand(-2.8, 2.8)
      result.strangeInkScale = rand(0.45, 2.2)
      result.vortexSpiralTurns = rand(6, 16)
      result.vortexSpiralCurl = rand(0.4, 2.4)
      result.vortexSpiralDrift = rand(0.02, 0.16)
      result.vortexSpiralWave = rand(0.2, 2.1)
      result.vortexSpiralScale = rand(4.2, 9.5)
      result.particleFlowDensity = Math.floor(rand(24, 68.99))
      result.particleFlowStep = rand(0.08, 0.24)
      result.particleFlowTwist = rand(0.5, 2.4)
      result.particleFlowBias = rand(-0.8, 0.8)
      result.particleFlowScale = rand(0.65, 1.65)
      result.flourishPetals = Math.floor(rand(3, 16.99))
      result.flourishBloom = rand(0.1, 2)
      result.flourishTwist = rand(0.2, 5)
      result.flourishPhase = rand(-Math.PI, Math.PI)
      result.flourishScale = rand(3.5, 14)
      result.interferenceFreqX = rand(0.8, 9)
      result.interferenceFreqY = rand(0.8, 9)
      result.interferencePhase = rand(-Math.PI, Math.PI)
      result.interferenceDrift = rand(0, 3)
      result.interferenceScale = rand(3.5, 14)
      result.wavefrontK1 = rand(0.8, 8)
      result.wavefrontK2 = rand(0.8, 8)
      result.wavefrontDistance = rand(0.6, 8)
      result.wavefrontPhase = rand(-Math.PI, Math.PI)
      result.wavefrontScale = rand(1.2, 10)
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
      result.lineColor = colors[Math.floor(rand(0, colors.length - 0.01))]
      result.showGrid = Math.random() > 0.1
      result.showAxis = Math.random() > 0.5
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
      id: 'math_beauty_cardioid_blossom',
      name: {
        en: 'Cardioid Blossom',
        'zh-CN': '心形花绽',
      },
      config: {
        effectIndex: resolveEffectIndex('cardioid-deluxe'),
        heartDepth: 1.45,
        heartWidth: 1.28,
        animationSpeed: 0.2,
        lineWidth: 2.4,
        lineColor: '#fb7185',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.12,
      },
    },
    {
      id: 'math_beauty_cardioid_soft',
      name: {
        en: 'Cardioid Soft',
        'zh-CN': '心形柔光',
      },
      config: {
        effectIndex: resolveEffectIndex('cardioid-deluxe'),
        heartDepth: 0.78,
        heartWidth: 1.52,
        animationSpeed: 0.2,
        lineWidth: 2.2,
        lineColor: '#fda4af',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.14,
      },
    },
    {
      id: 'math_beauty_cardioid_drama',
      name: {
        en: 'Cardioid Drama',
        'zh-CN': '心形张力',
      },
      config: {
        effectIndex: resolveEffectIndex('cardioid-deluxe'),
        heartDepth: 1.6,
        heartWidth: 1.2,
        animationSpeed: 0.22,
        lineWidth: 2.8,
        lineColor: '#f43f5e',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_limacon_butterfly',
      name: {
        en: 'Limacon Butterfly',
        'zh-CN': '蜗线蝶影',
      },
      config: {
        effectIndex: resolveEffectIndex('limacon'),
        limaconLoopScale: 1.6,
        limaconOffset: -1.8,
        animationSpeed: 0.2,
        lineWidth: 2.6,
        lineColor: '#38bdf8',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.12,
      },
    },
    {
      id: 'math_beauty_limacon_classic',
      name: {
        en: 'Limacon Classic',
        'zh-CN': '蜗线经典',
      },
      config: {
        effectIndex: resolveEffectIndex('limacon'),
        limaconLoopScale: 1.0,
        limaconOffset: 0,
        animationSpeed: 0.2,
        lineWidth: 2.2,
        lineColor: '#7dd3fc',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.14,
      },
    },
    {
      id: 'math_beauty_limacon_flow',
      name: {
        en: 'Limacon Flow',
        'zh-CN': '蜗线流体',
      },
      config: {
        effectIndex: resolveEffectIndex('limacon'),
        limaconLoopScale: 0.7,
        limaconOffset: 2.6,
        animationSpeed: 0.18,
        lineWidth: 2.6,
        lineColor: '#0ea5e9',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_dual_bloom_mandala',
      name: {
        en: 'Bloom Mandala',
        'zh-CN': '花盘曼陀罗',
      },
      config: {
        effectIndex: resolveEffectIndex('dual-frequency-bloom'),
        bloomFrequency1: 7,
        bloomFrequency2: 17,
        animationSpeed: 0.2,
        lineWidth: 2.8,
        lineColor: '#a78bfa',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_dual_bloom_window',
      name: {
        en: 'Bloom Window',
        'zh-CN': '花盘花窗',
      },
      config: {
        effectIndex: resolveEffectIndex('dual-frequency-bloom'),
        bloomFrequency1: 6,
        bloomFrequency2: 12,
        animationSpeed: 0.2,
        lineWidth: 2.4,
        lineColor: '#c4b5fd',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.12,
      },
    },
    {
      id: 'math_beauty_dual_bloom_cyber',
      name: {
        en: 'Bloom Cyber',
        'zh-CN': '花盘赛博',
      },
      config: {
        effectIndex: resolveEffectIndex('dual-frequency-bloom'),
        bloomFrequency1: 9,
        bloomFrequency2: 20,
        animationSpeed: 0.24,
        lineWidth: 3.1,
        lineColor: '#8b5cf6',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.08,
      },
    },
    {
      id: 'math_beauty_star_rose_constellation',
      name: {
        en: 'Star Rose Constellation',
        'zh-CN': '星芒玫瑰·星群',
      },
      config: {
        effectIndex: resolveEffectIndex('star-rose'),
        starRosePetalCount: 6,
        starRoseRadius: 9.6,
        animationSpeed: 0.2,
        lineWidth: 2.6,
        lineColor: '#fb7185',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.12,
      },
    },
    {
      id: 'math_beauty_star_rose_silk',
      name: {
        en: 'Star Rose Silk',
        'zh-CN': '星芒玫瑰·丝绒',
      },
      config: {
        effectIndex: resolveEffectIndex('star-rose'),
        starRosePetalCount: 8.5,
        starRoseRadius: 8.4,
        animationSpeed: 0.19,
        lineWidth: 2.4,
        lineColor: '#f43f5e',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_butterfly_variation_aurora',
      name: {
        en: 'Butterfly Aurora',
        'zh-CN': '蝶形变奏·极光',
      },
      config: {
        effectIndex: resolveEffectIndex('butterfly-variation'),
        butterflyVariationWave: 0.18,
        butterflyVariationExponent: 4.2,
        animationSpeed: 0.18,
        lineWidth: 2.6,
        lineColor: '#f472b6',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.12,
      },
    },
    {
      id: 'math_beauty_butterfly_variation_velvet',
      name: {
        en: 'Butterfly Velvet',
        'zh-CN': '蝶形变奏·绒翼',
      },
      config: {
        effectIndex: resolveEffectIndex('butterfly-variation'),
        butterflyVariationWave: 0.52,
        butterflyVariationExponent: 6.2,
        animationSpeed: 0.23,
        lineWidth: 2.9,
        lineColor: '#ec4899',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_ribbon_orbit_lotus',
      name: {
        en: 'Ribbon Lotus',
        'zh-CN': '丝带环·莲纹',
      },
      config: {
        effectIndex: resolveEffectIndex('ribbon-orbit'),
        ribbonOrbitAmplitude: 3.2,
        ribbonOrbitBaseRadius: 10.8,
        animationSpeed: 0.2,
        lineWidth: 2.5,
        lineColor: '#d946ef',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.11,
      },
    },
    {
      id: 'math_beauty_ribbon_orbit_glow',
      name: {
        en: 'Ribbon Glow',
        'zh-CN': '丝带环·流光',
      },
      config: {
        effectIndex: resolveEffectIndex('ribbon-orbit'),
        ribbonOrbitAmplitude: 5.1,
        ribbonOrbitBaseRadius: 9.2,
        animationSpeed: 0.24,
        lineWidth: 2.9,
        lineColor: '#c026d3',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.09,
      },
    },
    {
      id: 'math_beauty_flower_web_nebula',
      name: {
        en: 'Flower Web Nebula',
        'zh-CN': '花心网·星云',
      },
      config: {
        effectIndex: resolveEffectIndex('flower-web'),
        flowerWebAmplitude: 2.6,
        flowerWebFrequency: 0.85,
        animationSpeed: 0.18,
        lineWidth: 2.4,
        lineColor: '#f472b6',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.11,
      },
    },
    {
      id: 'math_beauty_petal_chain_crimson',
      name: {
        en: 'Petal Chain Crimson',
        'zh-CN': '花瓣链·绯红',
      },
      config: {
        effectIndex: resolveEffectIndex('petal-chain'),
        petalChainAmplitude: 4.6,
        petalChainFrequency: 1.15,
        animationSpeed: 0.23,
        lineWidth: 2.8,
        lineColor: '#dc2626',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.09,
      },
    },
    {
      id: 'math_beauty_tan_cot_burst_core',
      name: {
        en: 'Tan Cot Burst Core',
        'zh-CN': '正切余切爆裂线·核心',
      },
      config: {
        effectIndex: resolveEffectIndex('tan-cot-burst'),
        tanCotBurstScale: 26,
        tanCotBurstFrequency: 22,
        tanCotBurstHole: 2.8,
        tanCotBurstCross: 36,
        tanCotBurstClamp: 130,
        animationSpeed: 0.23,
        lineWidth: 2.8,
        lineColor: '#f43f5e',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.08,
      },
    },
    {
      id: 'math_beauty_superellipse_classic',
      name: {
        en: 'Superellipse Classic',
        'zh-CN': '超椭圆·经典',
      },
      config: {
        effectIndex: resolveEffectIndex('superellipse'),
        superellipseA: 10,
        superellipseB: 8,
        superellipseN: 3,
        animationSpeed: 0.2,
        lineWidth: 2.4,
        lineColor: '#f59e0b',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.12,
      },
    },
    {
      id: 'math_beauty_superellipse_shield',
      name: {
        en: 'Superellipse Shield',
        'zh-CN': '超椭圆·盾纹',
      },
      config: {
        effectIndex: resolveEffectIndex('superellipse'),
        superellipseA: 12.4,
        superellipseB: 6.2,
        superellipseN: 2.2,
        animationSpeed: 0.22,
        lineWidth: 2.8,
        lineColor: '#f97316',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_pentagram_wave_core',
      name: {
        en: 'Pentagram Orbital Core',
        'zh-CN': '五角星轨道·核心',
      },
      config: {
        effectIndex: resolveEffectIndex('pentagram-wave'),
        pentagramBaseAmplitude: 2,
        pentagramWaveAmplitude: 5,
        animationSpeed: 0.18,
        lineWidth: 2.6,
        lineColor: '#a855f7',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.12,
      },
    },
    {
      id: 'math_beauty_pentagram_wave_nova',
      name: {
        en: 'Pentagram Orbital Nova',
        'zh-CN': '五角星轨道·星涌',
      },
      config: {
        effectIndex: resolveEffectIndex('pentagram-wave'),
        pentagramBaseAmplitude: 2.8,
        pentagramWaveAmplitude: 6.4,
        animationSpeed: 0.2,
        lineWidth: 2.8,
        lineColor: '#9333ea',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_petal_orbit_classic',
      name: {
        en: 'Petal Orbit Classic',
        'zh-CN': '花瓣轨道·经典',
      },
      config: {
        effectIndex: resolveEffectIndex('petal-orbit'),
        petalOrbitAmplitude: 6,
        petalOrbitFreqX: 4,
        petalOrbitFreqY: 3,
        petalOrbitPhase: 1.571,
        animationSpeed: 0.2,
        lineWidth: 2.4,
        lineColor: '#4ade80',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.12,
      },
    },
    {
      id: 'math_beauty_petal_orbit_twist',
      name: {
        en: 'Petal Orbit Twist',
        'zh-CN': '花瓣轨道·扭结',
      },
      config: {
        effectIndex: resolveEffectIndex('petal-orbit'),
        petalOrbitAmplitude: 8.5,
        petalOrbitFreqX: 5.2,
        petalOrbitFreqY: 2.4,
        petalOrbitPhase: 0.8,
        animationSpeed: 0.22,
        lineWidth: 2.8,
        lineColor: '#22c55e',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_lemniscate_classic',
      name: {
        en: 'Lemniscate Classic',
        'zh-CN': '双纽线·经典',
      },
      config: {
        effectIndex: resolveEffectIndex('lemniscate'),
        lemniscateScale: 10,
        lemniscateWarp: 1,
        animationSpeed: 0.2,
        lineWidth: 2.4,
        lineColor: '#22d3ee',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.12,
      },
    },
    {
      id: 'math_beauty_lemniscate_stream',
      name: {
        en: 'Lemniscate Stream',
        'zh-CN': '双纽线·流域',
      },
      config: {
        effectIndex: resolveEffectIndex('lemniscate'),
        lemniscateScale: 12.8,
        lemniscateWarp: 1.9,
        animationSpeed: 0.23,
        lineWidth: 2.8,
        lineColor: '#06b6d4',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.09,
      },
    },
    {
      id: 'math_beauty_astroid_classic',
      name: {
        en: 'Astroid Classic',
        'zh-CN': '内摆线星形·经典',
      },
      config: {
        effectIndex: resolveEffectIndex('astroid'),
        astroidScale: 8,
        animationSpeed: 0.2,
        lineWidth: 2.4,
        lineColor: '#fde68a',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.12,
      },
    },
    {
      id: 'math_beauty_astroid_sharp',
      name: {
        en: 'Astroid Sharp',
        'zh-CN': '内摆线星形·棱锋',
      },
      config: {
        effectIndex: resolveEffectIndex('astroid'),
        astroidScale: 10.8,
        animationSpeed: 0.22,
        lineWidth: 2.8,
        lineColor: '#facc15',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_lissajous_classic',
      name: {
        en: 'Lissajous Classic',
        'zh-CN': '李萨如图形·经典',
      },
      config: {
        effectIndex: resolveEffectIndex('lissajous'),
        lissajousAmpX: 9,
        lissajousAmpY: 9,
        lissajousFreqX: 3,
        lissajousFreqY: 4,
        lissajousPhase: 1.571,
        animationSpeed: 0.2,
        lineWidth: 2.4,
        lineColor: '#f97316',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.12,
      },
    },
    {
      id: 'math_beauty_lissajous_orbit',
      name: {
        en: 'Lissajous Orbit',
        'zh-CN': '李萨如图形·轨迹',
      },
      config: {
        effectIndex: resolveEffectIndex('lissajous'),
        lissajousAmpX: 12,
        lissajousAmpY: 6.8,
        lissajousFreqX: 5.2,
        lissajousFreqY: 3.1,
        lissajousPhase: 0.62,
        animationSpeed: 0.23,
        lineWidth: 2.8,
        lineColor: '#ea580c',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_osc_harmonic_clean',
      name: {
        en: 'Osc Harmonic Clean',
        'zh-CN': '示波器谐波·净波',
      },
      config: {
        effectIndex: resolveEffectIndex('oscilloscope-harmonic'),
        oscBaseFreq: 1.4,
        oscAmplitude: 3.2,
        oscHarmonics: 5,
        oscDecay: 1.4,
        oscPhaseDrift: 0.2,
        oscScanSpan: 25.13,
        animationSpeed: 0.2,
        lineWidth: 2.3,
        lineColor: '#38bdf8',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.12,
      },
    },
    {
      id: 'math_beauty_osc_harmonic_analog',
      name: {
        en: 'Osc Harmonic Analog',
        'zh-CN': '示波器谐波·模拟',
      },
      config: {
        effectIndex: resolveEffectIndex('oscilloscope-harmonic'),
        oscBaseFreq: 2.2,
        oscAmplitude: 4.6,
        oscHarmonics: 10,
        oscDecay: 0.9,
        oscPhaseDrift: 1.2,
        oscScanSpan: 43.98,
        animationSpeed: 0.23,
        lineWidth: 2.7,
        lineColor: '#0ea5e9',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_osc_sincos_balanced',
      name: {
        en: 'Osc SinCos Balanced',
        'zh-CN': '示波器正余弦·平衡',
      },
      config: {
        effectIndex: resolveEffectIndex('oscilloscope-sincos'),
        oscSinAmp: 6,
        oscCosAmp: 4,
        oscFreq: 1.8,
        oscPhase: 0,
        oscPhaseShift: 1.571,
        oscOffset: 0,
        animationSpeed: 0.2,
        lineWidth: 2.4,
        lineColor: '#22d3ee',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.12,
      },
    },
    {
      id: 'math_beauty_osc_sincos_phase',
      name: {
        en: 'Osc SinCos Phase Drift',
        'zh-CN': '示波器正余弦·相位漂移',
      },
      config: {
        effectIndex: resolveEffectIndex('oscilloscope-sincos'),
        oscSinAmp: 9.4,
        oscCosAmp: 6.2,
        oscFreq: 3.1,
        oscPhase: 0.85,
        oscPhaseShift: -1.1,
        oscOffset: -0.8,
        animationSpeed: 0.24,
        lineWidth: 2.8,
        lineColor: '#06b6d4',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.09,
      },
    },
    {
      id: 'math_beauty_modular_times_core',
      name: {
        en: 'Modular Core',
        'zh-CN': '模乘圆连线·核心',
      },
      config: {
        effectIndex: resolveEffectIndex('modular-times-table'),
        modularPointCount: 360,
        modularMultiplier: 71,
        modularRadius: 12,
        animationSpeed: 0.2,
        lineWidth: 2.5,
        lineColor: '#22d3ee',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.12,
      },
    },
    {
      id: 'math_beauty_modular_times_wave',
      name: {
        en: 'Modular Wave',
        'zh-CN': '模乘圆连线·潮汐',
      },
      config: {
        effectIndex: resolveEffectIndex('modular-times-table'),
        modularPointCount: 540,
        modularMultiplier: 137,
        modularRadius: 14.4,
        animationSpeed: 0.24,
        lineWidth: 2.9,
        lineColor: '#06b6d4',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_gcd_layer_orbit',
      name: {
        en: 'GCD Layer Orbit',
        'zh-CN': 'gcd 等值层·旋轨',
      },
      config: {
        effectIndex: resolveEffectIndex('gcd-layer'),
        gcdLayerScale: 1.75,
        gcdLayerRotation: 0.86,
        animationSpeed: 0.22,
        lineWidth: 2.8,
        lineColor: '#fb923c',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_gcd_layer_mini',
      name: {
        en: 'GCD Layer Mini',
        'zh-CN': 'gcd 等值层·微核',
      },
      config: {
        effectIndex: resolveEffectIndex('gcd-layer'),
        gcdLayerScale: 0.72,
        gcdLayerRotation: -1.18,
        animationSpeed: 0.18,
        lineWidth: 2.3,
        lineColor: '#fdba74',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.13,
      },
    },
    {
      id: 'math_beauty_qr_grid_flux',
      name: {
        en: 'Residue Grid Flux',
        'zh-CN': '二次剩余格·流形',
      },
      config: {
        effectIndex: resolveEffectIndex('quadratic-residue-grid'),
        quadraticResidueScale: 1.8,
        quadraticResidueShear: 0.56,
        animationSpeed: 0.23,
        lineWidth: 2.9,
        lineColor: '#14b8a6',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_qr_grid_fold',
      name: {
        en: 'Residue Grid Fold',
        'zh-CN': '二次剩余格·折映',
      },
      config: {
        effectIndex: resolveEffectIndex('quadratic-residue-grid'),
        quadraticResidueScale: 0.78,
        quadraticResidueShear: -0.62,
        animationSpeed: 0.18,
        lineWidth: 2.2,
        lineColor: '#5eead4',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.13,
      },
    },
    {
      id: 'math_beauty_gcd_lattice_glow',
      name: {
        en: 'Coprime Lattice Glow',
        'zh-CN': '互质晶格·辉光',
      },
      config: {
        effectIndex: resolveEffectIndex('gcd-lattice'),
        gcdLatticeScale: 1.65,
        gcdLatticeJitter: 0.24,
        animationSpeed: 0.22,
        lineWidth: 2.8,
        lineColor: '#f97316',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_gcd_lattice_spark',
      name: {
        en: 'Coprime Lattice Spark',
        'zh-CN': '互质晶格·火花',
      },
      config: {
        effectIndex: resolveEffectIndex('gcd-lattice'),
        gcdLatticeScale: 0.74,
        gcdLatticeJitter: 0.36,
        animationSpeed: 0.18,
        lineWidth: 2.3,
        lineColor: '#fb7185',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.13,
      },
    },
    {
      id: 'math_beauty_archimedean_spiral_glass',
      name: {
        en: 'Archimedean Glass',
        'zh-CN': '阿基米德螺线·琉璃',
      },
      config: {
        effectIndex: resolveEffectIndex('archimedean-spiral'),
        archimedeanPitch: 0.22,
        archimedeanTwist: 1.5,
        animationSpeed: 0.2,
        lineWidth: 2.4,
        lineColor: '#38bdf8',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.11,
      },
    },
    {
      id: 'math_beauty_fermat_r2_helix',
      name: {
        en: 'Fermat Helix',
        'zh-CN': '费马螺线·旋核',
      },
      config: {
        effectIndex: resolveEffectIndex('fermat-r2-spiral'),
        fermatR2Turns: 30,
        fermatR2Scale: 1.25,
        fermatR2AngularScale: 1.45,
        animationSpeed: 0.21,
        lineWidth: 2.7,
        lineColor: '#facc15',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_log_spiral_aurora',
      name: {
        en: 'Log Spiral Aurora',
        'zh-CN': '对数螺线·极光',
      },
      config: {
        effectIndex: resolveEffectIndex('logarithmic-spiral'),
        logSpiralGrowth: 0.17,
        logSpiralFrequency: 3.4,
        logSpiralScale: 0.36,
        logSpiralRadialWarp: 1.2,
        animationSpeed: 0.19,
        lineWidth: 2.5,
        lineColor: '#60a5fa',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_fermat_weave_mirror',
      name: {
        en: 'Fermat Weave Mirror',
        'zh-CN': '费马编织·镜潮',
      },
      config: {
        effectIndex: resolveEffectIndex('fermat-spiral-weave'),
        fermatSpiralScale: 12.4,
        fermatSpiralTwist: 1.95,
        fermatSpiralMirror: 1.3,
        animationSpeed: 0.22,
        lineWidth: 2.8,
        lineColor: '#22d3ee',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.09,
      },
    },
    {
      id: 'math_beauty_trig_fusion_prism',
      name: {
        en: 'Trig Fusion Prism',
        'zh-CN': '三角傅立叶融合·棱镜',
      },
      config: {
        effectIndex: resolveEffectIndex('trig-fourier-fusion'),
        fusionSinAmp: 8,
        fusionSinFreqX: 3,
        fusionSinFreqY: 4,
        fusionTanMix: 0.45,
        fusionTanFreq: 2.8,
        fusionTanClamp: 1.8,
        fusionFourierMix: 1,
        fusionFourierHarmonics: 4,
        fusionFourierDecay: 1.2,
        animationSpeed: 0.2,
        lineWidth: 2.5,
        lineColor: '#a78bfa',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.11,
      },
    },
    {
      id: 'math_beauty_trig_fusion_arc',
      name: {
        en: 'Trig Fusion Arc',
        'zh-CN': '三角傅立叶融合·弧潮',
      },
      config: {
        effectIndex: resolveEffectIndex('trig-fourier-fusion'),
        fusionSinAmp: 10.5,
        fusionSinFreqX: 2,
        fusionSinFreqY: 6,
        fusionTanMix: 0.32,
        fusionTanFreq: 4.1,
        fusionTanClamp: 1.3,
        fusionFourierMix: 1.6,
        fusionFourierHarmonics: 6,
        fusionFourierDecay: 1.45,
        animationSpeed: 0.22,
        lineWidth: 2.8,
        lineColor: '#8b5cf6',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.09,
      },
    },
    {
      id: 'math_beauty_moire_ripple_neon',
      name: {
        en: 'Moiré Ripple Neon',
        'zh-CN': '莫列波纹·霓虹',
      },
      config: {
        effectIndex: resolveEffectIndex('moire-ripple'),
        moireBaseRadius: 9,
        moireRippleAmp: 2.8,
        moireFreqA: 9,
        moireFreqB: 10,
        moirePhaseDrift: 0.6,
        animationSpeed: 0.2,
        lineWidth: 2.5,
        lineColor: '#38bdf8',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.11,
      },
    },
    {
      id: 'math_beauty_moire_ripple_tide',
      name: {
        en: 'Moiré Ripple Tide',
        'zh-CN': '莫列波纹·潮汐',
      },
      config: {
        effectIndex: resolveEffectIndex('moire-ripple'),
        moireBaseRadius: 11,
        moireRippleAmp: 1.6,
        moireFreqA: 6,
        moireFreqB: 15,
        moirePhaseDrift: -1.1,
        animationSpeed: 0.19,
        lineWidth: 2.7,
        lineColor: '#0ea5e9',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.1,
      },
    },
    {
      id: 'math_beauty_inner_spiral_core',
      name: {
        en: 'Inner Spiral Core',
        'zh-CN': '圆内螺线·核心',
      },
      config: {
        effectIndex: resolveEffectIndex('inner-circle-spiral'),
        innerSpiralRadius: 11,
        innerSpiralTurns: 7,
        innerSpiralGrowth: 1.6,
        innerSpiralWave: 0.7,
        innerSpiralWaveFreq: 5,
        animationSpeed: 0.2,
        lineWidth: 2.5,
        lineColor: '#22d3ee',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.11,
      },
    },
    {
      id: 'math_beauty_inner_spiral_shell',
      name: {
        en: 'Inner Spiral Shell',
        'zh-CN': '圆内螺线·贝壳',
      },
      config: {
        effectIndex: resolveEffectIndex('inner-circle-spiral'),
        innerSpiralRadius: 14,
        innerSpiralTurns: 10,
        innerSpiralGrowth: 1.1,
        innerSpiralWave: 1.4,
        innerSpiralWaveFreq: 8,
        animationSpeed: 0.22,
        lineWidth: 2.8,
        lineColor: '#06b6d4',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.09,
      },
    },
    {
      id: 'math_beauty_mandala_blossom',
      name: {
        en: 'Mandala Blossom',
        'zh-CN': '曼陀罗曲线·花绽',
      },
      config: {
        effectIndex: resolveEffectIndex('mandala-curve'),
        mandalaPetalCount: 8,
        mandalaInnerMix: 3.4,
        mandalaOuterMix: 2.2,
        mandalaPhase: 0.5,
        mandalaSharpness: 1.2,
        animationSpeed: 0.2,
        lineWidth: 2.5,
        lineColor: '#f472b6',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.11,
      },
    },
    {
      id: 'math_beauty_mandala_glyph',
      name: {
        en: 'Mandala Glyph',
        'zh-CN': '曼陀罗曲线·符纹',
      },
      config: {
        effectIndex: resolveEffectIndex('mandala-curve'),
        mandalaPetalCount: 13,
        mandalaInnerMix: 4.8,
        mandalaOuterMix: 1.3,
        mandalaPhase: -0.9,
        mandalaSharpness: 1.9,
        animationSpeed: 0.22,
        lineWidth: 2.8,
        lineColor: '#ec4899',
        axisRange: 18,
        gridDensity: 18,
        showGrid: true,
        showAxis: true,
        showTrail: true,
        trailAlpha: 0.09,
      },
    },
  ],
}
