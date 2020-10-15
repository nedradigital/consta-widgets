import React from 'react'

import { isDefined } from '@consta/widgets-utils/lib/type-guards'
import classnames from 'classnames'
import { omit, sumBy } from 'lodash'

import { LabelSize } from '@/_private/components/BarChart'
import { getColumnCenter, SectionItem } from '@/_private/components/BarChart/components/Column'
import { getSections } from '@/_private/components/BarChart/components/Group/helpers'
import baseCss from '@/_private/components/BarChart/components/Group/index.css'
import { TooltipData } from '@/_private/components/BarChart/components/Tooltip'
import { FormatValue } from '@/_private/types'
import { Align } from '@/BackgroundBarChart'

import { BackgroundColumn } from '../BackgroundColumn'
import { Column } from '../Column'

import css from './index.css'

export type ColumnItem = {
  total: number
  sections?: readonly SectionItem[]
}

export type GroupItem = {
  name: string
  column: ColumnItem
  backgroundColumn: ColumnItem
  isDisabled?: boolean
}

type Props = {
  item: GroupItem
  isHorizontal: boolean
  showValues: boolean
  align: Align
  scaler: (value: number) => number
  formatValueForLabel?: FormatValue
  onMouseEnterColumn: (groupName: string, params: TooltipData) => void
  onMouseLeaveColumn: (groupName: string) => void
  onChangeLabelSize?: (size: LabelSize) => void
  className?: string
  style?: React.CSSProperties
}

export const Group: React.FC<Props> = props => {
  const columnsRef = React.useRef<HTMLDivElement>(null)

  const {
    item: { name: group, column, backgroundColumn, isDisabled },
    isHorizontal,
    showValues,
    align,
    scaler,
    formatValueForLabel,
    onMouseEnterColumn,
    onMouseLeaveColumn,
    onChangeLabelSize,
    className,
    style,
  } = props
  const totalBackgroundSize = sumBy(backgroundColumn?.sections ?? [], section =>
    scaler(section.value ?? 0)
  )

  const sections = getSections({
    sections: column.sections,
    scaler,
  })

  const backgroundSections = getSections({
    sections: backgroundColumn.sections,
    scaler,
  })

  const handleMouseEnter: React.MouseEventHandler = event => {
    if (!(event.currentTarget instanceof HTMLElement) || !columnsRef.current) {
      return
    }

    const { x, y } = getColumnCenter(columnsRef.current.children, isHorizontal)

    const columnSections = column?.sections ?? []
    const backgroundColumnSections = backgroundColumn?.sections ?? []

    const selectedSections = [
      ...columnSections,
      ...backgroundColumnSections.map(section => omit(section, 'color')),
    ].filter(isDefined)

    onMouseEnterColumn(group, {
      x,
      y,
      items: isHorizontal ? selectedSections : [...selectedSections].reverse(),
    })
  }

  return (
    <div
      className={classnames(
        baseCss.group,
        css.main,
        isHorizontal && baseCss.isHorizontal,
        isHorizontal && css.isHorizontal,
        className
      )}
      style={{
        ...style,
        ['--total-background-size' as string]: `${totalBackgroundSize}%`,
      }}
    >
      <div className={classnames(baseCss.columns, css.columns)}>
        <div className={classnames(css.baseColumn, css.backgroundColumn)}>
          <BackgroundColumn
            sections={backgroundSections}
            isHorizontal={isHorizontal}
            isDisabled={isDisabled}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => onMouseLeaveColumn(group)}
          />
        </div>
        <div className={classnames(css.baseColumn, css.column)}>
          <Column
            ref={columnsRef}
            group={group}
            total={column.total}
            sections={sections}
            isHorizontal={isHorizontal}
            showValues={showValues}
            align={align}
            formatValueForLabel={formatValueForLabel}
            onChangeLabelSize={onChangeLabelSize}
          />
        </div>
      </div>
    </div>
  )
}
