const sizes = ['l', 'm', 's'] as const

export type TableLegendParams = {
  size: typeof sizes[number]
  isShowLegend?: boolean
}

export const tableLegendParams = {
  sizes,
}
