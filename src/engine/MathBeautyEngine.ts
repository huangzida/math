import { defu } from 'defu'
import { getFormulaByIndex } from './formula-library'
import { meta } from '../meta'
import type { FormulaDefinition, MathBeautyProps } from '../types'

type Point = { x: number, y: number } | null

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
const chaosEffectIds = new Set(['lorenz-attractor', 'rossler-attractor', 'aizawa-attractor'])
const physicsConfigKeys = new Set<keyof MathBeautyProps>([
  'lissajousRibbonAmp',
  'lissajousRibbonFreqX',
  'lissajousRibbonFreqY',
  'lissajousRibbonPhase',
  'lissajousRibbonTwist',
  'strangeInkA',
  'strangeInkB',
  'strangeInkC',
  'strangeInkD',
  'strangeInkScale',
  'vortexSpiralTurns',
  'vortexSpiralCurl',
  'vortexSpiralDrift',
  'vortexSpiralWave',
  'vortexSpiralScale',
  'particleFlowDensity',
  'particleFlowStep',
  'particleFlowTwist',
  'particleFlowBias',
  'particleFlowScale',
  'flourishPetals',
  'flourishBloom',
  'flourishTwist',
  'flourishPhase',
  'flourishScale',
  'interferenceFreqX',
  'interferenceFreqY',
  'interferencePhase',
  'interferenceDrift',
  'interferenceScale',
  'wavefrontK1',
  'wavefrontK2',
  'wavefrontDistance',
  'wavefrontPhase',
  'wavefrontScale',
])

export class MathBeautyEngine {
  private container: HTMLElement
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private config: MathBeautyProps
  private animationId = 0
  private isPaused = false
  private lastTime = 0
  private progress = 0
  private formula: FormulaDefinition
  private sampledPoints: Point[] = []

  constructor(container: HTMLElement, config: MathBeautyProps) {
    this.container = container
    this.config = defu(config, meta.defaultConfig)
    this.formula = getFormulaByIndex(this.config.effectIndex || 0)
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    this.container.appendChild(this.canvas)
    this.resize()
    this.resetFormulaPath()
    window.addEventListener('resize', this.resize)
    this.animationId = requestAnimationFrame(this.render)
  }

  private getWidth() {
    return this.container.clientWidth
  }

  private getHeight() {
    return this.container.clientHeight
  }

  private getDpr() {
    return window.devicePixelRatio || 1
  }

  private getAxisRange() {
    return clamp(this.config.axisRange || 18, 8, 60)
  }

  private getWorldRanges() {
    const axisRange = this.getAxisRange()
    const width = this.getWidth()
    const height = this.getHeight() || 1
    const aspect = width / height
    return {
      xRange: axisRange * aspect,
      yRange: axisRange,
    }
  }

  private worldToScreen(x: number, y: number) {
    const width = this.getWidth()
    const height = this.getHeight()
    const { xRange, yRange } = this.getWorldRanges()
    return {
      sx: width * 0.5 + (x / xRange) * width * 0.5,
      sy: height * 0.5 - (y / yRange) * height * 0.5,
    }
  }

  private resetFormulaPath() {
    const points: Point[] = []
    for (let t = this.formula.tMin; t <= this.formula.tMax; t += this.formula.step) {
      const point = this.formula.sampler(t, this.config)
      const x = point.x * this.formula.scale
      const y = point.y * this.formula.scale
      if (Number.isFinite(x) && Number.isFinite(y) && Math.abs(x) < 5000 && Math.abs(y) < 5000) {
        points.push({ x, y })
      }
      else {
        points.push(null)
      }
    }
    this.sampledPoints = points
    this.progress = 0
  }

  private drawBackground() {
    const { ctx } = this
    const width = this.getWidth()
    const height = this.getHeight()
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, '#0b1027')
    gradient.addColorStop(1, '#070b1f')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }

  private drawTrailFade() {
    if (!this.config.showTrail) {
      return
    }
    const { ctx } = this
    const width = this.getWidth()
    const height = this.getHeight()
    const alpha = clamp(this.config.trailAlpha || 0.12, 0.01, 0.4)
    ctx.fillStyle = `rgba(7, 11, 31, ${alpha})`
    ctx.fillRect(0, 0, width, height)
  }

  private drawGridAndAxis() {
    const { ctx } = this
    const { xRange, yRange } = this.getWorldRanges()
    const density = clamp(Math.floor(this.config.gridDensity || 16), 6, 30)
    const xStep = (xRange * 2) / density
    const yStep = (yRange * 2) / density
    const gridColor = 'rgba(255, 255, 255, 0.10)'
    const axisColor = 'rgba(255, 255, 255, 0.72)'
    const labelColor = 'rgba(255, 255, 255, 0.55)'

    if (this.config.showGrid) {
      ctx.strokeStyle = gridColor
      ctx.lineWidth = 1
      for (let i = 0; i <= density; i += 1) {
        const x = -xRange + i * xStep
        const verticalA = this.worldToScreen(x, -yRange)
        const verticalB = this.worldToScreen(x, yRange)
        ctx.beginPath()
        ctx.moveTo(verticalA.sx, verticalA.sy)
        ctx.lineTo(verticalB.sx, verticalB.sy)
        ctx.stroke()
      }

      for (let i = 0; i <= density; i += 1) {
        const y = -yRange + i * yStep
        const horizontalA = this.worldToScreen(-xRange, y)
        const horizontalB = this.worldToScreen(xRange, y)
        ctx.beginPath()
        ctx.moveTo(horizontalA.sx, horizontalA.sy)
        ctx.lineTo(horizontalB.sx, horizontalB.sy)
        ctx.stroke()
      }
    }

    if (!this.config.showAxis) {
      return
    }

    const xA = this.worldToScreen(-xRange, 0)
    const xB = this.worldToScreen(xRange, 0)
    const yA = this.worldToScreen(0, -yRange)
    const yB = this.worldToScreen(0, yRange)

    ctx.strokeStyle = axisColor
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(xA.sx, xA.sy)
    ctx.lineTo(xB.sx, xB.sy)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(yA.sx, yA.sy)
    ctx.lineTo(yB.sx, yB.sy)
    ctx.stroke()

    ctx.fillStyle = labelColor
    ctx.font = '600 16px ui-serif, Georgia, Cambria, "Times New Roman", serif'
    const xTickStep = Math.max(2, Math.floor(xRange / 6))
    const yTickStep = Math.max(2, Math.floor(yRange / 6))
    for (let n = -Math.floor(xRange); n <= Math.floor(xRange); n += xTickStep) {
      if (n === 0) continue
      const xPos = this.worldToScreen(n, 0)
      ctx.fillText(`${n}`, xPos.sx - 8, xPos.sy + 20)
    }
    for (let n = -Math.floor(yRange); n <= Math.floor(yRange); n += yTickStep) {
      if (n === 0) continue
      const yPos = this.worldToScreen(0, n)
      ctx.fillText(`${n}`, yPos.sx + 10, yPos.sy + 5)
    }
  }

  private drawFormulaPath() {
    const { ctx } = this
    const total = this.sampledPoints.length
    if (!total) return
    if (chaosEffectIds.has(this.formula.id) && this.config.chaosMode === 'particles') {
      this.drawChaosParticles()
      return
    }
    const drawCount = Math.max(2, Math.floor(total * this.progress))
    ctx.beginPath()
    let drawing = false
    for (let i = 0; i < drawCount; i += 1) {
      const point = this.sampledPoints[i]
      if (!point) {
        drawing = false
        continue
      }
      const { sx, sy } = this.worldToScreen(point.x, point.y)
      if (!drawing) {
        ctx.moveTo(sx, sy)
        drawing = true
      }
      else {
        ctx.lineTo(sx, sy)
      }
    }
    const color = this.config.lineColor || this.formula.stroke || '#f9fafb'
    ctx.strokeStyle = color
    ctx.lineWidth = clamp(this.config.lineWidth || 2.6, 0.8, 12)
    ctx.shadowBlur = 12
    ctx.shadowColor = color
    ctx.stroke()
    ctx.shadowBlur = 0
  }

  private drawChaosParticles() {
    const { ctx } = this
    const points = this.sampledPoints.filter((item): item is { x: number, y: number } => item !== null)
    const total = points.length
    if (!total) {
      return
    }
    const headIndex = Math.max(1, Math.floor(total * this.progress))
    const particleCount = clamp(Math.floor(this.config.chaosParticleCount || 180), 20, 720)
    const spread = clamp(this.config.chaosPhaseSpread || 0.22, 0.02, 0.8)
    const spreadWindow = Math.max(1, Math.floor(total * spread))
    const color = this.config.lineColor || this.formula.stroke || '#f9fafb'
    const baseRadius = clamp((this.config.lineWidth || 2.6) * 0.82, 0.9, 5.8)
    for (let i = 0; i < particleCount; i += 1) {
      const progress = particleCount <= 1 ? 0 : i / (particleCount - 1)
      const offset = Math.floor(progress * spreadWindow)
      const sourceIndex = (headIndex - 1 - offset + total) % total
      const point = points[sourceIndex]
      const { sx, sy } = this.worldToScreen(point.x, point.y)
      const alpha = 0.08 + (1 - progress) * 0.9
      const radius = baseRadius * (0.42 + (1 - progress) * 0.95)
      ctx.beginPath()
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.2})`
      ctx.arc(sx, sy, radius * 2.2, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.fillStyle = color
      ctx.globalAlpha = alpha
      ctx.arc(sx, sy, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
    }
  }

  private render = (time: number) => {
    if (this.isPaused) return
    this.animationId = requestAnimationFrame(this.render)
    if (!this.lastTime) this.lastTime = time
    const delta = (time - this.lastTime) / 1000
    this.lastTime = time
    const speed = clamp(this.config.animationSpeed || 0.2, 0.02, 3)
    const lockOnComplete = Boolean(this.config.lockOnComplete)
    if (lockOnComplete) {
      this.progress = Math.min(1, this.progress + delta * speed)
    }
    else {
      this.progress += delta * speed
      if (this.progress > 1) {
        this.progress = 0
      }
    }
    const lockedFinalFrame = lockOnComplete && this.progress >= 1
    if (this.config.showTrail && !lockedFinalFrame) {
      this.drawTrailFade()
    }
    else {
      this.drawBackground()
    }
    this.drawGridAndAxis()
    this.drawFormulaPath()
  }

  public updateConfig(newConfig: Partial<MathBeautyProps>) {
    const prev = this.config
    this.config = { ...this.config, ...newConfig }
    const prevIndex = prev.effectIndex || 0
    const nextIndex = this.config.effectIndex || 0
    if (prevIndex !== nextIndex) {
      this.formula = getFormulaByIndex(nextIndex)
      this.resetFormulaPath()
    }
    const modularChanged = prev.modularPointCount !== this.config.modularPointCount
      || prev.modularMultiplier !== this.config.modularMultiplier
      || prev.modularRadius !== this.config.modularRadius
      || prev.gcdLayerScale !== this.config.gcdLayerScale
      || prev.gcdLayerRotation !== this.config.gcdLayerRotation
      || prev.quadraticResidueScale !== this.config.quadraticResidueScale
      || prev.quadraticResidueShear !== this.config.quadraticResidueShear
      || prev.gcdLatticeScale !== this.config.gcdLatticeScale
      || prev.gcdLatticeJitter !== this.config.gcdLatticeJitter
    const chaosChanged = prev.chaosSystem !== this.config.chaosSystem
      || prev.chaosSteps !== this.config.chaosSteps
      || prev.chaosDt !== this.config.chaosDt
      || prev.chaosScale !== this.config.chaosScale
    const fractalChanged = prev.juliaCRe !== this.config.juliaCRe
      || prev.juliaCIm !== this.config.juliaCIm
      || prev.mandelbrotBandWidth !== this.config.mandelbrotBandWidth
      || prev.barnsleyProbabilityJitter !== this.config.barnsleyProbabilityJitter
    const classicCurveChanged = prev.archimedeanPitch !== this.config.archimedeanPitch
      || prev.archimedeanTwist !== this.config.archimedeanTwist
      || prev.logSpiralGrowth !== this.config.logSpiralGrowth
      || prev.fermatR2Turns !== this.config.fermatR2Turns
      || prev.fermatR2Scale !== this.config.fermatR2Scale
      || prev.fermatR2AngularScale !== this.config.fermatR2AngularScale
      || prev.implicitRange !== this.config.implicitRange
      || prev.implicitStep !== this.config.implicitStep
      || prev.implicitWaveMix !== this.config.implicitWaveMix
      || prev.implicitSingularityGuard !== this.config.implicitSingularityGuard
      || prev.implicitCrossMix !== this.config.implicitCrossMix
      || prev.implicitExpMix !== this.config.implicitExpMix
      || prev.implicitNestedMix !== this.config.implicitNestedMix
      || prev.fusionSinAmp !== this.config.fusionSinAmp
      || prev.fusionSinFreqX !== this.config.fusionSinFreqX
      || prev.fusionSinFreqY !== this.config.fusionSinFreqY
      || prev.fusionTanMix !== this.config.fusionTanMix
      || prev.fusionTanFreq !== this.config.fusionTanFreq
      || prev.fusionTanClamp !== this.config.fusionTanClamp
      || prev.fusionFourierMix !== this.config.fusionFourierMix
      || prev.fusionFourierHarmonics !== this.config.fusionFourierHarmonics
      || prev.fusionFourierDecay !== this.config.fusionFourierDecay
      || prev.oscBaseFreq !== this.config.oscBaseFreq
      || prev.oscAmplitude !== this.config.oscAmplitude
      || prev.oscHarmonics !== this.config.oscHarmonics
      || prev.oscDecay !== this.config.oscDecay
      || prev.oscPhaseDrift !== this.config.oscPhaseDrift
      || prev.oscScanSpan !== this.config.oscScanSpan
      || prev.oscSinAmp !== this.config.oscSinAmp
      || prev.oscCosAmp !== this.config.oscCosAmp
      || prev.oscFreq !== this.config.oscFreq
      || prev.oscPhase !== this.config.oscPhase
      || prev.oscPhaseShift !== this.config.oscPhaseShift
      || prev.oscOffset !== this.config.oscOffset
      || prev.implicitGcdScale !== this.config.implicitGcdScale
      || prev.implicitBias !== this.config.implicitBias
      || prev.implicitParabolaTarget !== this.config.implicitParabolaTarget
      || prev.logSpiralFrequency !== this.config.logSpiralFrequency
      || prev.logSpiralScale !== this.config.logSpiralScale
      || prev.logSpiralRadialWarp !== this.config.logSpiralRadialWarp
      || prev.moireBaseRadius !== this.config.moireBaseRadius
      || prev.moireRippleAmp !== this.config.moireRippleAmp
      || prev.moireFreqA !== this.config.moireFreqA
      || prev.moireFreqB !== this.config.moireFreqB
      || prev.moirePhaseDrift !== this.config.moirePhaseDrift
      || prev.innerSpiralRadius !== this.config.innerSpiralRadius
      || prev.innerSpiralTurns !== this.config.innerSpiralTurns
      || prev.innerSpiralGrowth !== this.config.innerSpiralGrowth
      || prev.innerSpiralWave !== this.config.innerSpiralWave
      || prev.innerSpiralWaveFreq !== this.config.innerSpiralWaveFreq
      || prev.mandalaPetalCount !== this.config.mandalaPetalCount
      || prev.mandalaInnerMix !== this.config.mandalaInnerMix
      || prev.mandalaOuterMix !== this.config.mandalaOuterMix
      || prev.mandalaPhase !== this.config.mandalaPhase
      || prev.mandalaSharpness !== this.config.mandalaSharpness
      || prev.fermatSpiralScale !== this.config.fermatSpiralScale
      || prev.fermatSpiralTwist !== this.config.fermatSpiralTwist
      || prev.fermatSpiralMirror !== this.config.fermatSpiralMirror
      || prev.cardioidScale !== this.config.cardioidScale
      || prev.cardioidDistortion !== this.config.cardioidDistortion
      || prev.limaconLoopScale !== this.config.limaconLoopScale
      || prev.limaconOffset !== this.config.limaconOffset
      || prev.bloomFrequency1 !== this.config.bloomFrequency1
      || prev.bloomFrequency2 !== this.config.bloomFrequency2
      || prev.starRosePetalCount !== this.config.starRosePetalCount
      || prev.starRoseRadius !== this.config.starRoseRadius
      || prev.butterflyVariationWave !== this.config.butterflyVariationWave
      || prev.butterflyVariationExponent !== this.config.butterflyVariationExponent
      || prev.ribbonOrbitAmplitude !== this.config.ribbonOrbitAmplitude
      || prev.ribbonOrbitBaseRadius !== this.config.ribbonOrbitBaseRadius
      || prev.flowerWebAmplitude !== this.config.flowerWebAmplitude
      || prev.flowerWebFrequency !== this.config.flowerWebFrequency
      || prev.petalChainAmplitude !== this.config.petalChainAmplitude
      || prev.petalChainFrequency !== this.config.petalChainFrequency
      || prev.tanCotBurstScale !== this.config.tanCotBurstScale
      || prev.tanCotBurstFrequency !== this.config.tanCotBurstFrequency
      || prev.tanCotBurstHole !== this.config.tanCotBurstHole
      || prev.tanCotBurstCross !== this.config.tanCotBurstCross
      || prev.tanCotBurstClamp !== this.config.tanCotBurstClamp
      || prev.superellipseA !== this.config.superellipseA
      || prev.superellipseB !== this.config.superellipseB
      || prev.superellipseN !== this.config.superellipseN
      || prev.pentagramBaseAmplitude !== this.config.pentagramBaseAmplitude
      || prev.pentagramWaveAmplitude !== this.config.pentagramWaveAmplitude
      || prev.petalOrbitAmplitude !== this.config.petalOrbitAmplitude
      || prev.petalOrbitFreqX !== this.config.petalOrbitFreqX
      || prev.petalOrbitFreqY !== this.config.petalOrbitFreqY
      || prev.petalOrbitPhase !== this.config.petalOrbitPhase
      || prev.lemniscateScale !== this.config.lemniscateScale
      || prev.lemniscateWarp !== this.config.lemniscateWarp
      || prev.astroidScale !== this.config.astroidScale
      || prev.lissajousAmpX !== this.config.lissajousAmpX
      || prev.lissajousAmpY !== this.config.lissajousAmpY
      || prev.lissajousFreqX !== this.config.lissajousFreqX
      || prev.lissajousFreqY !== this.config.lissajousFreqY
      || prev.lissajousPhase !== this.config.lissajousPhase
      || prev.heartDepth !== this.config.heartDepth
      || prev.heartWidth !== this.config.heartWidth
      || prev.spirographR !== this.config.spirographR
      || prev.spirographr !== this.config.spirographr
      || prev.spirographd !== this.config.spirographd
      || prev.hypotrochoidR !== this.config.hypotrochoidR
      || prev.hypotrochoidr !== this.config.hypotrochoidr
      || prev.hypotrochoidd !== this.config.hypotrochoidd
      || prev.epicycloidR !== this.config.epicycloidR
      || prev.epicycloidr !== this.config.epicycloidr
      || prev.nephroidScale !== this.config.nephroidScale
      || prev.trochoidRatio !== this.config.trochoidRatio
      || prev.trochoidOffset !== this.config.trochoidOffset
      || prev.trochoidPhase !== this.config.trochoidPhase
    const physicsChanged = Object.keys(newConfig).some(key => physicsConfigKeys.has(key as keyof MathBeautyProps))
    if (modularChanged || chaosChanged || fractalChanged || classicCurveChanged || physicsChanged) {
      this.resetFormulaPath()
    }
    const axisChanged = prev.axisRange !== this.config.axisRange
    if (axisChanged) {
      this.progress = 0
    }
  }

  public nextEffect() {
    const nextIndex = (this.config.effectIndex || 0) + 1
    this.updateConfig({
      effectIndex: nextIndex,
    })
  }

  public getCurrentFormula() {
    return this.formula
  }

  public resize = () => {
    const width = this.getWidth()
    const height = this.getHeight()
    const dpr = this.getDpr()
    this.canvas.width = Math.floor(width * dpr)
    this.canvas.height = Math.floor(height * dpr)
    this.canvas.style.width = `${width}px`
    this.canvas.style.height = `${height}px`
    this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    this.ctx.scale(dpr, dpr)
    this.drawBackground()
  }

  public pause() {
    this.isPaused = true
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
      this.animationId = 0
    }
  }

  public resume() {
    if (!this.isPaused) return
    this.isPaused = false
    this.lastTime = 0
    this.animationId = requestAnimationFrame(this.render)
  }

  public restart() {
    this.progress = 0
    this.lastTime = 0
  }

  public destroy() {
    this.pause()
    window.removeEventListener('resize', this.resize)
    if (this.container.contains(this.canvas)) {
      this.container.removeChild(this.canvas)
    }
  }
}
