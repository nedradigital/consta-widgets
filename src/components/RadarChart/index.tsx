import * as React from 'react'
import { useUID } from 'react-uid'

import { getCalculatedSize } from '@gaz/utils/lib/css'
import useComponentSize from '@rehooks/component-size'
import * as _ from 'lodash'

import { ColorGroups } from '@/dashboard/types'

import { RadarChartAxes } from './components/Axes'
import { RadarChartAxisName } from './components/AxisName'
import { AxisTooltip } from './components/AxisTooltip'
import { RadarChartFigure } from './components/Figure'
import { RadarChartPoints } from './components/Points'
import css from './index.css'

export type RadarChartFormatLabel = (value: number) => string

export const radarChartLabelSizes = ['s', 'm'] as const
export type RadarChartLabelSize = typeof radarChartLabelSizes[number]

export type Point = {
  xPercent: number
  yPercent: number
  label: string
  axisName: string
}

export type Figure = {
  colorGroupName: string
  name: string
  values: ReadonlyArray<{
    axisName: string
    value: number
  }>
}

export type Data = {
  maxValue: number
  axesLabels: { [key: string]: string }
  figures: readonly Figure[]
  formatLabel?: RadarChartFormatLabel
}

type Props = {
  ticks: number
  colorGroups: ColorGroups
  figures: readonly Figure[]
  backgroundColor: string
  withConcentricColor: boolean
  labelSize: RadarChartLabelSize
} & Data

export type Axis = {
  name: string
  label: string
  angle: number
}

export type FigureColor = {
  lineColor: string
  withFill: boolean
}

export const deg2rad = (deg: number) => deg * (Math.PI / 180)

// Преобразуем кординаты от центра круга в координаты svg: 0 -> 50%, 1 -> 100%
const circleCoordToRelative = (circlePos: number) => _.round(50 * (1 + circlePos), 2)

/**
 * @param angle - угол в радианах
 * @param valueFraction - положение на оси (от 0 до 1)
 */
export const angleToCoord = (angle: number, valueFraction: number) => ({
  xPercent: circleCoordToRelative(Math.cos(angle) * valueFraction),
  yPercent: circleCoordToRelative(Math.sin(angle) * valueFraction),
})

type ConcentricColorInfo = {
  circles: readonly string[]
  gradient: ReadonlyArray<readonly [string, number]>
}

const concentricColorsByTicksAmount: { [key: number]: ConcentricColorInfo } = {
  3: {
    circles: ['#BD3600', '#F2C94C', '#20B55F'],
    gradient: [
      ['#BD3600', 0],
      ['#BD3600', 14.23],
      ['#F2C94C', 24.17],
      ['#F2C94C', 42.59],
      ['#20B55F', 65.42],
    ],
  },
  4: {
    circles: ['#FF0606', '#BD3600', '#F2C94C', '#20B55F'],
    gradient: [['#FF2955', 0], ['#BD3600', 23.28], ['#F2C94C', 48.4], ['#20B55F', 73.99]],
  },
  5: {
    circles: ['#FF0606', '#BD3600', '#FF8A00', '#F2C94C', '#20B55F'],
    gradient: [
      ['#FF2955', 0],
      ['#EB5757', 19.36],
      ['#FF6D32', 39.73],
      ['#FFDA36', 58.99],
      ['#20B55F', 79.07],
      ['#20B55F', 100],
    ],
  },
}

export const RadarChart: React.FC<Props> = ({
  ticks: originalTicks,
  maxValue,
  colorGroups,
  axesLabels,
  figures: originalFigures,
  backgroundColor,
  labelSize,
  formatLabel = String,
  withConcentricColor,
}) => {
  // В радаре с градиентом может быть только 1 фигура и 3-5 колец
  const ticks = withConcentricColor ? _.clamp(originalTicks, 3, 5) : originalTicks
  const figures = withConcentricColor ? originalFigures.slice(0, 1) : originalFigures

  const [activeAxis, setActiveAxis] = React.useState<Axis>()

  const axisNameWidth = getCalculatedSize(130)
  const axisNameLineHeight = getCalculatedSize(20)
  const axisNameOffset = getCalculatedSize(15)
  const ref = React.useRef<HTMLDivElement>(null)
  const svgWrapperRef = React.useRef<HTMLDivElement>(null)
  const { width, height } = useComponentSize(ref)
  // Вписываем радар в квадрат, оставляя по бокам место под надписи
  const size = Math.min(
    width - 2 * (axisNameWidth + axisNameOffset),
    height - 2 * (2 * axisNameLineHeight + axisNameOffset)
  )

  const gradientId = `radarchart_gradient_${useUID()}`

  const axesNames = Object.keys(axesLabels)
  const singleAxisSegment = 360 / axesNames.length
  const axesAngles: readonly Axis[] = Object.keys(axesLabels).map((axisName, idx) => {
    // смещаем на половину сегмента, чтобы лэйблы были между осями
    const angleDeg = idx * singleAxisSegment + singleAxisSegment / 2 - 90

    return {
      name: axisName,
      label: axesLabels[axisName],
      angle: deg2rad(angleDeg),
    }
  }, {})

  const concentricColors = withConcentricColor ? concentricColorsByTicksAmount[ticks] : undefined

  const pointsForFigures = figures.map(figure =>
    _.compact(
      figure.values.map(value => {
        const theAxis = axesAngles.find(a => a.name === value.axisName)

        return theAxis
          ? {
              ...angleToCoord(theAxis.angle, value.value / maxValue),
              label: formatLabel(value.value),
              axisName: value.axisName,
              originalValue: value.value,
            }
          : undefined
      })
    )
  )

  const colorsForFigures: readonly FigureColor[] = figures.map(figure =>
    concentricColors
      ? {
          lineColor: `url(#${gradientId})`,
          withFill: false,
        }
      : {
          lineColor: colorGroups[figure.colorGroupName],
          withFill: true,
        }
  )

  const getOffsetPosition = (xPercent: number, yPercent: number) => {
    if (!svgWrapperRef.current) {
      return { x: 0, y: 0 }
    }

    const percentSize = size / 100
    const svgWrapper = svgWrapperRef.current

    return {
      x: percentSize * xPercent + svgWrapper.offsetLeft,
      y: percentSize * yPercent + svgWrapper.offsetTop,
    }
  }

  const pointsOnAxis = activeAxis
    ? pointsForFigures.flat().filter(item => item.axisName === activeAxis.name)
    : []

  const tooltipValues = pointsOnAxis.map(point => point.label)

  const itemWithMaxValueOnAxis = _.maxBy(pointsOnAxis, item => item.originalValue) || {
    xPercent: 0,
    yPercent: 0,
  }

  const tooltipPosition = getOffsetPosition(
    itemWithMaxValueOnAxis.xPercent,
    itemWithMaxValueOnAxis.yPercent
  )

  return (
    <div ref={ref} className={css.main}>
      {size > 0 && (
        <div
          ref={svgWrapperRef}
          className={css.svgWrapper}
          style={{
            width: size,
            height: size,
          }}
        >
          <svg viewBox={`0 0 ${size} ${size}`} className={css.svg}>
            {concentricColors && (
              <defs>
                <radialGradient id={gradientId} gradientUnits="userSpaceOnUse">
                  {concentricColors.gradient.map(([color, offset], idx) => (
                    <stop key={idx} offset={`${offset}%`} stopColor={color} />
                  ))}
                </radialGradient>
              </defs>
            )}

            <RadarChartAxes
              ticks={ticks}
              maxValue={maxValue}
              backgroundColor={backgroundColor}
              axesAngles={axesAngles}
              labelSize={labelSize}
              formatLabel={formatLabel}
              isHoverable={figures.length > 1}
              colors={concentricColors && concentricColors.circles}
              activeAxis={activeAxis}
              onMouseEnter={setActiveAxis}
              onMouseLeave={() => setActiveAxis(undefined)}
            />

            {figures.map((figure, idx) => (
              <RadarChartFigure
                key={figure.colorGroupName}
                size={size}
                points={pointsForFigures[idx]}
                {...colorsForFigures[idx]}
              />
            ))}
          </svg>

          {/* Точки пришлось положить отдельно, чтобы их хинты были поверх линий
          (через z-index это сделать не получится, т.к. в svg он не работает) */}
          <div className={css.points}>
            {figures.map((figure, idx) => (
              <RadarChartPoints
                key={figure.colorGroupName}
                points={pointsForFigures[idx]}
                lineColor={colorsForFigures[idx].lineColor}
                activeAxis={activeAxis ? activeAxis.name : ''}
                backgroundColor={backgroundColor}
                isHoverable={figures.length === 1}
              />
            ))}
          </div>

          {axesAngles.map(axis => {
            const { xPercent, yPercent } = angleToCoord(axis.angle, 1)

            return (
              <RadarChartAxisName
                key={axis.name}
                xPercent={xPercent}
                yPercent={yPercent}
                label={axis.label}
                width={axisNameWidth}
                lineHeight={axisNameLineHeight}
                offset={axisNameOffset}
              />
            )
          })}

          {figures.length > 1 && (
            <AxisTooltip
              colors={colorsForFigures}
              figures={figures}
              position={tooltipPosition}
              values={tooltipValues}
              axis={activeAxis}
            />
          )}
        </div>
      )}
    </div>
  )
}
