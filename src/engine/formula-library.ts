import type { FormulaDefinition } from '../types'
import { limaconFormula, dualFrequencyBloomFormula, starRoseFormula, butterflyVariationFormula, ribbonOrbitFormula, flowerWebFormula, petalChainFormula, tanCotBurstFormula, archimedeanSpiralFormula, fermatR2SpiralFormula, logarithmicSpiralFormula, fermatSpiralWeaveFormula, moireRippleFormula, innerCircleSpiralFormula, mandalaCurveFormula } from './formulas/categories/polar'
import { superellipseFormula, pentagramWaveFormula, petalOrbitFormula, lemniscateFormula, cardioidDeluxeFormula, astroidFormula, lissajousFormula } from './formulas/categories/parametric'
import { spiralSpirographFormula, hypotrochoidFormula, epicycloidFormula, nephroidFormula, epitrochoidBloomFormula, hypotrochoidWeaveFormula } from './formulas/categories/trochoid'
import { modularTimesTableFormula, gcdLayerFormula, quadraticResidueGridFormula, gcdLatticeFormula } from './formulas/categories/number-theory'
import { sineSquareLatticeFormula, resonantImplicitWaveFormula, tanCotImplicitMazeFormula, symmetricSineCrossFormula, expTrigBalanceFormula, sinTanNexusFormula, nestedSineShearFormula, gcdCosInterferenceFormula, sineSquareBiasBandsFormula, parabolaSineBalanceFormula, trigFourierFusionFormula } from './formulas/categories/hybrid'
import { juliaFractalFormula, mandelbrotOrbitFormula, barnsleyFernFormula } from './formulas/categories/fractal'
import { vectorFieldStreamlinesFormula, gravityWellFormula, vortexFieldFormula } from './formulas/categories/physics'
import { lorenzAttractorFormula, rosslerAttractorFormula, aizawaAttractorFormula } from './formulas/categories/chaos'

export const formulaLibrary: FormulaDefinition[] = [
  limaconFormula,
  modularTimesTableFormula,
  dualFrequencyBloomFormula,
  superellipseFormula,
  starRoseFormula,
  spiralSpirographFormula,
  butterflyVariationFormula,
  gcdLayerFormula,
  quadraticResidueGridFormula,
  gcdLatticeFormula,
  pentagramWaveFormula,
  ribbonOrbitFormula,
  flowerWebFormula,
  petalChainFormula,
  petalOrbitFormula,
  hypotrochoidFormula,
  epicycloidFormula,
  lemniscateFormula,
  tanCotBurstFormula,
  nephroidFormula,
  archimedeanSpiralFormula,
  fermatR2SpiralFormula,
  sineSquareLatticeFormula,
  resonantImplicitWaveFormula,
  tanCotImplicitMazeFormula,
  symmetricSineCrossFormula,
  expTrigBalanceFormula,
  sinTanNexusFormula,
  nestedSineShearFormula,
  gcdCosInterferenceFormula,
  sineSquareBiasBandsFormula,
  parabolaSineBalanceFormula,
  trigFourierFusionFormula,
  logarithmicSpiralFormula,
  fermatSpiralWeaveFormula,
  moireRippleFormula,
  innerCircleSpiralFormula,
  mandalaCurveFormula,
  cardioidDeluxeFormula,
  epitrochoidBloomFormula,
  hypotrochoidWeaveFormula,
  astroidFormula,
  juliaFractalFormula,
  mandelbrotOrbitFormula,
  barnsleyFernFormula,
  vectorFieldStreamlinesFormula,
  gravityWellFormula,
  vortexFieldFormula,
  lorenzAttractorFormula,
  rosslerAttractorFormula,
  aizawaAttractorFormula,
  lissajousFormula,
]

export const getFormulaByIndex = (index: number) => {
  const total = formulaLibrary.length
  const safeIndex = ((index % total) + total) % total
  return formulaLibrary[safeIndex]
}
