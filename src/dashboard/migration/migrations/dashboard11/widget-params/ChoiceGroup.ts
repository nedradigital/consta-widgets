const sizes = ['xs', 's', 'm', 'l'] as const
const forms = ['default', 'round', 'brick'] as const

export type ChoiceGroupParams = {
  size: typeof sizes[number]
  form?: typeof forms[number]
}

export const choiceGroupParams = {
  sizes,
  forms,
}
