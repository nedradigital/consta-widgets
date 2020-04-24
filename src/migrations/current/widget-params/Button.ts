const widths = ['full', 'auto'] as const
const sizes = ['xs', 's', 'm', 'l'] as const
const views = ['clear', 'primary', 'secondary', 'ghost'] as const
const iconAligns = ['left', 'right'] as const
const forms = [
  'default',
  'brick',
  'round',
  'brick-round',
  'round-brick',
  'brick-default',
  'default-brick',
] as const

export type ButtonParams = {
  size: typeof sizes[number]
  view: typeof views[number]
  width: typeof widths[number]
  form: typeof forms[number]
  content?: string
  withIcon?: typeof iconAligns[number]
}

export const buttonParams = {
  widths,
  sizes,
  views,
  iconAligns,
  forms,
}
