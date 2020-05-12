const sizes = ['s', 'm', 'l'] as const

export type DatePickerParams = {
  size: typeof sizes[number]
}

export const datePickerParams = {
  sizes,
}
