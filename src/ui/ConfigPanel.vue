<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { SubTabs } from '@bg-effects/shared'
import zhCN from '../locales/zh-CN.json'
import en from '../locales/en.json'
import { formulaLibrary, getFormulaByIndex } from '../engine/formula-library'
import type { MathBeautyProps } from '../types'

const props = defineProps<{
  config: MathBeautyProps
  lang?: 'zh-CN' | 'en'
}>()

const emit = defineEmits<{
  'update:config': [value: MathBeautyProps]
}>()

const activeTab = ref('basic')

const i18n = {
  'zh-CN': zhCN,
  en,
}

const t = (path: string) => {
  const dict = i18n[props.lang || 'zh-CN']
  return path.split('.').reduce((obj: any, key) => obj?.[key], dict) || path
}

const subTabs = computed(() => [
  { id: 'basic', label: t('tabs.basic') },
  { id: 'display', label: t('tabs.display') },
])

type FormulaCategory = 'polar' | 'parametric' | 'trochoid' | 'numberTheory' | 'fractal' | 'physics' | 'chaos' | 'hybrid'

const categoryOrder: FormulaCategory[] = ['polar', 'parametric', 'trochoid', 'numberTheory', 'fractal', 'physics', 'chaos', 'hybrid']

const formulaCategoryMap: Record<string, FormulaCategory> = {
  cardioid: 'polar',
  limacon: 'polar',
  'modular-times-table': 'numberTheory',
  'dual-frequency-bloom': 'polar',
  superellipse: 'parametric',
  'star-rose': 'polar',
  'spiral-spirograph': 'hybrid',
  'butterfly-variation': 'polar',
  'gcd-layer': 'numberTheory',
  'quadratic-residue-grid': 'numberTheory',
  'gcd-lattice': 'numberTheory',
  'pentagram-wave': 'parametric',
  'ribbon-orbit': 'polar',
  'flower-web': 'polar',
  'petal-chain': 'polar',
  'petal-orbit': 'parametric',
  'rose-curve': 'polar',
  hypotrochoid: 'trochoid',
  epicycloid: 'trochoid',
  lemniscate: 'parametric',
  butterfly: 'polar',
  'tan-cot-burst': 'polar',
  lissajous: 'parametric',
  nephroid: 'trochoid',
  'archimedean-spiral': 'polar',
  'fermat-r2-spiral': 'polar',
  'sine-square-lattice': 'hybrid',
  'resonant-implicit-wave': 'hybrid',
  'tan-cot-implicit-maze': 'hybrid',
  'logarithmic-spiral': 'polar',
  'fermat-spiral-weave': 'polar',
  'cardioid-deluxe': 'parametric',
  'double-heart': 'parametric',
  'epitrochoid-bloom': 'trochoid',
  'hypotrochoid-weave': 'trochoid',
  astroid: 'parametric',
  'julia-fractal': 'fractal',
  'mandelbrot-orbit': 'fractal',
  'barnsley-fern': 'fractal',
  'vector-field-streamlines': 'physics',
  'gravity-well': 'physics',
  'vortex-field': 'physics',
  'lorenz-attractor': 'chaos',
  'rossler-attractor': 'chaos',
  'aizawa-attractor': 'chaos',
}

const getFormulaCategory = (effectId: string): FormulaCategory => formulaCategoryMap[effectId] || 'hybrid'

const currentFormulaName = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return effect.name[props.lang || 'zh-CN']
})

const selectedCategory = ref<'all' | FormulaCategory>('all')

const currentCategory = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return getFormulaCategory(effect.id)
})

watch(
  () => props.config.effectIndex,
  () => {
    if (selectedCategory.value === 'all') {
      return
    }
    const effect = getFormulaByIndex(props.config.effectIndex || 0)
    const category = getFormulaCategory(effect.id)
    if (category !== selectedCategory.value) {
      selectedCategory.value = category
    }
  },
  { immediate: true },
)

const isModularTimesTable = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return effect.id === 'modular-times-table'
})

const isChaosEffect = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return effect.id === 'lorenz-attractor' || effect.id === 'rossler-attractor' || effect.id === 'aizawa-attractor'
})

const isJuliaFractal = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return effect.id === 'julia-fractal'
})

const isMandelbrotOrbit = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return effect.id === 'mandelbrot-orbit'
})

const isBarnsleyFern = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return effect.id === 'barnsley-fern'
})

const isLogarithmicSpiral = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return effect.id === 'logarithmic-spiral'
})

const isFermatSpiralWeave = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return effect.id === 'fermat-spiral-weave'
})

const isCardioidDeluxe = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return effect.id === 'cardioid-deluxe'
})

const isDoubleHeart = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return effect.id === 'double-heart'
})

const isFermatR2Spiral = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return effect.id === 'fermat-r2-spiral'
})

const isImplicitEffect = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return effect.id === 'sine-square-lattice' || effect.id === 'resonant-implicit-wave' || effect.id === 'tan-cot-implicit-maze'
})

const isAdvancedTrochoid = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return effect.id === 'epitrochoid-bloom' || effect.id === 'hypotrochoid-weave'
})

const chaosSystemToEffectId: Record<'lorenz' | 'rossler' | 'aizawa', string> = {
  lorenz: 'lorenz-attractor',
  rossler: 'rossler-attractor',
  aizawa: 'aizawa-attractor',
}

const effectIdToChaosSystem = (effectId: string): 'lorenz' | 'rossler' | 'aizawa' => {
  if (effectId === 'rossler-attractor') return 'rossler'
  if (effectId === 'aizawa-attractor') return 'aizawa'
  return 'lorenz'
}

const currentChaosSystem = computed(() => {
  const effect = getFormulaByIndex(props.config.effectIndex || 0)
  return effectIdToChaosSystem(effect.id)
})

const categoryOptions = computed(() => [
  { value: 'all', label: t('labels.categoryAll') },
  ...categoryOrder.map(category => ({
    value: category,
    label: t(`categories.${category}`),
  })),
])

const groupedEffectOptions = computed(() => {
  const lang = props.lang || 'zh-CN'
  const selected = selectedCategory.value
  return categoryOrder
    .map((category) => {
      const options = formulaLibrary
        .map((effect, index) => ({ effect, index }))
        .filter(item => (selected === 'all' || getFormulaCategory(item.effect.id) === selected) && getFormulaCategory(item.effect.id) === category)
        .map((item, idx) => ({
          value: item.index,
          label: `${idx + 1}. ${item.effect.name[lang]}`,
        }))
      return {
        key: category,
        label: t(`categories.${category}`),
        options,
      }
    })
    .filter(group => group.options.length > 0)
})

const updateConfig = (key: keyof MathBeautyProps, value: string | number | boolean) => {
  emit('update:config', {
    ...props.config,
    [key]: value,
  })
}

const currentCategoryLabel = computed(() => t(`categories.${currentCategory.value}`))

const currentCategoryIndices = computed(() => {
  const selected = selectedCategory.value
  return formulaLibrary
    .map((effect, index) => ({ effect, index }))
    .filter(item => selected === 'all'
      ? getFormulaCategory(item.effect.id) === currentCategory.value
      : getFormulaCategory(item.effect.id) === selected)
    .map(item => item.index)
})

const currentCategoryProgress = computed(() => {
  const indices = currentCategoryIndices.value
  const currentIndex = props.config.effectIndex || 0
  const position = indices.indexOf(currentIndex)
  if (position < 0 || !indices.length) {
    return ''
  }
  return `${position + 1}/${indices.length}`
})

const jumpByCategory = (direction: 1 | -1) => {
  const indices = currentCategoryIndices.value
  const currentIndex = props.config.effectIndex || 0
  if (!indices.length) return
  const currentPos = indices.indexOf(currentIndex)
  const safePos = currentPos < 0 ? 0 : currentPos
  const nextPos = (safePos + direction + indices.length) % indices.length
  updateConfig('effectIndex', indices[nextPos])
}

const prevEffect = () => {
  jumpByCategory(-1)
}

const nextEffect = () => {
  jumpByCategory(1)
}

const changeCategory = (value: string) => {
  if (value === 'all') {
    selectedCategory.value = 'all'
    return
  }
  const category = value as FormulaCategory
  selectedCategory.value = category
  const first = formulaLibrary.findIndex(effect => getFormulaCategory(effect.id) === category)
  if (first >= 0) {
    updateConfig('effectIndex', first)
  }
}

const changeChaosSystem = (value: string) => {
  if (value !== 'lorenz' && value !== 'rossler' && value !== 'aizawa') {
    return
  }
  const effectId = chaosSystemToEffectId[value]
  const nextIndex = formulaLibrary.findIndex(effect => effect.id === effectId)
  emit('update:config', {
    ...props.config,
    chaosSystem: value,
    effectIndex: nextIndex >= 0 ? nextIndex : props.config.effectIndex,
  })
}

defineExpose({
  activeTab,
})
</script>

<template>
  <div class="flex flex-col gap-6 text-white/90">
    <SubTabs v-model="activeTab" :tabs="subTabs" />
    <div class="flex flex-col gap-6 px-1 pointer-events-auto overflow-y-auto max-h-[420px] custom-scrollbar pr-2">
      <div v-if="activeTab === 'basic'" class="flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            {{ t('labels.effectName') }}
          </label>
          <div class="text-sm font-semibold text-white/85">
            {{ currentFormulaName }}
          </div>
          <div class="text-[11px] text-white/55">
            {{ currentCategoryLabel }} · {{ currentCategoryProgress }}
          </div>
          <div class="mt-1 grid grid-cols-2 gap-2">
            <button
              class="py-2 px-3 text-xs rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
              @click="prevEffect"
            >
              {{ t('actions.prevEffect') }}
            </button>
            <button
              class="py-2 px-3 text-xs rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
              @click="nextEffect"
            >
              {{ t('actions.nextEffect') }}
            </button>
          </div>
          <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-1">
            {{ t('labels.effectCategory') }}
          </label>
          <select
            :value="selectedCategory"
            class="mt-1 py-2 px-3 text-xs rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
            @change="(e: Event) => changeCategory((e.target as HTMLSelectElement).value)"
          >
            <option v-for="option in categoryOptions" :key="option.value" :value="option.value" class="bg-slate-900 text-white">
              {{ option.label }}
            </option>
          </select>
          <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mt-1">
            {{ t('labels.effectSelect') }}
          </label>
          <select
            :value="config.effectIndex || 0"
            class="mt-1 py-2 px-3 text-xs rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
            @change="(e: Event) => updateConfig('effectIndex', Number((e.target as HTMLSelectElement).value))"
          >
            <optgroup v-for="group in groupedEffectOptions" :key="group.key" :label="group.label">
              <option v-for="option in group.options" :key="option.value" :value="option.value" class="bg-slate-900 text-white">
                {{ option.label }}
              </option>
            </optgroup>
          </select>
        </div>

        <div v-for="prop in [
          { id: 'animationSpeed', min: 0.02, max: 0.8, step: 0.01, label: 'animationSpeed' },
          { id: 'lineWidth', min: 0.8, max: 8, step: 0.1, label: 'lineWidth' }
        ]" :key="prop.id" class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              {{ t(`labels.${prop.label}`) }}
            </label>
            <span class="text-[11px] font-mono text-white/55">
              {{ (config[prop.id as keyof MathBeautyProps] as number).toFixed(2) }}
            </span>
          </div>
          <input
            :value="config[prop.id as keyof MathBeautyProps]"
            type="range"
            :min="prop.min"
            :max="prop.max"
            :step="prop.step"
            class="w-full accent-blue-500 h-1.5 rounded-full appearance-none cursor-pointer"
            @input="(e: Event) => updateConfig(prop.id as keyof MathBeautyProps, Number((e.target as HTMLInputElement).value))"
          >
        </div>

        <template v-if="isModularTimesTable">
          <div v-for="prop in [
            { id: 'modularPointCount', min: 60, max: 960, step: 1, label: 'modularPointCount' },
            { id: 'modularMultiplier', min: 2, max: 480, step: 1, label: 'modularMultiplier' },
            { id: 'modularRadius', min: 4, max: 24, step: 0.1, label: 'modularRadius' }
          ]" :key="prop.id" class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {{ t(`labels.${prop.label}`) }}
              </label>
              <span class="text-[11px] font-mono text-white/55">
                {{ (config[prop.id as keyof MathBeautyProps] as number).toFixed(prop.step < 1 ? 1 : 0) }}
              </span>
            </div>
            <input
              :value="config[prop.id as keyof MathBeautyProps]"
              type="range"
              :min="prop.min"
              :max="prop.max"
              :step="prop.step"
              class="w-full accent-blue-500 h-1.5 rounded-full appearance-none cursor-pointer"
              @input="(e: Event) => updateConfig(prop.id as keyof MathBeautyProps, Number((e.target as HTMLInputElement).value))"
            >
          </div>
        </template>

        <template v-if="isLogarithmicSpiral">
          <div v-for="prop in [
            { id: 'logSpiralGrowth', min: 0.02, max: 0.35, step: 0.001, label: 'logSpiralGrowth' },
            { id: 'logSpiralFrequency', min: 0.6, max: 8, step: 0.01, label: 'logSpiralFrequency' },
            { id: 'logSpiralScale', min: 0.12, max: 1.2, step: 0.001, label: 'logSpiralScale' }
          ]" :key="prop.id" class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {{ t(`labels.${prop.label}`) }}
              </label>
              <span class="text-[11px] font-mono text-white/55">
                {{ (config[prop.id as keyof MathBeautyProps] as number).toFixed(3) }}
              </span>
            </div>
            <input
              :value="config[prop.id as keyof MathBeautyProps]"
              type="range"
              :min="prop.min"
              :max="prop.max"
              :step="prop.step"
              class="w-full accent-blue-500 h-1.5 rounded-full appearance-none cursor-pointer"
              @input="(e: Event) => updateConfig(prop.id as keyof MathBeautyProps, Number((e.target as HTMLInputElement).value))"
            >
          </div>
        </template>

        <template v-if="isFermatR2Spiral">
          <div v-for="prop in [
            { id: 'fermatR2Turns', min: 8, max: 52, step: 0.01, label: 'fermatR2Turns' },
            { id: 'fermatR2Scale', min: 0.4, max: 2.4, step: 0.001, label: 'fermatR2Scale' }
          ]" :key="prop.id" class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {{ t(`labels.${prop.label}`) }}
              </label>
              <span class="text-[11px] font-mono text-white/55">
                {{ (config[prop.id as keyof MathBeautyProps] as number).toFixed(3) }}
              </span>
            </div>
            <input
              :value="config[prop.id as keyof MathBeautyProps]"
              type="range"
              :min="prop.min"
              :max="prop.max"
              :step="prop.step"
              class="w-full accent-blue-500 h-1.5 rounded-full appearance-none cursor-pointer"
              @input="(e: Event) => updateConfig(prop.id as keyof MathBeautyProps, Number((e.target as HTMLInputElement).value))"
            >
          </div>
        </template>

        <template v-if="isFermatSpiralWeave">
          <div v-for="prop in [
            { id: 'fermatSpiralScale', min: 4, max: 18, step: 0.01, label: 'fermatSpiralScale' },
            { id: 'fermatSpiralTwist', min: 0.6, max: 4, step: 0.001, label: 'fermatSpiralTwist' }
          ]" :key="prop.id" class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {{ t(`labels.${prop.label}`) }}
              </label>
              <span class="text-[11px] font-mono text-white/55">
                {{ (config[prop.id as keyof MathBeautyProps] as number).toFixed(3) }}
              </span>
            </div>
            <input
              :value="config[prop.id as keyof MathBeautyProps]"
              type="range"
              :min="prop.min"
              :max="prop.max"
              :step="prop.step"
              class="w-full accent-blue-500 h-1.5 rounded-full appearance-none cursor-pointer"
              @input="(e: Event) => updateConfig(prop.id as keyof MathBeautyProps, Number((e.target as HTMLInputElement).value))"
            >
          </div>
        </template>

        <template v-if="isImplicitEffect">
          <div v-for="prop in [
            { id: 'implicitRange', min: 4, max: 16, step: 0.01, label: 'implicitRange' },
            { id: 'implicitStep', min: 0.08, max: 0.5, step: 0.001, label: 'implicitStep' },
            { id: 'implicitWaveMix', min: 0.2, max: 2.4, step: 0.001, label: 'implicitWaveMix' },
            { id: 'implicitSingularityGuard', min: 0.01, max: 0.2, step: 0.001, label: 'implicitSingularityGuard' }
          ]" :key="prop.id" class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {{ t(`labels.${prop.label}`) }}
              </label>
              <span class="text-[11px] font-mono text-white/55">
                {{ (config[prop.id as keyof MathBeautyProps] as number).toFixed(3) }}
              </span>
            </div>
            <input
              :value="config[prop.id as keyof MathBeautyProps]"
              type="range"
              :min="prop.min"
              :max="prop.max"
              :step="prop.step"
              class="w-full accent-blue-500 h-1.5 rounded-full appearance-none cursor-pointer"
              @input="(e: Event) => updateConfig(prop.id as keyof MathBeautyProps, Number((e.target as HTMLInputElement).value))"
            >
          </div>
        </template>

        <template v-if="isCardioidDeluxe">
          <div v-for="prop in [
            { id: 'heartDepth', min: 0.5, max: 1.9, step: 0.001, label: 'heartDepth' },
            { id: 'heartWidth', min: 0.55, max: 1.8, step: 0.001, label: 'heartWidth' }
          ]" :key="prop.id" class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {{ t(`labels.${prop.label}`) }}
              </label>
              <span class="text-[11px] font-mono text-white/55">
                {{ (config[prop.id as keyof MathBeautyProps] as number).toFixed(3) }}
              </span>
            </div>
            <input
              :value="config[prop.id as keyof MathBeautyProps]"
              type="range"
              :min="prop.min"
              :max="prop.max"
              :step="prop.step"
              class="w-full accent-blue-500 h-1.5 rounded-full appearance-none cursor-pointer"
              @input="(e: Event) => updateConfig(prop.id as keyof MathBeautyProps, Number((e.target as HTMLInputElement).value))"
            >
          </div>
        </template>

        <template v-if="isDoubleHeart">
          <div v-for="prop in [
            { id: 'doubleHeartOffset', min: 0.2, max: 8, step: 0.001, label: 'doubleHeartOffset' },
            { id: 'doubleHeartBlend', min: 0, max: 1, step: 0.001, label: 'doubleHeartBlend' },
            { id: 'heartDepth', min: 0.5, max: 1.9, step: 0.001, label: 'heartDepth' },
            { id: 'heartWidth', min: 0.55, max: 1.8, step: 0.001, label: 'heartWidth' }
          ]" :key="prop.id" class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {{ t(`labels.${prop.label}`) }}
              </label>
              <span class="text-[11px] font-mono text-white/55">
                {{ (config[prop.id as keyof MathBeautyProps] as number).toFixed(3) }}
              </span>
            </div>
            <input
              :value="config[prop.id as keyof MathBeautyProps]"
              type="range"
              :min="prop.min"
              :max="prop.max"
              :step="prop.step"
              class="w-full accent-blue-500 h-1.5 rounded-full appearance-none cursor-pointer"
              @input="(e: Event) => updateConfig(prop.id as keyof MathBeautyProps, Number((e.target as HTMLInputElement).value))"
            >
          </div>
        </template>

        <template v-if="isAdvancedTrochoid">
          <div v-for="prop in [
            { id: 'trochoidRatio', min: 1.2, max: 8, step: 0.001, label: 'trochoidRatio' },
            { id: 'trochoidOffset', min: 0.2, max: 8, step: 0.001, label: 'trochoidOffset' },
            { id: 'trochoidPhase', min: 0, max: 6.283, step: 0.001, label: 'trochoidPhase' }
          ]" :key="prop.id" class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {{ t(`labels.${prop.label}`) }}
              </label>
              <span class="text-[11px] font-mono text-white/55">
                {{ (config[prop.id as keyof MathBeautyProps] as number).toFixed(3) }}
              </span>
            </div>
            <input
              :value="config[prop.id as keyof MathBeautyProps]"
              type="range"
              :min="prop.min"
              :max="prop.max"
              :step="prop.step"
              class="w-full accent-blue-500 h-1.5 rounded-full appearance-none cursor-pointer"
              @input="(e: Event) => updateConfig(prop.id as keyof MathBeautyProps, Number((e.target as HTMLInputElement).value))"
            >
          </div>
        </template>

        <template v-if="isJuliaFractal">
          <div v-for="prop in [
            { id: 'juliaCRe', min: -1.2, max: 0.4, step: 0.001, label: 'juliaCRe' },
            { id: 'juliaCIm', min: -0.8, max: 0.8, step: 0.001, label: 'juliaCIm' }
          ]" :key="prop.id" class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {{ t(`labels.${prop.label}`) }}
              </label>
              <span class="text-[11px] font-mono text-white/55">
                {{ (config[prop.id as keyof MathBeautyProps] as number).toFixed(3) }}
              </span>
            </div>
            <input
              :value="config[prop.id as keyof MathBeautyProps]"
              type="range"
              :min="prop.min"
              :max="prop.max"
              :step="prop.step"
              class="w-full accent-blue-500 h-1.5 rounded-full appearance-none cursor-pointer"
              @input="(e: Event) => updateConfig(prop.id as keyof MathBeautyProps, Number((e.target as HTMLInputElement).value))"
            >
          </div>
        </template>

        <template v-if="isMandelbrotOrbit">
          <div class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {{ t('labels.mandelbrotBandWidth') }}
              </label>
              <span class="text-[11px] font-mono text-white/55">
                {{ (config.mandelbrotBandWidth as number).toFixed(3) }}
              </span>
            </div>
            <input
              :value="config.mandelbrotBandWidth"
              type="range"
              min="0.04"
              max="0.42"
              step="0.001"
              class="w-full accent-blue-500 h-1.5 rounded-full appearance-none cursor-pointer"
              @input="(e: Event) => updateConfig('mandelbrotBandWidth', Number((e.target as HTMLInputElement).value))"
            >
          </div>
        </template>

        <template v-if="isBarnsleyFern">
          <div class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {{ t('labels.barnsleyProbabilityJitter') }}
              </label>
              <span class="text-[11px] font-mono text-white/55">
                {{ (config.barnsleyProbabilityJitter as number).toFixed(3) }}
              </span>
            </div>
            <input
              :value="config.barnsleyProbabilityJitter"
              type="range"
              min="0"
              max="0.35"
              step="0.001"
              class="w-full accent-blue-500 h-1.5 rounded-full appearance-none cursor-pointer"
              @input="(e: Event) => updateConfig('barnsleyProbabilityJitter', Number((e.target as HTMLInputElement).value))"
            >
          </div>
        </template>

        <template v-if="isChaosEffect">
          <div class="flex flex-col gap-2">
            <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              {{ t('labels.chaosSystem') }}
            </label>
            <select
              :value="currentChaosSystem"
              class="py-2 px-3 text-xs rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
              @change="(e: Event) => changeChaosSystem((e.target as HTMLSelectElement).value)"
            >
              <option value="lorenz" class="bg-slate-900 text-white">
                {{ t('labels.chaosSystemLorenz') }}
              </option>
              <option value="rossler" class="bg-slate-900 text-white">
                {{ t('labels.chaosSystemRossler') }}
              </option>
              <option value="aizawa" class="bg-slate-900 text-white">
                {{ t('labels.chaosSystemAizawa') }}
              </option>
            </select>
          </div>

          <div class="flex flex-col gap-2">
            <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              {{ t('labels.chaosMode') }}
            </label>
            <select
              :value="config.chaosMode || 'trace'"
              class="py-2 px-3 text-xs rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-all"
              @change="(e: Event) => updateConfig('chaosMode', (e.target as HTMLSelectElement).value)"
            >
              <option value="trace" class="bg-slate-900 text-white">
                {{ t('labels.chaosModeTrace') }}
              </option>
              <option value="particles" class="bg-slate-900 text-white">
                {{ t('labels.chaosModeParticles') }}
              </option>
            </select>
          </div>

          <div v-for="prop in [
            { id: 'chaosSteps', min: 2200, max: 18000, step: 100, label: 'chaosSteps' },
            { id: 'chaosDt', min: 0.001, max: 0.03, step: 0.001, label: 'chaosDt' },
            { id: 'chaosScale', min: 0.35, max: 2.4, step: 0.01, label: 'chaosScale' },
            { id: 'chaosParticleCount', min: 20, max: 720, step: 1, label: 'chaosParticleCount' },
            { id: 'chaosPhaseSpread', min: 0.02, max: 0.8, step: 0.01, label: 'chaosPhaseSpread' }
          ]" :key="prop.id" class="flex flex-col gap-2">
            <div class="flex justify-between items-center">
              <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {{ t(`labels.${prop.label}`) }}
              </label>
              <span class="text-[11px] font-mono text-white/55">
                {{ (config[prop.id as keyof MathBeautyProps] as number).toFixed(prop.step < 1 ? 3 : 0) }}
              </span>
            </div>
            <input
              :value="config[prop.id as keyof MathBeautyProps]"
              type="range"
              :min="prop.min"
              :max="prop.max"
              :step="prop.step"
              class="w-full accent-blue-500 h-1.5 rounded-full appearance-none cursor-pointer"
              @input="(e: Event) => updateConfig(prop.id as keyof MathBeautyProps, Number((e.target as HTMLInputElement).value))"
            >
          </div>
        </template>
      </div>

      <div v-if="activeTab === 'display'" class="flex flex-col gap-5">
        <div v-for="prop in [
          { id: 'axisRange', min: 8, max: 40, step: 1, label: 'axisRange' },
          { id: 'gridDensity', min: 6, max: 30, step: 1, label: 'gridDensity' },
          { id: 'trailAlpha', min: 0.02, max: 0.3, step: 0.01, label: 'trailAlpha' }
        ]" :key="prop.id" class="flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
              {{ t(`labels.${prop.label}`) }}
            </label>
            <span class="text-[11px] font-mono text-white/55">
              {{ (config[prop.id as keyof MathBeautyProps] as number).toFixed(prop.step < 1 ? 2 : 0) }}
            </span>
          </div>
          <input
            :value="config[prop.id as keyof MathBeautyProps]"
            type="range"
            :min="prop.min"
            :max="prop.max"
            :step="prop.step"
            class="w-full accent-blue-500 h-1.5 rounded-full appearance-none cursor-pointer"
            @input="(e: Event) => updateConfig(prop.id as keyof MathBeautyProps, Number((e.target as HTMLInputElement).value))"
          >
        </div>

        <div class="flex items-center justify-between gap-3">
          <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{{ t('labels.lineColor') }}</label>
          <input
            type="color"
            :value="config.lineColor"
            class="w-9 h-9 rounded border border-white/20 bg-transparent"
            @input="(e: Event) => updateConfig('lineColor', (e.target as HTMLInputElement).value)"
          >
        </div>

        <div v-for="toggle in [
          { id: 'showGrid', label: 'showGrid' },
          { id: 'showAxis', label: 'showAxis' },
          { id: 'showTrail', label: 'showTrail' }
        ]" :key="toggle.id" class="flex items-center justify-between gap-3">
          <label class="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
            {{ t(`labels.${toggle.label}`) }}
          </label>
          <button
            class="w-12 h-6 rounded-full transition-all p-0.5 flex items-center"
            :class="config[toggle.id as keyof MathBeautyProps] ? 'bg-blue-500' : 'bg-white/20'"
            @click="updateConfig(toggle.id as keyof MathBeautyProps, !config[toggle.id as keyof MathBeautyProps])"
          >
            <span
              class="block w-5 h-5 bg-white rounded-full transition-all"
              :class="config[toggle.id as keyof MathBeautyProps] ? 'ml-auto' : 'ml-0'"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
