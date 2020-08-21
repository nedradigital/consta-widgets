import { SectionItem } from '../Column'

import { ColumnItem } from '.'

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

export const getSectionsForColumns = ({
  columns,
  maxValue,
  scaler,
  scalerSize,
}: {
  scalerSize: number
  maxValue: number
  scaler: (size: number, value: number) => number
  columns: ReadonlyArray<ColumnItem | undefined>
}) => {
  return columns.reduce<Record<number, readonly SectionItem[]>>((acc, column, columnIdx) => {
    acc[columnIdx] = getSections({
      maxValue,
      scaler,
      size: scalerSize,
      sections: column?.sections,
    })

    return acc
  }, {})
}
