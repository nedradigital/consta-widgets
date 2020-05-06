const sizes = ['s', 'm', 'l'] as const

export type ProgressBarParams = {
  size: typeof sizes[number]
  isCaptionBold?: boolean
}

export const progressBarParams = {
  sizes,
}
