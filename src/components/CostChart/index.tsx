import React, { createRef, useEffect, useState } from 'react'

import classnames from 'classnames'
import * as d3 from 'd3'
import { isNil } from 'lodash'

import css from './index.css'

export type Day = {
  planCost: number
  factCost: number
  planCostTotal: number
  factCostTotal: number
  costDeviationTotal: number
  percentCostDeviation: number
}

type Props = {
  className?: string
  currentDay?: number
  daysSummary?: Day[]
  selectedDay?: number
}

const foregroundGradientId = 'foreground-gradient-cost-chart'

export const CostChart: React.FC<Props> = ({
  className,
  currentDay = 0,
  daysSummary = [],
  selectedDay,
}) => {
  const [width, changeWidth] = useState(704.594)
  const [height, changeHeight] = useState(196)
  const ref = createRef<SVGSVGElement>()

  const filteredPlanList = daysSummary.map(day => day.planCost).filter(value => !isNil(value))
  const filteredFactList = daysSummary.map(day => day.factCost).filter(value => !isNil(value))

  const maxDuration = Math.max(0, currentDay, daysSummary.length)
  const maxCost = Math.max(...filteredPlanList, ...filteredFactList)

  const currentDuration = currentDay
  const selectedDuration =
    selectedDay !== null ? Math.max(0, Math.min(maxDuration, selectedDay || 0)) : currentDay

  const lastDuration = filteredFactList.length
  const currentCost = filteredFactList[filteredFactList.length - 1]

  const maxDurationSteps = Math.max(
    8,
    maxDuration < 32
      ? maxDuration
      : maxDuration > 96
      ? 32 - (maxDuration % 32)
      : 16 - (maxDuration % 16)
  )
  const maxCostSteps = 3

  const durationsGrid = daysSummary.length
    ? new Array(maxDuration + 1)
        .fill(0)
        .map((_, index) => index)
        .filter(duration => {
          const step = Math.round(maxDuration / maxDurationSteps) || 1
          return duration === 0 || duration === maxDuration || duration % step === 0
        })
        .map(duration => duration / maxDuration)
    : [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
  const durations = new Array(maxDuration + 1)
    .fill(0)
    .map((_, index) => index)
    .filter(duration => {
      const step = Math.round(maxDuration / maxDurationSteps)
      return duration === 0 || duration === maxDuration || duration % step === 0
    })
  const costs = new Array(maxCostSteps)
    .fill(null)
    .map((_, index) =>
      !isNil(maxCost) && !isNaN(maxCost) && maxCost !== Infinity && maxCost !== -Infinity
        ? Math.round((maxCost / (maxCostSteps - 1)) * index)
        : null
    )

  const valueWithinSafeArea = daysSummary
    .reduce<Array<number | null>>(
      (result, current, index) => {
        result.push(
          index < filteredFactList.length - 1 && current.planCostTotal && current.factCostTotal
            ? current.factCostTotal / current.planCostTotal
            : null
        )

        return result
      },
      [1]
    )
    .map(value => (isNil(value) ? null : value > 1.05 ? false : true))

  const highlights = valueWithinSafeArea
    .reduce<Array<{ from: number; value: boolean | null }>>((ranges, value, day) => {
      if (day === 0) {
        ranges.push({
          from: 0,
          value,
        })
      } else {
        const previousRange = ranges[ranges.length - 1]
        if (previousRange.value === value) {
          ranges.pop()
          ranges.push({
            from: previousRange.from,
            value,
          })
        } else {
          ranges.push({
            from: day / maxDuration,
            value,
          })
        }
      }
      return ranges
    }, [])
    .map((range, index, ranges) => {
      return index < ranges.length - 1
        ? {
            from: range.from,
            to: ranges[index + 1].from,
            value: range.value,
          }
        : {
            from: range.from,
            to: 1,
            value: range.value,
          }
    })

  const mostRecentHighlight = highlights.find(
    highlight => highlight.value !== null && highlight.value
  )

  const highlightCorrection = filteredFactList.length ? maxDuration / filteredFactList.length : 1

  const isCurrentMarketRed = mostRecentHighlight && mostRecentHighlight.value === false

  useEffect(() => {
    if (ref.current) {
      changeHeight(ref.current.getBoundingClientRect().height)
      changeWidth(ref.current.getBoundingClientRect().width)
    }

    const backgroundLineData = new Array().concat(
      [0],
      daysSummary.map(day => day.planCost).filter(value => value !== null)
    )
    const foregroundLineData = new Array().concat(
      [0],
      daysSummary.map(day => day.factCost).filter(value => value !== null)
    )

    const backgroundLineMin = Math.min(...backgroundLineData, ...foregroundLineData)
    const backgroundLineMax = Math.max(...backgroundLineData, ...foregroundLineData)
    const foregroundLineMin = Math.min(...backgroundLineData, ...foregroundLineData)
    const foregroundLineMax = Math.max(...backgroundLineData, ...foregroundLineData)

    const backgroundLineWidth = width * Math.min(1, (backgroundLineData.length - 1) / maxDuration)
    const foregroundLineWidth = width * Math.min(1, (foregroundLineData.length - 1) / maxDuration)

    const backgroundLineWidthScale = d3.scaleLinear()
    const backgroundLineHeightScale = d3.scaleLinear()
    const foregroundLineWidthScale = d3.scaleLinear()
    const foregroundLineHeightScale = d3.scaleLinear()

    backgroundLineWidthScale
      .domain([0, backgroundLineData.length - 1])
      .range([0, backgroundLineWidth])

    backgroundLineHeightScale.domain([backgroundLineMin, backgroundLineMax]).range([height - 1, 1])

    foregroundLineWidthScale
      .domain([0, foregroundLineData.length - 1])
      .range([0, foregroundLineWidth])

    foregroundLineHeightScale.domain([foregroundLineMin, foregroundLineMax]).range([height - 1, 1])

    const backgroundLine = d3
      .line<number>()
      .x((_, index) => backgroundLineWidthScale(index))
      .y(value => backgroundLineHeightScale(value))

    const foregroundLine = d3
      .line<number>()
      .x((_, index) => foregroundLineWidthScale(index))
      .y(value => foregroundLineHeightScale(value))

    d3.select(ref.current)
      .select(`.${css.lineBackground}`)
      .datum(backgroundLineData)
      .attr('d', backgroundLine)

    d3.select(ref.current)
      .select(`.${css.lineForeground}`)
      .datum(foregroundLineData)
      .attr('d', foregroundLine)
      .attr('style', `stroke: url(#${foregroundGradientId});`)
  })

  return (
    <div className={classnames(css.costChart, className)}>
      {selectedDay !== null && (
        <div
          className={css.selectedBox}
          style={{ width: (selectedDuration / maxDuration) * 100 + '%' }}
        />
      )}
      <div>
        {durationsGrid.map((duration, index) => {
          return <div className={css.day} key={index} style={{ left: duration * 100 + '%' }} />
        })}
      </div>
      <div>
        {highlights
          .concat()
          .reverse()
          .filter(highlight => highlight.value === false)
          .map((highlight, index) => {
            return (
              <div
                className={css.highlightBox}
                key={index}
                style={{
                  left: highlight.from * 100 + '%',
                  width: (highlight.to - highlight.from) * 100 + '%',
                }}
              />
            )
          })}
      </div>
      <div className={css.costs}>
        {costs
          .concat()
          .reverse()
          .map((cost, index) => {
            return (
              <div className={css.costsItem} key={index}>
                <span className={css.costsLabel}>
                  {isNil(cost) ? '' : Math.round(cost / 1000000)}
                </span>
              </div>
            )
          })}
      </div>
      <div className={css.durationsWrapper}>
        <div className={css.durations}>
          {daysSummary.length &&
            durations.map((duration, index) => {
              return (
                <div
                  className={css.durationsItem}
                  key={index}
                  style={{ left: (duration / maxDuration) * 100 + '%' }}
                >
                  <span className={css.durationsLabel}>{Math.round(duration)}</span>
                </div>
              )
            })}
          {daysSummary.length && (
            <div
              className={css.selected}
              style={{ left: (selectedDuration / maxDuration) * 100 + '%' }}
            >
              <div className={css.selectedLine} style={{ height: height + 37 + 'px' }} />
              <div className={css.selectedLabel}>{Math.floor(selectedDuration)}</div>
            </div>
          )}
        </div>
      </div>
      {filteredFactList.length > 0 && (
        <div
          className={classnames(css.currentMarker, isCurrentMarketRed && css.red)}
          style={{
            left: (lastDuration / maxDuration) * 100 + '%',
            bottom: (currentCost / maxCost) * 100 + '%',
          }}
        />
      )}
      {daysSummary.length && (
        <div
          className={css.current}
          style={{ left: (currentDuration / maxDuration) * 100 + '%' }}
        />
      )}
      <div className={css.svgWrapper}>
        <svg
          className={css.svg}
          width={width}
          height={height}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          ref={ref}
        >
          <defs>
            <linearGradient id={foregroundGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              {highlights.map((highlight, index) => {
                return (
                  <React.Fragment key={index}>
                    <stop
                      offset={highlight.from * highlightCorrection * 100 + '%'}
                      className={
                        highlight.value ? css.lineForegroundNormal : css.lineForegroundDanger
                      }
                    />
                    <stop
                      offset={highlight.to * highlightCorrection * 100 + '%'}
                      className={
                        highlight.value ? css.lineForegroundNormal : css.lineForegroundDanger
                      }
                    />
                  </React.Fragment>
                )
              })}
            </linearGradient>
          </defs>
          {filteredPlanList.length > 0 && <path className={css.lineBackground} />}
          {filteredFactList.length > 0 && <path className={css.lineForeground} />}
        </svg>
      </div>
    </div>
  )
}
