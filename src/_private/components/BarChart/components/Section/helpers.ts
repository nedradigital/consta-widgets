import { ColumnProperty } from '@/_private/components/BarChart/components/Column'

export const getSize = (length: number, isHorizontal: boolean) => {
  const size = `${Math.abs(length)}%`

  return {
    width: isHorizontal ? size : undefined,
    height: isHorizontal ? undefined : size,
  }
}

export const getRoundedBorder = (columnProperty: ColumnProperty, isHorizontal: boolean) => {
  switch (isHorizontal) {
    case false:
      if (columnProperty.width < 8) {
        return { borderRadius: '0' }
      } else if (columnProperty.width >= 8 && columnProperty.width < 16) {
        return { borderRadius: '1px 1px 0 0' }
      } else {
        return { borderRadius: '2px 2px 0 0' }
      }
    case true:
      if (columnProperty.height < 8) {
        return { borderRadius: '0' }
      } else if (columnProperty.height >= 8 && columnProperty.height < 16) {
        return { borderRadius: '0 1px 1px 0' }
      } else {
        return { borderRadius: '0 2px 2px 0' }
      }
  }
}
