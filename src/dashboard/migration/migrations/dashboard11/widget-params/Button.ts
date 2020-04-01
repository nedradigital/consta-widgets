const widths = ['full', 'auto'] as const
type Width = typeof widths[number]

const sizes = ['xs', 's', 'm', 'l'] as const
type Size = typeof sizes[number]

const views = ['clear', 'primary', 'secondary', 'ghost'] as const
type View = typeof views[number]

const iconAligns = ['left', 'right'] as const
type IconAlign = typeof iconAligns[number]

const forms = [
  'default',
  'brick',
  'round',
  'brick-round',
  'round-brick',
  'brick-default',
  'default-brick',
] as const
type Form = typeof forms[number]

export type ButtonParams = {
  size: Size
  view: View
  width: Width
  form: Form
  content?: string
  withIcon?: IconAlign
}

export const buttonParams = {
  widths,
  sizes,
  views,
  iconAligns,
  forms,
}
