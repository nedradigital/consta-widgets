import React from 'react'

import _ from 'lodash'

import { FormatValue } from '@/_private/types'
import { Scaler } from '@/_private/utils/scale'

import { Group, GroupItem } from './components/Group'
import { Position, Ticks } from './components/Ticks'
import { TooltipData } from './components/Tooltip'
import { ColumnSize, Size, toAxisSize } from './helpers'

export type RenderGroupsLabels = (props: {
  values: readonly string[]
  position: Position
  size: Size
  isXAxisLabelsSlanted?: boolean
  getGridAreaName: (index: number) => string
}) => React.ReactNode

export const defaultRenderGroupsLabels: RenderGroupsLabels = ({ size, ...rest }) => {
  return <Ticks {...rest} isLabel size={toAxisSize(size)} showLine />
}

export type RenderAxisValues = (props: {
  values: readonly number[]
  scaler: Scaler<number>
  position: Position
  size: Size
  formatValueForLabel?: FormatValue
}) => React.ReactNode

export const defaultRenderAxisValues: RenderAxisValues = ({ size, ...rest }) => {
  return <Ticks {...rest} size={toAxisSize(size)} showLine />
}

export type RenderGroup<T> = (props: {
  item: T
  index: number
  isLast: boolean
  isFirst: boolean
  isDense: boolean
  columnSize: ColumnSize
  showValues: boolean
  showReversed: boolean
  isHorizontal: boolean
  activeGroup?: string
  activeSectionIndex?: number
  scaler: (value: number) => number
  onMouseEnterColumn: (groupName: string, params: TooltipData) => void
  onMouseLeaveColumn: (groupName: string) => void
  formatValueForLabel: FormatValue
  onChangeLabelSize?: (size: number) => void
}) => React.ReactNode

export const defaultRenderGroup: RenderGroup<GroupItem> = Group
