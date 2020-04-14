const directions = ['column', 'row'] as const
const labelTypes = ['dot', 'line'] as const
const labelPositions = ['top', 'left'] as const
const sizes = ['xs', 's', 'm'] as const

export type LegendParams = {
  direction: typeof directions[number]
  labelType: typeof labelTypes[number]
  fontSize: typeof sizes[number]
  labelPosition: typeof labelPositions[number]
  lineBold?: boolean
}

export const legendParams = {
  directions,
  labelTypes,
  labelPositions,
  sizes,
}
