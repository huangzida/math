# @bg-effects/math-beauty

[English](./README.md) | [简体中文](./README_CN.md)

一个基于 Vue + Canvas 的数学可视化特效组件，提供大坐标舞台、公式动态描边、分类效果浏览与实时调参能力。

[在线演示](https://huangzida.github.io/math-beauty/)

---

## 亮点

- 内置 8 大类共 54 个效果：极坐标、参数方程、旋轮线、数论、混合隐式、分形、物理、混沌。
- 顶部公式文本与当前曲线同步切换。
- 调试面板支持分类筛选、分组列表、上一项/下一项、按效果显示专属参数。
- 切换效果时支持预设轮换，并提供 `presetLock`、`lockOnComplete` 控制。
- 已新增示波器风格效果：
  - `oscilloscope-harmonic`（谐波叠加，含衰减与相位漂移）
  - `oscilloscope-sincos`（正弦/余弦合成波形）

## 安装

```bash
pnpm add @bg-effects/math-beauty
```

## 快速开始

```vue
<script setup lang="ts">
import { MathBeauty } from '@bg-effects/math-beauty'
</script>

<template>
  <div style="width: 100vw; height: 100vh; background: #000;">
    <MathBeauty debug lang="zh-CN" />
  </div>
</template>
```

## 组件 API

### 导出内容

```ts
import MathBeauty, { MathBeauty as NamedMathBeauty, meta } from '@bg-effects/math-beauty'
import type { MathBeautyProps } from '@bg-effects/math-beauty'
```

### Props（核心）

| 属性 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `debug` | `boolean` | `false` | 是否开启调试面板 |
| `lang` | `'zh-CN' \| 'en'` | `'zh-CN'` | 界面语言 |
| `effect-index` | `number` | `resolveEffectIndex('cardioid-deluxe')` | 当前效果索引 |
| `animation-speed` | `number` | `0.2` | 绘制速度 |
| `line-width` | `number` | `2.0` | 线宽 |
| `line-color` | `string` | `'#c8287d'` | 线条颜色 |
| `axis-range` | `number` | `18` | 世界坐标范围 |
| `grid-density` | `number` | `18` | 网格密度 |
| `show-grid` | `boolean` | `true` | 是否显示网格 |
| `show-axis` | `boolean` | `true` | 是否显示坐标轴 |
| `show-trail` | `boolean` | `true` | 是否开启残影 |
| `trail-alpha` | `number` | `0.3` | 残影强度 |
| `preset-lock` | `boolean` | `false` | 切换效果时是否锁定当前预设风格 |
| `lock-on-complete` | `boolean` | `false` | 是否在完整绘制后锁定 |

### 效果参数

所有可配置字段定义于 `MathBeautyProps`（`src/types.ts`），包括：

- 数论类：`modularPointCount`、`modularMultiplier`、`gcdLayerScale`、`quadraticResidueScale`、`gcdLatticeScale`。
- 极坐标/旋轮线/参数方程：`archimedeanPitch`、`fermatR2Turns`、`superellipseA`、`lemniscateScale`、`lissajousFreqX`、`trochoidRatio`、`heartDepth`。
- 混合隐式：`implicitRange`、`implicitStep`、`implicitWaveMix`、`implicitCrossMix`、`implicitGcdScale`、`fusionFourierMix`。
- 分形/混沌：`juliaCRe`、`juliaCIm`、`mandelbrotBandWidth`、`chaosSystem`、`chaosSteps`、`chaosDt`、`chaosParticleCount`。
- 示波器谐波：`oscBaseFreq`、`oscAmplitude`、`oscHarmonics`、`oscDecay`、`oscPhaseDrift`、`oscScanSpan`。
- 示波器正余弦：`oscSinAmp`、`oscCosAmp`、`oscFreq`、`oscPhase`、`oscPhaseShift`、`oscOffset`。

### 实例暴露方法

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { MathBeauty } from '@bg-effects/math-beauty'

const effectRef = ref<InstanceType<typeof MathBeauty> | null>(null)

const pause = () => effectRef.value?.pause?.()
const resume = () => effectRef.value?.resume?.()
const restart = () => effectRef.value?.restart?.()
const next = () => effectRef.value?.nextEffect?.()
</script>

<template>
  <MathBeauty ref="effectRef" debug />
</template>
```

## 内置效果（共 54 个）

### 极坐标（Polar）

`limacon`, `dual-frequency-bloom`, `star-rose`, `butterfly-variation`, `ribbon-orbit`, `flower-web`, `petal-chain`, `tan-cot-burst`, `archimedean-spiral`, `fermat-r2-spiral`, `logarithmic-spiral`, `fermat-spiral-weave`, `moire-ripple`, `inner-circle-spiral`, `mandala-curve`

### 参数方程（Parametric）

`superellipse`, `pentagram-wave`, `petal-orbit`, `lemniscate`, `oscilloscope-harmonic`, `oscilloscope-sincos`, `cardioid-deluxe`, `astroid`, `lissajous`

### 旋轮线（Trochoid）

`spiral-spirograph`, `hypotrochoid`, `epicycloid`, `nephroid`, `epitrochoid-bloom`, `hypotrochoid-weave`

### 数论（Number Theory）

`modular-times-table`, `gcd-layer`, `quadratic-residue-grid`, `gcd-lattice`

### 混合（隐式 + 融合）

`sine-square-lattice`, `resonant-implicit-wave`, `tan-cot-implicit-maze`, `symmetric-sine-cross`, `exp-trig-balance`, `sin-tan-nexus`, `nested-sine-shear`, `gcd-cos-interference`, `sine-square-bias-bands`, `parabola-sine-balance`, `trig-fourier-fusion`

### 分形（Fractal）

`julia-fractal`, `mandelbrot-orbit`, `barnsley-fern`

### 物理（Physics）

`vector-field-streamlines`, `gravity-well`, `vortex-field`

### 混沌（Chaos）

`lorenz-attractor`, `rossler-attractor`, `aizawa-attractor`

## 调试面板能力

- Basic / Display 分页。
- 分类筛选 + 分组效果选择器。
- 分类内上一项 / 下一项切换。
- 当前效果对应的滑杆、开关、颜色选择实时生效。
- 混沌系统切换（`lorenz`、`rossler`、`aizawa`）及其相关参数。

## 本地开发

```bash
pnpm install
pnpm dev
```

## 脚本

```bash
pnpm dev          # 等同 pnpm play
pnpm play         # playground 模式
pnpm build        # 构建库产物
pnpm build:play   # 构建 playground
pnpm lint         # 检查 ts/vue
pnpm typecheck    # vue-tsc --noEmit
pnpm format       # prettier
```

## 许可

MIT
