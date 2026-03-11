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
