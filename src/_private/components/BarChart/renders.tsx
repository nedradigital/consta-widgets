import React from 'react'

import { FormatValue } from '@/_private/types'
import { NumberRange, Scaler } from '@/_private/utils/scale'

import { LabelSize } from '.'
import { Group, GroupItem } from './components/Group'
import { Position, Ticks } from './components/Ticks'
import { TooltipData } from './components/Tooltip'

export type RenderGroupsLabels = (props: {
  values: readonly string[]
  position: Position
  isXAxisLabelsSlanted?: boolean
  showGroupsLabels?: boolean
  getGridAreaName: (index: number) => string
}) => React.ReactElement | null

export const defaultRenderGroupsLabels: RenderGroupsLabels = ({ ...rest }) => {
  return <Ticks {...rest} isLabel showLine />
}

export type RenderAxisValues = (props: {
  values: readonly number[]
  scaler: Scaler<number>
  position: Position
  formatValueForLabel?: FormatValue
  showGroupsLabels?: boolean
}) => React.ReactElement | null

export const defaultRenderAxisValues: RenderAxisValues = ({ ...rest }) => {
  return <Ticks {...rest} showLine />
}

export type RenderGroup<T> = (props: {
  item: T
  index: number
  isLast: boolean
  isFirst: boolean
  showValues: boolean
  showReversed: boolean
  isHorizontal: boolean
  activeGroup?: string
  activeSectionIndex?: number
  scalerMaxValue: (value: number) => number
  scalerMinValue: (value: number) => number
  maxNumberGroups: number
  columnLength: number
  reversedColumnLength: number
  onMouseEnterColumn: (groupName: string, params: TooltipData) => void
  onMouseLeaveColumn: (groupName: string) => void
  formatValueForLabel: FormatValue
  onChangeLabelSize?: (size: LabelSize) => void
  getNumberGridTicks: (length: number) => void
  gridDomain: NumberRange
}) => React.ReactElement | null

export const defaultRenderGroup: RenderGroup<GroupItem> = props => <Group {...props} />
