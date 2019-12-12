import React from 'react'

import classnames from 'classnames'

import { ColorGroups } from '@/dashboard/types'

import { Tick } from './components/Legend'
import { Progress } from './components/Progress'
import { Summary } from './components/Summary'
import css from './index.css'

export const sizes = ['s', 'm', 'l'] as const
export type Size = typeof sizes[number]

export type Data = {
  value: number
  valueMin: number
  valueMax: number
  ticks?: readonly Tick[]
  summary: string | number
  colorGroupName: string
  caption?: string
}

type Props = {
  size?: Size
  colorGroups: ColorGroups
  data: readonly Data[]
  isCaptionBold?: boolean
}

export const getValueRatio = (val: number, valMin: number, valMax: number) => {
  return ((val - valMin) / (valMax - valMin)) * 100
}

export const ProgressBar: React.FC<Props> = ({ size = 'm', data, colorGroups, isCaptionBold }) => {
  const sizeClass = { s: css.sizeS, m: css.sizeM, l: css.sizeL }[size]
  const getLegendClass = (legendData: Data['ticks']) =>
    legendData && legendData.length ? css.withLegend : ''

  return (
    <div className={css.progressBar}>
      <div className={css.progress}>
        {data.map((dataItem, i) => (
          <div
            className={classnames(
              css.progressLine,
              sizeClass,
              getLegendClass(dataItem.ticks),
              dataItem.caption && css.hasCaption
            )}
            key={i}
          >
            {dataItem.caption && (
              <span className={classnames(css.caption, isCaptionBold && css.isCaptionBold)}>
                {dataItem.caption}
              </span>
            )}
            <Progress size={size} data={dataItem} color={colorGroups[dataItem.colorGroupName]} />
          </div>
        ))}
      </div>

      <div>
        {data.map((dataItem, i) => (
          <div
            className={classnames(
              css.progressLine,
              sizeClass,
              getLegendClass(dataItem.ticks),
              dataItem.caption && css.hasCaption
            )}
            key={i}
          >
            <Summary
              summary={dataItem.summary}
              color={colorGroups[dataItem.colorGroupName]}
              size={size}
              hasCaption={!!dataItem.caption}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
