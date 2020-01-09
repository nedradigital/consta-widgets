import React, { useLayoutEffect, useRef, useState } from 'react'
import { useUID } from 'react-uid'

import useComponentSize from '@rehooks/component-size'
import { isEqual, max } from 'lodash'

import { getGroupScale, getValuesScale } from '@/components/BarChart'
import { ColorGroups } from '@/dashboard/types'

import { Axis } from './components/Axis'
import { Control } from './components/Control'
import { ColumnDetail, MultiBar } from './components/MultiBar'
import { TooltipComponent as Tooltip } from './components/Tooltip'
import css from './index.css'

export type Orientation = 'horizontal' | 'vertical'

type Column = {
  [key: string]: number
}

type Value = {
  [key: string]: number | string | Column
}

export type UniqueInnerColumns = readonly string[]

export type Data = {
  categories: readonly string[]
  values: readonly Value[]
  keyGroup: string
}

type Props = {
  data: Data
  orientation: Orientation
  valuesTick?: number
  hasRatio?: boolean
  colorGroups: ColorGroups
}

const getColumnDetails = (
  column: Column,
  columnName: string,
  categories: readonly string[]
): readonly ColumnDetail[] => {
  return categories.reduce<readonly ColumnDetail[]>((previousValue, category, currentIndex) => {
    const value = column[category]
    const positionBegin = currentIndex === 0 ? 0 : previousValue[currentIndex - 1].positionEnd
    const positionEnd = positionBegin + value

    const result = {
      category,
      columnName,
      positionBegin,
      positionEnd,
      value,
    }

    return previousValue.concat(result)
  }, [])
}

const getTotalByColumn = (columns: readonly ColumnDetail[]) =>
  max(columns.map(obj => obj.positionEnd)) || 0

const getNormalizedValue = (yMaxValue: number, value: number, total: number) =>
  Math.round((yMaxValue * value) / total)

const normalizeDetails = (
  columns: readonly ColumnDetail[],
  yMaxValue: number
): readonly ColumnDetail[] => {
  const total = getTotalByColumn(columns)

  return columns.map(column => {
    return {
      ...column,
      positionBegin: getNormalizedValue(yMaxValue, column.positionBegin, total),
      positionEnd: getNormalizedValue(yMaxValue, column.positionEnd, total),
    }
  })
}

export const MultiBarChart: React.FC<Props> = ({
  data,
  orientation,
  valuesTick = 4,
  hasRatio,
  colorGroups,
}) => {
  const [paddingX, setPaddingX] = useState(0)
  const [paddingY, setPaddingY] = useState(0)
  const [showValues, setShowValues] = useState(false)
  const [activeBar, setActiveBar] = useState()

  const ref = useRef(null)
  const svgRef = useRef(null)
  const { width, height } = useComponentSize(ref)
  const [{ svgWidth, svgHeight }, setSizeSvg] = useState({ svgWidth: 0, svgHeight: 0 })

  const uid = useUID()
  const clipId = `multibarchart_clipPath_${uid}`

  const { categories, values, keyGroup } = data
  const isVertical = orientation !== 'horizontal'

  useLayoutEffect(() => {
    const w = Math.round(width - paddingX) || 0
    const h = Math.round(height - paddingY) || 0

    setSizeSvg({ svgWidth: w, svgHeight: h })
  }, [width, height, paddingX, paddingY])

  const changeShowValues = () => {
    setShowValues(!showValues)
  }

  const onAxisSizeChange = ({
    xAxisHeight,
    yAxisWidth,
  }: {
    xAxisHeight: number
    yAxisWidth: number
  }) => {
    const newPaddings = {
      paddingX: yAxisWidth,
      paddingY: xAxisHeight,
    }

    if (!isEqual(newPaddings, { paddingX, paddingY })) {
      setPaddingX(yAxisWidth)
      setPaddingY(xAxisHeight)
    }
  }

  const groupsDomain = values.map(d => String(d[keyGroup]))
  const innerColumns = values.map(obj => Object.keys(obj).filter(key => key !== keyGroup)).flat()
  const uniqueInnerColumns: UniqueInnerColumns = [...new Set(innerColumns)]

  let dataColumns = data.values.map(obj => {
    return {
      keyGroup: String(obj[keyGroup]),
      columnDetails: uniqueInnerColumns.map(column =>
        getColumnDetails(obj[column] as Column, column, categories)
      ),
    }
  })

  const yMaxValue =
    max(dataColumns.map(obj => max(obj.columnDetails.map(column => getTotalByColumn(column))))) || 0

  const valuesDomain: readonly [number, number] = [0, yMaxValue]
  const ySize = isVertical ? svgHeight : svgWidth
  const xSize = isVertical ? svgWidth : svgHeight

  const groupScale = getGroupScale(groupsDomain, xSize, orientation)
  const valuesScale = getValuesScale(valuesDomain, ySize, orientation)

  if (hasRatio) {
    dataColumns = dataColumns.map(obj => {
      return {
        ...obj,
        columnDetails: obj.columnDetails.map(column => normalizeDetails(column, yMaxValue)),
      }
    })
  }

  return (
    <div
      ref={ref}
      className={css.main}
      style={{
        paddingLeft: paddingX,
      }}
    >
      <svg className={css.icon} width={svgWidth} height={svgHeight} ref={svgRef}>
        <defs>
          <clipPath id={clipId}>
            {/* 100 - сделано для того, чтобы не обрезались tooltip/complex tooltip */}
            <rect width={svgWidth + 200} height={svgHeight + 200} y={-100} x={-100} />
          </clipPath>
        </defs>
        <Axis
          width={svgWidth}
          height={svgHeight}
          groupScale={groupScale}
          valuesScale={valuesScale}
          valuesTick={valuesTick}
          orientation={orientation}
          onAxisSizeChange={onAxisSizeChange}
        />
        {dataColumns.map((barColumns, idx) => {
          return (
            <MultiBar
              key={idx}
              data={barColumns}
              clipId={clipId}
              showValues={showValues}
              isVertical={isVertical}
              groupScale={groupScale}
              valuesScale={valuesScale}
              color={colorGroups}
              uniqueInnerColumns={uniqueInnerColumns}
              onMouseLeave={() => setActiveBar(undefined)}
              onMouseEnter={setActiveBar}
              parentRef={svgRef}
            />
          )
        })}
      </svg>
      <Control paddingX={paddingX} changeDisplayValues={changeShowValues} />
      {activeBar && (
        <Tooltip
          barColumn={activeBar}
          isVertical={isVertical}
          uniqueInnerColumns={uniqueInnerColumns}
          isVisible={true}
          svgParentRef={svgRef}
          color={colorGroups}
        />
      )}
    </div>
  )
}
