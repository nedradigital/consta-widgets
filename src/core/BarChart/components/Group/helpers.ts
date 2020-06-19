import { SectionItem } from '../Column'

export const getSections = ({
  size,
  sections,
  scaler,
}: {
  size: number
  sections?: readonly SectionItem[]
  scaler: (size: number, value: number) => number
}) => {
  return (sections || []).map(section => {
    if (section.value === undefined) {
      return section
    }

    return {
      ...section,
      length: scaler(size, section.value),
    }
  })
}
