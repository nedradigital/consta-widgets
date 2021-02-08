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

export const styleOrientation = (
  column: number,
  isHorizontal: boolean,
  scaler: (column: number) => void
) => {
  if (!isHorizontal) {
    return { minHeight: `${scaler(column)}%`, maxWidth: '70%' }
  } else {
    return { minWidth: `${scaler(column)}%`, maxHeight: '70%' }
  }
}
