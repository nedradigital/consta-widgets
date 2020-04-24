// Здесь дублируются типы из ui-кита, чтобы можно было версионировать параметры в случае его обновления
const sizes = ['s', 'm', 'l'] as const
const views = ['filled', 'stroked'] as const
const forms = ['default', 'round'] as const

export type BadgeParams = {
  size: typeof sizes[number]
  view: typeof views[number]
  form?: typeof forms[number]
  isMinified?: boolean
}

export const badgeParams = {
  sizes,
  views,
  forms,
}
