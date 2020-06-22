import _ from 'lodash'

export const getColumnsSize = (sizes: ReadonlyArray<number | undefined>) => {
  return sizes.map(s => (s ? `${s}px` : 'minmax(min-content, 1fr)')).join(' ')
}

export const getColumnLeftOffset = ({
  columnIndex,
  resizedColumnWidths,
  initialColumnWidths,
}: {
  columnIndex: number
  resizedColumnWidths: ReadonlyArray<number | undefined>
  initialColumnWidths: readonly number[]
}) => {
  const selectedColumns = initialColumnWidths
    .slice(0, columnIndex)
    .map((size, index) => resizedColumnWidths[index] || size)

  return _.sum(selectedColumns)
}
