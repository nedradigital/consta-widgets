import { SectionItem } from '../Column'

export const getSections = ({
  size,
  sections,
  scaler,
  maxValue,
}: {
  size: number
  maxValue: number
  sections?: readonly SectionItem[]
  scaler: (size: number, value: number) => number
}): readonly SectionItem[] => {
  const maxLength = scaler(size, maxValue)

  return (sections || []).map(section => {
    if (section.value === undefined) {
      return section
    }

    const length = scaler(size, section.value)

    return {
      ...section,
      length: (length / maxLength) * 100,
    }
  })
}
