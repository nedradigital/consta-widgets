const sizes = ['xs', 's', 'm', 'l'] as const
type Size = typeof sizes[number]

const forms = ['default', 'round', 'brick'] as const
type Form = typeof forms[number]

export type ChoiceGroupParams = {
  size: Size
  form?: Form
}

export const choiceGroupParams = {
  sizes,
  forms,
}
