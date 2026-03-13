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
  cardioid: [
    {
      cardioidScale: 1.1,
      cardioidDistortion: 0.3,
      animationSpeed: 0.2,
      lineWidth: 2.2,
      lineColor: '#fda4af',
      showTrail: true,
      trailAlpha: 0.14,
    },
    {
      cardioidScale: 1.4,
      cardioidDistortion: 1.2,
      animationSpeed: 0.2,
      lineWidth: 2.4,
      lineColor: '#fb7185',
      showTrail: true,
      trailAlpha: 0.12,
    },
    {
      cardioidScale: 1.8,
      cardioidDistortion: 1.9,
      animationSpeed: 0.22,
      lineWidth: 2.8,
      lineColor: '#f43f5e',
      showTrail: true,
      trailAlpha: 0.1,
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
