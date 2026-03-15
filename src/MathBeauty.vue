<script setup lang="ts">
import { computed, defineAsyncComponent, getCurrentInstance, onMounted, onUnmounted, ref, watch } from 'vue'
import { defu } from 'defu'
import { DebugShell } from '@bg-effects/debug-ui'
import { MathBeautyEngine } from './engine/MathBeautyEngine'
import { getFormulaByIndex, formulaLibrary } from './engine/formula-library'
import { meta } from './meta'
import type { MathBeautyProps } from './types'

const props = defineProps<MathBeautyProps>()
const instance = getCurrentInstance()

const hasProvidedProp = (key: string) => {
  const rawProps = instance?.vnode.props || {}
  const kebabKey = key.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
  return key in rawProps || kebabKey in rawProps
}

const resolveProvidedProps = (source: MathBeautyProps) => {
  const result: Partial<MathBeautyProps> = {}
  for (const key of Object.keys(source) as (keyof MathBeautyProps)[]) {
    if (hasProvidedProp(key)) {
      ;(result as Record<string, unknown>)[key] = source[key]
    }
  }
  return result
}

const ConfigContent = defineAsyncComponent(() => import('./ui/ConfigPanel.vue'))
const configContentRef = ref<InstanceType<typeof ConfigContent> | null>(null)

const resolveInitialConfig = () => defu(resolveProvidedProps(props), meta.defaultConfig) as MathBeautyProps
const config = ref<MathBeautyProps>(resolveInitialConfig())
const internalLang = ref<'zh-CN' | 'en'>(config.value.lang || 'zh-CN')
const effectPresetGroups: Record<string, Partial<MathBeautyProps>[]> = {
  superellipse: [
    {
      superellipseA: 10,
      superellipseB: 8,
      superellipseN: 3,
      animationSpeed: 0.2,
      lineWidth: 2.3,
      lineColor: '#f59e0b',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      superellipseA: 12.4,
      superellipseB: 6.2,
      superellipseN: 2.2,
      animationSpeed: 0.22,
      lineWidth: 2.7,
      lineColor: '#f97316',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      superellipseA: 8.2,
      superellipseB: 10.6,
      superellipseN: 5.1,
      animationSpeed: 0.18,
      lineWidth: 2.6,
      lineColor: '#fb923c',
      showTrail: true,
      trailAlpha: 0.11,
    },
  ],
  'pentagram-wave': [
    {
      pentagramBaseAmplitude: 2,
      pentagramWaveAmplitude: 5,
      animationSpeed: 0.18,
      lineWidth: 2.6,
      lineColor: '#a855f7',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      pentagramBaseAmplitude: 2.8,
      pentagramWaveAmplitude: 6.4,
      animationSpeed: 0.2,
      lineWidth: 2.8,
      lineColor: '#9333ea',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      pentagramBaseAmplitude: 1.2,
      pentagramWaveAmplitude: 4.2,
      animationSpeed: 0.17,
      lineWidth: 2.4,
      lineColor: '#c084fc',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  'petal-orbit': [
    {
      petalOrbitAmplitude: 6,
      petalOrbitFreqX: 4,
      petalOrbitFreqY: 3,
      petalOrbitPhase: 1.571,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#4ade80',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      petalOrbitAmplitude: 8.5,
      petalOrbitFreqX: 5.2,
      petalOrbitFreqY: 2.4,
      petalOrbitPhase: 0.8,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#22c55e',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      petalOrbitAmplitude: 4.6,
      petalOrbitFreqX: 2.6,
      petalOrbitFreqY: 5.8,
      petalOrbitPhase: -1.2,
      animationSpeed: 0.18,
      lineWidth: 2.4,
      lineColor: '#86efac',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  lemniscate: [
    {
      lemniscateScale: 10,
      lemniscateWarp: 1,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#22d3ee',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      lemniscateScale: 12.8,
      lemniscateWarp: 1.9,
      animationSpeed: 0.23,
      lineWidth: 2.8,
      lineColor: '#06b6d4',
      showTrail: true,
      trailAlpha: 0.09,
    },
    {
      lemniscateScale: 7.2,
      lemniscateWarp: 0.55,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#67e8f9',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  'cardioid-deluxe': [
    {
      heartDepth: 1,
      heartWidth: 1,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#f472b6',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      heartDepth: 1.45,
      heartWidth: 1.28,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#ec4899',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      heartDepth: 0.78,
      heartWidth: 1.52,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#f9a8d4',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  'modular-times-table': [
    {
      modularPointCount: 360,
      modularMultiplier: 71,
      modularRadius: 12,
      animationSpeed: 0.2,
      lineWidth: 2.5,
      lineColor: '#22d3ee',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      modularPointCount: 540,
      modularMultiplier: 137,
      modularRadius: 14.4,
      animationSpeed: 0.24,
      lineWidth: 2.9,
      lineColor: '#06b6d4',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      modularPointCount: 240,
      modularMultiplier: 93,
      modularRadius: 10.6,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#67e8f9',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  'gcd-layer': [
    {
      gcdLayerScale: 1,
      gcdLayerRotation: 0,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#f97316',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      gcdLayerScale: 1.75,
      gcdLayerRotation: 0.86,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#fb923c',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      gcdLayerScale: 0.72,
      gcdLayerRotation: -1.18,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#fdba74',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  'quadratic-residue-grid': [
    {
      quadraticResidueScale: 1,
      quadraticResidueShear: 0,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#2dd4bf',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      quadraticResidueScale: 1.8,
      quadraticResidueShear: 0.56,
      animationSpeed: 0.23,
      lineWidth: 2.9,
      lineColor: '#14b8a6',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      quadraticResidueScale: 0.78,
      quadraticResidueShear: -0.62,
      animationSpeed: 0.18,
      lineWidth: 2.2,
      lineColor: '#5eead4',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  'gcd-lattice': [
    {
      gcdLatticeScale: 1,
      gcdLatticeJitter: 0,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#ef4444',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      gcdLatticeScale: 1.65,
      gcdLatticeJitter: 0.24,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#f97316',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      gcdLatticeScale: 0.74,
      gcdLatticeJitter: 0.36,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#fb7185',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  astroid: [
    {
      astroidScale: 8,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#fde68a',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      astroidScale: 10.8,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#facc15',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      astroidScale: 6.1,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#fef08a',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  lissajous: [
    {
      lissajousAmpX: 9,
      lissajousAmpY: 9,
      lissajousFreqX: 3,
      lissajousFreqY: 4,
      lissajousPhase: 1.571,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#f97316',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      lissajousAmpX: 12,
      lissajousAmpY: 6.8,
      lissajousFreqX: 5.2,
      lissajousFreqY: 3.1,
      lissajousPhase: 0.62,
      animationSpeed: 0.23,
      lineWidth: 2.8,
      lineColor: '#ea580c',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      lissajousAmpX: 7.4,
      lissajousAmpY: 11.6,
      lissajousFreqX: 2.2,
      lissajousFreqY: 6.4,
      lissajousPhase: -1.2,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#fdba74',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  'oscilloscope-harmonic': [
    {
      oscBaseFreq: 1.4,
      oscAmplitude: 3.2,
      oscHarmonics: 5,
      oscDecay: 1.4,
      oscPhaseDrift: 0.2,
      oscScanSpan: 25.13,
      animationSpeed: 0.2,
      lineWidth: 2.3,
      lineColor: '#38bdf8',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      oscBaseFreq: 2.2,
      oscAmplitude: 4.6,
      oscHarmonics: 10,
      oscDecay: 0.9,
      oscPhaseDrift: 1.2,
      oscScanSpan: 43.98,
      animationSpeed: 0.23,
      lineWidth: 2.7,
      lineColor: '#0ea5e9',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      oscBaseFreq: 0.9,
      oscAmplitude: 2.6,
      oscHarmonics: 8,
      oscDecay: 2.1,
      oscPhaseDrift: -0.6,
      oscScanSpan: 18.85,
      animationSpeed: 0.18,
      lineWidth: 2.2,
      lineColor: '#7dd3fc',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  'oscilloscope-sincos': [
    {
      oscSinAmp: 6,
      oscCosAmp: 4,
      oscFreq: 1.8,
      oscPhase: 0,
      oscPhaseShift: 1.571,
      oscOffset: 0,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#22d3ee',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      oscSinAmp: 9.4,
      oscCosAmp: 6.2,
      oscFreq: 3.1,
      oscPhase: 0.85,
      oscPhaseShift: -1.1,
      oscOffset: -0.8,
      animationSpeed: 0.24,
      lineWidth: 2.8,
      lineColor: '#06b6d4',
      showTrail: true,
      trailAlpha: 0.09,
    },
    {
      oscSinAmp: 3.8,
      oscCosAmp: 10.4,
      oscFreq: 1.1,
      oscPhase: -0.7,
      oscPhaseShift: 2.3,
      oscOffset: 1.4,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#67e8f9',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  limacon: [
    {
      limaconLoopScale: 1.0,
      limaconOffset: 0,
      animationSpeed: 0.2,
      lineWidth: 2.2,
      lineColor: '#7dd3fc',
      showTrail: true,
      trailAlpha: 0.14,
    },
    {
      limaconLoopScale: 1.6,
      limaconOffset: -1.8,
      animationSpeed: 0.2,
      lineWidth: 2.6,
      lineColor: '#38bdf8',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      limaconLoopScale: 0.7,
      limaconOffset: 2.6,
      animationSpeed: 0.18,
      lineWidth: 2.6,
      lineColor: '#0ea5e9',
      showTrail: true,
      trailAlpha: 0.1,
    },
  ],
  'spiral-spirograph': [
    {
      spirographR: 10,
      spirographr: 4,
      spirographd: 5,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#06b6d4',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      spirographR: 12.8,
      spirographr: 3.2,
      spirographd: 7.4,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#0284c7',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      spirographR: 8.4,
      spirographr: 5.6,
      spirographd: 3.1,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#67e8f9',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  hypotrochoid: [
    {
      hypotrochoidR: 9,
      hypotrochoidr: 4,
      hypotrochoidd: 5,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#22d3ee',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      hypotrochoidR: 11.2,
      hypotrochoidr: 2.9,
      hypotrochoidd: 7.2,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#06b6d4',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      hypotrochoidR: 7.4,
      hypotrochoidr: 5.6,
      hypotrochoidd: 2.4,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#67e8f9',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  epicycloid: [
    {
      epicycloidR: 5,
      epicycloidr: 2,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#f97316',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      epicycloidR: 7.2,
      epicycloidr: 1.2,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#ea580c',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      epicycloidR: 3.6,
      epicycloidr: 3.3,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#fdba74',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  nephroid: [
    {
      nephroidScale: 6,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#38bdf8',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      nephroidScale: 9.4,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#0ea5e9',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      nephroidScale: 3.8,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#7dd3fc',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  'epitrochoid-bloom': [
    {
      trochoidRatio: 2.6,
      trochoidOffset: 3.2,
      trochoidPhase: 0,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#f59e0b',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      trochoidRatio: 4.2,
      trochoidOffset: 5.6,
      trochoidPhase: 1.1,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#f97316',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      trochoidRatio: 1.8,
      trochoidOffset: 2.2,
      trochoidPhase: -1.4,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#fbbf24',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  'hypotrochoid-weave': [
    {
      trochoidRatio: 2.8,
      trochoidOffset: 2.4,
      trochoidPhase: 0,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#14b8a6',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      trochoidRatio: 5.1,
      trochoidOffset: 4.6,
      trochoidPhase: 0.92,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#0d9488',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      trochoidRatio: 1.9,
      trochoidOffset: 1.6,
      trochoidPhase: -1.3,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#5eead4',
      showTrail: true,
      trailAlpha: 0.13,
    },
  ],
  'dual-frequency-bloom': [
    {
      bloomFrequency1: 6,
      bloomFrequency2: 12,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#c4b5fd',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      bloomFrequency1: 7,
      bloomFrequency2: 17,
      animationSpeed: 0.2,
      lineWidth: 2.8,
      lineColor: '#a78bfa',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      bloomFrequency1: 9,
      bloomFrequency2: 20,
      animationSpeed: 0.24,
      lineWidth: 3.1,
      lineColor: '#8b5cf6',
      showTrail: true,
      trailAlpha: 0.08,
    },
  ],
  'star-rose': [
    {
      starRosePetalCount: 6,
      starRoseRadius: 9.6,
      animationSpeed: 0.2,
      lineWidth: 2.6,
      lineColor: '#fb7185',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      starRosePetalCount: 7,
      starRoseRadius: 9,
      animationSpeed: 0.2,
      lineWidth: 2.5,
      lineColor: '#f43f5e',
      showTrail: true,
      trailAlpha: 0.11,
    },
    {
      starRosePetalCount: 8.5,
      starRoseRadius: 8.4,
      animationSpeed: 0.19,
      lineWidth: 2.4,
      lineColor: '#e11d48',
      showTrail: true,
      trailAlpha: 0.1,
    },
  ],
  'butterfly-variation': [
    {
      butterflyVariationWave: 0.18,
      butterflyVariationExponent: 4.2,
      animationSpeed: 0.18,
      lineWidth: 2.6,
      lineColor: '#f472b6',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      butterflyVariationWave: 0.35,
      butterflyVariationExponent: 5,
      animationSpeed: 0.2,
      lineWidth: 2.7,
      lineColor: '#ec4899',
      showTrail: true,
      trailAlpha: 0.11,
    },
    {
      butterflyVariationWave: 0.52,
      butterflyVariationExponent: 6.2,
      animationSpeed: 0.23,
      lineWidth: 2.9,
      lineColor: '#db2777',
      showTrail: true,
      trailAlpha: 0.09,
    },
  ],
  'ribbon-orbit': [
    {
      ribbonOrbitAmplitude: 3.2,
      ribbonOrbitBaseRadius: 10.8,
      animationSpeed: 0.2,
      lineWidth: 2.5,
      lineColor: '#d946ef',
      showTrail: true,
      trailAlpha: 0.11,
    },
    {
      ribbonOrbitAmplitude: 4,
      ribbonOrbitBaseRadius: 10,
      animationSpeed: 0.2,
      lineWidth: 2.6,
      lineColor: '#c026d3',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      ribbonOrbitAmplitude: 5.1,
      ribbonOrbitBaseRadius: 9.2,
      animationSpeed: 0.24,
      lineWidth: 2.9,
      lineColor: '#a21caf',
      showTrail: true,
      trailAlpha: 0.09,
    },
  ],
  'flower-web': [
    {
      flowerWebAmplitude: 2.6,
      flowerWebFrequency: 0.85,
      animationSpeed: 0.18,
      lineWidth: 2.4,
      lineColor: '#f472b6',
      showTrail: true,
      trailAlpha: 0.11,
    },
    {
      flowerWebAmplitude: 3,
      flowerWebFrequency: 0.96,
      animationSpeed: 0.2,
      lineWidth: 2.5,
      lineColor: '#ec4899',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      flowerWebAmplitude: 4.2,
      flowerWebFrequency: 1.2,
      animationSpeed: 0.24,
      lineWidth: 2.9,
      lineColor: '#db2777',
      showTrail: true,
      trailAlpha: 0.09,
    },
  ],
  'petal-chain': [
    {
      petalChainAmplitude: 2.4,
      petalChainFrequency: 0.55,
      animationSpeed: 0.18,
      lineWidth: 2.4,
      lineColor: '#fb7185',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      petalChainAmplitude: 3,
      petalChainFrequency: 0.75,
      animationSpeed: 0.2,
      lineWidth: 2.6,
      lineColor: '#ef4444',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      petalChainAmplitude: 4.6,
      petalChainFrequency: 1.15,
      animationSpeed: 0.23,
      lineWidth: 2.8,
      lineColor: '#dc2626',
      showTrail: true,
      trailAlpha: 0.09,
    },
  ],
  'tan-cot-burst': [
    {
      tanCotBurstScale: 14,
      tanCotBurstFrequency: 13,
      tanCotBurstHole: 0,
      tanCotBurstCross: 0,
      tanCotBurstClamp: 0,
      animationSpeed: 0.16,
      lineWidth: 2.2,
      lineColor: '#fda4af',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      tanCotBurstScale: 20,
      tanCotBurstFrequency: 17,
      tanCotBurstHole: 2.6,
      tanCotBurstCross: 34,
      tanCotBurstClamp: 130,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#fb7185',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      tanCotBurstScale: 26,
      tanCotBurstFrequency: 22,
      tanCotBurstHole: 3.1,
      tanCotBurstCross: 42,
      tanCotBurstClamp: 140,
      animationSpeed: 0.23,
      lineWidth: 2.8,
      lineColor: '#f43f5e',
      showTrail: true,
      trailAlpha: 0.08,
    },
  ],
  'archimedean-spiral': [
    {
      archimedeanPitch: 0.26,
      archimedeanTwist: 1,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#38bdf8',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      archimedeanPitch: 0.2,
      archimedeanTwist: 1.7,
      animationSpeed: 0.2,
      lineWidth: 2.5,
      lineColor: '#0ea5e9',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      archimedeanPitch: 0.42,
      archimedeanTwist: 0.68,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#0284c7',
      showTrail: true,
      trailAlpha: 0.09,
    },
  ],
  'fermat-r2-spiral': [
    {
      fermatR2Turns: 26,
      fermatR2Scale: 1.1,
      fermatR2AngularScale: 1,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#facc15',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      fermatR2Turns: 34,
      fermatR2Scale: 1.35,
      fermatR2AngularScale: 1.42,
      animationSpeed: 0.2,
      lineWidth: 2.6,
      lineColor: '#eab308',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      fermatR2Turns: 20,
      fermatR2Scale: 1.8,
      fermatR2AngularScale: 0.72,
      animationSpeed: 0.22,
      lineWidth: 2.9,
      lineColor: '#ca8a04',
      showTrail: true,
      trailAlpha: 0.08,
    },
  ],
  'logarithmic-spiral': [
    {
      logSpiralGrowth: 0.12,
      logSpiralFrequency: 2.4,
      logSpiralScale: 0.45,
      logSpiralRadialWarp: 0.8,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#60a5fa',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      logSpiralGrowth: 0.19,
      logSpiralFrequency: 3.2,
      logSpiralScale: 0.35,
      logSpiralRadialWarp: 1.26,
      animationSpeed: 0.2,
      lineWidth: 2.5,
      lineColor: '#3b82f6',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      logSpiralGrowth: 0.08,
      logSpiralFrequency: 1.7,
      logSpiralScale: 0.66,
      logSpiralRadialWarp: 0.52,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#2563eb',
      showTrail: true,
      trailAlpha: 0.08,
    },
  ],
  'fermat-spiral-weave': [
    {
      fermatSpiralScale: 11,
      fermatSpiralTwist: 1.6,
      fermatSpiralMirror: 1,
      animationSpeed: 0.18,
      lineWidth: 2.4,
      lineColor: '#22d3ee',
      showTrail: true,
      trailAlpha: 0.11,
    },
    {
      fermatSpiralScale: 13.2,
      fermatSpiralTwist: 2.35,
      fermatSpiralMirror: 1.36,
      animationSpeed: 0.2,
      lineWidth: 2.6,
      lineColor: '#06b6d4',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      fermatSpiralScale: 8.4,
      fermatSpiralTwist: 1.12,
      fermatSpiralMirror: 0.42,
      animationSpeed: 0.22,
      lineWidth: 2.9,
      lineColor: '#0891b2',
      showTrail: true,
      trailAlpha: 0.09,
    },
  ],
  'lissajous-ribbon': [
    {
      lissajousRibbonAmp: 9.5,
      lissajousRibbonFreqX: 3.2,
      lissajousRibbonFreqY: 4.1,
      lissajousRibbonPhase: Math.PI / 3,
      lissajousRibbonTwist: 1.1,
      animationSpeed: 0.18,
      lineWidth: 2.4,
      lineColor: '#fb7185',
      showTrail: true,
      trailAlpha: 0.11,
    },
    {
      lissajousRibbonAmp: 11.2,
      lissajousRibbonFreqX: 5.3,
      lissajousRibbonFreqY: 4.1,
      lissajousRibbonPhase: 1.28,
      lissajousRibbonTwist: 1.7,
      animationSpeed: 0.2,
      lineWidth: 2.6,
      lineColor: '#f43f5e',
      showTrail: true,
      trailAlpha: 0.09,
    },
    {
      lissajousRibbonAmp: 8.3,
      lissajousRibbonFreqX: 2.5,
      lissajousRibbonFreqY: 6.2,
      lissajousRibbonPhase: -0.74,
      lissajousRibbonTwist: 0.65,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#e11d48',
      showTrail: true,
      trailAlpha: 0.08,
    },
  ],
  'strange-attractor-ink': [
    {
      strangeInkA: 1.65,
      strangeInkB: -2.05,
      strangeInkC: 1.55,
      strangeInkD: 0.82,
      strangeInkScale: 1.05,
      animationSpeed: 0.18,
      lineWidth: 2.2,
      lineColor: '#f59e0b',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      strangeInkA: 2.42,
      strangeInkB: -1.73,
      strangeInkC: 1.96,
      strangeInkD: 1.22,
      strangeInkScale: 1.24,
      animationSpeed: 0.2,
      lineWidth: 2.5,
      lineColor: '#f97316',
      showTrail: true,
      trailAlpha: 0.08,
    },
    {
      strangeInkA: -1.42,
      strangeInkB: 2.36,
      strangeInkC: 2.18,
      strangeInkD: -0.54,
      strangeInkScale: 0.88,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#ea580c',
      showTrail: true,
      trailAlpha: 0.12,
    },
  ],
  'vortex-spiral': [
    {
      vortexSpiralTurns: 8.2,
      vortexSpiralCurl: 1.3,
      vortexSpiralDrift: 0.09,
      vortexSpiralWave: 1.2,
      vortexSpiralScale: 6.6,
      animationSpeed: 0.18,
      lineWidth: 2.3,
      lineColor: '#22d3ee',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      vortexSpiralTurns: 12.6,
      vortexSpiralCurl: 2.4,
      vortexSpiralDrift: 0.06,
      vortexSpiralWave: 2.3,
      vortexSpiralScale: 5.8,
      animationSpeed: 0.2,
      lineWidth: 2.6,
      lineColor: '#06b6d4',
      showTrail: true,
      trailAlpha: 0.09,
    },
    {
      vortexSpiralTurns: 5.4,
      vortexSpiralCurl: 0.78,
      vortexSpiralDrift: 0.16,
      vortexSpiralWave: 0.62,
      vortexSpiralScale: 8.7,
      animationSpeed: 0.22,
      lineWidth: 2.9,
      lineColor: '#0891b2',
      showTrail: true,
      trailAlpha: 0.08,
    },
  ],
  'particle-flow-weave': [
    {
      particleFlowDensity: 36,
      particleFlowStep: 0.16,
      particleFlowTwist: 1.1,
      particleFlowBias: 0.62,
      particleFlowScale: 1,
      animationSpeed: 0.18,
      lineWidth: 2.1,
      lineColor: '#34d399',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      particleFlowDensity: 52,
      particleFlowStep: 0.12,
      particleFlowTwist: 2.28,
      particleFlowBias: -0.34,
      particleFlowScale: 1.35,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#10b981',
      showTrail: true,
      trailAlpha: 0.08,
    },
    {
      particleFlowDensity: 24,
      particleFlowStep: 0.22,
      particleFlowTwist: 0.72,
      particleFlowBias: 0.96,
      particleFlowScale: 0.82,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#059669',
      showTrail: true,
      trailAlpha: 0.12,
    },
  ],
  'flourish-curve-bloom': [
    {
      flourishPetals: 6,
      flourishBloom: 0.75,
      flourishTwist: 1.6,
      flourishPhase: 0.5,
      flourishScale: 8.5,
      animationSpeed: 0.18,
      lineWidth: 2.4,
      lineColor: '#f472b6',
      showTrail: true,
      trailAlpha: 0.11,
    },
    {
      flourishPetals: 9,
      flourishBloom: 1.22,
      flourishTwist: 2.7,
      flourishPhase: 1.12,
      flourishScale: 7.4,
      animationSpeed: 0.2,
      lineWidth: 2.6,
      lineColor: '#ec4899',
      showTrail: true,
      trailAlpha: 0.09,
    },
    {
      flourishPetals: 4,
      flourishBloom: 0.36,
      flourishTwist: 0.86,
      flourishPhase: -0.74,
      flourishScale: 10.8,
      animationSpeed: 0.22,
      lineWidth: 2.9,
      lineColor: '#db2777',
      showTrail: true,
      trailAlpha: 0.08,
    },
  ],
  'interference-field': [
    {
      interferenceFreqX: 3.4,
      interferenceFreqY: 4.7,
      interferencePhase: 0.7,
      interferenceDrift: 1,
      interferenceScale: 8.5,
      animationSpeed: 0.18,
      lineWidth: 2.2,
      lineColor: '#38bdf8',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      interferenceFreqX: 5.8,
      interferenceFreqY: 6.4,
      interferencePhase: 1.24,
      interferenceDrift: 1.9,
      interferenceScale: 6.2,
      animationSpeed: 0.2,
      lineWidth: 2.5,
      lineColor: '#0ea5e9',
      showTrail: true,
      trailAlpha: 0.08,
    },
    {
      interferenceFreqX: 1.8,
      interferenceFreqY: 3.1,
      interferencePhase: -0.68,
      interferenceDrift: 0.36,
      interferenceScale: 11.3,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#0284c7',
      showTrail: true,
      trailAlpha: 0.12,
    },
  ],
  'wavefront-interference': [
    {
      wavefrontK1: 2.6,
      wavefrontK2: 3.8,
      wavefrontDistance: 3.6,
      wavefrontPhase: 0.55,
      wavefrontScale: 4.2,
      animationSpeed: 0.18,
      lineWidth: 2.2,
      lineColor: '#a78bfa',
      showTrail: true,
      trailAlpha: 0.1,
    },
    {
      wavefrontK1: 4.2,
      wavefrontK2: 4.9,
      wavefrontDistance: 2.1,
      wavefrontPhase: 1.46,
      wavefrontScale: 6.4,
      animationSpeed: 0.2,
      lineWidth: 2.5,
      lineColor: '#8b5cf6',
      showTrail: true,
      trailAlpha: 0.09,
    },
    {
      wavefrontK1: 1.36,
      wavefrontK2: 2.18,
      wavefrontDistance: 5.2,
      wavefrontPhase: -0.62,
      wavefrontScale: 3.1,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#7c3aed',
      showTrail: true,
      trailAlpha: 0.12,
    },
  ],
}
const effectPresetCursor = ref<Record<string, number>>({})

const containerRef = ref<HTMLElement | null>(null)
let engine: MathBeautyEngine | null = null

const engineInterface = computed(() => ({
  pause: () => engine?.pause(),
  resume: () => engine?.resume(),
  restart: () => engine?.restart(),
  nextEffect: () => {
    config.value = {
      ...config.value,
      effectIndex: (config.value.effectIndex || 0) + 1,
    }
  },
}))

const formulaText = computed(() => {
  const effect = getFormulaByIndex(config.value.effectIndex || 0)
  return effect.formulaText[internalLang.value]
})

watch(
  () => props,
  (newProps) => {
    if (!props.debug) {
      config.value = defu(resolveProvidedProps(newProps), meta.defaultConfig) as MathBeautyProps
    }
  },
  { deep: true },
)

watch(
  () => config.value.effectIndex,
  (nextIndex, prevIndex) => {
    if (nextIndex === undefined || nextIndex === prevIndex) return
    if (config.value.presetLock) return
    const effect = getFormulaByIndex(nextIndex)
    const presets = effectPresetGroups[effect.id]
    if (!presets?.length) return
    const currentCursor = effectPresetCursor.value[effect.id] ?? -1
    const nextCursor = (currentCursor + 1) % presets.length
    effectPresetCursor.value = {
      ...effectPresetCursor.value,
      [effect.id]: nextCursor,
    }
    const preset = presets[nextCursor]
    const shouldApply = Object.entries(preset).some(([key, value]) => config.value[key as keyof MathBeautyProps] !== value)
    if (!shouldApply) return
    config.value = {
      ...config.value,
      ...preset,
      effectIndex: nextIndex,
    }
  },
)

watch(
  config,
  (newConfig) => {
    if (!engine) return
    const total = formulaLibrary.length
    const safeIndex = ((newConfig.effectIndex || 0) % total + total) % total
    if (safeIndex !== newConfig.effectIndex) {
      config.value = {
        ...newConfig,
        effectIndex: safeIndex,
      }
      return
    }
    engine.updateConfig(newConfig)
  },
  { deep: true },
)

const handleRandomize = () => {
  if (!meta.randomize) return
  const activeTabRef = configContentRef.value ? (configContentRef.value as any).activeTab : undefined
  const tabValue = activeTabRef?.value || activeTabRef
  config.value = meta.randomize(config.value, tabValue)
}

onMounted(() => {
  if (!containerRef.value) return
  engine = new MathBeautyEngine(containerRef.value, config.value)
})

onUnmounted(() => {
  engine?.destroy()
  engine = null
})
</script>

<template>
  <div ref="containerRef" class="math-beauty-container absolute inset-0 z-0" :class="props.className">
    <div class="formula-overlay">
      {{ formulaText }}
    </div>
    <DebugShell
      v-if="debug"
      v-model:config="config"
      v-model:lang="internalLang"
      :meta="meta"
      :engine="engineInterface"
      @randomize="handleRandomize"
    >
      <template #settings>
        <ConfigContent
          ref="configContentRef"
          v-model:config="config"
          :lang="internalLang"
        />
      </template>
    </DebugShell>
  </div>
</template>

<style scoped>
.math-beauty-container {
  overflow: hidden;
}

.math-beauty-container :deep(canvas) {
  display: block;
  width: 100%;
  height: 100%;
}

.formula-overlay {
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  color: rgba(255, 255, 255, 0.95);
  font-family: ui-serif, Georgia, Cambria, 'Times New Roman', serif;
  font-size: clamp(20px, 3.2vw, 58px);
  font-weight: 700;
  letter-spacing: 0.02em;
  text-align: center;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.45);
  pointer-events: none;
  width: min(92vw, 1500px);
}
</style>
