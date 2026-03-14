# @bg-effects/math-beauty

[English](./README.md) | [简体中文](./README_CN.md)

A Vue + Canvas mathematical visual effect component with a large coordinate stage, animated formula rendering, categorized effect browsing, and live parameter tuning.

[Live Demo](https://huangzida.github.io/math/)

---

## Highlights

- 54 built-in effects across 8 categories: polar, parametric, trochoid, number theory, hybrid implicit, fractal, physics, and chaos.
- Realtime formula overlay synchronized with the active effect.
- Debug panel with category filter, grouped effect list, previous/next navigation, and effect-specific controls.
- Built-in preset cycling when switching effects, plus `presetLock` and `lockOnComplete`.
- Newly added oscilloscope effects:
  - `oscilloscope-harmonic` (harmonic stack with decay and phase drift)
  - `oscilloscope-sincos` (sine/cosine waveform synthesis)

## Installation

```bash
pnpm add @bg-effects/math-beauty
```

## Quick Start

```vue
<script setup lang="ts">
import { MathBeauty } from '@bg-effects/math-beauty'
</script>

<template>
  <div style="width: 100vw; height: 100vh; background: #000;">
    <MathBeauty debug lang="en" />
  </div>
</template>
```

## Component API

### Exports

```ts
import MathBeauty, { MathBeauty as NamedMathBeauty, meta } from '@bg-effects/math-beauty'
import type { MathBeautyProps } from '@bg-effects/math-beauty'
```

### Props (core)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `debug` | `boolean` | `false` | Enable debug panel |
| `lang` | `'zh-CN' \| 'en'` | `'zh-CN'` | UI language |
| `effect-index` | `number` | `resolveEffectIndex('cardioid-deluxe')` | Current effect index |
| `animation-speed` | `number` | `0.2` | Drawing speed |
| `line-width` | `number` | `2.0` | Line width |
| `line-color` | `string` | `'#c8287d'` | Line color |
| `axis-range` | `number` | `18` | World coordinate range |
| `grid-density` | `number` | `18` | Grid density |
| `show-grid` | `boolean` | `true` | Show grid |
| `show-axis` | `boolean` | `true` | Show axis |
| `show-trail` | `boolean` | `true` | Enable trail |
| `trail-alpha` | `number` | `0.3` | Trail fade strength |
| `preset-lock` | `boolean` | `false` | Keep current preset style when changing effect |
| `lock-on-complete` | `boolean` | `false` | Lock after one full drawing cycle |

### Effect Parameters

All configurable fields are declared in `MathBeautyProps` (`src/types.ts`), including:

- Number theory: `modularPointCount`, `modularMultiplier`, `gcdLayerScale`, `quadraticResidueScale`, `gcdLatticeScale`.
- Polar/trochoid/parametric: `archimedeanPitch`, `fermatR2Turns`, `superellipseA`, `lemniscateScale`, `lissajousFreqX`, `trochoidRatio`, `heartDepth`.
- Hybrid implicit: `implicitRange`, `implicitStep`, `implicitWaveMix`, `implicitCrossMix`, `implicitGcdScale`, `fusionFourierMix`.
- Fractal/chaos: `juliaCRe`, `juliaCIm`, `mandelbrotBandWidth`, `chaosSystem`, `chaosSteps`, `chaosDt`, `chaosParticleCount`.
- Oscilloscope harmonic: `oscBaseFreq`, `oscAmplitude`, `oscHarmonics`, `oscDecay`, `oscPhaseDrift`, `oscScanSpan`.
- Oscilloscope sin/cos: `oscSinAmp`, `oscCosAmp`, `oscFreq`, `oscPhase`, `oscPhaseShift`, `oscOffset`.

### Exposed Instance Methods

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

## Built-in Effects (54)

### Polar

`limacon`, `dual-frequency-bloom`, `star-rose`, `butterfly-variation`, `ribbon-orbit`, `flower-web`, `petal-chain`, `tan-cot-burst`, `archimedean-spiral`, `fermat-r2-spiral`, `logarithmic-spiral`, `fermat-spiral-weave`, `moire-ripple`, `inner-circle-spiral`, `mandala-curve`

### Parametric

`superellipse`, `pentagram-wave`, `petal-orbit`, `lemniscate`, `oscilloscope-harmonic`, `oscilloscope-sincos`, `cardioid-deluxe`, `astroid`, `lissajous`

### Trochoid

`spiral-spirograph`, `hypotrochoid`, `epicycloid`, `nephroid`, `epitrochoid-bloom`, `hypotrochoid-weave`

### Number Theory

`modular-times-table`, `gcd-layer`, `quadratic-residue-grid`, `gcd-lattice`

### Hybrid (Implicit + Fusion)

`sine-square-lattice`, `resonant-implicit-wave`, `tan-cot-implicit-maze`, `symmetric-sine-cross`, `exp-trig-balance`, `sin-tan-nexus`, `nested-sine-shear`, `gcd-cos-interference`, `sine-square-bias-bands`, `parabola-sine-balance`, `trig-fourier-fusion`

### Fractal

`julia-fractal`, `mandelbrot-orbit`, `barnsley-fern`

### Physics

`vector-field-streamlines`, `gravity-well`, `vortex-field`

### Chaos

`lorenz-attractor`, `rossler-attractor`, `aizawa-attractor`

## Debug Panel Features

- Basic / Display tab switching.
- Category filter + grouped effect selector.
- Previous / Next effect navigation within current category.
- Realtime sliders, toggles, and color picker for active effect.
- Chaos system selector (`lorenz`, `rossler`, `aizawa`) and related controls.

## Development

```bash
pnpm install
pnpm dev
```

## Scripts

```bash
pnpm dev          # alias of pnpm play
pnpm play         # playground mode
pnpm build        # library build
pnpm build:play   # playground build
pnpm lint         # eslint for ts/vue
pnpm typecheck    # vue-tsc --noEmit
pnpm format       # prettier
```

## License

MIT
