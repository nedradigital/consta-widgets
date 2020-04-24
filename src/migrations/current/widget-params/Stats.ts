const sizes = ['2xs', 'xs', 's', 'm', 'l'] as const

const layouts = [
  'compact-title',
  'compact-unit',
  'full',
  'full-without-title',
  'full-reversed',
] as const

export type StatsParams = {
  size: typeof sizes[number]
  layout: typeof layouts[number]
}

export const statsParams = {
  sizes,
  layouts,
}
