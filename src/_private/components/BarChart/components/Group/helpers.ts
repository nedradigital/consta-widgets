import { SectionItem } from '../Column'

export const getSections = ({
  sections,
  scaler,
}: {
  sections?: readonly SectionItem[]
  scaler: (value: number) => number
}): readonly SectionItem[] => {
  return (sections || []).map(section => {
    if (section.value === undefined) {
      return section
    }

    return {
      ...section,
      length: scaler(section.value),
    }
  })
}
