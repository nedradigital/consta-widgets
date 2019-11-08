import { useUID } from 'react-uid'
import useDimensions from 'react-use-dimensions'

import * as _ from 'lodash'

import { ColorGroups } from '@/dashboard/types'

import { RadarChartAxes } from './components/Axes'
import { RadarChartFigure } from './components/Figure'
import css from './index.css'

export type RadarChartFormatLabel = (value: number) => string

const radarChartLabelSizes = ['s', 'm'] as const
export type RadarChartLabelSize = typeof radarChartLabelSizes[number]

type Props = {
  maxValue: number
  ticks: number
  colorGroups: ColorGroups
  axesLabels: { [key: string]: string }
  figures: ReadonlyArray<{
    colorGroupName: string
    values: ReadonlyArray<{
      axisName: string
      value: number
    }>
  }>
  backgroundColor: string
  withConcentricColor: boolean
  formatLabel?: RadarChartFormatLabel
  labelSize?: RadarChartLabelSize
}

export type Axis = {
  name: string
  label: string
  angle: number
}

export const deg2rad = (deg: number) => deg * (Math.PI / 180)

// Преобразуем кординаты от центра круга в координаты svg: 0 -> 50%, 1 -> 100%
const circleCoordToRelative = (circlePos: number) => 50 * (1 + circlePos)

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
  labelSize = 's',
  formatLabel = String,
  withConcentricColor,
}) => {
  // В радаре с градиентом может быть только 1 фигура и 3-5 колец
  const ticks = withConcentricColor ? _.clamp(originalTicks, 3, 5) : originalTicks
  const figures = withConcentricColor ? originalFigures.slice(0, 1) : originalFigures

  const [ref, { width = 0, height = 0 }] = useDimensions()
  const size = Math.min(width, height)

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

  return (
    <div ref={ref} className={css.main}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className={css.svg}>
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
          colors={concentricColors && concentricColors.circles}
        />

        {figures.map(figure => {
          const points = _.compact(
            figure.values.map(value => {
              const theAxis = axesAngles.find(a => a.name === value.axisName)

              return theAxis ? angleToCoord(theAxis.angle, value.value / maxValue) : undefined
            })
          )

          const figureColorProps = concentricColors
            ? {
                lineColor: `url(#${gradientId})`,
                withFill: false,
              }
            : {
                lineColor: colorGroups[figure.colorGroupName],
                withFill: true,
              }

          return (
            <RadarChartFigure
              key={figure.colorGroupName}
              size={size}
              points={points}
              {...figureColorProps}
            />
          )
        })}
      </svg>
    </div>
  )
}
