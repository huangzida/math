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
