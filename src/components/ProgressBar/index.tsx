import React from 'react'

import classnames from 'classnames'

import { ColorGroups } from '@/dashboard/types'
import { TextWidgetContent as TextWidget } from '@/widgets/TextWidget'

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
  tooltip?: React.ReactNode
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
              <div className={css.caption}>
                <TextWidget
                  data={{ text: dataItem.caption, tooltip: dataItem.tooltip }}
                  params={{
                    text: dataItem.caption,
                    croppedLineCount: 1,
                    type: isCaptionBold ? 'text3' : 'text2',
                  }}
                />
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
