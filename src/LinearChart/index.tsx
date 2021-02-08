import React from 'react'

import { isNotNil } from '@consta/widgets-utils/lib/type-guards'
import * as d3 from 'd3'
import * as _ from 'lodash'

import { FormatValue } from '@/_private/types'
import { getEveryN } from '@/_private/utils/array'
import { Data as LegendData, Direction as LegendDirection, Legend } from '@/Legend'
import {
  LabelPosition as LegendLabelPosition,
  LabelType as LegendType,
  Size as LegendSize,
} from '@/LegendItem'
import { Frame, GridConfig } from '@/LinearChart/components/Frame'
import { LineWithDots } from '@/LinearChart/components/LineWithDots'
import {
  flipPointsOnAxes,
  getDomainWithLimits,
  getMainTickValues,
  getSecondaryTickValues,
  getXScale,
  getYScale,
  INITIAL_DOMAIN,
  padDomain,
} from '@/LinearChart/helpers'

import { Threshold } from './components/Threshold'
import css from './index.css'

export type Item = { x: number | null; y: number | null }
export type NotEmptyItem = { x: number; y: number }
export const itemIsNotEmpty = (item: Item): item is NotEmptyItem =>
  isNotNil(item.x) && isNotNil(item.y)
export type NumberRange = readonly [number, number]
export type TickValues = readonly number[]
export type ScaleLinear = d3.ScaleLinear<number, number>
export const directionsX = ['toRight', 'toLeft'] as const
export type DirectionX = typeof directionsX[number]
export const directionsY = ['toTop', 'toBottom'] as const
export type DirectionY = typeof directionsY[number]
export const axes = ['x', 'y'] as const
export type Axis = typeof axes[number]
export type Line = {
  values: readonly Item[]
  dots?: boolean
  dashed?: boolean
  withGradient?: boolean
  lineName: string
  color: string
  showValues?: boolean
}

type ThresholdLine = {
  name?: string
  label?: string
  values: readonly NotEmptyItem[]
}
export type Threshold = {
  max: ThresholdLine
  min?: ThresholdLine
}

type Props = {
  lines: Line[]
  gridConfig: GridConfig
  threshold?: Threshold
  legend?: LegendData
  yDimensionUnit?: string
  yLabelsShowInPercent?: boolean
  xLabelsShowVertical?: boolean
  xHideFirstLabel?: boolean
  formatValueForLabel?: FormatValue
}

type State = {
  xDomain: NumberRange
  yDomain: NumberRange
  width: number
  height: number
  xGuideValue: number
  yGuideValue: number
}

const DOT_SIZE = 5

export const domainPaddings = {
  top: 0.055,
  right: 0.06,
  bottom: 0,
  left: 0,
}

export const LinearChart: React.FC<Props> = props => {
  const {
    lines,
    gridConfig,
    yDimensionUnit,
    yLabelsShowInPercent = false,
    xLabelsShowVertical = false,
    xHideFirstLabel = false,
    formatValueForLabel,
    legend,
  } = props

  const [state, setState] = React.useState<State>({
    xDomain: INITIAL_DOMAIN,
    yDomain: INITIAL_DOMAIN,
    width: 0,
    height: 0,
    xGuideValue: 0,
    yGuideValue: 0,
  })
  const ref = React.createRef<HTMLDivElement>()
  const dotRadius = DOT_SIZE / 2

  const getAllValues = (): readonly Item[] => _.flatten(lines.map((l: Line) => l.values))

  const getXDomain = (items: readonly Item[]): NumberRange => {
    const {
      gridConfig: {
        x: { withPaddings },
      },
    } = props
    const { left, right } = domainPaddings

    return _.flow(
      () => d3.extent(items, v => v.x) as NumberRange,
      domain =>
        padDomain({
          domain,
          paddingStart: withPaddings ? left : 0,
          paddingEnd: withPaddings ? right : 0,
          zoomScale: 1,
        })
    )()
  }

  const getYDomain = (items: readonly Item[]): NumberRange => {
    const {
      gridConfig: {
        y: { withPaddings },
      },
    } = props
    const { top, bottom } = domainPaddings

    return _.flow(
      () => d3.extent(items, v => v.y) as NumberRange,
      domain =>
        padDomain({
          domain,
          paddingStart: withPaddings ? bottom : 0,
          paddingEnd: withPaddings ? top : 0,
          zoomScale: 1,
        })
    )()
  }

  const updateSize = () => {
    const { width, height } = ref.current!.getBoundingClientRect()
    const newSize = { width, height }

    if (!_.isEqual(_.pick(state, ['width', 'height']), newSize)) {
      setState(prevState => ({
        ...prevState,
        ...newSize,
      }))
    }
  }

  const getSvgSize = () => {
    const { width, height } = state

    return {
      svgWidth: width,
      svgHeight: height,
    }
  }

  const getTicks = () => {
    const { xDomain, yDomain } = state

    const xGridConfig = gridConfig.x
    const yGridConfig = gridConfig.y

    const xGridTickValues = getMainTickValues({
      items: getAllValues(),
      domain: xDomain,
      ticksCount: xGridConfig.gridTicks,
    })

    const yGridTickValues = getSecondaryTickValues({
      items: getAllValues(),
      domain: yDomain,
      ticksCount: yGridConfig.gridTicks,
    })

    return {
      xGridTickValues,
      xLabelTickValues: xGridTickValues,
      yGridTickValues,
      yLabelTickValues: getEveryN(yGridTickValues, 1),
    }
  }

  const getThreshold = (): Threshold | undefined => {
    const { threshold } = props

    if (!threshold) {
      return undefined
    }

    return {
      max: {
        ...threshold.max,
        values: flipPointsOnAxes(threshold.max.values, true),
      },
      min: threshold.min && {
        ...threshold.min,
        values: flipPointsOnAxes(threshold.min.values, true),
      },
    }
  }

  const getThresholdLines = () => {
    const { threshold } = props

    if (!threshold) {
      return []
    }

    const { max, min = { values: [] } } = threshold

    return [flipPointsOnAxes(max.values, true), flipPointsOnAxes(min.values, true)]
  }

  const getAllThresholdValues = (): readonly Item[] => _.flatten(getThresholdLines())

  const updateDomains = () => {
    const linesValues = getAllValues()
    const thresholdValues = getAllThresholdValues()
    const values: readonly Item[] = [...linesValues, ...thresholdValues]

    const xDomain = getDomainWithLimits(getXDomain(values), gridConfig.x.min, gridConfig.x.max)
    const yDomain = getDomainWithLimits(getYDomain(values), gridConfig.y.min, gridConfig.y.max)

    const [xGuideValue] = d3.extent(values, v => v.x) as NumberRange
    const [yGuideValue] = d3.extent(values, v => v.y) as NumberRange

    setState(prevState => ({
      ...prevState,
      xDomain,
      yDomain,
      xGuideValue,
      yGuideValue,
    }))
  }

  React.useEffect(() => {
    updateSize()
    updateDomains()
  })

  const { xDomain, yDomain } = state
  const { svgWidth, svgHeight } = getSvgSize()
  const scaleX = getXScale(xDomain, svgWidth)
  const scaleY = getYScale(yDomain, svgHeight)
  const { xGridTickValues, yGridTickValues } = getTicks()
  const threshold = getThreshold()
  const legendProps = {
    direction: 'row' as LegendDirection,
    labelType: 'dot' as LegendType,
    fontSize: 's' as LegendSize,
    labelPosition: 'left' as LegendLabelPosition,
  }

  return (
    <div className={css.main}>
      {legend && (
        <div className={css.legend}>
          <Legend data={legend} {...legendProps} />
        </div>
      )}
      <div ref={ref} className={css.graph}>
        <svg className={css.svg} width={svgWidth} height={svgHeight}>
          <Frame
            width={svgWidth}
            height={svgHeight}
            gridConfig={gridConfig}
            scales={{
              x: scaleX,
              y: scaleY,
            }}
            xGridTickValues={xGridTickValues}
            yGridTickValues={yGridTickValues}
            yDimensionUnit={yDimensionUnit}
            yLabelsShowInPercent={yLabelsShowInPercent}
            xLabelsShowVertical={xLabelsShowVertical}
            xHideFirstLabel={xHideFirstLabel}
            formatValueForLabel={formatValueForLabel}
          />

          {threshold && (
            <Threshold
              scaleX={scaleX}
              scaleY={scaleY}
              maxPoints={threshold.max.values}
              minPoints={threshold.min?.values}
              clipPath="url(#line_clipPath)"
            />
          )}

          {lines.map(line => {
            const gradientProps = line.withGradient
              ? ({
                  withGradient: true,
                  areaBottom: 0,
                  gradientDirectionY: 'toTop',
                } as const)
              : ({
                  withGradient: false,
                } as const)

            return (
              <LineWithDots
                key={line.lineName}
                values={[...line.values]}
                color={line.color}
                hasDotRadius={line.dots}
                showValues={line.showValues}
                dashed={line.dashed}
                defaultDotRadius={dotRadius}
                scaleX={scaleX}
                scaleY={scaleY}
                lineClipPath="url(#line_clipPath)"
                dotsClipPath="url(#dots_clipPath)"
                // hoveredMainValue={undefined}
                {...gradientProps}
              />
            )
          })}
        </svg>
      </div>
    </div>
  )
}
