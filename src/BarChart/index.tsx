import React from 'react'

import { CoreBarChart, Threshold, TypeColumn, UnitPosition } from '@/_private/components/BarChart'
import { GroupItem } from '@/_private/components/BarChart/components/Group'
import {
  getGroupsDomain,
  getValuesDomain,
  isShowReversed,
} from '@/_private/components/BarChart/helpers'
import { defaultRenderGroup } from '@/_private/components/BarChart/renders'
import { FormatValue } from '@/_private/types'

import { transformGroupsToCommonGroups } from './helpers'

export type Column = number | undefined

export type Group = {
  groupName: string
  values: readonly Column[]
}

type Props = {
  groups: readonly Group[]
  minValueY: number
  maxValueY: number
  colors: readonly string[]
  unit?: string
  unitPosition?: UnitPosition
  size?: 's' | 'm' | 'auto'
  showValues?: boolean
  isHorizontal?: boolean
  withScroll?: boolean
  isXAxisLabelsSlanted?: boolean
  threshold?: Threshold
  title?: React.ReactNode
  formatValueForLabel?: FormatValue
  formatValueForTooltip?: FormatValue
  isEmptyColumnsHidden?: boolean
  showGrid?: boolean
  showLineAtZero?: boolean
  showGroupsLabels?: boolean
}

export const BarChart: React.FC<Props> = props => {
  const {
    groups,
    minValueY,
    maxValueY,
    size = 'm',
    colors,
    threshold,
    showValues,
    showGrid,
    showLineAtZero,
    showGroupsLabels,
    isEmptyColumnsHidden = false,
    ...rest
  } = props

  const commonGroups = transformGroupsToCommonGroups(groups, colors, isEmptyColumnsHidden)
  const showReversed = isShowReversed({ groups: commonGroups, threshold: props.threshold })
  const groupsDomain = getGroupsDomain(commonGroups)
  const valuesDomain = getValuesDomain({
    groups: commonGroups,
    minValueY,
    maxValueY,
    threshold: props.threshold,
  })

  const getColumnsLengthArray = (groupsItem: GroupItem[], typeColumn: TypeColumn) => {
    let columnsLengthArray: number[] = []

    groupsItem.map((group: GroupItem) =>
      group[typeColumn].map(column => {
        if (column?.sections?.[0]?.value && column?.sections?.[0]?.value !== undefined) {
          columnsLengthArray = columnsLengthArray.concat(column.sections[0].value)
        }
      })
    )
    return columnsLengthArray
  }

  const columnsLengthArray = getColumnsLengthArray(commonGroups, 'columns')
  const reversedColumnsLengthArray = getColumnsLengthArray(commonGroups, 'reversedColumns')
  const maxColumnLength =
    columnsLengthArray.length > 0 ? Math.max.apply(null, columnsLengthArray) : 0
  const minReversedColumnLength =
    reversedColumnsLengthArray.length > 0 ? Math.min.apply(null, reversedColumnsLengthArray) : 0

  const getMaxNumberGroupsArray = (groupsItem: GroupItem[]) => {
    let columnsArray: number[] = []

    groupsItem.map((group: GroupItem) => {
      if (group?.columns) {
        columnsArray = columnsLengthArray.concat(group.columns.length)
      }
    })
    return columnsArray
  }
  const maxNumberGroupsArray = getMaxNumberGroupsArray(commonGroups)
  const maxNumberGroups: number =
    maxNumberGroupsArray.length > 0 ? Math.max.apply(null, maxNumberGroupsArray) : 0

  return (
    <CoreBarChart
      {...rest}
      groups={commonGroups}
      groupsDomain={groupsDomain}
      valuesDomain={valuesDomain}
      size={size}
      showValues={showValues}
      showReversed={showReversed}
      threshold={threshold}
      maxColumnLength={maxColumnLength}
      minReversedColumnLength={minReversedColumnLength}
      renderGroup={defaultRenderGroup}
      showGrid={showGrid}
      showLineAtZero={showLineAtZero}
      showGroupsLabels={showGroupsLabels}
      maxNumberGroups={maxNumberGroups}
    />
  )
}
