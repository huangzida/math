export type Point = { x: number, y: number }

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

export const gcd = (a: number, b: number): number => {
  let x = Math.abs(Math.trunc(a))
  let y = Math.abs(Math.trunc(b))
  while (y !== 0) {
    const rest = x % y
    x = y
    y = rest
  }
  return x
}

export const createSeededRandom = (seed: number) => {
  let state = seed >>> 0
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

export const resamplePath = (path: Point[], targetCount: number) => {
  if (!path.length) {
    return Array.from({ length: targetCount }, () => ({ x: Number.NaN, y: Number.NaN }))
  }
  const sampled: Point[] = []
  for (let i = 0; i < targetCount; i += 1) {
    const ratio = targetCount <= 1 ? 0 : i / (targetCount - 1)
    const idx = Math.min(path.length - 1, Math.floor(ratio * (path.length - 1)))
    const point = path[idx]
    sampled.push({ x: point.x, y: point.y })
  }
  return sampled
}

export const pushCell = (points: Point[], x: number, y: number) => {
  points.push(
    { x, y },
    { x: x + 1, y },
    { x: x + 1, y: y + 1 },
    { x, y: y + 1 },
    { x, y },
    { x: Number.NaN, y: Number.NaN },
  )
}
