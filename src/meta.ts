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
    archimedeanPitch: 0.26,
    archimedeanTwist: 1,
    fermatR2AngularScale: 1,
    logSpiralGrowth: 0.12,
    logSpiralFrequency: 2.4,
    logSpiralScale: 0.45,
    logSpiralRadialWarp: 0.8,
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
    heartDepth: 1,
    heartWidth: 1,
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
      result.logSpiralGrowth = rand(0.05, 0.24)
      result.logSpiralFrequency = rand(1.2, 4.8)
      result.logSpiralScale = rand(0.2, 0.8)
      result.logSpiralRadialWarp = rand(0.45, 1.4)
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
      result.heartDepth = rand(0.7, 1.45)
      result.heartWidth = rand(0.75, 1.45)
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
        effectIndex: resolveEffectIndex('cardioid-deluxe'),
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
        effectIndex: resolveEffectIndex('modular-times-table'),
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
        effectIndex: resolveEffectIndex('star-rose'),
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
  ],
}
