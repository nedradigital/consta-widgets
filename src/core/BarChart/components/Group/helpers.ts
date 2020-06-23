import { SectionItem } from '../Column'

const MIN_SECTION_SIZE = 5

export const getSections = ({
  size,
  sections,
  scaler,
}: {
  size: number
  sections?: readonly SectionItem[]
  scaler: (size: number, value: number) => number
}) => {
  const elements = (sections || []).map(section => {
    if (section.value === undefined) {
      return section
    }

    return {
      ...section,
      length: scaler(size, section.value),
    }
  })

  const summarySize = elements.reduce((acc, item) => (item.length ? acc + item.length : acc), 0)
  const countOfSmallElements = elements.reduce(
    (acc, item) => (item.length === undefined || item.length > MIN_SECTION_SIZE ? acc : acc + 1),
    0
  )
  const summarySizeOfBigElements = elements.reduce(
    (acc, item) =>
      item.length === undefined || item.length <= MIN_SECTION_SIZE ? acc : acc + item.length,
    0
  )

  return elements.map(section => {
    if (section.length === undefined) {
      return section
    }

    if (section.length > MIN_SECTION_SIZE) {
      return {
        ...section,
        length:
          (section.length / summarySizeOfBigElements) *
          (summarySize - countOfSmallElements * MIN_SECTION_SIZE),
      }
    }

    return {
      ...section,
      length: MIN_SECTION_SIZE,
    }
  })
}
