import React from 'react'

import { getCalculatedSize } from '@gaz/utils/lib/css'
import * as d3 from 'd3'

import { ColorGroups } from '@/dashboard/types'

import { TooltipComponent } from '../Tooltip'

type GroupScale = d3.ScaleBand<string>
type ValuesScale = d3.ScaleLinear<number, number>

export type GeometryParams = {
  x: number
  y: number
  columnSize: number
}

export type ColumnDetail = {
  category: string
  columnName: string
  value: number
  positionBegin: number
  positionEnd: number
}

export type ColumnWithGeometry = GeometryParams & ColumnDetail

export type MultiBarType = {
  columnDetails: ReadonlyArray<readonly ColumnDetail[]>
  keyGroup: string
}

export type MouseActionParams = {
  innerTranslate: number
  columnName: string
  values: readonly ColumnWithGeometry[]
  params?: GeometryParams
}

type MouseAction = (column?: MouseActionParams) => void

type Props = {
  clipId: string
  showValues?: boolean
  data: MultiBarType
  isVertical: boolean
  groupScale: GroupScale
  valuesScale: ValuesScale
  color: ColorGroups
  uniqueInnerColumns: readonly string[]
  onMouseLeave: () => void
  onMouseEnter: MouseAction
  parentRef: React.RefObject<SVGGElement>
}

export const getColumnSize = () => getCalculatedSize(12)
export const getColumnPadding = () => getCalculatedSize(4)
export const getComplexTooltipMaxSize = () => getCalculatedSize(24)

export const getItemsForTooltip = (
  items: readonly ColumnWithGeometry[],
  index: number,
  complexTooltipMaxSize: number
) => {
  let resultValue = items[index].columnSize

  if (resultValue > complexTooltipMaxSize) {
    return [items[index]]
  }

  let cursorShift = 1
  let toggleCursorDirection = false

  const boundaries: {
    begin?: number
    end?: number
  } = {}

  // Начиная с искомого элемента (в данном случае элемент с индексом 2) расходимся в стороны
  // [ 0 ] [ 1 ] [ 2 ] [ 3 ] [ 4 ]
  //               ^
  // На каждой итерации мы проверяем попеременно соседние элементы от указанного
  // [ 0 ] [ 1 ] [ 2 ] [ 3 ] [ 4 ]
  //         ^           ^
  // после чего смещаем курсор на единицу и проверяем более далеких соседей
  // [ 0 ] [ 1 ] [ 2 ] [ 3 ] [ 4 ]
  //   ^                       ^
  // заканчиваем, когда одна обе границы найдутся по условию или когда мы упремся в границы массива
  while (boundaries.begin == null || boundaries.end == null) {
    const currentIndex = index + (toggleCursorDirection ? cursorShift * -1 : cursorShift)
    const hasBoundary = boundaries.begin != null || boundaries.end != null
    const isBeyoundLeftBoundary = currentIndex < 0
    const isBeyoundRightBoundary = currentIndex > items.length - 1

    // двигаем курсор на поцию вперед только если были проверены оба направления
    // или если по одному из направлений уже найдена граница
    const shouldMoveCursor = toggleCursorDirection || hasBoundary

    if (shouldMoveCursor) {
      cursorShift++
    }

    if (isBeyoundLeftBoundary) {
      boundaries.begin = 0
      toggleCursorDirection = !toggleCursorDirection
      continue
    }

    if (isBeyoundRightBoundary) {
      boundaries.end = items.length
      toggleCursorDirection = !toggleCursorDirection
      continue
    }

    const currentValue = items[currentIndex].columnSize

    if (resultValue + currentValue >= complexTooltipMaxSize) {
      boundaries[toggleCursorDirection ? 'begin' : 'end'] = toggleCursorDirection
        ? currentIndex + 1
        : currentIndex
    } else {
      resultValue += currentValue
    }

    toggleCursorDirection = hasBoundary ? toggleCursorDirection : !toggleCursorDirection
  }

  return items.slice(boundaries.begin, boundaries.end)
}

export const MultiBar: React.FC<Props> = ({
  data,
  clipId,
  showValues,
  isVertical,
  groupScale,
  valuesScale,
  color,
  uniqueInnerColumns,
  onMouseLeave,
  onMouseEnter,
  parentRef,
}) => {
  const columnDefaultSize = getColumnSize()
  const columnPadding = getColumnPadding()
  const complexTooltipMaxSize = getComplexTooltipMaxSize()
  const barSize = (columnDefaultSize + columnPadding) * uniqueInnerColumns.length

  const groupSecondaryScale = d3
    .scaleBand()
    .padding(0.05)
    .domain([...uniqueInnerColumns])
    .rangeRound([0, barSize])
    .padding(0.05)

  const { columnDetails, keyGroup } = data

  const columnDetailsData = columnDetails.map(columns =>
    columns.map(column => {
      const { columnName, positionBegin, positionEnd } = column

      const groupSecondaryValue = groupSecondaryScale(columnName)

      return {
        ...column,
        columnSize: Math.abs(valuesScale(positionBegin) - valuesScale(positionEnd)),
        x: (isVertical ? groupSecondaryValue : valuesScale(positionBegin)) || 0,
        y: (isVertical ? valuesScale(positionEnd) : groupSecondaryValue) || 0,
      }
    })
  )

  const translate = (groupScale(String(keyGroup)) || 0) + groupScale.bandwidth() / 2 - barSize / 2
  const transform = isVertical ? `translate(${translate}, 0)` : `translate(0, ${translate})`

  const renderContent = (params: {
    column: ColumnWithGeometry
    index: number
    items: readonly ColumnWithGeometry[]
  }) => {
    const { column, index, items } = params

    const { x, y, columnSize, columnName } = column

    const mutableItemsForTooltip = getItemsForTooltip(items, index, complexTooltipMaxSize)

    const details = {
      columnName,
      innerTranslate: translate,
      params: {
        columnSize: mutableItemsForTooltip.reduce((a, b) => a + b.columnSize, 0),
        x: mutableItemsForTooltip[0].x,
        y: mutableItemsForTooltip[mutableItemsForTooltip.length - 1].y,
      },
      values: isVertical ? mutableItemsForTooltip.reverse() : mutableItemsForTooltip,
    }

    return (
      <React.Fragment key={keyGroup + index}>
        <rect
          x={x}
          y={y}
          width={isVertical ? columnDefaultSize : columnSize}
          height={isVertical ? columnSize : columnDefaultSize}
          fill={color[column.category]}
          onMouseLeave={onMouseLeave}
          onMouseEnter={() => onMouseEnter(details)}
        />
        <TooltipComponent
          barColumn={details}
          isVertical={isVertical}
          uniqueInnerColumns={uniqueInnerColumns}
          isVisible={Boolean(showValues)}
          svgParentRef={parentRef}
          color={color}
        />
      </React.Fragment>
    )
  }

  return (
    <g transform={transform} clipPath={`url(#${clipId})`}>
      {columnDetailsData.map(columns =>
        columns.map((column, index, items) =>
          renderContent({
            column,
            index,
            items,
          })
        )
      )}
    </g>
  )
}
