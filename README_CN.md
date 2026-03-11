# @bg-effects/math-beauty

[English](./README.md) | [简体中文](./README_CN.md)

基于 Vue 和 Canvas 构建的数学背景效果包，可在大坐标轴上展示公式与图形之美。

[在线演示](https://huangzida.github.io/math/)

---

### 特性

- 📐 **大坐标系舞台**: 内置深色坐标轴、网格线和刻度。
- 🧮 **公式联动展示**: 顶部显示公式，画布中动态描边对应数学图形。
- 🖱️ **快捷切换与直选**: 保留“切换效果”按钮，并支持从效果列表直接选择。
- 🎨 **多种优美曲线**: 内置玫瑰线、内旋轮线、蝴蝶曲线、李萨如图形等。
- 🛠️ **实时调试能力**: 可调动画速度、线宽线色、坐标范围、残影等参数。

### 安装

```bash
pnpm add @bg-effects/math-beauty
```

### 使用

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

### 属性 (Props)

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `effect-index` | `number` | `0` | 当前公式效果索引 |
| `animation-speed` | `number` | `0.2` | 动态描边速度 |
| `line-width` | `number` | `2.8` | 曲线线宽 |
| `line-color` | `string` | `'#f9fafb'` | 曲线颜色 |
| `axis-range` | `number` | `18` | 世界坐标显示范围 |
| `grid-density` | `number` | `18` | 网格细分密度 |
| `show-grid` | `boolean` | `true` | 是否显示网格 |
| `show-axis` | `boolean` | `true` | 是否显示坐标轴 |
| `show-trail` | `boolean` | `false` | 是否开启轨迹残影 |
| `trail-alpha` | `number` | `0.12` | 残影衰减强度 |
| `debug` | `boolean` | `false` | 是否开启调试面板 |
| `lang` | `'zh-CN' \| 'en'` | `'zh-CN'` | 界面语言 |

### 内置公式效果
- 心形线
- 帕斯卡蜗线
- 模乘圆连线
- 双频花盘
- 超椭圆
- 星芒玫瑰
- 螺旋旋轮
- 蝶形变奏
- gcd 等值层
- 二次剩余格
- 互质晶格
- 丝带环
- 花心网
- 花瓣链
- 五角星波
- 花瓣轨道
- 玫瑰线
- 内旋轮线
- 外摆线
- 双纽线
- 蝴蝶曲线
- 正切余切爆裂线
- 肾形线
- 阿基米德螺线
- 星芒内摆线
- 李萨如图形

### 调试交互
- 开启 `debug` 模式
- 在面板点击“切换效果”按钮
- 在“效果列表”下拉框中可直接选中任意公式
- 顶部公式文本与当前曲线同步切换
- 坐标轴与网格铺满整屏动态绘制

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发环境
pnpm dev
```

### 许可

MIT
