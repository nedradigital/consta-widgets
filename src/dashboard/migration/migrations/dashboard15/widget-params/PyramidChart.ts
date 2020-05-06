const fontSizes = ['xs', 's', 'm'] as const

export type PyramidChartParams = {
  constraint?: boolean
  fontSize?: typeof fontSizes[number]
  colors: readonly string[]
}

export const pyramidChartParams = {
  fontSizes,
}
