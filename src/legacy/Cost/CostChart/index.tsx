import React from 'react'
import { useUID } from 'react-uid'
import useDimensions from 'react-use-dimensions'

import classnames from 'classnames'
import { isNil } from 'lodash'

import { LinearChart } from '@/legacy/LinearChart'
import { getDurations, getDurationsGrid } from '@/utils/duration'

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
  currentDay?: number
  daysSummary?: readonly Day[]
  selectedDay?: number
  maxCostSteps?: number
}

export const CostChart: React.FC<Props> = ({
  currentDay = 0,
  maxCostSteps = 3,
  daysSummary = [],
  selectedDay,
}) => {
  const [ref, { height }] = useDimensions()
  const foregroundGradientId = `foreground-gradient-cost-chart-${useUID()}`

  const filteredPlanList = daysSummary.map(day => day.planCost).filter(value => !isNil(value))
  const filteredFactList = daysSummary.map(day => day.factCost).filter(value => !isNil(value))

  const maxDuration = Math.max(0, currentDay, daysSummary.length)
  const maxCost = Math.max(...filteredPlanList, ...filteredFactList)

  const currentDuration = currentDay
  const selectedDuration =
    selectedDay !== null ? Math.max(0, Math.min(maxDuration, selectedDay || 0)) : currentDay

  const lastDuration = filteredFactList.length
  const currentCost = filteredFactList[filteredFactList.length - 1]

  const durationsGrid = getDurationsGrid(daysSummary, maxDuration)
  const durations = getDurations(maxDuration)

  const costs = new Array(maxCostSteps)
    .fill(null)
    .map((_, index) =>
      !isNil(maxCost) && !isNaN(maxCost) && maxCost !== Infinity && maxCost !== -Infinity
        ? Math.round((maxCost / (maxCostSteps - 1)) * index)
        : null
    )

  const valueWithinSafeArea = daysSummary
    /* tslint:disable-next-line:readonly-array */
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
    .map(value => (isNil(value) ? null : value <= 1.05))

  const highlights = valueWithinSafeArea
    /* tslint:disable-next-line:readonly-array */
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

  const backgroundLineData = [0].concat(
    daysSummary.map(day => day.planCost).filter(value => value !== null)
  )
  const foregroundLineData = [0].concat(
    daysSummary.map(day => day.factCost).filter(value => value !== null)
  )

  return (
    <div className={css.main} ref={ref}>
      <div className={css.wrapper}>
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
          </div>
        </div>
        {daysSummary.length && (
          <div
            className={css.selected}
            style={{ left: (selectedDuration / maxDuration) * 100 + '%', height }}
          >
            <div className={css.selectedLine} />
            <div className={css.selectedLabel} />
          </div>
        )}
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
          <svg className={css.svgDefs} fill="none" xmlns="http://www.w3.org/2000/svg">
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
          </svg>

          <LinearChart
            lines={[
              {
                values: foregroundLineData,
                color: `url(#${foregroundGradientId})`,
                classNameLine: css.lineForeground,
              },
              {
                values: backgroundLineData,
                classNameLine: css.lineBackground,
                color: 'rgba(246, 251, 253, 0.2)',
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
