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

export const RadarChart: React.FC<Props> = ({
  ticks,
  maxValue,
  colorGroups,
  axesLabels,
  figures,
  backgroundColor,
  labelSize = 's',
  formatLabel = String,
}) => {
  const [ref, { width = 0, height = 0 }] = useDimensions()
  const size = Math.min(width, height)

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

  return (
    <div ref={ref} className={css.main}>
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className={css.svg}>
        <RadarChartAxes
          ticks={ticks}
          maxValue={maxValue}
          backgroundColor={backgroundColor}
          axesAngles={axesAngles}
          labelSize={labelSize}
          formatLabel={formatLabel}
        />

        {figures.map(figure => {
          const points = _.compact(
            figure.values.map(value => {
              const theAxis = axesAngles.find(a => a.name === value.axisName)

              return theAxis ? angleToCoord(theAxis.angle, value.value / maxValue) : undefined
            })
          )

          return (
            <RadarChartFigure
              key={figure.colorGroupName}
              size={size}
              color={colorGroups[figure.colorGroupName]}
              points={points}
            />
          )
        })}
      </svg>
    </div>
  )
}
