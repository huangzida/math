# @bg-effects/math-beauty

[English](./README.md) | [简体中文](./README_CN.md)

A mathematical background effect package built with Vue and Canvas, designed to show formula beauty on a large coordinate system.

[Live Demo](https://huangzida.github.io/math/)

---

### Features

- 📐 **Large Coordinate Canvas**: Built-in dark coordinate plane with axis, grids, and ticks.
- 🧮 **Formula Showcase**: Displays formula text and animates corresponding curve drawing in real time.
- 🖱️ **Quick Formula Selection**: Keep next-button switching and provide direct list selection in debug panel.
- 🎨 **Beautiful Math Curves**: Includes rose, hypotrochoid, butterfly curve, lissajous, and more.
- 🛠️ **Debug Panel Support**: Real-time tuning for animation speed, line style, axis range, and trail behavior.

### Installation

```bash
pnpm add @bg-effects/math-beauty
```

### Usage

```vue
<script setup>
import { MathBeauty } from '@bg-effects/math-beauty'
</script>

<template>
  <div style="width: 100vw; height: 100vh; background: #000;">
    <MathBeauty debug />
  </div>
</template>
```

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `effect-index` | `number` | `0` | Current formula effect index |
| `animation-speed` | `number` | `0.2` | Drawing animation speed |
| `line-width` | `number` | `2.8` | Formula line width |
| `line-color` | `string` | `'#f9fafb'` | Formula line color |
| `axis-range` | `number` | `18` | World coordinate range |
| `grid-density` | `number` | `18` | Grid subdivisions |
| `show-grid` | `boolean` | `true` | Show background grid |
| `show-axis` | `boolean` | `true` | Show X/Y axis |
| `show-trail` | `boolean` | `false` | Keep trail fade between frames |
| `trail-alpha` | `number` | `0.12` | Trail fade strength |
| `debug` | `boolean` | `false` | Enable debug panel |
| `lang` | `'zh-CN' \| 'en'` | `'zh-CN'` | UI language |

### Included Formula Effects
- Cardioid
- Limaçon
- Modular Times Table
- Dual-Frequency Bloom
- Superellipse
- Star Rose
- Spiral Spirograph
- Butterfly Variation
- GCD Layer
- Quadratic Residue Grid
- Coprime Lattice
- Ribbon Orbit
- Flower Web
- Petal Chain
- Pentagram Wave
- Petal Orbit
- Rose Curve
- Hypotrochoid
- Epicycloid
- Lemniscate
- Butterfly Curve
- Tan Cot Burst
- Nephroid
- Archimedean Spiral
- Astroid
- Lissajous Figure

### Debug Interaction
- Open `debug` mode
- Click **Next Effect** in the panel to switch formulas
- Select a target formula from the **Effect List** dropdown for direct preview
- The top overlay formula text updates with the current curve
- The coordinate axis and grid fill the full viewport

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### License

MIT
