import React, { useLayoutEffect, useState } from 'react'
import { useUID } from 'react-uid'
import useDimensions from 'react-use-dimensions'

import classnames from 'classnames'
import * as d3 from 'd3'
import { isEqual, isObject, isUndefined } from 'lodash'

import { Axis } from '@/components/BarChart/components/Axis'
import { Hint } from '@/ui/Hint'

import { Control } from './components/Control'
import { MultiBar } from './components/MultiBar'
import css from './index.css'

export type Orientation = 'horizontal' | 'vertical'

export type Value = {
  [key: string]: number | string
}

export type Data = {
  categories: readonly string[]
  values: readonly Value[]
  keyGroup: string
}

// нам нужен объект, сгруппированный для комплексных тултипов
export type GroupByKeys = {
  [key in string]: readonly Layer[]
}

type Props = {
  data: Data
  orientation: Orientation
  valuesTick?: number
  hasRatio?: boolean
}

type RectParams = {
  x: number
  y: number
  width: number
  height: number
}

export type ComplexValue = {
  value: number
  layerIndex: number
  layerColor: string
}

export type Layer = {
  0: number
  1: number
  original0?: number
  original1?: number
  data: Value
  height?: number
  complexHeight?: number
  hasComplexTooltip?: boolean
  complexBarYStart?: number
  complexValue?: readonly ComplexValue[]
  isDisplayTooltip?: boolean
  key?: string
  layerIndex?: number
  layerFromGroup?: Layer
  value?: number
  paramsRect?: RectParams
}

export type Layers = readonly Layer[] & {
  index: number
  key: string
}

type Result = {
  [key: number]: Layer | number | string
}

export const defaultColumnSize = 12
const minWidthForComplexTooltip = 28

export const MultiBarChart: React.FC<Props> = ({ data, orientation, valuesTick = 4, hasRatio }) => {
  const [paddingX, setPaddingX] = useState(0)
  const [paddingY, setPaddingY] = useState(0)
  const [showValues, setShowValues] = useState(false)
  const [ref, { width, height }] = useDimensions()
  const [{ svgWidth, svgHeight }, setSizeSvg] = useState({ svgWidth: 0, svgHeight: 0 })
  const uid = useUID()
  const clipId = `multibarchart_clipPath_${uid}`
  const keys = data.categories
  const { values, keyGroup } = data
  const isVertical = orientation !== 'horizontal'
  const color: ReadonlyArray<string> = ['#56B9F2', '#EB5757', '#FCA355', 'aquamarine']

  useLayoutEffect(() => {
    const w = Math.round(width - paddingX) || 0
    const h = Math.round(height - paddingY) || 0

    setSizeSvg({ svgWidth: w, svgHeight: h })
  }, [width, height])

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

  const getLayers = () => {
    const stack = d3.stack<Result>().keys([...keys])
    // нормализовать значения на графике
    if (hasRatio) {
      stack.offset(d3.stackOffsetExpand)
    }

    return stack([...values])
  }

  const convertPercentToOriginal = (datum: readonly Layers[]) => {
    let total = 0

    return datum.reduce<readonly object[]>((previousValue, items) => {
      const { key } = items

      const itemsArray = Object.entries(items).map(([_, v]) => {
        total = 0
        if (Array.isArray(v)) {
          const row = (v as object) as Layer

          keys.forEach(k => {
            total += parseInt(row.data[k] as string, 10)
          })

          return {
            ...row,
            key,
            original0: Math.round(total * row[0]),
            original1: Math.round(total * row[1]),
          }
        }
      })

      return previousValue.concat([itemsArray.filter(r => !isUndefined(r))])
    }, [])
  }

  const calculateHeightBars = (datum: readonly Layers[]) => {
    let heightBar: number
    const objects: GroupByKeys = {}

    datum.forEach((layer: Layers, idx: number) => {
      Object.entries(layer).forEach(([_, value]) => {
        if (Array.isArray(value) || isObject(value)) {
          const row = (value as object) as Layer

          if (!objects.hasOwnProperty(row.data[keyGroup])) {
            objects[row.data[keyGroup]] = []
          }

          heightBar = !isVertical
            ? yScale(row[1]) - yScale(row[0])
            : yScale(row[0]) - yScale(row[1])

          const obj = {
            ...row,
            height: heightBar > 0 ? heightBar : 0,
            hasComplexTooltip: heightBar > 0 && heightBar <= minWidthForComplexTooltip,
            isDisplayTooltip: true,
            layerIndex: idx,
          }

          objects[row.data[keyGroup]] = objects[row.data[keyGroup]].concat([obj])
        }
      })
    })

    return objects
  }

  // комплексный тултип закончился, нам необходимо обновить значения для предыдущих элементов до/с текущего(-им)
  const updatePrevComplexTooltip = (
    datum: Layers,
    complexBarIndexStart: number,
    indexEnd: number,
    complexHeight: number,
    complexValue: readonly ComplexValue[] = [],
    complexBarYStart?: number
  ) => {
    for (
      let isDisplayTooltip = true, index = complexBarIndexStart;
      index < indexEnd;
      isDisplayTooltip = false, index++
    ) {
      datum[index].complexHeight = complexHeight
      datum[index].complexValue = [...complexValue]
      datum[index].isDisplayTooltip = isDisplayTooltip
      if (complexBarYStart !== undefined) {
        datum[index].complexBarYStart = complexBarYStart
      }
    }

    return datum
  }

  // комлпексный тултип закончился, нам необходимо высчитать итоговую высоту, значение и позицию бара, до какого обновлять значения
  const completeComplexTooltipCalculation = (
    heightBar: number | undefined,
    complexHeight: number,
    complexValue: readonly ComplexValue[] = [],
    currentIndex: number,
    datumLength: number
  ) => {
    let indexEnd: number = currentIndex

    if (heightBar && currentIndex === datumLength - 1) {
      indexEnd =
        complexHeight > minWidthForComplexTooltip ||
        (heightBar && heightBar > minWidthForComplexTooltip)
          ? currentIndex - 1
          : currentIndex + 1
    }

    if (complexHeight > minWidthForComplexTooltip) {
      complexValue = complexValue.slice(0, complexValue.length - 1)
      if (heightBar) {
        complexHeight -= heightBar
        indexEnd = currentIndex - 1
      }
    }

    return {
      complexHeight,
      complexValue,
      indexEnd,
    }
  }

  const updateComplexHeightValue = (
    layer: Layer,
    complexHeight: number,
    heightBar: number,
    complexValue: readonly ComplexValue[]
  ) => {
    const { layerIndex, original1, original0 } = layer
    const val = hasRatio && original1 && original0 ? original1 - original0 : layer[1] - layer[0]
    complexHeight += heightBar
    complexValue = complexValue.concat([
      {
        value: Math.round(val) || 0,
        layerIndex: layerIndex || 0,
        layerColor: color[layerIndex || 0],
      },
    ])

    return { complexHeight, complexValue }
  }

  const updatePreviousValues = (
    heightBar: number,
    complexHeight: number,
    complexValue: readonly ComplexValue[],
    idx: number,
    datumLength: number,
    datum: Layers,
    layer: Layer,
    complexBarIndexStart?: number,
    complexBarYStart?: number
  ) => {
    const result = completeComplexTooltipCalculation(
      heightBar,
      complexHeight,
      complexValue,
      idx,
      datumLength
    )
    complexHeight = result.complexHeight
    complexValue = result.complexValue
    const indexEnd = result.indexEnd

    if (!isUndefined(complexBarIndexStart) && complexBarIndexStart >= 0) {
      datum = updatePrevComplexTooltip(
        datum,
        complexBarIndexStart,
        indexEnd,
        complexHeight,
        complexValue,
        complexBarYStart
      )
      complexBarIndexStart = undefined
      complexValue = []
    }
    complexHeight = 0
    if (heightBar && heightBar < minWidthForComplexTooltip && idx !== datumLength - 1) {
      const res = updateComplexHeightValue(layer, complexHeight, heightBar, complexValue)
      complexHeight = res.complexHeight
      complexValue = res.complexValue
      complexBarIndexStart = idx
      complexBarYStart = !isVertical ? yScale(layer[0]) : yScale(layer[1]) + heightBar
    }

    return {
      complexHeight,
      complexValue,
      complexBarIndexStart,
      complexBarYStart,
      datum,
    }
  }

  const updateBarsHeight = (value: Layers) => {
    let complexBarIndexStart: undefined | number
    let complexBarYStart: undefined | number
    let complexHeight: number = 0
    let complexValue: readonly ComplexValue[] = []
    let resultTemp: any

    value.forEach((layer, idx) => {
      const heightBar = layer.height || 0

      // обнуляем значения для комлпексного тултипа
      if (!layer.hasComplexTooltip || !heightBar) {
        complexHeight = 0
        complexBarIndexStart = undefined
        complexValue = []
      }

      // начало комплексного тултипа
      resultTemp = updateComplexHeightValue(layer, complexHeight, heightBar, complexValue)
      complexHeight = resultTemp.complexHeight
      complexValue = resultTemp.complexValue

      if (isUndefined(complexBarIndexStart)) {
        complexBarIndexStart = idx
        complexBarYStart = !isVertical ? yScale(layer[0]) : yScale(layer[1]) + heightBar
      }

      // конец комплексного тултипа
      if ((heightBar && complexHeight > minWidthForComplexTooltip) || idx === value.length - 1) {
        resultTemp = updatePreviousValues(
          heightBar,
          complexHeight,
          complexValue,
          idx,
          value.length,
          value,
          layer,
          complexBarIndexStart,
          complexBarYStart
        )
        complexHeight = resultTemp.complexHeight
        complexValue = resultTemp.complexValue
        complexBarIndexStart = resultTemp.complexBarIndexStart
        complexBarYStart = resultTemp.complexBarYStart
        value = resultTemp.datum
      }
    })

    return value
  }

  const calculateComplexTooltip = (datum: GroupByKeys) => {
    Object.entries(datum).forEach(([key, value]) => {
      datum[key] = updateBarsHeight(value as Layers)
    })

    return datum
  }

  const barSize =
    ((isVertical ? svgWidth : svgHeight) - defaultColumnSize * values.length) / values.length / 2 -
    defaultColumnSize / values.length / 2
  const groupDomains = values.map(d => String(d[keyGroup]))
  const layersTemp = getLayers() as readonly Layers[]
  const layers = (hasRatio ? convertPercentToOriginal(layersTemp) : layersTemp) as readonly Layers[]

  const yStackMax =
    d3.max(layers as readonly [], (layer: readonly Layer[]) => d3.max(layer, d => d[1])) || 0

  const xScale = d3
    .scaleBand()
    .paddingInner(0.05)
    .align(0.1)
    .domain(groupDomains)
    .range(!isVertical ? [svgHeight, 0] : [0, svgWidth])

  const yScale = d3
    .scaleLinear()
    .domain([0, yStackMax])
    .range(!isVertical ? [0, svgWidth] : [svgHeight, 0])

  const groupByKeysDatum = calculateHeightBars(layers)
  const groupByKeys = calculateComplexTooltip((groupByKeysDatum as unknown) as GroupByKeys)

  return (
    <div
      ref={ref}
      className={css.main}
      style={{
        paddingLeft: paddingX,
      }}
    >
      <svg className={css.icon} width={svgWidth} height={svgHeight}>
        <defs>
          <clipPath id={clipId}>
            {/* 100 - сделано для того, чтобы не обрезались tooltip/complex tooltip */}
            <rect width={svgWidth + 200} height={svgHeight + 200} y={-100} x={-100} />
          </clipPath>
        </defs>
        <Axis
          width={svgWidth}
          height={svgHeight}
          groupScale={xScale}
          valuesScale={yScale}
          valuesTick={valuesTick}
          orientation={orientation}
          onAxisSizeChange={onAxisSizeChange}
          valuesSpecifier={hasRatio ? '%' : undefined}
        />
        {layers.map((d, idx) => (
          <MultiBar
            key={idx}
            data={d}
            groupByKeys={groupByKeys}
            keyGroup={keyGroup}
            clipId={clipId}
            columnSize={defaultColumnSize}
            barSize={barSize}
            showValues={showValues}
            hasRatio={hasRatio}
            isVertical={isVertical}
            xScale={xScale}
            yScale={yScale}
            color={color[idx]}
            paddingX={paddingX}
          />
        ))}
      </svg>
      <Control paddingX={paddingX} changeDisplayValues={changeShowValues} />
      <Hint
        direction={!isVertical ? 'top' : 'right'}
        children={''}
        styles={{ display: 'none' }}
        className={classnames('multibarTooltip', !isVertical ? css.top : '')}
      />
    </div>
  )
}
