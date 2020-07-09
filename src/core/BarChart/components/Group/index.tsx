import classnames from 'classnames'

import { useComponentSize } from '@/common/utils/use-component-size'

import { Column, ColumnSize, OnMouseEnterColumn, SectionItem } from '../Column'

import { getSections } from './helpers'
import css from './index.css'

export type ColumnItem = {
  total: number
  sections?: readonly SectionItem[]
}

type Props = {
  name: string
  columns: ReadonlyArray<ColumnItem | undefined>
  reversedColumns: ReadonlyArray<ColumnItem | undefined>
  isHorizontal: boolean
  isNegative: boolean
  size: ColumnSize
  showValues: boolean
  scaler: (size: number, value: number) => number
  onMouseEnterColumn: OnMouseEnterColumn
  onMouseLeaveColumn: React.MouseEventHandler
  onChangeLabelSize?: (siez: number) => void
}

const sizeClasses: Record<ColumnSize, string> = {
  xxl: css.sizeXXL,
  xl: css.sizeXL,
  l: css.sizeL,
  m: css.sizeM,
  s: css.sizeS,
}

export const Group: React.FC<Props> = ({
  columns,
  reversedColumns,
  isHorizontal,
  isNegative,
  size,
  showValues,
  scaler,
  onMouseEnterColumn,
  onMouseLeaveColumn,
  onChangeLabelSize,
}) => {
  const columnsRef = React.useRef<HTMLDivElement>(null)
  const { width, height } = useComponentSize(columnsRef)
  const scalerSize = isHorizontal ? width : height

  const renderColumn = (column: ColumnItem | undefined, index: number, isReversed?: boolean) => {
    if (!column) {
      return null
    }

    const sections = getSections({
      size: scalerSize,
      sections: column.sections,
      scaler,
    })

    return (
      <Column
        key={index}
        total={column.total}
        sections={sections}
        size={size}
        isHorizontal={isHorizontal}
        isReversed={isReversed}
        showValues={showValues}
        onMouseEnterColumn={onMouseEnterColumn}
        onMouseLeaveColumn={onMouseLeaveColumn}
        onChangeLabelSize={index === 0 ? onChangeLabelSize : undefined}
      />
    )
  }

  return (
    <div className={classnames(css.group, isHorizontal && css.isHorizontal, sizeClasses[size])}>
      <div ref={columnsRef} className={css.columns}>
        <div className={css.wrapper}>
          {columns.map((column, index) => renderColumn(column, index))}
        </div>
        {isNegative && (
          <div className={classnames(css.wrapper, css.isReversed)}>
            {reversedColumns.map((column, index) => renderColumn(column, index, true))}
          </div>
        )}
      </div>
    </div>
  )
}
