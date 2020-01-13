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

  return (
    <div className={classnames(css.progressBar, sizeClass)}>
      {data.map((dataItem, i) => (
        <React.Fragment key={i}>
          <div className={css.cell}>
            {dataItem.caption && (
              <div className={classnames(css.caption, isCaptionBold && css.isCaptionBold)}>
                {dataItem.caption}
              </div>
            )}
            <Progress data={dataItem} color={colorGroups[dataItem.colorGroupName]} />
          </div>
          <div className={classnames(css.cell, css.textCell)}>
            <Summary
              summary={dataItem.summary}
              color={colorGroups[dataItem.colorGroupName]}
              hasCaption={!!dataItem.caption}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}
