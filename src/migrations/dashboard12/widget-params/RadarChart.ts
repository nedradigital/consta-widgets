const labelSizes = ['s', 'm'] as const

export type RadarChartParams = {
  ticks: number
  withConcentricColor: boolean
  labelSize: typeof labelSizes[number]
}

export const radarChartParams = {
  labelSizes,
}
